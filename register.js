/**
 * Overrides the tsconfig used for the app.
 * In the test environment we need some tweaks.
 */

const tsNode = require('ts-node');
const testTSConfig = require('./test/tsconfig.json');

tsNode.register({
  files: true,
  transpileOnly: true,
  project: './test/tsconfig.json'
});

// "test": "nyc ./node_modules/.bin/_mocha 'Test/**/*.ts'",