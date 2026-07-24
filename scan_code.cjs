const fs = require('fs');
const content = fs.readFileSync('src/content/docs/assignment-preview.mdx', 'utf-8');
const lines = content.split('\n');

let inCode = false;
let blockNum = 0;
let problemTitle = '';

for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('## ')) {
        problemTitle = lines[i];
    }
    if (lines[i].startsWith('```')) {
        inCode = !inCode;
        if (inCode) blockNum++;
    } else if (inCode) {
        if (/\ba\b|\ba\[|\ba\./.test(lines[i])) {
            console.log(`P${blockNum} (${problemTitle.slice(0, 30)}): L${i + 1}: ${lines[i]}`);
        }
    }
}
