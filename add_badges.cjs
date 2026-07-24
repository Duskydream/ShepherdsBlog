const fs = require('fs');
const oldPath = 'src/content/docs/assignment-preview.md';
const newPath = 'src/content/docs/assignment-preview.mdx';
let content = fs.readFileSync(oldPath, 'utf-8');

// Insert import statement for Badge right after frontmatter
const splitPoint = content.indexOf('---\n\n', 5);
if (splitPoint !== -1) {
    content = content.slice(0, splitPoint + 5) + "import { Badge } from '@astrojs/starlight/components';\n\n" + content.slice(splitPoint + 5);
}

// Replace all occurrences of 【...】 with <Badge text="..." variant="tip" size="medium" />
content = content.replace(/【(.*?)】/g, ' <Badge text="$1" variant="tip" size="medium" />');

// Write the modified content to the new MDX file
fs.writeFileSync(newPath, content, 'utf-8');

// Delete the old MD file
fs.unlinkSync(oldPath);
console.log('Successfully converted to MDX and added Badge components.');
