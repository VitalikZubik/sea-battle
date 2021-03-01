const path = require('path');

module.export = {
   mode: 'development',
   entry: './index.js',
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
   }
}