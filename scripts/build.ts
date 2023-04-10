/*
Produces production builds and stitches together d.ts files.

To specify the package to build, simply pass its name and the desired build
formats to output (defaults to `buildOptions.formats` specified in that package,
or "esm,cjs"):

```
# name supports fuzzy match. will build all packages with name containing "dom":
npm run build -- vue-quill2

# specify the format to output
npm run build -- vue-quill2 --formats cjs
```
*/
;(async () => {
  const fs = require('fs-extra')
  const path = require('path')
  const execa = require('execa')
  const logger = require('./logger')
  const {
    rootDir,
    targets: allTargets,
    getPackageDir,
    getPackageJson,
    fuzzyMatchTarget,
    checkBuildSize,
    runParallel,
    generateTypes,
  } = require('./utils')

  const args = require('minimist')(process.argv.slice(2))
  const targets: string[] = args._
  const formats: string[] = args.formats || args.f
  const devOnly: boolean = args.devOnly || args.d
  const prodOnly: boolean = !devOnly && (args.prodOnly || args.p)
  const sourceMap: boolean = args.sourcemap || args.s
  const isRelease: boolean =
    args.release || (args.nextVersion && args.nextVersion !== '')
  const hasTypes: boolean = args.t || args.types || isRelease
  const buildAssets: boolean = args.assets || isRelease
  const buildAllMatching: boolean = args.all || args.a
  const nextVersion: string = args.nextVersion || getPackageJson().version
  const commit =
    args.commit || execa.sync('git', ['rev-parse', 'HEAD']).stdout.slice(0, 7)

  if (isRelease) {
    // remove build cache for release builds to avoid outdated enum values
    await fs.remove(path.resolve(__dirname, '../node_modules/.rts2_cache'))
  }
  if (!targets.length) {
    logger.header(allTargets, 'BUILD PACKAGES')
    await buildAll(allTargets)
    checkAllSizes(allTargets)
  } else {
    const matchedTargets: string[] = fuzzyMatchTarget(
      allTargets,
      targets,
      buildAllMatching
    )
    logger.header(matchedTargets, 'BUILD PACKAGES')
    await buildAll(matchedTargets)
    checkAllSizes(matchedTargets)
  }

  async function buildAll(targets: string[]) {
    await runParallel(require('os').cpus().length, targets, build)
  }

  async function build(target: string) {
    const rollupConfig = path.resolve(rootDir, 'rollup.config.js')
    const pkgDir = getPackageDir(target)
    const pkg = getPackageJson(target)

    // only build published packages for release
    if (isRelease && pkg.private) {
      logger.warning(
        target,
        `Skip private package (${target}) in release build`
      )
      return
    }

    // if building a specific format, do not remove dist.
    if (!formats) await fs.remove(`${pkgDir}/dist`)

    let assets: any = {}
    try {
      assets = require(path.resolve(pkgDir, 'assets.config.json'))
    } catch {
      logger.warning(target, `${target} didn't have assets.config.json`)
    }

    const env =
      (pkg.buildOptions && pkg.buildOptions.env) ||
      (devOnly ? 'development' : 'production')
    await execa(
      'npx',
      [
        'rollup',
        '--config',
        rollupConfig,
        '--environment',
        [
          `COMMIT:${commit}`,
          `NODE_ENV:${env}`,
          `TARGET:${target}`,
          formats ? `FORMATS:${formats}` : ``,
          hasTypes ? `TYPES:true` : ``,
          prodOnly ? `PROD_ONLY:true` : ``,
          sourceMap ? `SOURCE_MAP:true` : ``,
          nextVersion ? `NEXT_VERSION:${nextVersion}` : ``,
        ]
          .filter(Boolean)
          .join(','),
      ],
      { stdio: 'inherit' }
    )

    if (hasTypes && pkg.types) await generateTypes(target)
    if (buildAssets && assets.css) {
      const buildAssetsTs = await path.resolve(__dirname, 'buildAssets.ts')
      const commands = ['ts-node', buildAssetsTs, target]
      if (isRelease) commands.push('--release')
      if (prodOnly) commands.push('--prodOnly')
      if (devOnly) commands.push('--devOnly')
      if (sourceMap) commands.push('--sourcemap')
      if (buildAllMatching) commands.push('--all')
      await execa('npx', commands, { stdio: 'inherit' })
    }
  }

  function checkAllSizes(targets: string[]) {
    if (devOnly) return
    console.log()
    for (const target of targets) checkBuildSize(target)
    console.log()
  }
})()
