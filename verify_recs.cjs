const fs = require('fs');
const content = fs.readFileSync('src/content/docs/assignment-preview.mdx', 'utf-8');

const parts = content.split(/\n(?=## \d+\.)/);
let selfRecCount = 0;
let totalRecs = 0;

parts.forEach(p => {
    const titleMatch = p.match(/## \d+\.\s+<a[^>]*>(LinK\d+|JD\d+)<\/a>/);
    const recMatch = p.match(/\*\*🔗 相关题目推荐：\*\* <a href="[^"]*\/([^\/"]*)" target="_blank">/);
    
    if (titleMatch && recMatch) {
        totalRecs++;
        const currId = titleMatch[1];
        const recId = recMatch[1];
        if (currId === recId) {
            console.log(`Self-recommendation found in ${currId}`);
            selfRecCount++;
        }
    }
});

console.log(`Verification done. Total recommendations: ${totalRecs}, Self-recommendations: ${selfRecCount}`);
