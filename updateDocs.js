const fs = require('fs');
const path = require('path');

const config = require(path.join(__dirname, 'typedoc.json'));
const readmePath = path.join(__dirname, 'README.md');
const apiFilePath = path.join(config.out, 'README.md');

const apiDocs = fs.readFileSync(apiFilePath, 'utf8');
const readme = fs.readFileSync(readmePath, 'utf8');
const regex = /<!-- API_DOCS_START -->([\s\S]*)<!-- API_DOCS_END -->/;
if (!regex.test(readme)) {
  throw new Error('Could not find API documentation tags in README.md');
}
const updatedReadme = readme.replace(
  regex,
  `<!-- API_DOCS_START -->\n\n${apiDocs}\n\n<!-- API_DOCS_END -->`
);
fs.writeFileSync(readmePath, updatedReadme);
