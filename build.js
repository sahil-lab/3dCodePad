#!/usr/bin/env node

const webpack = require('webpack');
const config = require('./webpack.config.js');

// Override mode to production
const productionConfig = {
    ...config,
    mode: 'production'
};

// Create webpack compiler
const compiler = webpack(productionConfig);

// Run webpack build
compiler.run((err, stats) => {
    if (err) {
        console.error('Webpack compilation error:', err);
        process.exit(1);
    }

    if (stats.hasErrors()) {
        console.error('Webpack build errors:');
        console.error(stats.toString({ colors: true }));
        process.exit(1);
    }

    console.log('Webpack build completed successfully!');
    console.log(stats.toString({ colors: true }));

    // Close the compiler
    compiler.close(() => {
        console.log('Build process finished.');
    });
}); 