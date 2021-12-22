const electronPackager = require("electron-packager");

async function bundleElectronApp(options) {
  const appPaths = await electronPackager(options)
  console.log(`Electron app bundles created:\n${appPaths.join('\n')}`)
}

bundleElectronApp({
  dir: '.',
  name: 'cmake-js-electron',
  ignore: /^\/(?!(src|node_modules|package\.json|build))/,
  overwrite: true,
  platform: 'win32',
}).catch(e => {
  console.error(e);
})
