const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting optimized build process...');

// Clean previous build
if (fs.existsSync('dist')) {
  console.log('🧹 Cleaning previous build...');
  fs.rmSync('dist', { recursive: true, force: true });
}

// Run build
console.log('📦 Building application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}

// Analyze bundle size
console.log('📊 Analyzing bundle size...');
try {
  execSync('npm run build:analyze', { stdio: 'inherit' });
} catch (error) {
  console.log('⚠️ Bundle analysis not available');
}

console.log('🎉 Optimized build process completed!');
console.log('📁 Build output: ./dist');
console.log('🌐 Deploy the contents of the dist folder to your hosting platform.'); 