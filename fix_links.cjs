const fs = require('fs');
let content = fs.readFileSync('src/content/期末题解集_孟想_50题_最终版.md', 'utf-8');
const lines = content.split('\n');
const promoted = lines.map(line => {
    if (line.startsWith('# ')) return line.substring(2);
    if (line.startsWith('## ')) return line.substring(1);
    if (line.startsWith('### ')) return line.substring(1);
    if (line.startsWith('#### ')) return line.substring(1);
    if (line.startsWith('##### ')) return line.substring(1);
    if (line.startsWith('###### ')) return line.substring(1);
    return line;
});
content = promoted.join('\n');
content = content.replace(/\b(LinK\d+)\b/g, '[](http://xmuoj.com/contest/362/problem/)');
content = content.replace(/\b(JD\d+)\b/g, '[](http://xmuoj.com/contest/357/problem/)');
const fm = '---\ntitle: 2026年程序设计实践 · 期末题解集\ndescription: XMUOJ 50题\ntemplate: doc\ntableOfContents:\n  minHeadingLevel: 1\n  maxHeadingLevel: 3\nsidebar:\n  hidden: true\n---\n\n';
fs.writeFileSync('src/content/docs/assignment-preview.md', fm + content, 'utf-8');
