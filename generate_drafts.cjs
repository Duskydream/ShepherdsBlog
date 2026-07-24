const fs = require('fs');

const drafts = [
    {
        id: "LinK06",
        motivation: "数组预排序后元素具备单调性，相加和随首尾指针收缩呈单调递增/递减变化，可将双重循环优化为单次遍历。",
        time: "$O(N \\log N)$（含排序）",
        space: "$O(1)$",
        related: "LinK07 三数之和"
    },
    {
        id: "LinK07",
        motivation: "固定第一个数后转换成“两数之和”子问题，利用排序去重与双指针夹逼，避免暴力 $O(N^3)$ 搜索。",
        time: "$O(N^2)$",
        space: "$O(1)$",
        related: "LinK06 两数之和"
    },
    {
        id: "LinK27",
        motivation: "数据范围突破常规整数界限，利用字符串长度与字典序比较定义严格弱序进行排序。",
        time: "$O(N \\log N \\cdot L)$",
        space: "$O(N \\cdot L)$",
        related: "LinK28 快速选择第 k 个数"
    },
    {
        id: "LinK28",
        motivation: "仅需获得第 $k$ 小的元素而非全量有序，基于 QuickSort 分区思想每次仅递归处理半边区间，降低期望复杂度。",
        time: "期望 $O(N)$，最坏 $O(N^2)$",
        space: "递归栈 $O(\\log N)$",
        related: "LinK30 归并排序"
    },
    {
        id: "LinK30",
        motivation: "标准的分治范式，将大数组递归二分为子区间各自排序后进行双指针合并，保证稳定的最坏时间复杂度。",
        time: "$O(N \\log N)$",
        space: "$O(N)$",
        related: "LinK31 求排列的逆序数"
    },
    {
        id: "LinK31",
        motivation: "归并排序在合并两个有序子区间时，当右半部分元素小于左半部分时，左半部分剩余所有元素均与该右半元素构成逆序对。",
        time: "$O(N \\log N)$",
        space: "$O(N)$",
        related: "LinK30 归并排序"
    },
    {
        id: "LinK32",
        motivation: "数组已保持升序/单调性，利用二分折半缩小区间，在对数时间内完成精确查找。",
        time: "$O(\\log N)$",
        space: "$O(1)$",
        related: "LinK33 攻击范围"
    },
    {
        id: "LinK33",
        motivation: "求解序列中某一特定值的最左/最右边界，需利用二分法的单调性与左右边界收敛技巧。",
        time: "$O(\\log N)$",
        space: "$O(1)$",
        related: "LinK34 求方程的根"
    },
    {
        id: "LinK34",
        motivation: "连续函数在指定闭区间上具备单调性且端点函数值异号，利用浮点数二分不断逼近方程的精确实数根。",
        time: "$O(\\log \\frac{R-L}{\\epsilon})$",
        space: "$O(1)$",
        related: "LinK35 数的三次方根"
    },
    {
        id: "LinK35",
        motivation: "映射函数 $f(x) = x^3$ 在全实数域上单调递增，采用实数域二分法逐次半减查找区间直至满足精度 $\\epsilon$。",
        time: "$O(\\log \\frac{R-L}{\\epsilon})$",
        space: "$O(1)$",
        related: "LinK34 求方程的根"
    },
    {
        id: "LinK09",
        motivation: "规模为 $N$ 的汉诺塔问题可分解为“将顶部 $N-1$ 个盘子移到辅助柱 -> 移动底层大盘 -> 将 $N-1$ 个盘子移至目标柱”的递归子结构。",
        time: "$O(2^N)$",
        space: "递归栈 $O(N)$",
        related: "LinK16 放苹果"
    },
    {
        id: "LinK11",
        motivation: "遍历全排列问题即遍历深度为 $N$ 的决策树，利用 DFS 结合 boolean 数组记录状态并在回溯时恢复现场。",
        time: "$O(N \\times N!)$",
        space: "$O(N)$",
        related: "LinK13 输出 N 皇后的全部摆法"
    },
    {
        id: "LinK13",
        motivation: "棋盘搜索问题，利用 DFS 按行放置皇后，并利用列、主副对角线的占位状态进行高效剪枝。",
        time: "$O(N!)$",
        space: "$O(N)$",
        related: "LinK11 DFS试炼之排列数字"
    },
    {
        id: "LinK16",
        motivation: "将 $M$ 个苹果放入 $N$ 个盘子的组合数拆解为“至少有一个空盘”与“所有盘子均至少有 1 个苹果”两种不重不漏的子问题递归递推。",
        time: "$O(M \\cdot N)$",
        space: "$O(M + N)$",
        related: "LinK15 爬天梯"
    },
    {
        id: "LinK17",
        motivation: "前缀表达式（波兰式）具有自左向右递归定义的结构特点，遇到运算符直接递归求解左右两个子表达式的值。",
        time: "$O(L)$（$L$ 为表达式长度）",
        space: "递归栈 $O(L)$",
        related: "LinK26 算24"
    },
    {
        id: "LinK19",
        motivation: "考虑 $N$ 个元素的子集问题，每个元素仅有“选”或“不选”两种独立状态，构建深度为 $N$ 的二叉递归树。",
        time: "$O(2^N)$",
        space: "$O(N)$",
        related: "LinK20 递归实现组合型枚举"
    },
    {
        id: "LinK20",
        motivation: "从 $N$ 个数中选 $M$ 个数，在指数型枚举的基础上引入单调递增选择顺序（避免重复组合）与剩余可选元素数量剪枝。",
        time: "$O(\\binom{N}{M})$",
        space: "$O(M)$",
        related: "LinK19 递归实现指数型枚举"
    },
    {
        id: "LinK23",
        motivation: "按钮具有开关对称性，且第一位的操作固定后后续开关的按下状态由前一位完全确定，因此可枚举第一位状态后线性递推校验。",
        time: "$O(N)$",
        space: "$O(N)$",
        related: "LinK24 熄灯问题"
    },
    {
        id: "LinK24",
        motivation: "二维网格开关问题中，若第一行的按下方案固定，第二行的按法被唯一确定，实现由 $2^{R \\times C}$ 到 $2^C$ 的爆搜维度压缩。",
        time: "$O(2^C \\cdot R \\cdot C)$",
        space: "$O(R \\cdot C)$",
        related: "LinK23 二进制密码锁"
    },
    {
        id: "LinK26",
        motivation: "数据规模极小（4个数），采用回溯算法枚举数字选取顺序与运算符组合，每次合并两个数生成子问题直到仅剩一个数。",
        time: "$O(4! \\times 4^3)$（常数级）",
        space: "$O(1)$",
        related: "LinK17 递归求波兰表达式"
    },
    {
        id: "LinK39",
        motivation: "网格地图求连通块/可达区域，利用 DFS 沿着上下左右四个方向递归探访未标记的通路单元。",
        time: "$O(R \\cdot C)$",
        space: "$O(R \\cdot C)$",
        related: "LinK51 净化迷雾森林(广搜)"
    },
    {
        id: "LinK46",
        motivation: "在二维迷宫中求解任意可行路径或全图覆盖，通过深搜（DFS）维护沿途路径并在回溯时恢复现场。",
        time: "$O(4^{R \\cdot C})$",
        space: "$O(R \\cdot C)$",
        related: "LinK39 净化迷雾森林"
    },
    {
        id: "LinK51",
        motivation: "无权网格图求解点到点的最少步数，广度优先搜索（BFS）层级拓展具备天然的“第一次到达即最短”性质。",
        time: "$O(R \\cdot C)$",
        space: "$O(R \\cdot C)$",
        related: "LinK39 净化迷雾森林"
    },
    {
        id: "LinK52",
        motivation: "从起点出发在限制步数内可达的格子集合，使用 BFS 队列进行波浪式层次拓展，避免深搜重复路径。",
        time: "$O(R \\cdot C)$",
        space: "$O(R \\cdot C)$",
        related: "LinK51 净化迷雾森林(广搜)"
    },
    {
        id: "JD162",
        motivation: "求解网格高度严格递减的最长路径，具有无后效性，采用“记忆化搜索”（DFS + DP 状态缓存）避免重复遍历子树。",
        time: "$O(R \\cdot C)$",
        space: "$O(R \\cdot C)$",
        related: "LinK62 数字三角形"
    },
    {
        id: "LinK43",
        motivation: "利用位运算 `n & (n - 1)` 能快速消除二进制表示中最右侧的一个 1，无需逐位平移。",
        time: "$O(k)$（$k$ 为 1 的个数）",
        space: "$O(1)$",
        related: "JD121 蓄势之术"
    },
    {
        id: "JD121",
        motivation: "频繁查询静态数组区间和，利用前缀和数组 `s[i] = s[i-1] + a[i]` 将区间和计算从 $O(N)$ 降维至 $O(1)$。",
        time: "预处理 $O(N)$，查询 $O(1)$",
        space: "$O(N)$",
        related: "JD123 差分之术"
    },
    {
        id: "JD123",
        motivation: "频繁对静态数组的区间元素增减，利用差分数组 `d[L]+=v, d[R+1]-=v` 将区间修改转为 $O(1)$ 点修改，最后前缀和还原。",
        time: "修改 $O(1)$，还原 $O(N)$",
        space: "$O(N)$",
        related: "JD121 蓄势之术"
    },
    {
        id: "JD125",
        motivation: "数据数值范围极广（如 $10^9$）但实际元素坐标数量较小，通过排序去重建立映射（离散化），再结合前缀和求解。",
        time: "$O(N \\log N)$",
        space: "$O(N)$",
        related: "JD121 蓄势之术"
    },
    {
        id: "JD134",
        motivation: "求解每个元素左侧/右侧第一个比它大/小的元素，利用单调栈维护栈内元素的单调序列，实现线性查找。",
        time: "$O(N)$",
        space: "$O(N)$",
        related: "JD135 窗移镜照"
    },
    {
        id: "JD135",
        motivation: "维护固定大小滑动窗口中的最值，利用单调双端队列及时剔除“不可能成为最值”的过期或劣质元素。",
        time: "$O(N)$",
        space: "$O(K)$（$K$ 为窗口大小）",
        related: "JD134 一山更比"
    },
    {
        id: "JD136",
        motivation: "模式串匹配问题，利用预处理的 `next` 数组在主串匹配失败时实现无回溯的模式串跳转。",
        time: "$O(N + M)$",
        space: "$O(M)$",
        related: "JD121 蓄势之术"
    },
    {
        id: "JD137",
        motivation: "动态维护集合中的极值，使用二叉堆（优先队列）在 $O(\\log N)$ 时间内完成插入与堆顶提取。",
        time: "插入/删除 $O(\\log N)$，获取最值 $O(1)$",
        space: "$O(N)$",
        related: "LinK58 Dijkstra求最短路(2)"
    },
    {
        id: "JD127",
        motivation: "区间选点/覆盖问题，按照区间右端点从小到大排序，优先选择当前未覆盖区间的右端点，尽可能覆盖后续更多区间。",
        time: "$O(N \\log N)$",
        space: "$O(1)$",
        related: "LinK06 两数之和"
    },
    {
        id: "JD138",
        motivation: "动态维护若干不相交集合的合并与连通性查询，使用并查集（DSU）结合路径压缩使得操作均摊时间接近常数。",
        time: "均摊 $O(\\alpha(N))$",
        space: "$O(N)$",
        related: "JD140 三界相克"
    },
    {
        id: "JD140",
        motivation: "维护多种具有循环相对关系（如食物链 A吃B吃C吃A，模3同余）的集合推导，利用带权并查集维护相对偏移向量。",
        time: "均摊 $O(\\alpha(N))$",
        space: "$O(N)$",
        related: "JD138 合帮并派"
    },
    {
        id: "JD145",
        motivation: "在树上求解删除后剩余最大连通块节点数最小的点，利用树形 DFS 递归计算子树 Size 并利用容斥求出上方连通块大小。",
        time: "$O(N)$",
        space: "$O(N)$",
        related: "JD147 拓扑之序"
    },
    {
        id: "JD147",
        motivation: "有向无环图（DAG）的依赖顺序拓扑排序，利用队列结合入度统计（Kahn算法），每次提取入度为 0 的节点。",
        time: "$O(V + E)$",
        space: "$O(V + E)$",
        related: "JD154 二色分界"
    },
    {
        id: "JD153",
        motivation: "求解无向带权图的最小生成树，使用 Kruskal 算法按边权升序排序，结合并查集判环逐一贪心选边。",
        time: "$O(E \\log E)$",
        space: "$O(V + E)$",
        related: "JD138 合帮并派"
    },
    {
        id: "JD154",
        motivation: "判定一个无向图是否为二分图，使用 BFS/DFS 交叉对顶点涂上两种不同颜色，若遇到同色相连则判定失败。",
        time: "$O(V + E)$",
        space: "$O(V + E)$",
        related: "JD147 拓扑之序"
    },
    {
        id: "LinK57",
        motivation: "求解稠密非负权图的单源最短路径，使用朴素 Dijkstra 算法，每轮贪心选择未确定最短路的最近节点。",
        time: "$O(V^2)$",
        space: "$O(V^2)$",
        related: "LinK58 Dijkstra求最短路(2)"
    },
    {
        id: "LinK58",
        motivation: "求解稀疏非负权图的单源最短路径，使用优先队列（小顶堆）优化节点挑选过程，降低极值挑选开销。",
        time: "$O(E \\log V)$",
        space: "$O(V + E)$",
        related: "LinK57 Dijkstra求最短路(1)"
    },
    {
        id: "LinK64",
        motivation: "每种物品数量无限，由于状态转移允许包含当前物品本身，将 01 背包的容量遍历方向改为正序以实现状态复用。",
        time: "$O(N \\cdot V)$",
        space: "$O(V)$",
        related: "LinK63 林克的01背包"
    },
    {
        id: "LinK78",
        motivation: "求解中序遍历固定的二叉树最大加分，具有最优子区间结构，利用区间 DP 枚举区间长度与根节点划分位置。",
        time: "$O(N^3)$",
        space: "$O(N^2)$",
        related: "LinK71 最长上升子序列"
    },
    {
        id: "LinK15",
        motivation: "到达第 $N$ 阶方案数仅取决于到达第 $N-1$ 阶与 $N-2$ 阶的方案数（斐波那契递推），具有重叠子问题，自底向上递推求解。",
        time: "$O(N)$",
        space: "$O(1)$",
        related: "LinK62 数字三角形"
    },
    {
        id: "LinK62",
        motivation: "从顶部到底部的路径最大权值，当前格子的最大值仅依赖于上一层相邻格子的最大值，采用自底向上 DP 递推可避免边界处理。",
        time: "$O(N^2)$",
        space: "$O(N^2)$ 或 $O(N)$",
        related: "JD162 雪道寻长"
    },
    {
        id: "LinK63",
        motivation: "经典 01 背包问题，每种物品仅能选 0 或 1 次，采用倒序容量遍历确保状态计算时不重复使用当前物品。",
        time: "$O(N \\cdot V)$",
        space: "$O(V)$",
        related: "LinK64 林克的完全背包"
    },
    {
        id: "LinK71",
        motivation: "求解子序列单调递增的最大长度，定义 $dp[i]$ 为以 $i$ 结尾的 LIS 长度，枚举前驱 $j < i$ 满足 $a[j] < a[i]$ 进行状态转移。",
        time: "$O(N^2)$",
        space: "$O(N)$",
        related: "LinK75 最长公共子序列"
    },
    {
        id: "LinK75",
        motivation: "两个序列的最长公共子序列问题，状态 $dp[i][j]$ 表示 $S_1[1..i]$ 与 $S_2[1..j]$ 的 LCS 长度，根据字符是否相等分类转移。",
        time: "$O(N \\cdot M)$",
        space: "$O(N \\cdot M)$",
        related: "LinK71 最长上升子序列"
    },
    {
        id: "JD170",
        motivation: "旅行商问题（TSP），顶点数较小（$N \\le 20$），利用二进制位图 `mask` 压缩已访问城池集合状态，结合 DP 避免阶乘级暴搜。",
        time: "$O(2^N \\cdot N^2)$",
        space: "$O(2^N \\cdot N)$",
        related: "LinK63 林克的01背包"
    }
];

const filepath = 'src/content/docs/assignment-preview.mdx';
let content = fs.readFileSync(filepath, 'utf-8');

drafts.forEach(d => {
    // 替换动机
    const motivRegex = new RegExp(`(## \\d+\\.\\s+<a[^>]*>${d.id}<\\/a>[^\\n]*\\n\\n)> \\*\\*💡 算法动机：\\*\\* \\[待补充[^\\]]*\\]`);
    content = content.replace(motivRegex, `$1> **💡 算法动机：** ${d.motivation}`);

    // 替换复杂度
    const compRegex = new RegExp(`(\\*\\*复杂度分析：\\*\\* 时间复杂度 \`O\\(\\[待补充\\]\\)\`，空间复杂度 \`O\\(\\[待补充\\]\\)\`)`);
    content = content.replace(compRegex, `**复杂度分析：** 时间复杂度 ${d.time}，空间复杂度 ${d.space}`);

    // 替换相关推荐
    const relRegex = new RegExp(`(\\*\\*🔗 相关题目推荐：\\*\\*) \\[待补充[^\\]]*\\]`);
    content = content.replace(relRegex, `$1 \`${d.related}\``);
});

fs.writeFileSync(filepath, content, 'utf-8');
console.log('Successfully generated drafts for all 50 problems!');
