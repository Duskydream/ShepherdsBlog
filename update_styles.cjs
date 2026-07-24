const fs = require('fs');
const filepath = 'src/content/docs/assignment-preview.mdx';
let content = fs.readFileSync(filepath, 'utf-8');

// 1. 去掉灯泡 emoji
content = content.replace(/> \*\*💡 算法动机：\*\*/g, '> **算法动机：**');

// 2. 将 Badge 的 variant="tip" 改为 variant="note" (蓝色风格)
content = content.replace(/variant="tip"/g, 'variant="note"');

fs.writeFileSync(filepath, content, 'utf-8');
console.log('Updated emojis and badge styles successfully.');
