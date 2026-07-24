const fs = require('fs');
const content = fs.readFileSync('src/content/docs/assignment-preview.mdx', 'utf-8');
const lines = content.split('\n');

let inCode = false;
let blockNum = 0;
let blockLines = [];
let problemTitle = '';

for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('## ')) {
        problemTitle = lines[i];
    }
    if (lines[i].startsWith('```')) {
        inCode = !inCode;
        if (!inCode) {
            console.log(`=== Block ${blockNum} (${problemTitle.slice(0, 40)}) ===`);
            console.log(blockLines.join('\n'));
            blockLines = [];
        } else {
            blockNum++;
        }
    } else if (inCode) {
        blockLines.push(lines[i]);
    }
}
