const fs = require('fs');

const bank = JSON.parse(fs.readFileSync('bank.json', 'utf-8'));

function getUrl(id) {
    const contest = id.startsWith('LinK') ? '362' : '357';
    return `http://xmuoj.com/contest/${contest}/problem/${id}`;
}

function makeLink(id) {
    if (!id || !bank[id]) return null;
    const title = bank[id];
    const url = getUrl(id);
    return `<a href="${url}" target="_blank">${id} ${title}</a>`;
}

// 映射表：50道题各自推荐的原题库中相关题号（要求必须存在于 bank.json 且不能等于原题 ID）
const recMap = {
    "LinK06": "LinK07", // 两数之和 -> 三数之和
    "LinK07": "LinK06", // 三数之和 -> 两数之和
    "LinK27": "LinK28", // 大数排序 -> 快速选择第 k 个数
    "LinK28": "LinK30", // 快速选择 -> 归并排序
    "LinK30": "LinK31", // 归并排序 -> 求排列的逆序数
    "LinK31": "LinK30", // 求排列的逆序数 -> 归并排序
    "LinK32": "LinK33", // 查找指定数 -> 攻击范围
    "LinK33": "LinK34", // 攻击范围 -> 求方程的根
    "LinK34": "LinK35", // 求方程的根 -> 数的三次方根
    "LinK35": "LinK34", // 数的三次方根 -> 求方程的根
    "LinK09": "LinK16", // 汉诺塔 I -> 放苹果
    "LinK11": "LinK13", // 排列数字 -> N 皇后
    "LinK13": "LinK11", // N 皇后 -> 排列数字
    "LinK16": "LinK15", // 放苹果 -> 爬天梯
    "LinK17": "LinK26", // 波兰表达式 -> 算24
    "LinK19": "LinK20", // 指数型枚举 -> 组合型枚举
    "LinK20": "LinK19", // 组合型枚举 -> 指数型枚举
    "LinK23": "LinK24", // 二进制密码锁 -> 熄灯问题
    "LinK24": "LinK23", // 熄灯问题 -> 二进制密码锁
    "LinK26": "LinK17", // 算24 -> 波兰表达式
    "LinK39": "LinK51", // 净化迷雾森林 -> 净化迷雾森林(广搜)
    "LinK46": "LinK39", // 寻找林克的回忆(1) -> 净化迷雾森林
    "LinK51": "LinK52", // 净化迷雾森林(广搜) -> 波克布林的巡逻范围
    "LinK52": "LinK51", // 波克布林的巡逻范围 -> 净化迷雾森林(广搜)
    "JD162": "LinK62",  // 雪道寻长 -> 数字三角形
    "LinK43": "JD121",  // 求二进制中1的个数 -> 蓄势之术
    "JD121": "JD123",   // 蓄势之术(前缀和) -> 差分之术
    "JD123": "JD121",   // 差分之术 -> 蓄势之术
    "JD125": "JD121",   // 离散聚力 -> 蓄势之术
    "JD134": "JD135",   // 一山更比(单调栈) -> 窗移镜照(单调队列)
    "JD135": "JD134",   // 窗移镜照(单调队列) -> 一山更比(单调栈)
    "JD136": "JD121",   // 剑谱寻踪(KMP) -> 蓄势之术
    "JD137": "LinK58",  // 堆石成丘(堆) -> Dijkstra求最短路(2)
    "JD127": "LinK06",  // 一箭穿心(贪心) -> 两数之和
    "JD138": "JD140",   // 合帮并派(并查集) -> 三界相克(带权并查集)
    "JD140": "JD138",   // 三界相克(带权并查集) -> 合帮并派(并查集)
    "JD145": "JD147",   // 古树重心 -> 拓扑之序
    "JD147": "JD154",   // 拓扑之序 -> 二色分界
    "JD153": "JD138",   // 逐边成林(最小生成树) -> 合帮并派(并查集)
    "JD154": "JD147",   // 二色分界(二分图) -> 拓扑之序
    "LinK57": "LinK58", // Dijkstra求最短路(1) -> Dijkstra求最短路(2)
    "LinK58": "LinK57", // Dijkstra求最短路(2) -> Dijkstra求最短路(1)
    "LinK64": "JD163",  // 完全背包 -> 背包叠甲(多重背包二进制优化)
    "LinK78": "LinK71", // 加分二叉树 -> 最长上升子序列
    "LinK15": "LinK62", // 爬天梯 -> 数字三角形
    "LinK62": "JD162",  // 数字三角形 -> 雪道寻长
    "LinK63": "JD164",  // 01背包 -> 背包限重(多重背包)
    "LinK71": "JD166",  // 最长上升子序列 -> 递增剑意II
    "LinK75": "LinK71", // 最长公共子序列 -> 最长上升子序列
    "JD170": "JD163"    // 万城巡游(状压DP) -> 背包叠甲
};

const filepath = 'src/content/docs/assignment-preview.mdx';
let content = fs.readFileSync(filepath, 'utf-8');

// 匹配全书 50 道题的正则模式
// 逐题更新或者移除推荐
const problemRegex = /##\s+(\d+)\.\s+<a[^>]*>(LinK\d+|JD\d+)<\/a>[\s\S]*?(?=##\s+\d+\.|\n---\n\n#|$)/g;

let updatedContent = content.replace(problemRegex, (match, num, id) => {
    const recId = recMap[id];
    
    // 如果没有推荐、推荐题目不存在于题库、或者等于自身ID，则移除推荐整行
    if (!recId || recId === id || !bank[recId]) {
        return match.replace(/\n\n\*\*🔗 相关题目推荐：\*\*.*?(?=\n\n|\n---|$)/g, '');
    }
    
    const formattedLink = makeLink(recId);
    if (!formattedLink) {
        return match.replace(/\n\n\*\*🔗 相关题目推荐：\*\*.*?(?=\n\n|\n---|$)/g, '');
    }
    
    const newRecLine = `\n\n**🔗 相关题目推荐：** ${formattedLink}`;
    
    // 如果已有推荐行则替换，否则在尾部追加
    if (match.includes('**🔗 相关题目推荐：**')) {
        return match.replace(/\n\n\*\*🔗 相关题目推荐：\*\*.*?(?=\n\n|\n---|$)/g, newRecLine);
    } else {
        return match + newRecLine;
    }
});

fs.writeFileSync(filepath, updatedContent, 'utf-8');
console.log('Successfully updated all recommendations with hyperlinked bank items!');
