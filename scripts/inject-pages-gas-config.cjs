'use strict';

/**
 * GitHub Actions などから呼び出し、_site の index に GAS の exec URL と API トークンを書き込む。
 * env: NN_GAS_EXEC_URL, NN_GAS_API_TOKEN
 */

const fs = require('fs');
const path = require('path');

const targetPath = path.resolve(process.argv[2] || 'index.html');
let html = fs.readFileSync(targetPath, 'utf8');

const url = process.env.NN_GAS_EXEC_URL || '';
const token = process.env.NN_GAS_API_TOKEN || '';

html = html.replace(
  /window\.NN_GAS_EXEC_URL\s*=\s*[\s\S]*?;/,
  `window.NN_GAS_EXEC_URL = ${JSON.stringify(url)};`
);
html = html.replace(
  /window\.NN_GAS_API_TOKEN\s*=\s*[\s\S]*?;/,
  `window.NN_GAS_API_TOKEN = ${JSON.stringify(token)};`
);

fs.writeFileSync(targetPath, html);
