const fs = require('fs');
const path = require('path');

try {
  // Determine platform-specific Rollup package
  const platform = process.platform;
  let rollupPackage;
  
  if (platform === 'win32') {
    rollupPackage = '@rollup/rollup-win32-x64-msvc';
  } else if (platform === 'darwin') {
    rollupPackage = '@rollup/rollup-darwin-x64';
  } else if (platform === 'linux') {
    rollupPackage = '@rollup/rollup-linux-x64-gnu';
  }

  if (rollupPackage) {
    try {
      // Try to require the package to see if it's installed
      require(rollupPackage);
      console.log(`${rollupPackage} is already installed.`);
    } catch (e) {
      // If not installed, create a mock package
      const nodeModulesPath = path.join(__dirname, 'node_modules');
      const packagePath = path.join(nodeModulesPath, rollupPackage);
      
      if (!fs.existsSync(packagePath)) {
        fs.mkdirSync(packagePath, { recursive: true });
      }
      
      // Create a mock package.json
      fs.writeFileSync(
        path.join(packagePath, 'package.json'),
        JSON.stringify({
          name: rollupPackage,
          version: '0.0.0',
          description: 'Mock package to fix Vercel deployment',
          main: 'index.js'
        }, null, 2)
      );
      
      // Create a mock index.js
      fs.writeFileSync(
        path.join(packagePath, 'index.js'),
        `module.exports = {};`
      );
      
      console.log(`Created mock ${rollupPackage} package.`);
    }
  }
} catch (error) {
  console.error('Error in postinstall script:', error);
}
