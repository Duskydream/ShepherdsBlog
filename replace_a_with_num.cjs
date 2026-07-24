const fs = require('fs');

const filepath = 'src/content/docs/assignment-preview.mdx';
let content = fs.readFileSync(filepath, 'utf-8');

// 1. LinK30 归并排序
content = content.replace(
    'while(i<=mid&&j<=r) tmp[k++]=a[i]<=a[j]?a[i++]:a[j++];',
    'while(i<=mid&&j<=r) tmp[k++]=num[i]<=num[j]?num[i++]:num[j++];'
);
content = content.replace(
    'while(i<=mid) tmp[k++]=a[i++];// 扫描左侧放入临时数组',
    'while(i<=mid) tmp[k++]=num[i++];// 扫描左侧放入临时数组'
);
content = content.replace(
    'while(j<=r) tmp[k++]=a[j++]; // 扫描右侧放入临时数组',
    'while(j<=r) tmp[k++]=num[j++]; // 扫描右侧放入临时数组'
);

// 2. LinK31 求排列的逆序数
content = content.replace('if (a[i] <= a[j]) {', 'if (num[i] <= num[j]) {');
content = content.replace('tmp[k++] = a[i++];\n} else {\n    tmp[k++] = a[j++]; // 右侧a[j]更小\n    ans += mid - i + 1;  // a[j]与左半部分[i, mid]中的每个元素都构成逆序对', 'tmp[k++] = num[i++];\n} else {\n    tmp[k++] = num[j++]; // 右侧num[j]更小\n    ans += mid - i + 1;  // num[j]与左半部分[i, mid]中的每个元素都构成逆序对');

// 3. LinK33 攻击范围
content = content.replace('int L=lower_bound(a,a+n,x)-a;', 'int L=lower_bound(num,num+n,x)-num;');
content = content.replace('int R=upper_bound(a,a+n,x)-a-1;', 'int R=upper_bound(num,num+n,x)-num-1;');
content = content.replace('if(L==n||a[L]!=x) cout<<"-1 -1";', 'if(L==n||num[L]!=x) cout<<"-1 -1";');

// 4. LinK26 算24
content = content.replace(
    'for (int i = 0; i < a.size(); i++) {\n    for (int j = i + 1; j < a.size(); j++) {\n        vector<double> b; /* 将未被选中的数加入b */\n        b.push_back(a[i] + a[j]);',
    'for (int i = 0; i < num.size(); i++) {\n    for (int j = i + 1; j < num.size(); j++) {\n        vector<double> b; /* 将未被选中的数加入b */\n        b.push_back(num[i] + num[j]);'
);

// 5. JD121 蓄势之术
content = content.replace('s[i]=s[i-1]+a[i]; // s[i]即为前缀和数组', 's[i]=s[i-1]+num[i]; // s[i]即为前缀和数组');

// 6. JD135 窗移镜照
content = content.replace('while(!q.empty() && a[q.back()]>=a[i]) // 维护单调性：新元素更小，队尾永远没用了', 'while(!q.empty() && num[q.back()]>=num[i]) // 维护单调性：新元素更小，队尾永远没用了');
content = content.replace('cout<<a[q.front()]<<\' \';\nq.push_back(i);', 'cout<<num[q.front()]<<\' \';\nq.push_back(i);');

// 7. LinK71 最长上升子序列
content = content.replace('if(a[j]<a[i])\n  			f[i]=max(f[i],f[j]+1); // f[i] 表示以a[i]结尾的最长上升子序列的长度。', 'if(num[j]<num[i])\n  			f[i]=max(f[i],f[j]+1); // f[i] 表示以num[i]结尾的最长上升子序列的长度。');

// 8. LinK75 最长公共子序列
content = content.replace('if (a[i] == b[j])', 'if (num[i] == b[j])');
content = content.replace('// dp[i][j] 表示序列a[n]的前i个字符和序列 b[m]的前j个字符的最长公共子序列', '// dp[i][j] 表示序列num[n]的前i个字符和序列 b[m]的前j个字符的最长公共子序列');

fs.writeFileSync(filepath, content, 'utf-8');
console.log('Successfully replaced array "a" with "num" across all core code snippets!');
