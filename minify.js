const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const glob = require('fast-glob');

const jsFiles = [
  ...glob.sync('./lib/commonjs/**/*.js'),
  ...glob.sync('./lib/module/**/*.js'),
];

jsFiles.forEach((file) => {
  try {
    execSync(`npx terser ${file} --output ${file} --compress --mangle`, {
      stdio: 'inherit',
    });
    console.log(`Minified: ${file}`);
  } catch (err) {
    console.error(`Error minifying ${file}:`, err);
    process.exitCode = 1;
  }
});

const mapFiles = glob.sync('./lib/**/*.map');
mapFiles.forEach((file) => {
  fs.unlinkSync(path.resolve(file));
  console.log(`Removed source map: ${file}`);
});

const declarationFiles = glob.sync('./lib/typescript/**/*.d.ts');
declarationFiles.forEach((file) => {
  const filePath = path.resolve(file);
  const contents = fs.readFileSync(filePath, 'utf8');
  const cleaned = contents.replace(/\n?\/\/# sourceMappingURL=.*$/gm, '');
  fs.writeFileSync(filePath, cleaned);
});

console.log('Post-build complete!');
