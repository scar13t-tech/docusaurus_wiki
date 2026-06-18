const fs = require('fs');
const path = require('path');

const DOCS_DIR = './docs';
const OUTPUT_FILE = './src/data/latestGuides.json';

function getMarkdownFiles(dir) {
  const files = [];

  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath));
    } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }

  return files;
}

function getTitle(content, filePath) {
  const titleMatch = content.match(/^#\s+(.+)$/m);

  if (titleMatch) {
    return titleMatch[1].trim();
  }

  return path.basename(filePath, path.extname(filePath));
}

function getDescription(content) {
  const lines = content
    .replace(/^---[\s\S]*?---/, '')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'));

  return lines[0] || 'Read the latest guide.';
}

function getDocLink(filePath) {
  let relativePath = filePath
    .replace(/^docs[\\/]/, '')
    .replace(/\\/g, '/')
    .replace(/\.(md|mdx)$/, '');

  if (relativePath.endsWith('/intro')) {
    return `/docs/${relativePath}`;
  }

  return `/docs/${relativePath}`;
}

function main() {
  const files = getMarkdownFiles(DOCS_DIR)
    .filter((file) => !file.endsWith('_category_.json'))
    .map((file) => {
      const content = fs.readFileSync(file, 'utf8');
      const stat = fs.statSync(file);

      return {
        title: getTitle(content, file),
        description: getDescription(content),
        link: getDocLink(file),
        updated: stat.mtime.toISOString(),
      };
    })
    .sort((a, b) => new Date(b.updated) - new Date(a.updated))
    .slice(0, 3);

  fs.mkdirSync('./src/data', { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(files, null, 2));

  console.log(`Saved ${files.length} latest guides to ${OUTPUT_FILE}`);
}

main();