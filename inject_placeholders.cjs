const fs = require('fs');
const filepath = 'src/content/docs/assignment-preview.mdx';
let content = fs.readFileSync(filepath, 'utf-8');

// 1. 注入动机
content = content.replace(/\*\*思路：\*\*/g, '> **💡 算法动机：** [待补充：一句话解释为什么想到用这个算法，例如：数据规模10^5需要O(nlogn)或问题具有最优子结构]\n\n**思路：**');

// 2. 注入复杂度
content = content.replace(/\*\*总结：\*\*/g, '**复杂度分析：** 时间复杂度 `O([待补充])`，空间复杂度 `O([待补充])`\n\n**总结：**');

// 3. 注入相关题目 (匹配总结内容，直到遇到连续两个换行)
content = content.replace(/(\*\*总结：\*\*.*?)(\n\n|$)/g, '$1\n\n**🔗 相关题目推荐：** [待补充：相关题号，例如 LinK07 三数之和]$2');

fs.writeFileSync(filepath, content, 'utf-8');
console.log('Successfully injected placeholders into 50 problems.');
