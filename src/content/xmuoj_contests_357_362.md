# XMUOJ Contests

# Contest 357

## [JD163] 背包叠甲

### Description
<p>论剑峰上，铠甲大师出场。他有N种铠甲，每种有重量、防御和库存。&quot;每种最多拿s件——你能装多少防御？&quot;</p><p>李少白眉头一皱：&quot;逐件拆分太慢……二进制优化！把s拆成1、2、4、8…的和，转化为01背包。&quot;</p><p>铠甲大师大惊：&quot;你竟然知道这种方法！&quot;</p>

### Input
<p>第一行两个整数N和V。接下来N行每行三个整数v、w和s（体积、价值、数量）。</p>

### Output
<p>一行，最大价值。</p>

### Samples
**Sample Input 1**
```
3 12
76 84 46
34 31 44
```
**Sample Output 1**
```
0
```

### Hint
<p>多重背包二进制优化：拆分s为2的幂次，转化为01背包。O(N*V*logS)。</p><p><a href="https://www.acwing.com/problem/content/4/" target="_blank">原题链接</a></p>

---

## [JD164] 背包限重

### Description
<p>第二轮铠甲战。数据更大——N和V都到了极限。&quot;同样的方法还管用吗？&quot;对手冷笑。</p><p>梁嘉峰在台下喊道：&quot;方法不变，多重背包的经典解法！&quot;</p><p>李少白再次出手，代码如剑，一气呵成。</p>

### Input
<p>第一行两个整数N和V。接下来N行每行三个整数v、w和s。</p>

### Output
<p>一行，最大价值。</p>

### Samples
**Sample Input 1**
```
680 1562
866 815 599
1355 680 202
```
**Sample Output 1**
```
742560
```

### Hint
<p>多重背包二进制优化。与JD163相同思路，数据范围更大。</p><p><a href="https://www.acwing.com/problem/content/5/" target="_blank">原题链接</a></p>

---

## [JD165] 分组选宝

### Description
<p>宝物被分成若干组，每组只能选一件。&quot;分组背包——三重循环：外层遍历组，内层逆序容量，最内层遍历组内物品。&quot;</p><p>对手是丐帮长老，手中竹棒一点：&quot;小子，你确定每组只选一件？&quot;</p><p>李少白微微一笑：&quot;确定。每组选最优的那一件。&quot;长老哈哈大笑：&quot;好！&quot;</p>

### Input
<p>第一行两个整数N和V。接下来每组：第一行S（组内物品数），接下来S行每行两个整数v和w。</p>

### Output
<p>一行，最大价值。</p>

### Samples
**Sample Input 1**
```
71 46
80
84 76
```
**Sample Output 1**
```
1869
```

### Hint
<p>分组背包：外层遍历组，内层逆序容量，最内层遍历组内物品。</p><p><a href="https://www.acwing.com/problem/content/9/" target="_blank">原题链接</a></p>

---

## [JD166] 递增剑意II

### Description
<p>擂台第二轮——剑的数量到了十万。O(n²)的剑法已经不够用了。</p><p>梁嘉峰在台下传音：&quot;贪心+二分——维护最小末尾数组，O(nlogn)。这是剑法的极致。&quot;</p><p>李少白闭上眼睛，剑意如丝，层层递进。对手的剑阵瞬间崩溃。</p>

### Input
<p>第一行一个整数N。第二行N个整数。</p>

### Output
<p>一行，最长递增子序列的长度。</p>

### Samples
**Sample Input 1**
```
7
3 1 2 1 8 5 6
```
**Sample Output 1**
```
4
```

### Hint
<p>贪心+二分：维护最小末尾数组q[]，二分查找替换。O(nlogn)。</p><p><a href="https://www.acwing.com/problem/content/898/" target="_blank">原题链接</a></p>

---

## [JD167] 整分剑法

### Description
<p>对手是一位数学大师，他写下数字n：&quot;把它拆成若干正整数之和，有多少种拆法？&quot;</p><p>赵晴儿上前：&quot;完全背包——从1到n，每个数可以用无限次。dp[j] += dp[j-i]，模1e9+7。&quot;</p><p>大师推了推眼镜：&quot;你用背包来解整数划分？有意思。&quot;</p>

### Input
<p>一个整数n（1≤n≤1000）。</p>

### Output
<p>一行，划分方案数模1e9+7。</p>

### Samples
**Sample Input 1**
```
5
```
**Sample Output 1**
```
7
```

### Hint
<p>完全背包DP：dp[j] += dp[j-i]，i从1到n。模1e9+7。</p><p><a href="https://www.acwing.com/problem/content/902/" target="_blank">原题链接</a></p>

---

## [JD168] 数码计数

### Description
<p>华山石壁上刻着从a到b的所有数字。&quot;0到9每个数字各出现了几次？&quot;对手出了一道算术题。</p><p>李少白没有一个个数。&quot;数位统计——对每个数字和位置，用数学公式算出现次数。f(b)-f(a-1)。&quot;</p><p>对手目瞪口呆：&quot;你……你怎么算得这么快？&quot;</p>

### Input
<p>输入包含多组测试数据。每组数据一行，包含两个整数 a 和 b（1 ≤ a, b ≤ 10^8），表示查询区间 [a, b]（保证 a ≤ b 或会自动交换）。</p><p>当 a = 0 且 b = 0 时表示输入结束。</p>

### Output
<p>对于每组测试数据，输出一行 10 个整数，分别表示数字 0、1、2、…、9 在区间 [a,b] 中所有整数中出现的次数。</p><p>整数之间用一个空格隔开，<b>行末不要输出多余空格</b>。</p>

### Samples
**Sample Input 1**
```
1 10
```
**Sample Output 1**
```
1 2 1 1 1 1 1 1 1 1
```

### Hint
<p>数位统计：对每个数字和位置用数学公式计算出现次数。f(b)-f(a-1)。</p><p><a href="https://www.acwing.com/problem/content/340/" target="_blank">原题链接</a></p>

---

## [JD169] 棋盘铺阵

### Description
<p>华山之巅，云雾缭绕。四位绝顶高手已经等候多时。</p><p>第一位是棋圣。他摆出一个n×m的棋盘和一堆1×2的骨牌：&quot;铺满整个棋盘，有多少种铺法？&quot;</p><p>赵晴儿凝视棋盘，忽然眼中一亮：&quot;状压DP——逐列处理。用二进制掩码表示哪些格子被前一列的横骨牌占了。&quot;</p><p>棋圣抚掌而笑：&quot;好一个状压！老夫输了。&quot;</p>

### Input
<p>多组数据，每组两个整数n和m。以0 0结束。</p>

### Output
<p>每组一行，铺法总数。</p>

### Samples
**Sample Input 1**
```
2 3
```
**Sample Output 1**
```
3
```

### Hint
<p>状压DP：逐列处理，状态掩码表示被前一列横骨牌占的格子。</p><p><a href="https://www.acwing.com/problem/content/293/" target="_blank">原题链接</a></p>

---

## [JD170] 万城巡游

### Description
<p>第二位绝顶高手——游侠。他铺开一张城池图：&quot;从城0出发，每座城恰好走一次，到城n-1。最短路径？&quot;</p><p>李少白眼中精光一闪：&quot;状压DP——dp[mask][i]表示访问集合mask、当前在城i的最小代价。枚举所有状态和转移。O(2^n × n²)。&quot;</p><p>游侠击节赞叹：&quot;好！这一剑，我甘拜下风！&quot;</p>

### Input
<p>第一行一个整数n。接下来n行每行n个整数，表示邻接矩阵。</p>

### Output
<p>一行，最短Hamilton路径长度。</p>

### Samples
**Sample Input 1**
```
5
0 2 4 5 1
2 0 6 5 3
4 6 0 8 3
5 5 8 0 5
1 3 3 5 0
```
**Sample Output 1**
```
19
```

### Hint
<p>状压DP：dp[mask][i]表示访问集合mask、当前在城i的最小代价。O(2^n * n²)。</p><p><a href="https://www.acwing.com/problem/content/93/" target="_blank">原题链接</a></p>

---

## [JD171] 群经改字

### Description
<p>第三位——藏经阁阁主。他取出一本字典和一段经文：&quot;字典里有多少个词，和这段经文的编辑距离不超过k？&quot;</p><p>赵晴儿沉吟片刻：&quot;对字典里每个词，算它和经文的编辑距离。标准编辑距离DP——dp[i][j] = min(三种操作)。&quot;</p><p>阁主长叹：&quot;当年我花了十年才悟出此法，你竟片刻之间……&quot;</p>

### Input
<p>第一行两个整数N和M。接下来N行每行一个字符串（字典）。接下来M行每行一个字符串和一个整数k。</p>

### Output
<p>M行，每行一个整数（字典中编辑距离≤k的字符串个数）。</p>

### Samples
**Sample Input 1**
```
2 2
abc
def
abc 1
adc 2
```
**Sample Output 1**
```
1
1
```

### Hint
<p>编辑距离DP：dp[i][j] = min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+cost)。</p><p><a href="https://www.acwing.com/problem/content/901/" target="_blank">原题链接</a></p>

---

## [JD172] 千机棋局

### Description
<p>华山绝顶，风雷激荡。最后一位对手——棋魔，传说中的千机棋圣。他缓缓展开一张巨大的人员图谱：&quot;这是宗门的命脉——每个人有一个直属上司。现在要派人出征，但一个士兵和他的上司不能同时出征——否则后方崩溃。每个士兵有不同的战斗力。&quot;</p><p>梁嘉峰在台下喊道：&quot;树形DP！dp[u][0]表示u留守时子树的最大战力，dp[u][1]表示u出征时。出征则下属必须留守，留守则下属可出可留。找到根节点，DFS一遍！&quot;</p><p>李少白深吸一口气，闭上眼睛。他想起了第一天来到剑道宗的那个下午——梁嘉峰递给他两枚铁令，赵晴儿在沙盘上画圆。从变量到递归，从数组到图论，从排序到动态规划……每一步都是剑道的修行。</p><p>他睁开眼睛，提笔写下最后一行代码。</p><p>棋魔看着答案，沉默良久，终于起身，深深一揖：&quot;华山论剑，到此为止。&quot;</p><p>梁嘉峰走上前来，拍了拍李少白的肩膀：&quot;恭喜。你可以出师了。&quot;</p><p>赵晴儿在一旁笑了：&quot;别急，回去还得教下一届呢。&quot;</p>

### Input
<p>第一行一个整数N。第二行N个整数（每个员工的快乐值）。接下来N-1行每行两个整数l k（l的上司是k）。</p>

### Output
<p>一行，最大总快乐值。</p>

### Samples
**Sample Input 1**
```
7
1 1 1 1 1 1 1
2 6
3 6
4 6
6 7
5 7
```
**Sample Output 1**
```
5
```

### Hint
<p>树形DP：dp[u][0/1]表示u不出征/出征时的最大值。DFS从根遍历。dp[u][1] = h[u] + Σdp[v][0]，dp[u][0] = Σmax(dp[v][0], dp[v][1])。</p><p><a href="https://www.acwing.com/problem/content/287/" target="_blank">原题链接</a></p>

---

## [JD001] 铁令求和

### Description
<p>李少白第一次来到剑道宗山门前。梁嘉峰递给他两枚铁令，上面各刻着一个数。「加起来，报给我。」</p>

### Input
<p>一行，两个整数A和B，用空格隔开。</p>

### Output
<p>一个整数，即A+B的结果。</p>

### Hint
<p>读入两个整数，输出它们的和。最基础的输入输出练习。</p><p><a href="https://www.acwing.com/problem/content/1/" target="_blank">原题链接</a></p>

---

## [JD002] 铁令相乘

### Description
<p>梁嘉峰又递来两枚铁令。这一次他竖起两根手指——乘起来。</p>

### Input
<p>一行，两个整数A和B，用空格隔开。</p>

### Output
<p>输出 `PROD = ` 后跟A×B的结果。</p>

### Samples
**Sample Input 1**
```
3 9
```
**Sample Output 1**
```
PROD = 27
```

### Hint
<p>读入两个整数，输出乘积。注意输出格式带前缀。</p><p><a href="https://www.acwing.com/problem/content/607/" target="_blank">原题链接</a></p>

---

## [JD003] 四令求差

### Description
<p>练功房桌上摆着四枚铁令。梁嘉峰说：「A和B相乘，C和D相乘，把两个积的差报给我。」</p>

### Input
<p>一行，四个整数A、B、C、D，用空格隔开。</p>

### Output
<p>输出 `DIFFERENCE = ` 后跟A×B − C×D的结果。</p>

### Samples
**Sample Input 1**
```
5 6 7 8
```
**Sample Output 1**
```
DIFFERENCE = -26
```

### Hint
<p>先乘后减，注意运算顺序和输出格式。</p><p><a href="https://www.acwing.com/problem/content/610/" target="_blank">原题链接</a></p>

---

## [JD004] 集市算账

### Description
<p>宗门集市上，赵晴儿帮账房算一笔账。已知商品编号、购买数量和单价，算出总价。</p>

### Input
<p>一行，三个数：商品编号（整数）、购买数量（整数）、单价（浮点数）。</p>

### Output
<p>输出 TOTAL = 后跟总价（数量×单价），保留两位小数。</p>

### Samples
**Sample Input 1**
```
12 1 5.30
```
**Sample Output 1**
```
TOTAL = 5.30
```

### Hint
<p>总价 = 件数₁×单价₁ + 件数₂×单价₂。</p><p><a href="https://www.acwing.com/problem/content/613/" target="_blank">原题链接</a></p>

---

## [JD005] 比武台

### Description
<p>山门内是一片圆形的比武台。赵晴儿指着地面：「半径是r，算算它的面积。」π取3.14159。</p>

### Input
<p>一个浮点数r，表示半径。</p>

### Output
<p>输出 `A=` 后跟面积，保留4位小数。</p>

### Samples
**Sample Input 1**
```
2.00
```
**Sample Output 1**
```
A=12.5664
```

### Hint
<p>面积 = 3.14159 × r × r，注意浮点数运算和格式化输出。</p><p><a href="https://www.acwing.com/problem/content/606/" target="_blank">原题链接</a></p>

---

## [JD006] 剑术考核

### Description
<p>入门考核有两项：剑术和心法。剑术权重3.5，心法权重7.5。赵晴儿拿到成绩后要算加权平均分。</p>

### Input
<p>两行，每行一个浮点数，分别表示剑术成绩A和心法成绩B。</p>

### Output
<p>输出 `Average = ` 后跟加权平均分，保留5位小数。</p>

### Samples
**Sample Input 1**
```
9.7
5.3
```
**Sample Output 1**
```
Average = 6.70000
```

### Hint
<p>加权平均 = (A×3.5 + B×7.5) / 11。分母是权重之和，不是2。</p><p><a href="https://www.acwing.com/problem/content/608/" target="_blank">原题链接</a></p>

---

## [JD007] 月底发饷

### Description
<p>月底发饷，李少白帮账房核算一名弟子的工钱。已知工号、出工天数和每日工钱。</p>

### Input
<p>第一行一个整数，表示工号。第二行两个数：出工天数（整数）和每日工钱（浮点数）。</p>

### Output
<p>第一行输出工号。第二行输出 `SALARY = U$ ` 后跟实发金额，保留两位小数。</p>

### Samples
**Sample Input 1**
```
25
100 5.50
```
**Sample Output 1**
```
NUMBER = 25
SALARY = U$ 550.00
```

### Hint
<p>实发金额 = 出工天数 × 每日工钱。</p><p><a href="https://www.acwing.com/problem/content/611/" target="_blank">原题链接</a></p>

---

## [JD008] 马匹脚力

### Description
<p>李少白骑马送信，跑了S公里，马匹消耗了L升草料汁。他想知道每升草料汁能支撑跑多少公里。</p>

### Input
<p>一行，两个浮点数，分别表示路程（km）和草料消耗（L）。</p>

### Output
<p>输出每升草料汁能跑的公里数，保留3位小数，后跟 km/l。</p>

### Samples
**Sample Input 1**
```
500 35.0
```
**Sample Output 1**
```
14.286 km/l
```

### Hint
<p>消耗率 = 草料 / 路程，注意浮点数除法。</p><p><a href="https://www.acwing.com/problem/content/617/" target="_blank">原题链接</a></p>

---

## [JD009] 铁球体积

### Description
<p>兵器库里有一颗实心铁球。李少白量出半径r，想算出它的体积。V = (4/3)πr³，π取3.14159。</p>

### Input
<p>一个浮点数r，表示铁球的半径。</p>

### Output
<p>输出 `VOLUME = ` 后跟体积，保留3位小数。</p>

### Samples
**Sample Input 1**
```
3
```
**Sample Output 1**
```
VOLUME = 113.097
```

### Hint
<p>体积 = (4.0/3.0) × 3.14159 × r³，注意用浮点数除法。</p><p><a href="https://www.acwing.com/problem/content/614/" target="_blank">原题链接</a></p>

---

## [JD010] 三令比大

### Description
<p>梁嘉峰在墙上刻了三个数，转头说：「最大的那个，报给我。」</p>

### Input
<p>一行，三个整数A、B、C，用空格隔开。</p>

### Output
<p>输出 `Max = ` 后跟三个数中的最大值。</p>

### Samples
**Sample Input 1**
```
7 14 106
```
**Sample Output 1**
```
Max = 106
```

### Hint
<p>用条件判断两两比较，或直接用max函数。</p><p><a href="https://www.acwing.com/problem/content/616/" target="_blank">原题链接</a></p>

---

## [JD011] 哨塔测距

### Description
<p>赵晴儿在沙盘上标了两个哨塔的坐标(x1,y1)和(x2,y2)。她说：「算算它们之间的直线距离。」</p>

### Input
<p>一行，四个浮点数x1, y1, x2, y2，用空格隔开。</p>

### Output
<p>输出两点间的距离，保留两位小数。</p>

### Samples
**Sample Input 1**
```
1.0 7.0 5.0 9.0
```
**Sample Output 1**
```
4.4721
```

### Hint
<p>使用距离公式，需要引入数学库以使用sqrt函数。</p><p><a href="https://www.acwing.com/problem/content/618/" target="_blank">原题链接</a></p>

---

## [JD012] 圆盘开孔

### Description
<p>赵晴儿在沙盘上画了五个图形，每个图形都用A、B、C三个数来定义。她让李少白算出每个图形的面积：三角形（底A高C）、圆形（半径C）、梯形（上底A下底B高C）、正方形（边长B）、长方形（长A宽B）。π取3.14159，结果保留3位小数。</p>

### Input
<p>一行，三个浮点数A、B、C。</p>

### Output
<p>五行，分别输出 TRIANGULO（三角形）、CIRCULO（圆形）、TRAPEZIO（梯形）、QUADRADO（正方形）、RETANGULO（长方形）的面积，各保留3位小数。格式为 `名称: 面积`。</p>

### Samples
**Sample Input 1**
```
3.0 4.0 5.2
```
**Sample Output 1**
```
TRIANGULO: 7.800
CIRCULO: 84.949
TRAPEZIO: 18.200
QUADRADO: 16.000
RETANGULO: 12.000
```

### Hint
<p>注意输出格式：名称与面积之间有一个空格。π取3.14159。使用 printf(&quot;%.3f&quot;) 或 cout &lt;&lt; fixed &lt;&lt; setprecision(3) 保留3位小数。</p><p><a href="https://www.acwing.com/problem/content/615/" target="_blank">原题链接</a></p>

---

## [JD013] 水钟报时

### Description
<p>宗门的水钟记录的是总秒数，但掌门要求用「时:分:秒」的格式汇报。赵晴儿让李少白帮忙转换。</p>

### Input
<p>一个整数N，表示总秒数。</p>

### Output
<p>输出 `H:M:S` 格式的时间。</p>

### Samples
**Sample Input 1**
```
556
```
**Sample Output 1**
```
0:9:16
```

### Hint
<p>时 = 秒 ÷ 3600，分 = 余数 ÷ 60，秒 = 最终余数。</p><p><a href="https://www.acwing.com/problem/content/656/" target="_blank">原题链接</a></p>

---

## [JD014] 钱庄换银

### Description
<p>李少白去镇上钱庄换碎银。掌柜说：「你要换多少文？我用100、50、20、10、5、2、1面额的铜钱给你。」需要知道每种面额各要几枚。</p>

### Input
<p>一个整数N，表示要换的文数。</p>

### Output
<p>第一行输出总金额N。接下来7行，按面额从大到小，每行输出 `X nota(s) de R$ Y,00`，其中X是张数，Y是面额。</p>

### Samples
**Sample Input 1**
```
576
```
**Sample Output 1**
```
576
5 nota(s) de R$ 100,00
1 nota(s) de R$ 50,00
1 nota(s) de R$ 20,00
0 nota(s) de R$ 10,00
1 nota(s) de R$ 5,00
0 nota(s) de R$ 2,00
1 nota(s) de R$ 1,00
```

### Hint
<p>贪心策略：从大到小依次整除，记录每种面额的枚数。</p><p><a href="https://www.acwing.com/problem/content/655/" target="_blank">原题链接</a></p>

---

## [JD015] 石碑之谜

### Description
<p>山门前有两条路，路边各立一块石碑。赵晴儿指着石碑上的两个数说：「如果其中一个数能被另一个整除，这两块碑就是一对——走左边这条路。否则走右边。」</p><p>给定两个整数A和B，判断它们是否互为倍数关系（即A能被B整除，或B能被A整除）。</p>

### Input
<p>一行，两个整数A和B。</p>

### Output
<p>互为倍数输出 `Yes`，否则输出 `No`。</p>

### Samples
**Sample Input 1**
```
6 24
```
**Sample Output 1**
```
Yes
```

### Hint
<p><a href="https://www.acwing.com/problem/content/667/" target="_blank">原题链接</a></p><p>判断 A%B==0 或 B%A==0，只要有一个成立就是倍数关系，输出Yes；否则输出No。</p>

---

## [JD016] 三根木棍

### Description
<p>赵晴儿从柴堆里抽出三根木棍，量了量长度，让李少白判断它们能不能拼成一个三角形。如果能，算出周长；如果不能，算出以A、B为上下底、C为高的梯形面积，公式为 (A+B)×C÷2。</p>

### Input
<p>一行，三个浮点数A、B、C。</p>

### Output
<p>能拼成三角形输出 `Perimeter = X.X`（周长），拼不成输出 `Area = X.X`（梯形面积）。</p>

### Samples
**Sample Input 1**
```
6.0 4.0 2.0
```
**Sample Output 1**
```
Area = 10.0
```

### Hint
<p><a href="https://www.acwing.com/problem/content/666/" target="_blank">原题链接</a></p><p>三角形成立条件：任意两边之和大于第三边。如果成立，周长=A+B+C；如果不成立，梯形面积=(A+B)*C/2。注意保留1位小数。</p>

---

## [JD017] 比武时辰

### Description
<p>李少白和师弟在练武场比武。他们从A时开始，到B时结束（只看整点，不看分钟）。如果B&gt;A，比武持续了B-A小时；如果B≤A，说明比武过了零点，持续了24-A+B小时；如果A=B，说明刚好持续了一整天（24小时）。</p>

### Input
<p>一行，两个整数A和B（0≤A,B≤23）。</p>

### Output
<p>输出一个整数，表示比武持续的小时数。</p>

### Samples
**Sample Input 1**
```
0 15
```
**Sample Output 1**
```
15
```

### Hint
<p><a href="https://www.acwing.com/problem/content/669/" target="_blank">原题链接</a></p><p>用条件判断：如果B&gt;A，输出B-A；如果B==A，输出24；否则输出24-A+B。</p>

---

## [JD018] 三石排序

### Description
<p>梁嘉峰在地上放了三块石头，上面各刻着一个数。他说：「从小到大排好，报给我。」</p>

### Input
<p>一行，三个整数，用空格隔开。</p>

### Output
<p>三个数从小到大输出，空格隔开。</p>

### Samples
**Sample Input 1**
```
7 21 -14
```
**Sample Output 1**
```
-14 7 21
```

### Hint
<p>用条件判断两两比较确定顺序，或存入数组排序。</p><p><a href="https://www.acwing.com/problem/content/665/" target="_blank">原题链接</a></p>

---

## [JD019] 杂货铺

### Description
<p>山脚杂货铺有5种干粮，编号1到5，单价分别是4.00、4.50、5.00、2.00、1.50文。赵晴儿报了干粮编号和要买的数量，掌柜让她自己算总价。</p>

### Input
<p>一行，两个整数：干粮编号X和数量Y。</p>

### Output
<p>输出 `Total: R$ ` 后跟总价，保留两位小数。</p>

### Samples
**Sample Input 1**
```
3 2
```
**Sample Output 1**
```
Total: R$ 10.00
```

### Hint
<p>用数组或条件判断存储5种单价，查表后乘以数量。</p><p><a href="https://www.acwing.com/problem/content/662/" target="_blank">原题链接</a></p>

---

## [JD020] 内力分级

### Description
<p>宗门把弟子的内力值分成四个等级：[0,25]是入门，(25,50]是初级，(50,75]是中级，(75,100]是高级。超出100则不在评级范围内。李少白测出一名弟子的内力值，需要判断他属于哪个等级。</p>

### Input
<p>一个浮点数，表示内力值。</p>

### Output
<p>输出对应区间的名称，或 `Out of interval`（超出范围）。</p>

### Samples
**Sample Input 1**
```
95.29
```
**Sample Output 1**
```
Interval (75,100]
```

### Hint
<p>用 if-elif-else 逐一判断落在哪个区间。</p><p><a href="https://www.acwing.com/problem/content/661/" target="_blank">原题链接</a></p>

---

## [JD021] 沙盘点位

### Description
<p>赵晴儿在沙盘上标了一个点P(x, y)，让李少白判断它落在第几象限，还是在坐标轴上，还是在原点。</p>

### Input
<p>一行，两个浮点数x和y。</p>

### Output
<p>输出 <code>Q1</code>（第一象限）、<code>Q2</code>（第二）、<code>Q3</code>（第三）、<code>Q4</code>（第四）、<code>Eixo X</code>（X轴上）、<code>Eixo Y</code>（Y轴上）或 <code>Origem</code>（原点）。</p>

### Samples
**Sample Input 1**
```
4.5 -2.2
```
**Sample Output 1**
```
Q4
```

### Hint
<p>先判断是否在原点或坐标轴上（x==0 或 y==0），再判断象限。</p><p><a href="https://www.acwing.com/problem/content/664/" target="_blank">原题链接</a></p>

---

## [JD022] 跨夜比武

### Description
<p>李少白和师弟比武，开始时间是A时B分，结束时间是C时D分。比武可能跨了零点。请算出比武持续了多久。</p>

### Input
<p>一行，四个整数A、B、C、D，分别表示开始的时、分和结束的时、分。</p>

### Output
<p>输出比武持续时间，格式为 `H:M`。</p>

### Samples
**Sample Input 1**
```
8 56 7 37
```
**Sample Output 1**
```
22:41
```

### Hint
<p>全部转为分钟做差。如果结果≤0，加上24×60。</p><p><a href="https://www.acwing.com/problem/content/670/" target="_blank">原题链接</a></p>

---

## [JD023] 账房调薪

### Description
<p>宗门账房年底调薪，按原月钱所在区间确定涨幅：0~400涨15%，400.01~800涨12%，800.01~1200涨10%，1200.01~2000涨7%，2000以上涨4%。涨幅是按整个工资乘以对应百分比，不是分段累进。</p><p>李少白拿到一名弟子的原月钱，请算出新月钱、涨了多少和涨幅百分比。</p>

### Input
<p>一个浮点数，表示原月钱。</p>

### Output
<p>三行：新月钱、涨了多少、涨幅百分比（整数带%号），金额保留两位小数。</p>

### Samples
**Sample Input 1**
```
400.00
```
**Sample Output 1**
```
New salary: 460.00
Increase: 60.00
Percentage: 15 %
```

### Hint
<p>用 if-elif 判断原月钱落在哪个区间，确定涨幅百分比p。涨额 = 原月钱 × p/100，新月钱 = 原月钱 + 涨额。注意400属于0~400区间（涨15%），400.01才属于400~800区间。</p><p><a href="https://www.acwing.com/problem/content/671/" target="_blank">原题链接</a></p>

---

## [JD024] 五关考验

### Description
<p>梁嘉峰考李少白：「给你四个数A、B、C、D，同时满足以下五个条件才算过关：B大于A，D大于A，C与D之和大于A与B之和，C是正数，A是偶数。」</p>

### Input
<p>一行，四个整数A、B、C、D。</p>

### Output
<p>满足所有条件输出 `Accepted`，否则输出 `Not accepted`。</p>

### Samples
**Sample Input 1**
```
-87 14 68 33
```
**Sample Output 1**
```
Not accepted
```

### Hint
<p>用逻辑与（&&/and）连接五个条件，全部为真才通过。</p><p><a href="https://www.acwing.com/problem/content/659/" target="_blank">原题链接</a></p>

---

## [JD025] 信鸽传信

### Description
<p>宗门各分舵之间用信鸽传信，每个分舵有一个编号（DDD码）。李少白拿到一个编号，需要查出它对应哪个分舵：61=Brasilia，71=Salvador，11=Sao Paulo，21=Rio de Janeiro，32=Juiz de Fora，19=Campinas，27=Vitoria，31=Belo Horizonte，其他编号则输出&quot;DDD nao cadastrado&quot;。</p>

### Input
<p>一个整数。</p>

### Output
<p>输出对应分舵名称，或 `DDD nao cadastrado`。</p>

### Samples
**Sample Input 1**
```
11
```
**Sample Output 1**
```
Sao Paulo
```

### Hint
<p>用 if-elif 链逐一比对，或用字典/映射表查找。</p><p><a href="https://www.acwing.com/problem/content/673/" target="_blank">原题链接</a></p>

---

## [JD026] 木棍辨形

### Description
<p>梁嘉峰递来三根木棍：「先判断能不能拼成三角形。能的话，再判断是直角、锐角还是钝角三角形，以及是否等边或等腰。」判断依据：最长边的平方与另外两边平方和的关系。</p>

### Input
<p>一行，三个浮点数，表示三边长度。</p>

### Output
<p>不能构成三角形输出 <code>Not a triangle</code>；能构成则按以下规则输出（<b>每种满足的条件输出一行</b>）：</p><ol><li>先判断角度类型：输出 <code>Right</code>（直角）、<code>Acute</code>（锐角）或 <code>Obtuse</code>（钝角）之一。</li><li>再判断边长类型：若三边相等输出 <code>Equilateral</code>（等边），若恰好两边相等输出 <code>Isosceles</code>（等腰），否则不输出。</li></ol><p>注意：一个三角形可能同时属于多个类型，同一类型的判断用 <code>if</code> 而不是 <code>elif</code> 才能多行输出。</p>

### Samples
**Sample Input 1**
```
6.0 4.0 2.0
```
**Sample Output 1**
```
Not a triangle
```

**Sample Input 2**
```
5.0 5.0 5.0
```
**Sample Output 2**
```
Acute
Equilateral
```

### Hint
<p>先验证两边之和大于第三边。若不能构成三角形则直接输出 <code>Not a triangle</code> 并结束。</p><p>能构成三角形时，角度类型和边长类型分别用独立的 <code>if</code> 判断（不要用 <code>elif</code> 串起来），以确保等边/等腰三角形能输出两行。</p><p>边长已从小到大排列，第三个数即最长边。</p><p><a href="https://www.acwing.com/problem/content/668/" target="_blank">原题链接</a></p>

---

## [JD027] 怪兽辨识

### Description
<p>迷踪林外遇到一只怪兽。赵晴儿观察了三层特征来判断它的种类：<br />第一层：有脊椎（vertebrate）还是无脊椎（invertebrate）；<br />第二层：鸟类（bird）、哺乳类（mammal）、昆虫（insect）还是环节动物（annelid）；<br />第三层：食性——食肉（carnivore）、食草（herbivore）、杂食（omnivore）、吸血（hematophagous）。</p><p>以下是怪兽分类图谱：</p><pre style="font-family:monospace;background:#f5f5f5;padding:12px;border-radius:4px;line-height:1.6">Level 1         Level 2        Level 3           Animal
---------------------------------------------------------
                +-- bird ------ carnivore ------- eagle（鹰）
                |             +-- herbivore ------ dove（鸽）
vertebrate -----+
                |             +-- omnivore ------- man（人）
                +-- mammal ----+
                              +-- herbivore ------ cow（牛）

                +-- insect ---- hematophagous ---- flea（跳蚤）
                |             +-- herbivore ------ caterpillar（毛虫）
invertebrate ---+
                |             +-- hematophagous ---- leech（水蛭）
                +-- annelid --+
                              +-- omnivore ------- earthworm（蚯蚓）
</pre><p>根据输入的三层特征单词，输出对应的动物英文名称。</p>

### Input
<p>三行，每行一个字符串，分别表示三层分类特征。</p>

### Output
<p>输出对应的动物名称。</p>

### Samples
**Sample Input 1**
```
vertebrate
mammal
omnivore
```
**Sample Output 1**
```
man
```

**Sample Input 2**
```
vertebrate
bird
carnivore
```
**Sample Output 2**
```
eagle
```

### Hint
<p>三层嵌套 if-else：先判断第一层，再判断第二层，最后判断第三层。</p><p><a href="https://www.acwing.com/problem/content/672/" target="_blank">原题链接</a></p>

---

## [JD028] 田赋计算

### Description
<p>李少白入了宗门，开始交田赋。税率分档：2000以下免税，2000.01~3000部分征8%，3000.01~4500部分征18%，4500以上部分征28%。注意是分段计税——只有超出部分按对应税率算。</p>

### Input
<p>一个浮点数，表示月收入。</p>

### Output
<p>输出 `R$ X.XX`。免税则输出 `Isento`。</p>

### Samples
**Sample Input 1**
```
3002.00
```
**Sample Output 1**
```
R$ 80.36
```

### Hint
<p>分段计算：1000×8% + 2×18% = 80.36。每段只对超出部分征税。</p><p><a href="https://www.acwing.com/problem/content/674/" target="_blank">原题链接</a></p>

---

## [JD029] 石砖偶数

### Description
<p>千层塔第一层。墙上刻着一排编号从1到100的石砖。赵晴儿说：「把所有偶数编号的石砖挑出来，每行报一个。」</p>

### Input
<p>无输入。</p>

### Output
<p>输出全部偶数，每个偶数占一行。</p>

### Samples
**Sample Input 1**
```
No input
```
**Sample Output 1**
```
2
4
6
8
10
12
14
16
18
20
22
24
26
28
30
32
34
36
38
40
42
44
46
48
50
52
54
56
58
60
62
64
66
68
70
72
74
76
78
80
82
84
86
88
90
92
94
96
98
100
```

### Hint
<p><a href="https://www.acwing.com/problem/content/710/" target="_blank">原题链接</a></p><p>for循环从2开始，步长为2，到100结束。</p>

---

## [JD030] 奇数石砖

### Description
<p>千层塔第二层。墙上有一排编号从1到X的石砖。梁嘉峰指着石砖说：「把所有奇数编号的报出来。」</p>

### Input
<p>一个正整数X。</p>

### Output
<p>每行一个奇数，从1到X（含）。</p>

### Samples
**Sample Input 1**
```
8
```
**Sample Output 1**
```
1
3
5
7
```

### Hint
<p><a href="https://www.acwing.com/problem/content/711/" target="_blank">原题链接</a></p><p>for循环从1开始，步长为2，到X结束。如果X是偶数，最后一个奇数是X-1。</p>

---

## [JD031] 反复之门

### Description
<p>千层塔的某一层有一扇不断重复的门。每次门前出现一个数X：如果X不为0，就从1数到X；如果X为0，修炼结束。</p>

### Input
<p>若干行，每行一个整数X。以0结束。</p>

### Output
<p>对每个非零的X，输出1到X，每行一个数。每组之间空一行。</p>

### Samples
**Sample Input 1**
```
5
10
3
0
```
**Sample Output 1**
```
1 2 3 4 5
1 2 3 4 5 6 7 8 9 10
1 2 3
```

### Hint
<p><a href="https://www.acwing.com/problem/content/714/" target="_blank">原题链接</a></p><p>外层while循环读入X，遇到0停止。内层for循环从1到X输出。</p>

---

## [JD032] 六奇连珠

### Description
<p>梁嘉峰递给李少白一个数X：「从X之后开始，找出6个连续的奇数，一个一个报给我。」</p>

### Input
<p>一个整数X。</p>

### Output
<p>从X之后开始的6个连续奇数，每行一个。</p>

### Samples
**Sample Input 1**
```
8
```
**Sample Output 1**
```
9
11
13
15
17
19
```

### Hint
<p><a href="https://www.acwing.com/problem/content/716/" target="_blank">原题链接</a></p><p>如果X是奇数，从X+2开始；如果X是偶数，从X+1开始。循环6次，每次加2。</p>

---

## [JD033] 正数清点

### Description
<p>赵晴儿递给李少白6个测量数据，有的是正数有的是负数。她问：「这里面有几个正数？」</p>

### Input
<p>6行，每行一个浮点数。</p>

### Output
<p>输出正数的个数，格式为 `X valores positivos`。</p>

### Samples
**Sample Input 1**
```
7
-5
6
-3.4
4.6
12
```
**Sample Output 1**
```
4 positive numbers
```

### Hint
<p><a href="https://www.acwing.com/problem/content/718/" target="_blank">原题链接</a></p><p>循环读入6个数，用if判断是否&gt;0，计数器累加。</p>

---

## [JD034] 余数寻踪

### Description
<p>梁嘉峰写下了一个数N：「从1到10000，把所有除以N余数为2的数报给我。」</p>

### Input
<p>一个整数N（N&gt;2）。</p>

### Output
<p>每行一个数，从1到10000中除以N余2的数。</p>

### Samples
**Sample Input 1**
```
13
```
**Sample Output 1**
```
2
15
28
41
54
...
```

### Hint
<p><a href="https://www.acwing.com/problem/content/723/" target="_blank">原题链接</a></p><p>for循环从1到10000，if i%N==2则输出。</p>

---

## [JD035] 区间计数

### Description
<p>赵晴儿递给李少白N个测量数据，让他数一数有多少个落在[10,20]这个区间内。</p>

### Input
<p>第一行一个整数N。第二行N个整数。</p>

### Output
<p>第一行输出 X in，X为区间内个数。第二行输出 Y out，Y为区间外个数。</p>

### Samples
**Sample Input 1**
```
5
5 12 18 25 10
```
**Sample Output 1**
```
3 in
2 out
```

### Hint
<p><a href="https://www.acwing.com/problem/content/722/" target="_blank">原题链接</a></p><p>循环读入，判断是否 10≤X≤20，计数器累加。</p>

---

## [JD036] 奇数求和

### Description
<p>梁嘉峰在墙上刻了两个数X和Y，让李少白算出X和Y之间（不含X和Y）所有奇数的和。</p>

### Input
<p>一行，两个整数X和Y（X

### Output
<p>输出X和Y之间所有奇数的和。</p>

### Samples
**Sample Input 1**
```
6 -5
```
**Sample Output 1**
```
5
```

### Hint
<p><a href="https://www.acwing.com/problem/content/726/" target="_blank">原题链接</a></p><p>从X+1到Y-1循环，判断每个数是否为奇数，是则累加。</p>

---

## [JD037] 数链连珠

### Description
<p>梁嘉峰写下了一个起始整数A，又在第二行写了一串数。第二行里第一个正数就是N。请算出从A开始的N个连续整数的和。</p>

### Input
<p>第一行：整数A。第二行：若干整数，第一个大于0的数才是N。</p>

### Output
<p>从A开始N个连续整数之和。</p>

### Samples
**Sample Input 1**
```
3
-5 0 -3 4 -1
```
**Sample Output 1**
```
18
```

### Hint
<p><a href="https://www.acwing.com/problem/content/725/" target="_blank">原题链接</a></p><p>A固定，第二行跳过负数和零找N。从A开始循环N次累加。</p>

---

## [JD038] 石中之王

### Description
<p>练功场上摆了一排石块，每块上面刻着一个数。赵晴儿让李少白找到最大的数，并说出它是第几块（从1开始计数）。</p>

### Input
<p>第一行一个整数N，表示石块数量。第二行N个整数。</p>

### Output
<p>输出最大值和它的位置，格式见样例。</p>

### Samples
**Sample Input 1**
```
5
3 2 5 1 4
```
**Sample Output 1**
```
5
3
```

### Hint
<p><a href="https://www.acwing.com/problem/content/712/" target="_blank">原题链接</a></p><p>遍历时同时记录最大值和位置。</p>

---

## [JD039] 约数寻踪

### Description
<p>赵晴儿在沙盘上写下一个数N：「找出它的所有约数，从小到大列出来。」</p>

### Input
<p>一个正整数N。</p>

### Output
<p>每行一个约数，从小到大。</p>

### Samples
**Sample Input 1**
```
6
```
**Sample Output 1**
```
1
2
3
6
```

### Hint
<p><a href="https://www.acwing.com/problem/content/713/" target="_blank">原题链接</a></p><p>从1到N循环，如果N%i==0则i是约数。</p>

---

## [JD040] 九九归真

### Description
<p>赵晴儿教李少白背乘法口诀。她写下一个数N，让李少白从1乘到10，按格式列出N的乘法表：「i x N = i*N」。</p>

### Input
<p>一个整数N。</p>

### Output
<p>10行，格式为 `i x N = i*N`。</p>

### Samples
**Sample Input 1**
```
140
```
**Sample Output 1**
```
1 x 140 = 140
2 x 140 = 280
3 x 140 = 420
4 x 140 = 560
5 x 140 = 700
6 x 140 = 840
7 x 140 = 980
8 x 140 = 1120
9 x 140 = 1260
10 x 140 = 1400
```

### Hint
<p><a href="https://www.acwing.com/problem/content/720/" target="_blank">原题链接</a></p><p>for循环从1到10，每次输出i x N = i*N。</p>

---

## [JD041] 千层阵列

### Description
<p>千层塔的一面墙上刻着N行M列的数字阵列，每行从1开始递增，但每逢第M个位置不写数字，写SWORD。赵晴儿让李少白按这个规律把整个阵列报出来。</p>

### Input
<p>一行，两个整数N和M。</p>

### Output
<p>N行，每行M个值，最后一个用SWORD代替，值之间用空格隔开。</p>

### Samples
**Sample Input 1**
```
7 4
```
**Sample Output 1**
```
1 2 3 SWORD
5 6 7 SWORD
9 10 11 SWORD
13 14 15 SWORD
17 18 19 SWORD
21 22 23 SWORD
25 26 27 SWORD
```

### Hint
<p><a href="https://www.acwing.com/problem/content/717/" target="_blank">原题链接</a></p><p>嵌套循环，外层控制行，内层控制列。每行第M个位置输出SWORD。</p>

---

## [JD042] 兵刃统计

### Description
<p>演武场上，弟子们正在操练。李少白走过一排兵器架，记录了N次观察：每次看到一件兵器，C代表剑，R代表刀，F代表枪。赵晴儿让他统计每种兵器出现了多少把，以及各自的占比。</p>

### Input
<p>第一行一个整数N。接下来N行，每行一个整数（数量）和一个字符（C/R/F），分别表示某次看到的兵器数量和类型。</p>

### Output
<p>第一行输出 Total: X weapons（总数量）。接下来三行输出每种兵器的总数：Total swords: X、Total blades: X、Total spears: X。最后三行输出各自占比：Percentage of swords: XX.XX % 等，保留两位小数。</p>

### Samples
**Sample Input 1**
```
11
1 F
5 C
4 C
12 C
11 F
15 F
2 F
7 C
1 C
4 C
9 F
```
**Sample Output 1**
```
Total: 71 weapons
Total swords: 33
Total blades: 0
Total spears: 38
Percentage of swords: 46.48 %
Percentage of blades: 0.00 %
Percentage of spears: 53.52 %
```

### Hint
<p><a href="https://www.acwing.com/problem/content/715/" target="_blank">原题链接</a></p><p>三个计数器分别累加C、R、F的数量。注意每行先读数量再读类型。总数 = 所有数量之和。占比 = 各类数量 / 总数 × 100%，保留两位小数。</p>

---

## [JD043] 正剑除邪

### Description
<p>练功房的石板上有10道剑气留下的痕迹，每道痕迹上刻着一个数。其中有些数带着邪气（负数或零），梁嘉峰让李少白运起纯阳内力，把这些不纯正的数全部净化，替换成1——象征正气归于一元。</p>

### Input
<p>一行，10个整数，用空格隔开。</p>

### Output
<p>替换后的10个数，每行格式为 `X[i] = 值`。</p>

### Samples
**Sample Input 1**
```
-73
27
-35
50
-67
86
39
-81
-7
31
```
**Sample Output 1**
```
X[0] = 1
X[1] = 27
X[2] = 1
X[3] = 50
X[4] = 1
X[5] = 86
X[6] = 39
X[7] = 1
X[8] = 1
X[9] = 31
```

### Hint
<p><a href="https://www.acwing.com/problem/content/739/" target="_blank">原题链接</a></p><p>遍历数组，将≤0的元素替换为1。</p>

---

## [JD044] 翻倍剑阵

### Description
<p>赵晴儿在沙盘上布下一个翻倍剑阵。她说：「以第一个数为起点，后面每个数都是前一个的两倍。内力如此，出剑亦是如此——一重更比一重强。」</p>

### Input
<p>一个整数V。</p>

### Output
<p>10行，格式为 `N[i] = X`。</p>

### Samples
**Sample Input 1**
```
6
```
**Sample Output 1**
```
N[0] = 6
N[1] = 12
N[2] = 24
N[3] = 48
N[4] = 96
N[5] = 192
N[6] = 384
N[7] = 768
N[8] = 1536
N[9] = 3072
```

### Hint
<p><a href="https://www.acwing.com/problem/content/740/" target="_blank">原题链接</a></p><p>N[0]=V，循环N[i]=N[i-1]*2。</p>

---

## [JD045] 剑中取精

### Description
<p>沙盘上散落着100把长剑，每把剑上刻着一个数，代表剑的品级。赵晴儿让李少白从中挑出品级不超过10的精良之剑，逐一记录。</p>

### Input
<p>100个浮点数。</p>

### Output
<p>按顺序输出所有≤10的元素，每行格式为 `A[i] = X`（保留一位小数）。</p>

### Samples
**Sample Input 1**
```
79.5
-35.1
65.0
-89.9
62.2
-30.0
-58.1
-74.0
85.7
66.4
-60.2
-32.1
11.4
34.6
0.2
96.3
-67.9
70.1
27.3
53.4
63.8
43.2
-68.2
-87.9
-13.3
62.1
-12.0
66.9
1.6
-70.3
-14.0
-84.8
19.6
-1.9
43.4
36.9
97.2
-88.6
52.2
-21.0
-54.1
-17.3
-11.7
-8.5
40.9
-21.6
-12.0
87.8
-92.9
45.3
-70.1
73.7
-23.2
87.3
-78.6
38.2
51.2
-21.0
3.9
88.4
28.3
-67.6
47.1
-49.1
73.6
39.5
28.0
-80.1
-41.4
43.2
-4.6
61.1
83.2
65.5
74.3
90.1
-80.2
39.6
-7.0
-34.4
43.1
-62.5
-25.3
61.0
68.5
9.0
10.3
45.9
-98.0
-34.8
88.3
-26.6
-48.1
20.5
-5.4
-76.7
79.7
-90.0
59.1
-18.7
```
**Sample Output 1**
```
A[1] = -35.1
A[3] = -89.9
A[5] = -30.0
A[6] = -58.1
A[7] = -74.0
A[10] = -60.2
A[11] = -32.1
A[14] = 0.2
A[16] = -67.9
A[22] = -68.2
A[23] = -87.9
A[24] = -13.3
A[26] = -12.0
A[28] = 1.6
A[29] = -70.3
A[30] = -14.0
A[31] = -84.8
A[33] = -1.9
A[37] = -88.6
A[39] = -21.0
A[40] = -54.1
A[41] = -17.3
A[42] = -11.7
A[43] = -8.5
A[45] = -21.6
A[46] = -12.0
A[48] = -92.9
A[50] = -70.1
A[52] = -23.2
A[54] = -78.6
A[57] = -21.0
A[58] = 3.9
A[61] = -67.6
A[63] = -49.1
A[67] = -80.1
A[68] = -41.4
A[70] = -4.6
A[76] = -80.2
A[78] = -7.0
A[79] = -34.4
A[81] = -62.5
A[82] = -25.3
A[85] = 9.0
A[88] = -98.0
A[89] = -34.8
A[91] = -26.6
A[92] = -48.1
A[94] = -5.4
A[95] = -76.7
A[97] = -90.0
A[99] = -18.7
```

### Hint
<p><a href="https://www.acwing.com/problem/content/741/" target="_blank">原题链接</a></p><p>遍历数组，if元素≤10则输出。</p>

---

## [JD046] 剑阵倒转

### Description
<p>沙盘上的剑阵需要倒转方向——第一把剑和最后一把交换，第二把和倒数第二把交换。梁嘉峰说：「攻守易位，前后颠倒。」</p>

### Input
<p>20个整数。</p>

### Output
<p>翻转后的20个数，每行格式为 `N[i] = X`。</p>

### Samples
**Sample Input 1**
```
-40
57
99
2
-20
25
-67
-76
70
98
-95
-92
-100
-100
-55
48
-55
54
1
-32
```
**Sample Output 1**
```
N[0] = -32
N[1] = 1
N[2] = 54
N[3] = -55
N[4] = 48
N[5] = -55
N[6] = -100
N[7] = -100
N[8] = -92
N[9] = -95
N[10] = 98
N[11] = 70
N[12] = -76
N[13] = -67
N[14] = 25
N[15] = -20
N[16] = 2
N[17] = 99
N[18] = 57
N[19] = -40
```

### Hint
<p><a href="https://www.acwing.com/problem/content/745/" target="_blank">原题链接</a></p><p>双指针从两端向中间交换。</p>

---

## [JD047] 剑锋所指

### Description
<p>练功场上一排木桩，每根木桩上刻着一个数。赵晴儿让他找到最矮的那根木桩——剑锋所向，以弱制动。找到最小值并说出它的位置（从0开始计数）。</p>

### Input
<p>第一行一个整数N。第二行N个整数。</p>

### Output
<p>第一行输出 <code>Menor valor: X</code>，第二行输出 <code>Posicao: P</code>，其中P为最小值的下标（从0开始计数）。若最小值出现多次，输出第一次出现的位置。</p>

### Samples
**Sample Input 1**
```
10
1 2 3 4 -5 6 7 8 9 10
```
**Sample Output 1**
```
Menor valor: -5
Posicao: 4
```

### Hint
<p><a href="https://www.acwing.com/problem/content/742/" target="_blank">原题链接</a></p><p>遍历时记录当前最小值和位置。注意位置从0开始计数。</p>

---

## [JD048] 二气相生

### Description
<p>赵晴儿在沙盘上画出两道气旋：「阴阳二气，交替相生。第一气为0，第二气为1，此后每气皆为前二气之和。只用两个变量，算出第N气。」其中F(0)=0，F(1)=1，F(N)=F(N-1)+F(N-2)。</p>

### Input
<p>一个整数N。</p>

### Output
<p>一个整数，即第N个斐波那契数F(N)。</p>

### Samples
**Sample Input 1**
```
4
```
**Sample Output 1**
```
3
```

### Hint
<p><a href="https://www.acwing.com/problem/content/743/" target="_blank">原题链接</a></p><p>两个变量滚动：a,b = b,a+b。</p>

---

## [JD049] 斐波剑诀

### Description
<p>赵晴儿展开一卷古剑谱，上面记载着斐波那契剑诀：0, 1, 1, 2, 3, 5, 8, 13……「每一式都是前两式的融合。T次问询，每次报出第N式。」</p>

### Input
<p>一个整数N。</p>

### Output
<p>一行，前N个斐波那契数，空格隔开。</p>

### Samples
**Sample Input 1**
```
5
```
**Sample Output 1**
```
0 1 1 2 3
```

### Hint
<p><a href="https://www.acwing.com/problem/content/744/" target="_blank">原题链接</a></p><p>预处理斐波那契数组到60，查询时直接取值。</p>

---

## [JD050] 列阵求和

### Description
<p>梁嘉峰在沙盘上画了一个数字阵列：「从M到N，全部列出来，再算和。如果M比N大，先交换。」李少白从M一路数到N，把每个数刻在石板上。</p>

### Input
<p>若干行，每行两个整数M和N。当M和N均为非正数（≤0）时结束输入。</p>

### Output
<p>对每组M和N，从小到大输出M到N之间的所有整数（空格隔开），最后输出 <code>Sum=X</code>（X为这些数的和）。每组输出占一行。</p>

### Samples
**Sample Input 1**
```
5 10
2 3
-1 -1
```
**Sample Output 1**
```
5 6 7 8 9 10 Sum=45
2 3 Sum=5
```

### Hint
<p><a href="https://www.acwing.com/problem/content/746/" target="_blank">原题链接</a></p><p>若M&gt;N则先交换。注意：结束条件为两个数均≤0（测试用例可能用0 0或-1 -1）。</p>

---

## [JD051] 剑行取道

### Description
<p>沙盘上一个12×12的剑阵，赵晴儿指着其中一行：「这一行的所有剑，力量之和是多少？或平均力量？」李少白逐格检视。</p>

### Input
<p>第一行一个整数L（0~11，表示行号）。第二行一个字符（S或M）。接下来12行，每行12个浮点数。</p>

### Output
<p>输出该行的和或平均值，保留一位小数。</p>

### Samples
**Sample Input 1**
```
1
M
94.2 65.35 7.41 -67.85 18.62 -72.49 -5.91 66.06 -20.35 -17.4 12.62 -63.04
...
```
**Sample Output 1**
```
17.3
```

### Hint
<p><a href="https://www.acwing.com/problem/content/719/" target="_blank">原题链接</a></p><p>遍历指定行，根据操作类型求和或求平均。</p>

---

## [JD052] 剑列纵横

### Description
<p>赵晴儿又指向剑阵的其中一列：「纵览此列，算其力量。」李少白沿着列的方向逐行检视。</p>

### Input
<p>第一行一个整数C（0~11，表示列号）。第二行一个字符（S或M）。接下来12行，每行12个浮点数。</p>

### Output
<p>输出该列的和或平均值，保留一位小数。</p>

### Samples
**Sample Input 1**
```
1
S
-29.7 94.5 43.8 3.7 68.1 19.9 23.4 -0.3 -85.3 57.3 89.7 36.0
...
```
**Sample Output 1**
```
199.5
```

### Hint
<p><a href="https://www.acwing.com/problem/content/724/" target="_blank">原题链接</a></p><p>遍历所有行取指定列元素。</p>

---

## [JD053] 完璧归宗

### Description
<p>赵晴儿在沙盘上写下「完璧」二字：「完璧之数，等于它的所有真因子之和。譬如6=1+2+3。找到不超过N的所有完璧之数，以印证归宗之意。」</p>

### Input
<p>一个整数N。</p>

### Output
<p>每行输出一个不超过N的完全数（从小到大）。</p>

### Samples
**Sample Input 1**
```
30
```
**Sample Output 1**
```
6
28
```

### Hint
<p><a href="https://www.acwing.com/problem/content/727/" target="_blank">原题链接</a></p><p>对每个数找所有真因子求和，等于自身则是完全数。注意优化：枚举因子只需到 sqrt(X)，利用约数成对出现的性质。1 不是完全数。</p>

---

## [JD054] 剑意之质

### Description
<p>梁嘉峰在沙盘上点出几枚剑棋：「天下剑法，有些可以拆分化简，有些不可再分，乃剑意之基石。这些不可拆分的棋位——只能被1和自己整除的数——就是剑意之质。排出2到N之间所有的剑意质数。」</p>

### Input
<p>一个整数N。</p>

### Output
<p>输出2到N之间所有的质数，每行一个。</p>

### Samples
**Sample Input 1**
```
10
```
**Sample Output 1**
```
2
3
5
7
```

### Hint
<p><a href="https://www.acwing.com/problem/content/728/" target="_blank">原题链接</a></p><p>对每个数从2到√n试除。</p>

---

## [JD055] 上方剑域

### Description
<p>李少白来到十二宫剑阵的第一宫——乾宫。地面是一幅 12×12 的方格阵，每个格子中浮现一个浮动的数字，那是剑阵积蓄的灵力值。</p><p>守护乾宫的剑灵凌空画出一道剑气光幕，说道：</p><blockquote><p>「此乃乾宫剑阵之<strong>上方剑域</strong>。两条对角线将方阵切为上下左右四块。上方区域位于两条对角线的<strong>上方交汇处</strong>——即行号小于列号（i &lt; j），且行号加列号之和小于 11（i + j &lt; 11）的格子。此处灵力承天位之力，主攻正前方。尔需计算此域所有灵力之和——或取其均值——方可破阵。」</p></blockquote><p>第一行输入一个大写字母：<strong>S</strong> 求和，<strong>M</strong> 求平均值。</p><p>接下来 12 行，每行 12 个浮点数，表示剑阵各格的灵力值。输出保留<strong>一位小数</strong>。</p>

### Input
<p>第一行一个大写字母S或M。接下来12行，每行12个浮点数。</p>

### Output
<p>输出对应区域的和或平均值，保留一位小数。</p>

### Samples
**Sample Input 1**
```
S
5.0 65.0 82.0 54.0 60.0 96.0 64.0 88.0 81.0 2.0 86.0 29.0
66.0 16.0 27.0 63.0 1.0 52.0 67.0 76.0 94.0 88.0 65.0 39.0
48.0 61.0 15.0 22.0 48.0 30.0 57.0 15.0 97.0 18.0 19.0 49.0
34.0 55.0 10.0 37.0 1.0 3.0 29.0 15.0 42.0 76.0 95.0 5.0
29.0 92.0 53.0 60.0 44.0 35.0 96.0 64.0 15.0 16.0 35.0 87.0
42.0 50.0 55.0 17.0 78.0 69.0 2.0 1.0 1.0 4.0 55.0 17.0
66.0 28.0 22.0 68.0 17.0 94.0 74.0 6.0 65.0 64.0 77.0 84.0
38.0 50.0 8.0 46.0 39.0 90.0 99.0 89.0 2.0 17.0 40.0 89.0
65.0 72.0 54.0 60.0 11.0 99.0 37.0 21.0 37.0 9.0 42.0 14.0
55.0 65.0 62.0 38.0 59.0 35.0 50.0 40.0 71.0 1.0 23.0 23.0
37.0 17.0 97.0 26.0 15.0 64.0 16.0 79.0 87.0 84.0 96.0 85.0
12.0 39.0 88.0 87.0 30.0 61.0 7.0 10.0 43.0 87.0 48.0 77.0

```
**Sample Output 1**
```
1594.0
```

### Hint
<p><a href="https://www.acwing.com/problem/content/747/" target="_blank">原题链接</a></p><p>先读操作类型（S求和/M求平均），再判断行号。上方区域即i

---

## [JD056] 下方剑域

### Description
<p>李少白来到十二宫剑阵的第二宫——坤宫。地面是一幅 12×12 的方格阵，每个格子中浮现一个浮动的数字，那是剑阵积蓄的灵力值。</p><p>守护坤宫的剑灵指向光幕下方，说道：</p><blockquote><p>「此乃坤宫剑阵之<strong>下方剑域</strong>。两条对角线将方阵切为上下左右四块。下方区域位于两条对角线的<strong>下方交汇处</strong>——即行号大于列号（i &gt; j），且行号加列号之和大于 11（i + j &gt; 11）的格子。此处灵力承地脉之气，势沉力猛。尔需计算此域所有灵力之和——或取其均值——方可破阵。」</p></blockquote><p>第一行输入一个大写字母：<strong>S</strong> 求和，<strong>M</strong> 求平均值。</p><p>接下来 12 行，每行 12 个浮点数，表示剑阵各格的灵力值。输出保留<strong>一位小数</strong>。</p>

### Input
<p>第一行一个大写字母S或M。接下来12行，每行12个浮点数。</p>

### Output
<p>输出对应区域的和或平均值，保留一位小数。</p>

### Samples
**Sample Input 1**
```
S
6.0 90.0 70.0 55.0 69.0 69.0 62.0 79.0 7.0 9.0 54.0 43.0
30.0 75.0 74.0 58.0 99.0 52.0 88.0 51.0 77.0 92.0 77.0 10.0
89.0 99.0 84.0 60.0 90.0 25.0 95.0 82.0 96.0 5.0 92.0 10.0
62.0 58.0 33.0 88.0 65.0 78.0 71.0 59.0 81.0 70.0 83.0 32.0
7.0 50.0 45.0 52.0 18.0 63.0 68.0 58.0 60.0 58.0 45.0 22.0
2.0 54.0 28.0 91.0 0.0 61.0 49.0 57.0 78.0 35.0 82.0 48.0
7.0 54.0 36.0 30.0 46.0 48.0 45.0 22.0 18.0 24.0 77.0 17.0
30.0 66.0 66.0 14.0 11.0 18.0 13.0 67.0 12.0 9.0 1.0 35.0
7.0 71.0 24.0 6.0 73.0 30.0 26.0 96.0 99.0 28.0 8.0 38.0
16.0 3.0 75.0 67.0 66.0 27.0 86.0 62.0 48.0 35.0 90.0 57.0
76.0 4.0 92.0 24.0 53.0 31.0 95.0 52.0 69.0 39.0 16.0 64.0
9.0 12.0 70.0 38.0 81.0 95.0 85.0 61.0 38.0 93.0 54.0 99.0

```
**Sample Output 1**
```
1694.0
```

### Hint
<p><a href="https://www.acwing.com/problem/content/749/" target="_blank">原题链接</a></p><p>下方区域即i&gt;j的元素。</p>

---

## [JD057] 左方剑域

### Description
<p>李少白来到十二宫剑阵的第三宫——震宫。地面是一幅 12×12 的方格阵，每个格子中浮现一个浮动的数字，那是剑阵积蓄的灵力值。</p><p>守护震宫的剑灵指向光幕左侧，说道：</p><blockquote><p>「此乃震宫剑阵之<strong>左方剑域</strong>。两条对角线将方阵切为上下左右四块。左方区域位于两条对角线的<strong>左侧交汇处</strong>——即行号大于列号（i &gt; j），且行号加列号之和小于 11（i + j &lt; 11）的格子。此处灵力守青龙之位，主防御。尔需计算此域所有灵力之和——或取其均值——方可破阵。」</p></blockquote><p>第一行输入一个大写字母：<strong>S</strong> 求和，<strong>M</strong> 求平均值。</p><p>接下来 12 行，每行 12 个浮点数，表示剑阵各格的灵力值。输出保留<strong>一位小数</strong>。</p>

### Input
<p>第一行一个大写字母S或M。接下来12行，每行12个浮点数。</p>

### Output
<p>输出对应区域的和或平均值，保留一位小数。</p>

### Samples
**Sample Input 1**
```
S
68.0 59.0 10.0 88.0 95.0 50.0 60.0 8.0 6.0 7.0 5.0 79.0
18.0 94.0 63.0 2.0 15.0 13.0 39.0 37.0 33.0 27.0 11.0 29.0
12.0 23.0 6.0 42.0 4.0 63.0 7.0 20.0 11.0 74.0 27.0 5.0
63.0 67.0 98.0 85.0 10.0 28.0 37.0 10.0 72.0 34.0 65.0 48.0
34.0 17.0 33.0 49.0 22.0 37.0 20.0 80.0 43.0 4.0 82.0 14.0
64.0 56.0 8.0 92.0 64.0 58.0 54.0 26.0 30.0 54.0 49.0 5.0
40.0 69.0 72.0 6.0 8.0 71.0 70.0 98.0 24.0 16.0 91.0 11.0
15.0 70.0 71.0 53.0 75.0 96.0 97.0 55.0 6.0 20.0 73.0 54.0
21.0 76.0 55.0 68.0 85.0 84.0 82.0 26.0 76.0 96.0 6.0 87.0
13.0 66.0 20.0 88.0 29.0 34.0 83.0 93.0 55.0 98.0 53.0 37.0
77.0 36.0 43.0 10.0 70.0 47.0 57.0 8.0 94.0 48.0 98.0 88.0
3.0 25.0 3.0 35.0 50.0 22.0 11.0 90.0 18.0 43.0 55.0 96.0

```
**Sample Output 1**
```
1410.0
```

### Hint
<p><a href="https://www.acwing.com/problem/content/751/" target="_blank">原题链接</a></p><p>左方区域即满足j &lt; i && i + j &lt; 11的元素（主对角线下且反对角线上）。</p>

---

## [JD058] 右方剑域

### Description
<p>李少白来到十二宫剑阵的第四宫——巽宫。地面是一幅 12×12 的方格阵，每个格子中浮现一个浮动的数字，那是剑阵积蓄的灵力值。</p><p>守护巽宫的剑灵指向光幕右侧，说道：</p><blockquote><p>「此乃巽宫剑阵之<strong>右方剑域</strong>。两条对角线将方阵切为上下左右四块。右方区域位于两条对角线的<strong>右侧交汇处</strong>——即行号小于列号（i &lt; j），且行号加列号之和大于 11（i + j &gt; 11）的格子。此处灵力据白虎之位，主进攻。尔需计算此域所有灵力之和——或取其均值——方可破阵。」</p></blockquote><p>第一行输入一个大写字母：<strong>S</strong> 求和，<strong>M</strong> 求平均值。</p><p>接下来 12 行，每行 12 个浮点数，表示剑阵各格的灵力值。输出保留<strong>一位小数</strong>。</p>

### Input
<p>第一行一个大写字母S或M。接下来12行，每行12个浮点数。</p>

### Output
<p>输出对应区域的和或平均值，保留一位小数。</p>

### Samples
**Sample Input 1**
```
S
69.0 84.0 98.0 42.0 4.0 23.0 58.0 99.0 32.0 14.0 26.0 40.0
29.0 6.0 10.0 50.0 60.0 13.0 7.0 59.0 16.0 31.0 23.0 0.0
0.0 61.0 75.0 80.0 46.0 58.0 45.0 34.0 10.0 61.0 53.0 66.0
91.0 70.0 21.0 36.0 74.0 50.0 79.0 54.0 11.0 28.0 0.0 75.0
59.0 75.0 25.0 41.0 49.0 65.0 39.0 21.0 88.0 46.0 39.0 2.0
77.0 60.0 34.0 66.0 33.0 3.0 48.0 82.0 7.0 32.0 29.0 89.0
81.0 95.0 33.0 68.0 37.0 25.0 41.0 14.0 77.0 23.0 38.0 44.0
7.0 86.0 82.0 68.0 47.0 24.0 11.0 33.0 16.0 12.0 87.0 53.0
63.0 28.0 72.0 61.0 47.0 15.0 24.0 54.0 85.0 15.0 72.0 11.0
74.0 51.0 80.0 17.0 36.0 26.0 19.0 15.0 32.0 32.0 20.0 18.0
69.0 23.0 38.0 8.0 8.0 61.0 89.0 28.0 76.0 56.0 18.0 67.0
0.0 98.0 32.0 39.0 48.0 56.0 89.0 94.0 66.0 49.0 61.0 65.0

```
**Sample Output 1**
```
1203.0
```

### Hint
<p><a href="https://www.acwing.com/problem/content/753/" target="_blank">原题链接</a></p><p>右方区域即满足j &gt; i && i + j &gt; 11的元素（主对角线上且反对角线下）。</p>

---

## [JD059] 右上剑角

### Description
<p>李少白来到十二宫剑阵的第五宫——离宫。地面是一幅 12×12 的方格阵，每个格子中浮现一个浮动的数字，那是剑阵积蓄的灵力值。</p><p>守护离宫的剑灵指向沙盘右上，说道：</p><blockquote><p>「此乃离宫剑阵之<strong>右上剑角</strong>。仅以主对角线为界——右上区域即所有行号小于列号（i &lt; j）的格子，主对角线右上方的那一半。此处为天乾之位，日升之处，剑势腾空而起。尔需计算此角所有灵力之和——或取其均值——方可破阵。」</p></blockquote><p>第一行输入一个大写字母：<strong>S</strong> 求和，<strong>M</strong> 求平均值。</p><p>接下来 12 行，每行 12 个浮点数，表示剑阵各格的灵力值。输出保留<strong>一位小数</strong>。</p>

### Input
<p>第一行一个大写字母S或M。接下来12行，每行12个浮点数。</p>

### Output
<p>输出右上半部分的和或平均值，保留一位小数。</p>

### Samples
**Sample Input 1**
```
S
86.0 26.0 52.0 44.0 73.0 60.0 63.0 26.0 54.0 1.0 35.0 0.0
60.0 49.0 95.0 82.0 59.0 59.0 69.0 19.0 72.0 79.0 82.0 75.0
86.0 23.0 26.0 13.0 5.0 99.0 13.0 84.0 28.0 26.0 60.0 23.0
8.0 33.0 66.0 62.0 50.0 31.0 12.0 14.0 14.0 58.0 89.0 63.0
19.0 52.0 47.0 35.0 96.0 22.0 22.0 28.0 83.0 36.0 30.0 83.0
20.0 51.0 45.0 44.0 60.0 44.0 81.0 59.0 77.0 90.0 12.0 69.0
59.0 59.0 40.0 6.0 98.0 29.0 60.0 44.0 68.0 60.0 84.0 31.0
54.0 52.0 34.0 42.0 71.0 29.0 91.0 33.0 99.0 46.0 26.0 72.0
22.0 1.0 96.0 41.0 17.0 26.0 65.0 86.0 2.0 93.0 44.0 12.0
80.0 73.0 61.0 22.0 17.0 65.0 25.0 79.0 51.0 59.0 31.0 13.0
11.0 83.0 99.0 19.0 0.0 72.0 47.0 57.0 26.0 12.0 87.0 97.0
59.0 19.0 31.0 59.0 91.0 98.0 70.0 98.0 83.0 12.0 72.0 2.0

```
**Sample Output 1**
```
3319.0
```

### Hint
<p><a href="https://www.acwing.com/problem/content/755/" target="_blank">原题链接</a></p><p>右上部分即j&gt;i的元素。S求和，M求平均。</p>

---

## [JD060] 左上剑角

### Description
<p>李少白来到十二宫剑阵的第六宫——坎宫。地面是一幅 12×12 的方格阵，每个格子中浮现一个浮动的数字，那是剑阵积蓄的灵力值。</p><p>守护坎宫的剑灵指向沙盘左上，说道：</p><blockquote><p>「此乃坎宫剑阵之<strong>左上剑角</strong>。仅以副对角线为界——左上区域即所有行号加列号之和小于 11（i + j &lt; 11）的格子，副对角线左上方的那一半。此处为天坤之位，月落之处，剑气如新月之弧。尔需计算此角所有灵力之和——或取其均值——方可破阵。」</p></blockquote><p>第一行输入一个大写字母：<strong>S</strong> 求和，<strong>M</strong> 求平均值。</p><p>接下来 12 行，每行 12 个浮点数，表示剑阵各格的灵力值。输出保留<strong>一位小数</strong>。</p>

### Input
<p>第一行一个大写字母S或M。接下来12行，每行12个浮点数。</p>

### Output
<p>输出对应区域的和或平均值，保留一位小数。</p>

### Samples
**Sample Input 1**
```
S
49.0 20.0 80.0 78.0 8.0 14.0 59.0 46.0 32.0 6.0 7.0 97.0
59.0 80.0 31.0 74.0 20.0 20.0 88.0 27.0 11.0 18.0 28.0 12.0
97.0 85.0 70.0 33.0 61.0 32.0 10.0 89.0 42.0 82.0 21.0 79.0
37.0 45.0 54.0 10.0 59.0 56.0 20.0 9.0 44.0 63.0 6.0 6.0
71.0 77.0 27.0 24.0 74.0 77.0 93.0 91.0 11.0 24.0 24.0 10.0
42.0 10.0 51.0 19.0 46.0 33.0 80.0 84.0 6.0 40.0 59.0 10.0
80.0 53.0 90.0 44.0 89.0 6.0 56.0 36.0 27.0 59.0 45.0 58.0
31.0 25.0 50.0 49.0 7.0 35.0 89.0 46.0 3.0 49.0 59.0 90.0
78.0 5.0 44.0 49.0 91.0 11.0 10.0 91.0 88.0 80.0 8.0 85.0
38.0 21.0 19.0 72.0 87.0 64.0 5.0 85.0 82.0 3.0 61.0 74.0
4.0 55.0 45.0 3.0 55.0 55.0 88.0 33.0 33.0 29.0 89.0 0.0
3.0 5.0 93.0 60.0 58.0 59.0 74.0 31.0 58.0 68.0 79.0 68.0

```
**Sample Output 1**
```
2981.0
```

### Hint
<p><a href="https://www.acwing.com/problem/content/750/" target="_blank">原题链接</a></p><p>左上部分即i+j&lt;11的元素。</p>

---

## [JD061] 右下剑角

### Description
<p>李少白来到十二宫剑阵的第七宫——艮宫。地面是一幅 12×12 的方格阵，每个格子中浮现一个浮动的数字，那是剑阵积蓄的灵力值。</p><p>守护艮宫的剑灵指向沙盘右下，说道：</p><blockquote><p>「此乃艮宫剑阵之<strong>右下剑角</strong>。仅以副对角线为界——右下区域即所有行号加列号之和大于 11（i + j &gt; 11）的格子，副对角线右下方的那一半。此处为地乾之位，日落之处，剑势如残阳下沉。尔需计算此角所有灵力之和——或取其均值——方可破阵。」</p></blockquote><p>第一行输入一个大写字母：<strong>S</strong> 求和，<strong>M</strong> 求平均值。</p><p>接下来 12 行，每行 12 个浮点数，表示剑阵各格的灵力值。输出保留<strong>一位小数</strong>。</p>

### Input
<p>第一行一个大写字母S或M。接下来12行，每行12个浮点数。</p>

### Output
<p>输出对应区域的和或平均值，保留一位小数。</p>

### Samples
**Sample Input 1**
```
S
80.0 49.0 14.0 87.0 99.0 61.0 17.0 39.0 57.0 46.0 63.0 43.0
79.0 19.0 8.0 27.0 77.0 77.0 97.0 82.0 52.0 14.0 85.0 36.0
61.0 75.0 96.0 20.0 78.0 6.0 1.0 72.0 15.0 46.0 23.0 98.0
57.0 87.0 10.0 39.0 94.0 28.0 8.0 22.0 15.0 7.0 43.0 46.0
50.0 0.0 85.0 21.0 62.0 6.0 73.0 79.0 51.0 82.0 4.0 15.0
58.0 36.0 69.0 41.0 28.0 30.0 98.0 7.0 73.0 35.0 41.0 72.0
12.0 72.0 36.0 54.0 11.0 47.0 6.0 38.0 53.0 26.0 55.0 10.0
76.0 20.0 87.0 0.0 39.0 6.0 17.0 88.0 4.0 56.0 35.0 52.0
48.0 10.0 75.0 90.0 25.0 7.0 83.0 33.0 74.0 1.0 27.0 39.0
94.0 54.0 59.0 20.0 26.0 76.0 73.0 3.0 33.0 41.0 77.0 35.0
43.0 13.0 0.0 56.0 43.0 18.0 60.0 47.0 49.0 58.0 12.0 58.0
74.0 40.0 93.0 89.0 94.0 20.0 77.0 48.0 88.0 34.0 40.0 14.0

```
**Sample Output 1**
```
2790.0
```

### Hint
<p><a href="https://www.acwing.com/problem/content/748/" target="_blank">原题链接</a></p><p>右下部分即满足i + j &gt; 11的元素（反对角线以下）。</p>

---

## [JD062] 左下剑角

### Description
<p>李少白来到十二宫剑阵的第六宫——坤宫。地面是一幅 12×12 的方格阵，每个格子中浮现一个浮动的数字，那是剑阵积蓄的灵力值。</p><p>守护坤宫的剑灵指向地面，说道：</p><blockquote><p>「此乃坤宫剑阵。从西北到东南，一条主对角线将方阵一分为二。对角线之<strong>左下方</strong>（即行号大于列号的格子），是为地坤之位。此处灵力如初月升空，自下而上，自左而右，渐次铺展。尔需计算此区域所有灵力之和——或取其均值——方可破阵。」</p></blockquote><p>具体来说：一个 12×12 的方阵，行号 i 和列号 j 均从 0 到 11（或从 1 到 12）。左下区域定义为所有满足 <strong>i &gt; j</strong>（行号严格大于列号）的格子，即主对角线以下的部分。如下图所示（绿色区域即为左下区域）：</p><pre style="font-family:monospace;background:#f5f5f5;padding:8px;line-height:1.3">     列0 列1 列2 ...      列11
行0   \  .   .   .   .   .
行1   绿  \  .   .   .   .
行2   绿  绿  \  .   .   .
 ...  绿  绿  绿  \  .   .
行11  绿  绿  绿  绿  绿  \
</pre><p>第一行输入一个大写字母：<strong>S</strong> 表示求左下区域所有灵力之和，<strong>M</strong> 表示求平均值。</p><p>接下来 12 行，每行 12 个浮点数，表示 12×12 剑阵中每个格子的灵力值。</p><p>输出所求的和或平均值，<strong>保留一位小数</strong>。</p>

### Input
<p>第一行一个大写字母S或M。接下来12行，每行12个浮点数。</p>

### Output
<p>输出对应区域的和或平均值，保留一位小数。</p>

### Samples
**Sample Input 1**
```
S
43.0 96.0 42.0 21.0 34.0 15.0 13.0 59.0 82.0 4.0 35.0 93.0
78.0 97.0 91.0 19.0 38.0 91.0 16.0 90.0 38.0 53.0 31.0 73.0
25.0 37.0 40.0 40.0 34.0 39.0 98.0 77.0 29.0 2.0 84.0 54.0
33.0 99.0 98.0 87.0 3.0 53.0 16.0 64.0 98.0 12.0 13.0 89.0
2.0 25.0 65.0 10.0 40.0 8.0 97.0 42.0 32.0 70.0 98.0 95.0
80.0 95.0 22.0 16.0 14.0 72.0 97.0 32.0 2.0 85.0 88.0 60.0
86.0 13.0 86.0 92.0 55.0 24.0 2.0 30.0 12.0 25.0 16.0 37.0
53.0 93.0 3.0 7.0 75.0 12.0 15.0 1.0 8.0 6.0 68.0 17.0
51.0 14.0 23.0 98.0 99.0 92.0 28.0 91.0 13.0 88.0 91.0 65.0
5.0 2.0 17.0 17.0 96.0 75.0 6.0 56.0 17.0 38.0 7.0 96.0
36.0 32.0 46.0 40.0 98.0 1.0 54.0 76.0 9.0 22.0 14.0 61.0
65.0 26.0 55.0 90.0 61.0 34.0 81.0 28.0 63.0 90.0 47.0 80.0

```
**Sample Output 1**
```
3154.0
```

### Hint
<p><a href="https://www.acwing.com/problem/content/752/" target="_blank">原题链接</a></p><p>左下部分即满足j &lt; i的元素（主对角线以下）。</p>

---

## [JD063] 方圆初阵

### Description
<p>「此乃方圆剑阵——最外圈剑气最淡，标记为1；往里一圈剑气渐浓，标记为2。」赵晴儿在沙盘上画出一圈圈剑芒，「到剑阵中心，剑气愈凝愈实。每一圈剑芒的强度，就是你离外界最远的那道剑气的距离。」</p>

### Input
<p>多行，每行一个整数N。N=0时结束。</p>

### Output
<p>每个N输出一个N阶矩阵，每个数字占3个字符宽度。每个矩阵后跟一个空行。</p>

### Samples
**Sample Input 1**
```
1
0
```
**Sample Output 1**
```
1
```

### Hint
<p><a href="https://www.acwing.com/problem/content/754/" target="_blank">原题链接</a></p><p>每个位置的值 = min(i+1, j+1, N-i, N-j)，即到四条边的最小距离。</p>

---

## [JD064] 镜像方阵

### Description
<p>「此阵以主对角线为镜——镜中剑影，左右互映。」赵晴儿落下第一柄长剑，「主对角线上的剑势最强，为1；往右上和左下方逐次递减，如剑光在水面的倒影越远越淡。」</p>

### Input
<p>多行，每行一个整数N。N=0时结束。</p>

### Output
<p>每个N输出一个N阶矩阵，每个数字占3个字符宽度。每个矩阵后跟一个空行。</p>

### Samples
**Sample Input 1**
```
1
0
```
**Sample Output 1**
```
1
```

### Hint
<p><a href="https://www.acwing.com/problem/content/756/" target="_blank">原题链接</a></p><p>M[i][j] = |i-j|+1。对角线为1，离对角线越远数越大。</p>

---

## [JD065] 倍增方阵

### Description
<p>「此阵每一格，剑气强度皆由剑气原点(0,0)倍增而来。」赵晴儿剑尖轻点沙盘，「位在(i,j)的剑势，强度为2的(i+j)次方。一生二，二生四，剑气倍增如潮水蔓延。」</p>

### Input
<p>多行，每行一个整数N（0≤N≤15）。N=0时结束。</p>

### Output
<p>每个N输出一个N阶矩阵，每行N个整数用空格隔开。每个矩阵后跟一个空行。</p>

### Samples
**Sample Input 1**
```
3 0
```
**Sample Output 1**
```
1 2 4 
2 4 8 
4 8 16
```

### Hint
<p><a href="https://www.acwing.com/problem/content/757/" target="_blank">原题链接</a></p><p>M[i][j] = 2^(i+j)。用位运算 1&lt;&lt;(i+j) 或 pow函数。</p>

---

## [JD066] 蛇形剑阵

### Description
<p>「剑阵蜿蜒如蛇，以身引气，气走周身。」赵晴儿在沙盘上画了一个n行m列的剑阵，「从左上角开始，依次填入从1到n×m的剑气。行到尽头便拐弯，似灵蛇折返。」</p>

### Input
<p>一行，两个整数n和m。</p>

### Output
<p>n行，每行m个整数用空格隔开。输出后跟一个空行。</p>

### Samples
**Sample Input 1**
```
3 3
```
**Sample Output 1**
```
1 2 3 
8 9 4 
7 6 5
```

### Hint
<p><a href="https://www.acwing.com/problem/content/758/" target="_blank">原题链接</a></p><p>模拟蛇形遍历：右→下→左→上循环。维护四个边界。</p>

---

## [JD067] 古卷测长

### Description
<p>梁嘉峰递给李少白一卷竹简：「上面刻着一行字，告诉我它有多长。」</p>

### Input
<p>一行字符串（长度不超过100），可能包含空格。</p>

### Output
<p>输出字符串的实际长度。</p>

### Samples
**Sample Input 1**
```
Hello World
```
**Sample Output 1**
```
11
```

### Hint
<p><a href="https://www.acwing.com/problem/content/762/" target="_blank">原题链接</a></p><p>读入一行字符串（含空格），输出其长度。</p>

---

## [JD068] 密文留白

### Description
<p>古卷上的字太密了，赵晴儿让李少白在每个字符后面加一个空格，方便辨认。</p>

### Input
<p>一行字符串（长度不超过100）。</p>

### Output
<p>每个字符后加一个空格输出（最后一个字符后也有空格）。</p>

### Samples
**Sample Input 1**
```
abc
```
**Sample Output 1**
```
a b c
```

### Hint
<p><a href="https://www.acwing.com/problem/content/767/" target="_blank">原题链接</a></p><p>遍历字符串，每个字符后输出一个空格。</p>

---

## [JD069] 墨迹遮字

### Description
<p>古卷上有些字被墨迹遮住了，需要替换成&#039;#&#039;，露出可辨认的文字。</p>

### Input
<p>一行字符串（长度不超过100，全大写）。第二行一个字符，表示要替换的字符。</p>

### Output
<p>替换后的字符串。</p>

### Samples
**Sample Input 1**
```
hello
o
world
l
abc
x
test
e
hello
a
h
e
```
**Sample Output 1**
```
hell#
```

### Hint
<p><a href="https://www.acwing.com/problem/content/771/" target="_blank">原题链接</a></p><p>遍历字符串，遇到目标字符输出&#039;#&#039;，否则输出原字符。</p>

---

## [JD070] 经文重构

### Description
<p>赵晴儿递给李少白一段经文a，让他按规则重新构造一段经文b：每个位置b[i]的ASCII值等于a[i]和a[i+1]的ASCII值之和。</p>

### Input
<p>一行字符串a（长度3~100）。</p>

### Output
<p>构造后的字符串b。</p>

### Samples
**Sample Input 1**
```
=-9+=.3'<<-!!'+5.</=+/3672?96,7'<%5 //>$#:)6*(6.(;7>*)>35#5.72#/44;/)0#864"!51$1=00*:$&'
```
**Sample Output 1**
```
jfdhkaZcxiNBHR`cjklhZbimiqxobc^caZUO^mbG]c_`R^dVcruhSgqhXXceiURchojXYS[njVCVfUUnm`Zd^JMd
```

### Hint
<p><a href="https://www.acwing.com/problem/content/766/" target="_blank">原题链接</a></p><p>遍历a，b[i] = chr(ord(a[i]) + ord(a[i+1]))。最后一个用a[-1]和a[0]。</p>

---

## [JD071] 密文数符

### Description
<p>赵晴儿递给李少白一行密文，里面混着文字和数字。她说：「数一数有几个数字字符。」</p>

### Input
<p>一行字符（长度不超过100）。</p>

### Output
<p>输出其中数字字符（&#039;0&#039;~&#039;9&#039;）的个数。</p>

### Samples
**Sample Input 1**
```
hello2024world
```
**Sample Output 1**
```
4
```

### Hint
<p><a href="https://www.acwing.com/problem/content/763/" target="_blank">原题链接</a></p><p>遍历字符串，判断每个字符是否在&#039;0&#039;到&#039;9&#039;之间。</p>

---

## [JD072] 拳掌对决

### Description
<p>李少白和师弟在练功间隙玩猜拳游戏。每人出 Scissors（剪刀）、Rock（石头）或 Paper（布），按照相克规则判断胜负：Rock 胜 Scissors，Scissors 胜 Paper，Paper 胜 Rock。</p>

### Input
<p>一行，两个字符串，分别表示 Player1 和 Player2 出的拳（Scissors、Rock 或 Paper）。</p>

### Output
<p>输出结果：Player1 赢输出 <code>Player1</code>，Player2 赢输出 <code>Player2</code>，平局输出 <code>Tie</code>。</p>

### Samples
**Sample Input 1**
```
Scissors Rock
```
**Sample Output 1**
```
Player2
```

### Hint
<p>先判断双方是否相等（平局）。否则按相克规则判断：Rock 胜 Scissors，Scissors 胜 Paper，Paper 胜 Rock，构成一个循环克制链。</p><p><a href="https://www.acwing.com/problem/content/765/" target="_blank">原题链接</a></p>

---

## [JD073] 经文加密

### Description
<p>古卷需要加密保存。加密规则：每个字母后移一位（z→a），每个数字后移一位（9→0），其他字符不变。</p>

### Input
<p>一行字符串（长度不超过100）。</p>

### Output
<p>加密后的字符串。</p>

### Samples
**Sample Input 1**
```
Hello, World!
```
**Sample Output 1**
```
Ifmmp, Xpsme!
```

### Hint
<p><a href="https://www.acwing.com/problem/content/769/" target="_blank">原题链接</a></p><p>遍历字符串，对字母、数字分别做+1循环偏移，其他字符原样输出。</p>

---

## [JD074] 古卷替换

### Description
<p>古卷上的某个词需要全部替换成另一个词。赵晴儿让李少白逐词核对。</p>

### Input
<p>三行：第一行原文字符串，第二行要替换的词A，第三行替换成的词B。</p>

### Output
<p>替换后的字符串。</p>

### Samples
**Sample Input 1**
```
first late system see school still great different year Place far take same
life
group
```
**Sample Output 1**
```
first late system see school still great different year Place far take same
```

### Hint
<p><a href="https://www.acwing.com/problem/content/764/" target="_blank">原题链接</a></p><p>字符串替换函数，或按空格分割单词逐个比较替换。</p>

---

## [JD075] 寻最长词

### Description
<p>赵晴儿指着古卷上的一句话：「找出最长的那个词。」</p>

### Input
<p>一行，以&#039;.&#039;结尾的英文句子（长度不超过500）。</p>

### Output
<p>最长的单词。</p>

### Samples
**Sample Input 1**
```
I am a student of Peking University.
```
**Sample Output 1**
```
University
```

### Hint
<p><a href="https://www.acwing.com/problem/content/769/" target="_blank">原题链接</a></p><p>按空格分割单词（去掉末尾的&#039;.&#039;），遍历比较长度。</p>

---

## [JD076] 古卷插字

### Description
<p>梁嘉峰递给李少白两段古卷残篇，要把后一段插到前一段ASCII码最大的字符后面。</p>

### Input
<p>两行，第一行一个字符串str，第二行一个字符串substr。</p>

### Output
<p>每行输出插入后的字符串。</p>

### Samples
**Sample Input 1**
```
hello
X
```
**Sample Output 1**
```
helloX
```

### Hint
<p><a href="https://www.acwing.com/problem/content/775/" target="_blank">原题链接</a></p><p>找到str中ASCII码最大的字符（若有多个取最后一个），在其后面插入substr。</p>

---

## [JD077] 独字寻踪

### Description
<p>古卷上有些字重复出现，有些只出现一次。赵晴儿让李少白找到第一个只出现一次的字符。</p>

### Input
<p>一行只包含小写字母的字符串。</p>

### Output
<p>第一个只出现一次的字符，或&quot;no&quot;。</p>

### Samples
**Sample Input 1**
```
abaccdeff
```
**Sample Output 1**
```
b
```

### Hint
<p><a href="https://www.acwing.com/problem/content/772/" target="_blank">原题链接</a></p><p>先统计每个字符出现次数，再从头遍历找第一个次数为1的。</p>

---

## [JD078] 两卷对校

### Description
<p>赵晴儿拿着两卷古卷：「看看第二段经文是不是第一段中的一部分——如果是，就算对上了。」</p>

### Input
<p>第一行字符串a。第二行字符串b。</p>

### Output
<p>b是a的子串输出yes，否则输出no。</p>

### Samples
**Sample Input 1**
```
abc
d
```
**Sample Output 1**
```
no
```

### Hint
<p><a href="https://www.acwing.com/problem/content/778/" target="_blank">原题链接</a></p><p>遍历a的每个位置，用strncmp比较是否与b匹配。</p>

---

## [JD079] 经文周期

### Description
<p>赵晴儿指着一篇重复的经文：「这段文字是某个子串重复几次写成的？找出最小的重复次数。」</p>

### Input
<p>一行字符串。</p>

### Output
<p>对于每个输入的字符串（遇到&quot;.&quot;为止），输出一行一个整数n，表示该字符串最多由n个子串重复构成。</p>

### Samples
**Sample Input 1**
```
abcd
aaaa
ababab
.
```
**Sample Output 1**
```
1
4
3
```

### Hint
<p><a href="https://www.acwing.com/problem/content/806/" target="_blank">原题链接</a></p><p>枚举周期p（p是len的因子），检查s[0:p]重复len/p次是否等于原串。</p>

---

## [JD080] 密文跨距

### Description
<p>梁嘉峰递给李少白一长段密文和两个短码S1、S2：「S1在左，S2在右，不交叉。最大间距是多少？」</p>

### Input
<p>一行，三个字符串用逗号隔开：S,S1,S2。</p>

### Output
<p>最大跨距。不满足条件输出-1。</p>

### Samples
**Sample Input 1**
```
abcd123dABdefghjsdef76ki,ab,ef
```
**Sample Output 1**
```
16
```

### Hint
<p><a href="https://www.acwing.com/problem/content/780/" target="_blank">原题链接</a></p><p>从左往右找S1最后出现的位置end1，从右往左找S2最后出现的位置start2。如果end1

---

## [JD081] 初窥阶乘

### Description
<p>李少白在丹房帮赵晴儿炼丹。丹方上写着：&quot;取n味药材，第一味放1份，第二味放2份，第三味放3份……第n味放n份。&quot;</p><p>赵晴儿问：&quot;n味药材总共需要多少份？&quot;</p><p>李少白拿出笔从头算：1×2×3×……×n。赵晴儿摇头：&quot;每次都要从头算，太慢了。把它封装成一个函数，以后直接调用。&quot;</p><p>请帮李少白编写一个函数，计算n的阶乘（n!）。</p>

### Input
<p>一个整数n（0 ≤ n ≤ 10）。</p>

### Output
<p>输出n的阶乘。</p>

### Samples
**Sample Input 1**
```
3
```
**Sample Output 1**
```
6
```

### Hint
<p><a href="https://www.acwing.com/problem/content/810/" target="_blank">原题链接</a></p><p>函数内用循环累乘，或递归实现。</p>

---

## [JD082] 比剑取大

### Description
<p>兵器库里，赵晴儿和李少白各自挑了一柄剑。赵晴儿的剑重x斤，李少白的剑重y斤。</p><p>赵晴儿说：&quot;我们总要比谁的剑更重，每次都手算太麻烦。写一个函数，传入两个数，返回较大的那个。以后比试直接调用就行。&quot;</p><p>请帮他们实现这个函数。</p>

### Input
<p>一行，两个整数x和y。</p>

### Output
<p>输出最大值。</p>

### Samples
**Sample Input 1**
```
3 5
```
**Sample Output 1**
```
5
```

### Hint
<p><a href="https://www.acwing.com/problem/content/807/" target="_blank">原题链接</a></p><p>函数内用 if 比较或三元表达式。</p>

---

## [JD083] 剑气归正

### Description
<p>李少白在练剑气外放时，需要计算剑气落点与自己的距离。距离本该是正数，但有时算出的结果是负数——因为方向搞反了。</p><p>赵晴儿说：&quot;别每次遇到负数就手动取反，写一个函数，不管传入正数还是负数，都返回它的绝对值。&quot;</p>

### Input
<p>一个整数x。</p>

### Output
<p>输出x的绝对值。</p>

### Samples
**Sample Input 1**
```
-5
```
**Sample Output 1**
```
5
```

### Hint
<p><a href="https://www.acwing.com/problem/content/812/" target="_blank">原题链接</a></p><p>if x &lt; 0: return -x, else: return x。</p>

---

## [JD084] 双剑互易

### Description
<p>梁嘉峰在教李少白一套双剑术。左右手各持一剑，攻守之间需要不断交换位置。</p><p>&quot;实战中你不能把剑放到地上再捡起来，&quot;梁嘉峰说，&quot;直接交换。写一个函数，传入两个变量的引用，在函数内部交换它们的值。&quot;</p><p>李少白提笔写下函数签名，却犯了难——C++里普通参数只传值，改不了外面的变量。</p>

### Input
<p>一行，两个整数x和y。</p>

### Output
<p>交换后的x和y。</p>

### Samples
**Sample Input 1**
```
6 26
```
**Sample Output 1**
```
26 6
```

### Hint
<p><a href="https://www.acwing.com/problem/content/813/" target="_blank">原题链接</a></p><p>C++用引用参数 `void swap(int &x, int &y)`。Python中 a, b = b, a。</p>

---

## [JD085] 辗转相除

### Description
<p>赵晴儿在药圃里采了a株紫芝和b株青蒿，要把它们扎成相同大小的药束，每束株数相同且不能有剩余。</p><p>&quot;这其实就是求a和b的最大公约数，&quot;赵晴儿说，&quot;古人有个妙法叫辗转相除——用大数除以小数取余，再用小数除以余数，反复如此，直到余数为零。最后一个非零余数就是答案。&quot;</p><p>请帮赵晴儿写一个函数，用辗转相除法求两个正整数的最大公约数。</p>

### Input
<p>一行，两个正整数a和b。</p>

### Output
<p>输出a和b的最大公约数。</p>

### Samples
**Sample Input 1**
```
963 787
```
**Sample Output 1**
```
1
```

### Hint
<p><a href="https://www.acwing.com/problem/content/821/" target="_blank">原题链接</a></p><p>辗转相除法：gcd(a,b) = gcd(b, a%b)，当b==0时返回a。</p>

---

## [JD086] 剑阵复制

### Description
<p>赵晴儿在沙盘上摆了一个剑阵（数组a），需要原样复制一份到另一个沙盘（数组b）上。</p><p>&quot;手抄太慢，&quot;赵晴儿说，&quot;写一个函数，把a的前size个元素复制到b对应的位置上。&quot;</p><p>李少白接过两个沙盘，发现b上原来也有数字，只需覆盖前size个位置，其余保持不变。</p>

### Input
<p>第一行两个整数n和size（数组长度和复制个数）。第二行n个整数。</p>

### Output
<p>复制后的数组，空格隔开。</p>

### Samples
**Sample Input 1**
```
3 5 2
1 2 3
4 5 6 7 8
```
**Sample Output 1**
```
1 2 6 7 8
```

### Hint
<p><a href="https://www.acwing.com/problem/content/816/" target="_blank">原题链接</a></p><p>函数内循环，b[i] = a[i]，复制前size个元素。</p>

---

## [JD087] 剑阵翻转

### Description
<p>梁嘉峰在沙盘上摆了一排石块，每块上刻着一个数字。他指着前size块说：&quot;剑阵需要反转——把第一个和最后一个交换，第二个和倒数第二个交换，依此类推。后面的石块不动。&quot;</p><p>请帮李少白写一个函数，将数组的前size个元素原地翻转。</p>

### Input
<p>第一行两个整数n和size。第二行n个整数。</p>

### Output
<p>翻转前size个元素后的数组，空格隔开。</p>

### Samples
**Sample Input 1**
```
5 3
1 2 3 4 5
```
**Sample Output 1**
```
3 2 1 4 5
```

### Hint
<p><a href="https://www.acwing.com/problem/content/818/" target="_blank">原题链接</a></p><p>双指针从两端向中间交换，只交换前size个。</p>

---

## [JD088] 印数成招

### Description
<p>宗门兵器库盘点时，赵晴儿需要把清单上的前几件兵器名称逐一打印出来。清单上有n件兵器，但她只需要前size件。</p><p>&quot;每次都手动抄写太蠢了，&quot;赵晴儿说，&quot;写一个函数，传入数组和size，把前size个元素打印出来。&quot;</p>

### Input
<p>第一行两个整数n和size（数组长度和待打印个数，size ≤ n）。第二行n个整数。</p>

### Output
<p>输出数组的前size个元素，空格隔开，末尾换行。</p>

### Samples
**Sample Input 1**
```
5 3
1 2 3 4 5
```
**Sample Output 1**
```
1 2 3
```

### Hint
<p><a href="https://www.acwing.com/problem/content/814/" target="_blank">原题链接</a></p><p>函数内遍历数组前size个元素，空格隔开输出。</p>

---

## [JD089] 印阵成招

### Description
<p>赵晴儿在沙盘上画了一个row行col列的剑阵图，每个格子标着一个数字。她需要把这个阵图工整地抄录到竹简上。</p><p>&quot;写一个函数，&quot;赵晴儿说，&quot;传入二维数组和行列数，按格式逐行打印。每行的数字用空格隔开，数字之间用空格隔开。&quot;</p>

### Input
<p>第一行两个整数row和col。接下来row行，每行col个整数。</p>

### Output
<p>矩阵元素，每行末尾无多余空格。</p>

### Samples
**Sample Input 1**
```
3 4
1 3 4 5
2 6 9 4
1 4 7 5
```
**Sample Output 1**
```
1 3 4 5
2 6 9 4
1 4 7 5
```

### Hint
<p><a href="https://www.acwing.com/problem/content/815/" target="_blank">原题链接</a></p><p>嵌套循环遍历行列，注意行末空格处理。</p>

---

## [JD090] 剑阵排序

### Description
<p>赵晴儿拿着一份兵器清单来找李少白：&quot;这份清单前半段乱得很，从第l件到第r件需要按重量从小到大排好，后面的顺序不变。&quot;</p><p>李少白接过清单，发现上面有n件兵器的重量。他想写一个通用的排序函数，只排a[l]到a[r]这一段，其余位置原封不动。</p>

### Input
<p>第一行三个整数n、l和r（数组长度、排序区间左端点和右端点，0 ≤ l ≤ r &lt; n）。第二行n个整数。</p>

### Output
<p>排序后的数组，空格隔开。</p>

### Samples
**Sample Input 1**
```
5 1 3
5 3 1 4 2
```
**Sample Output 1**
```
5 1 3 4 2
```

### Hint
<p><a href="https://www.acwing.com/problem/content/820/" target="_blank">原题链接</a></p><p>对a[l]到a[r]排序，其余元素不变。可用冒泡、选择或库函数。</p>

---

## [JD091] 递归阶乘

### Description
<p>李少白在丹房翻到一本古籍，上面记载着一种&quot;以丹炼丹&quot;的奇术——要炼n味丹药，先炼好n-1味；要炼n-1味，先炼好n-2味……直到只剩1味，直接炼成。</p><p>赵晴儿看了笑道：&quot;这就是递归。一个函数调用自己，层层深入，直到触底再层层返回。阶乘的定义本身就是递归的——fact(n) = n × fact(n-1)，fact(1) = 1。&quot;</p><p>&quot;用递归重新实现阶乘函数。&quot;</p>

### Input
<p>一个整数n。</p>

### Output
<p>输出n的阶乘。</p>

### Samples
**Sample Input 1**
```
5
```
**Sample Output 1**
```
120
```

### Hint
<p><a href="https://www.acwing.com/problem/content/16/" target="_blank">原题链接</a></p><p>递归三要素：终止条件(n==1返回1)、递推关系(n*fact(n-1))、缩小规模。</p>

---

## [JD092] 递归斐波

### Description
<p>赵晴儿在沙盘上画出一串数字：1, 1, 2, 3, 5, 8, 13……</p><p>&quot;看出规律了吗？&quot;她问。</p><p>李少白看了半天：&quot;每个数都是前两个数的和！&quot;</p><p>&quot;对，这就是斐波那契数列。&quot;赵晴儿说，&quot;用递归来写——f(1)=1, f(2)=1, f(n)=f(n-1)+f(n-2)。不过提醒你，朴素递归效率很低，后面会学到优化的方法。&quot;</p>

### Input
<p>一个整数n。</p>

### Output
<p>输出斐波那契数列第n项。</p>

### Samples
**Sample Input 1**
```
4
```
**Sample Output 1**
```
3
```

### Hint
<p><a href="https://www.acwing.com/problem/content/822/" target="_blank">原题链接</a></p><p>递归：f(1)=1, f(2)=1, f(n)=f(n-1)+f(n-2)。注意效率问题。</p>

---

## [JD093] 登阶问道

### Description
<p>试炼场尽头，一座石阶直通山顶。石阶共有n级，每次只能跨1级或2级。</p><p>赵晴儿站在山脚问：&quot;从第一级走到第n级，一共有多少种不同的走法？&quot;</p><p>李少白想了想：&quot;如果我最后一步跨1级，那之前有f(n-1)种走法；如果最后一步跨2级，那之前有f(n-2)种走法……&quot;</p><p>&quot;没错，&quot;赵晴儿点头，&quot;这就是递归。&quot;</p>

### Input
<p>一个整数n（1 ≤ n ≤ 20）。</p>

### Output
<p>输出跳法总数。</p>

### Samples
**Sample Input 1**
```
5
```
**Sample Output 1**
```
8
```

### Hint
<p><a href="https://www.acwing.com/problem/content/823/" target="_blank">原题链接</a></p><p>f(n) = f(n-1) + f(n-2)。最后一步跳1级或2级，两种情况之和。</p>

---

## [JD094] 方阵寻路

### Description
<p>赵晴儿在沙盘上画了一个(n+1)×(m+1)的方格阵，每个格子标着坐标。</p><p>&quot;假设你站在左上角(0,0)，&quot;赵晴儿指着沙盘说，&quot;目标是走到右下角(n,m)。每次只能向右走一步，或者向下走一步。一共有多少种不同的路径？&quot;</p><p>李少白盯着沙盘看了一会儿：&quot;走到(n,m)之前，一定是从(n-1,m)或(n,m-1)过来的……&quot;</p><p>&quot;很好，又是一个递归。&quot;</p>

### Input
<p>一行，两个整数n和m（目标坐标，0 ≤ n,m ≤ 20）。</p>

### Output
<p>输出走法总数。</p>

### Samples
**Sample Input 1**
```
2 3
```
**Sample Output 1**
```
10
```

### Hint
<p><a href="https://www.acwing.com/problem/content/824/" target="_blank">原题链接</a></p><p>从(0,0)到(n,m)的网格路径数。f(n,m) = f(n-1,m) + f(n,m-1)。边界：f(0,m)=1, f(n,0)=1。等价于组合数C(n+m, n)。</p>

---

## [JD095] 全排列阵

### Description
<p>梁嘉峰递给李少白n枚令牌，上面分别刻着1到n。</p><p>&quot;把它们排成一列，列出所有可能的排列顺序。&quot;梁嘉峰说，&quot;按字典序从小到大输出。&quot;</p><p>李少白开始手动枚举，很快就乱了套。赵晴儿在旁边提醒：&quot;用递归的思路——每次选一个没用过的令牌放到当前位置，然后递归处理剩下的位置。选完之后要&#039;回退&#039;，把令牌放回去，才能尝试下一个选择。这就是回溯。&quot;</p>

### Input
<p>一个整数n（1 ≤ n ≤ 9）。</p>

### Output
<p>每行一个排列，数字之间用空格隔开。</p>

### Samples
**Sample Input 1**
```
3
```
**Sample Output 1**
```
1 2 3
1 3 2
2 1 3
2 3 1
3 1 2
3 2 1
```

### Hint
<p><a href="https://www.acwing.com/problem/content/825/" target="_blank">原题链接</a></p><p>DFS+回溯：用used[]标记已用数字，path[]记录当前排列。</p>

---

## [JD096] 空格替换

### Description
<p>兵器阁的大门上刻着一行古文，但年代久远，字迹模糊，空格处尤其难以辨认。赵晴儿凑近看了看：&quot;这行字里夹了太多空格，密密麻麻的，根本看不清。&quot;</p><p>梁嘉峰说：&quot;古卷传输时，空格容易丢失。古人想了个办法——把每个空格替换成%20，这样既保留了间隔，又不会和真正的空白混淆。&quot;</p><p>&quot;你写一段程序，把这行古文里的所有空格替换成%20。&quot;</p>

### Input
<p>一行字符串（长度不超过100）。</p>

### Output
<p>替换空格为%20后的字符串。</p>

### Samples
**Sample Input 1**
```
Hello World
```
**Sample Output 1**
```
Hello%20World
```

### Hint
<p><a href="https://www.acwing.com/problem/content/36/" target="_blank">原题链接</a></p><p>遍历字符串，遇到空格输出%20，否则输出原字符。</p>

---

## [JD097] 再算斐波

### Description
<p>赵晴儿在兵器阁的账本上翻到一串奇怪的数字：1, 1, 2, 3, 5, 8, 13, 21……</p><p>&quot;这是前辈铸剑师留下的排列规律，&quot;梁嘉峰说，&quot;每一柄新剑的重量都是前两柄之和。第1柄和第2柄都是1斤，第3柄就是1+1=2斤，第4柄是1+2=3斤……&quot;</p><p>&quot;上一章你用递归算过这个数列，但递归太慢了。这次用容器来存——把每一项都推进一个序列里，只保留最近两项，循环推进。&quot;</p><p>请帮赵晴儿算出第n柄剑的重量。</p>

### Input
<p>一个整数n（0 ≤ n ≤ 90）。</p>

### Output
<p>输出斐波那契数列第n项。</p>

### Samples
**Sample Input 1**
```
10
```
**Sample Output 1**
```
55
```

### Hint
<p><a href="https://www.acwing.com/problem/content/21/" target="_blank">原题链接</a></p><p>两个变量a,b滚动：a,b = b,a+b。循环n次。</p>

---

## [JD098] 倒转铁链

### Description
<p>兵器阁的架子上挂着一串铁环，每个环上刻着一个数字，从头到尾依次是1、2、3……最后一个环上刻着-1，表示链条结束。</p><p>梁嘉峰指着铁链说：&quot;我要从最后一个环开始，把数字一个个报出来。但这串铁环只能从前往后读，不能直接跳到末尾。&quot;</p><p>赵晴儿想了想：&quot;用一个容器——先把所有数字存进去，再从后往前取出来。这就像把铁环一个个摘下来放到盒子里，最后从盒子里倒着取。&quot;</p>

### Input
<p>一行整数，以-1结尾，表示链表的节点值（-1不算节点）。</p>

### Output
<p>从尾到头输出每个节点的值，每行一个。</p>

### Samples
**Sample Input 1**
```
1 2 3 -1
```
**Sample Output 1**
```
3
2
1
```

### Hint
<p><a href="https://www.acwing.com/problem/content/17/" target="_blank">原题链接</a></p><p>用栈存储所有节点值，然后依次弹出。或者用递归。</p>

---

## [JD099] 双栈为队

### Description
<p>赵晴儿在兵器阁里找到两个铁盒，每个盒子只能从顶部放入和取出——这就是&quot;栈&quot;，后进先出。</p><p>梁嘉峰说：&quot;现在我需要一个&#039;队列&#039;——先进先出。但手边只有这两个栈，没有队列。你能用这两个栈模拟一个队列吗？&quot;</p><p>赵晴儿思索片刻：&quot;入队的时候都放进盒子1。出队的时候，如果盒子2是空的，就把盒子1的东西全部倒进盒子2——这样顺序就反过来了，最先进来的变成了盒子2的顶部，直接取就行。&quot;</p><p>请帮赵晴儿实现这个&quot;双栈模拟队列&quot;的操作。</p>

### Input
<p>若干操作命令：`push x`（入队）、`pop`（出队并输出）、`empty`（判空）。</p>

### Output
<p>对pop操作输出队首值，empty操作输出`yes`或`no`。</p>

### Samples
**Sample Input 1**
```
push 1
push 2
pop
push 3
pop
pop
empty
```
**Sample Output 1**
```
1
2
3
yes
```

### Hint
<p><a href="https://www.acwing.com/problem/content/20/" target="_blank">原题链接</a></p><p>栈1入队，栈2出队。出队时栈2空就把栈1全部倒入栈2。</p>

---

## [JD100] 铁链翻转

### Description
<p>梁嘉峰从架子上取下一条铁链，每个环上刻着一个数字。他把铁链平铺在桌上，从头到尾是1、2、3、4、5……最后一个环上刻着-1，表示结束。</p><p>&quot;我要把这条铁链反过来，&quot;梁嘉峰说，&quot;第一个变最后一个，最后一个变第一个。但不能断开重接，只能用容器来辅助。&quot;</p><p>赵晴儿拿起一个铁盒：&quot;把铁环一个个摘下来放进盒子里——先进去的沉到底部。等全部摘完，再从盒子里取出来，顺序就反了。&quot;</p>

### Input
<p>一行整数，以-1结尾，表示链表节点值。</p>

### Output
<p>反转后的链表，空格隔开。</p>

### Samples
**Sample Input 1**
```
1 2 3 4 5 -1
```
**Sample Output 1**
```
5 4 3 2 1
```

### Hint
<p><a href="https://www.acwing.com/problem/content/35/" target="_blank">原题链接</a></p><p>三指针法：prev=None, curr=head。循环：next=curr.next, curr.next=prev, prev=curr, curr=next。</p>

---

## [JD101] 双链归并

### Description
<p>赵晴儿从兵器阁的两个抽屉里各取出一条铁链，每条链上的数字都从小到大排好了。她需要把两条链合并成一条，仍然保持从小到大的顺序。</p><p>&quot;不能拆开重排，&quot;梁嘉峰说，&quot;两条链都是有序的，你要利用这个特点——从两条链的头部同时开始比较，每次取较小的那个接到结果链的末尾。&quot;</p><p>赵晴儿拿起两个容器：&quot;用一个容器存结果。两个指针分别指向两条链的头部，谁小就取谁，直到一条链取完，再把另一条的剩余全部接上。&quot;</p>

### Input
<p>两行，每行若干整数（以-1结尾），分别表示两个有序链表。</p>

### Output
<p>合并后的有序链表，空格隔开。</p>

### Samples
**Sample Input 1**
```
1 3 5 -1
2 4 6 -1
```
**Sample Output 1**
```
1 2 3 4 5 6
```

### Hint
<p>双指针比较合并。一个链表遍历完后，直接接上另一个的剩余部分。</p>

---

## [JD102] 三元归序

### Description
<p>兵器阁的账房先生有一本厚厚的兵器账本，每条记录记着三样东西：兵器编号x、重量y（带两位小数）、兵器名称z。</p><p>&quot;这本账太乱了，&quot;赵晴儿翻了几页就头疼，&quot;编号不按顺序，同编号的重量也乱排。&quot;</p><p>梁嘉峰说：&quot;先按编号从小到大排，编号相同的再按重量从小到大排。你可以用结构体存每条记录，放进容器里，再自定义排序规则。&quot;</p>

### Input
<p>第一行一个整数N。接下来N行，每行两个整数和一个字符串。</p>

### Output
<p>排序后的N条记录，每行一条。x输出整数，y输出保留两位小数的浮点数，字符串原样输出，空格隔开。</p>

### Samples
**Sample Input 1**
```
3
1 2 abc
3 4 def
2 1 ghi
```
**Sample Output 1**
```
1 2.00 abc
2 1.00 ghi
3 4.00 def
```

### Hint
<p><a href="https://www.acwing.com/problem/content/864/" target="_blank">原题链接</a></p><p>定义结构体存储三元组，自定义比较函数：先比x，再比y。</p>

---

## [JD103] 立桩定阵

### Description
<p>试炼场上，弟子们按身高排成一列，但顺序完全乱了。梁嘉峰走过去，随便挑了一个弟子站到中间，然后让所有比他矮的站到左边，比他高的站到右边。</p><p>&quot;现在左边和右边各自还是乱的，&quot;赵晴儿看出来了。</p><p>&quot;对。所以对左边和右边各自重复这个过程——挑一个人，矮的左、高的右。每次都能让一个人站到最终位置上，直到每一组只剩一个人。&quot;梁嘉峰说，&quot;这就是快速排序。一剑分两路，递归再出剑。&quot;</p><p>给定一个长度为 n 的整数数列，请用快速排序将其从小到大排序。</p>

### Input
<p>第一行包含整数n。第二行包含n个整数。</p>

### Output
<p>一行，n个排好序的整数，空格隔开。</p>

### Samples
**Sample Input 1**
```
5
3 1 2 4 5
```
**Sample Output 1**
```
1 2 3 4 5
```

### Hint
<p>选基准元素，双指针分区：左边 ≤ 基准，右边 &gt; 基准。递归处理左右两半。平均 O(nlogn)。</p><p><a href="https://www.acwing.com/problem/content/787/" target="_blank">原题链接</a></p>

---

## [JD104] 照妖辨品

### Description
<p>梁嘉峰指着那排弟子：&quot;我不需要所有人都排好——只要知道第 K 矮的人是谁。&quot;</p><p>赵晴儿想了想：&quot;还是用刚才的方法：挑一个人站中间，矮的左、高的右。数一数左边有几个人——如果左边刚好有 K-1 个人，那中间那个就是答案。如果左边人比 K-1 多，说明答案在左边，只管左边就行。如果不够，就去右边找第 K-左-1 矮的。&quot;</p><p>&quot;所以快排是把两边都排好，快选只需要管一边。&quot;梁嘉峰点头，&quot;省了一半的力气。&quot;</p><p>给定一个长度为 n 的整数数列和一个整数 k，求数列中第 k 小的数。</p>

### Input
<p>第一行两个整数n和k。第二行n个整数。</p>

### Output
<p>一行，第k小的数。</p>

### Samples
**Sample Input 1**
```
5 3
3 1 2 4 5
```
**Sample Output 1**
```
3
```

### Hint
<p>partition 后判断 k 在左半还是右半，只递归一半。平均 O(n)。</p><p><a href="https://www.acwing.com/problem/content/788/" target="_blank">原题链接</a></p>

---

## [JD105] 双剑合阵

### Description
<p>赵晴儿把弟子们两两分成一组，每组内部先按身高排好。然后两组合成一组四人——从两组的排头各看一眼，矮的先出列，依次接上。四人组再两两合并成八人组……</p><p>梁嘉峰看明白了：&quot;快排是先挑基准把人分开，归并是先把人拆到最小单位，再一层层合并上来。&quot;</p><p>&quot;对，&quot;赵晴儿说，&quot;合并时两边都是有序的，所以每次只需要比较排头，O(n)就能合并。拆到底再合上来，总共 O(nlogn)。而且最坏情况也一样——不像快排最坏会退化。&quot;</p><p>给定一个长度为 n 的整数数列，请用归并排序将其从小到大排序。</p>

### Input
<p>第一行包含整数n。第二行包含n个整数。</p>

### Output
<p>一行，n个排好序的整数，空格隔开。</p>

### Samples
**Sample Input 1**
```
5
3 1 2 4 5
```
**Sample Output 1**
```
1 2 3 4 5
```

### Hint
<p>递归拆分 → 合并两个有序数组。需要额外空间 O(n)。稳定排序。</p><p><a href="https://www.acwing.com/problem/content/790/" target="_blank">原题链接</a></p>

---

## [JD106] 逆流之数

### Description
<p>弟子们排成一列，每人身上有一个编号。赵晴儿发现，有些排在前面的人编号反而比后面的大——这就是&quot;逆序对&quot;，说明队伍很乱。</p><p>&quot;逆序对越多，队伍越乱。&quot;赵晴儿说，&quot;但要一个个比太慢了。有没有 O(nlogn) 的方法？&quot;</p><p>李少白盯着归并排序看了一会儿，突然开窍：&quot;归并的时候，左右两队都是从小到大排好的。从两队的排头开始比较——如果右边的先出列，说明右边这个人比左边队里剩下的所有人都小，那些都是逆序对！&quot;</p><p>&quot;没错。&quot;赵晴儿笑了，&quot;排完序，逆序对也数完了。&quot;</p><p>给定一个长度为 n 的整数数列，求逆序对的数量。</p>

### Input
<p>第一行包含整数n。第二行包含n个整数（1≤n≤100000）。</p>

### Output
<p>一行，逆序对的数量。</p>

### Samples
**Sample Input 1**
```
5
2 3 1 5 4
```
**Sample Output 1**
```
3
```

### Hint
<p>归并排序过程中，当右边元素先被选中时，左边剩余元素个数就是新增的逆序对数。用 long long 存结果。</p><p><a href="https://www.acwing.com/problem/content/790/" target="_blank">原题链接</a></p>

---

## [JD107] 石壁听风

### Description
<p>赵晴儿递给李少白一排刻着数字的石块，从左到右从小到大排好了。她问：&quot;数字 3 第一次出现在哪块石块上？最后一次出现在哪？&quot;</p><p>李少白想从头数，但石块有十万块。赵晴儿拦住他：&quot;石块是有序的，不用一个个看。先看最中间那块——如果中间的数比 3 大，说明 3 只可能在左半边，右半边不用看了。每次都把范围砍一半，这就是二分。&quot;</p><p>&quot;找第一次出现的位置和最后一次出现的位置，各二分一次。&quot;李少白接话道。</p><p>&quot;对。如果整个范围里都找不到，就说明没有。&quot;</p><p>给定一个升序排列的长度为 n 的整数数组和 q 个查询，对每个查询返回目标值的起始位置和终止位置（从0开始），不存在则返回 -1 -1。</p>

### Input
<p>第一行两个整数n和q。第二行n个整数（升序）。第三行q个待查询的整数。</p>

### Output
<p>每行两个整数，起始位置和终止位置。不存在输出-1 -1。</p>

### Samples
**Sample Input 1**
```
6 3
1 2 2 3 3 4
2 3 5
```
**Sample Output 1**
```
1 2
3 4
-1 -1
```

### Hint
<p>两次二分：找第一个 ≥ x 的位置（左边界），找最后一个 ≤ x 的位置（右边界）。</p><p><a href="https://www.acwing.com/problem/content/791/" target="_blank">原题链接</a></p>

---

## [JD108] 剑指方根

### Description
<p>赵晴儿在沙盘上写下一个数 n：&quot;求它的三次方根。&quot;</p><p>李少白试了几个整数，立方后不是太大就是太小。赵晴儿说：&quot;别猜了。三次方根一定在 -10000 到 10000 之间。你取中间值试试——如果中间值的立方比 n 大，说明真正的答案在左半边；比 n 小，就在右半边。范围不断缩小，直到精度足够。&quot;</p><p>&quot;和整数二分一样的思路，&quot;李少白说，&quot;只不过这次找的不是一个确切的位置，而是一个足够精确的浮点数。&quot;</p><p>&quot;对。整数二分停在某个整数上，浮点二分停在精度达标时。&quot;</p><p>给定一个浮点数 n，求它的三次方根。</p>

### Input
<p>一个浮点数n（-10000≤n≤10000）。</p>

### Output
<p>n的三次方根，保留6位小数。</p>

### Samples
**Sample Input 1**
```
1000.000000
```
**Sample Output 1**
```
10.000000
```

### Hint
<p>浮点二分：left=-10000, right=10000，while(right-left&gt;1e-8)，mid=(left+right)/2。若 mid³≥n，right=mid；否则 left=mid。</p><p><a href="https://www.acwing.com/problem/content/792/" target="_blank">原题链接</a></p>

---

## [JD109] 铁壁识痕

### Description
<p>精铸阁的墙壁上嵌着一排铁板，每块铁板上用二进制刻着一个数——有凹痕的地方是1，平整的地方是0。</p><p>赵晴儿递给李少白一串数字：&quot;每块铁板上有几道凹痕？数出来。&quot;</p><p>李少白想逐位检查。赵晴儿教他一个窍门：&quot;用位运算——n & 1 看最低位是不是1，然后 n &gt;&gt;= 1 右移一位，继续看下一位。数完所有位，就知道有几道凹痕了。&quot;</p><p>给定 n 个整数，输出每个数的二进制表示中有多少个1。</p>

### Input
<p>第一行一个整数n。第二行n个整数（1≤n≤100000）。</p>

### Output
<p>一行，每个数对应的1的个数，空格隔开。</p>

### Samples
**Sample Input 1**
```
5
1 2 3 4 5
```
**Sample Output 1**
```
1 1 2 1 2
```

### Hint
<p>位运算：while(n &gt; 0) { count += n & 1; n &gt;&gt;= 1; }。或用 n & (n-1) 消去最低位的1，计数更快。</p><p><a href="https://www.acwing.com/problem/content/803/" target="_blank">原题链接</a></p>

---

## [JD110] 万钧合一

### Description
<p>精铸阁中，赵晴儿递来两块铁牌，上面各刻着一个巨大的数字——长到普通变量根本装不下。</p><p>&quot;这两个数要加起来，&quot;赵晴儿说，&quot;但没有那么大的容器。怎么办？&quot;</p><p>李少白想了想：&quot;像竖式加法一样，把每一位拆开，用数组存。从最低位开始逐位相加，满十进一。&quot;</p><p>&quot;对。这就是高精度加法——用数组模拟竖式。&quot;</p><p>给定两个正整数，计算它们的和。每个数不超过 100000 位。</p>

### Input
<p>两行，每行一个正整数（不超过100000位）。</p>

### Output
<p>一行，两数之和。</p>

### Samples
**Sample Input 1**
```
123456789012345678901234567890
987654321098765432109876543210
```
**Sample Output 1**
```
1111111110111111111011111111100
```

### Hint
<p>用数组存每一位（倒序），从低位到高位逐位相加，处理进位。最后倒序输出。</p><p><a href="https://www.acwing.com/problem/content/793/" target="_blank">原题链接</a></p>

---

## [JD111] 削铁如泥

### Description
<p>梁嘉峰递给李少白两块铁牌：&quot;这次是减法。大数减大数，注意借位。&quot;</p><p>李少白接过一看，两个数都很长。他先比较了大小——如果被减数比减数小，结果就是负数，先交换再算。</p><p>&quot;像竖式减法一样，从最低位开始，不够减就向高位借1。&quot;梁嘉峰说，&quot;削铁如泥，一刃一刃来。&quot;</p><p>给定两个正整数，计算它们的差（结果可能为负数）。每个数不超过 100000 位。</p>

### Input
<p>两行，每行一个正整数（不超过100000位）。</p>

### Output
<p>一行，两数之差。</p>

### Samples
**Sample Input 1**
```
9876543210
1234567890
```
**Sample Output 1**
```
8641975320
```

### Hint
<p>先判断大小，大减小，从低位逐位减，处理借位。如果被减数小则结果加负号。</p><p><a href="https://www.acwing.com/problem/content/794/" target="_blank">原题链接</a></p>

---

## [JD112] 叠甲千层

### Description
<p>赵晴儿递来一块刻着万位数的铁牌和一个小铁块：&quot;大数乘以小数。铁牌上的每一位都要乘以小铁块的数，再处理进位——就像叠甲，一层压一层。&quot;</p><p>李少白从铁牌的最低位开始，逐位乘以小数，加上前一位的进位，本位留下余数，进位带到下一位。</p><p>给定一个大正整数 A 和一个小正整数 B，计算 A × B。A 不超过 100000 位，B 不超过 10000。</p>

### Input
<p>两行，第一行正整数A（不超过100000位），第二行正整数B（不超过10000）。</p>

### Output
<p>一行，A×B的结果。</p>

### Samples
**Sample Input 1**
```
123456
789
```
**Sample Output 1**
```
97406784
```

### Hint
<p>高精度×低精度：大数每一位乘以小数，处理进位。注意结果可能有前导零需要去掉。</p><p><a href="https://www.acwing.com/problem/content/795/" target="_blank">原题链接</a></p>

---

## [JD113] 分金断玉

### Description
<p>梁嘉峰拿起一把锉刀：&quot;大数除以小数——分金断玉，从高位一刀一刀切。&quot;</p><p>&quot;从最高位开始，&quot;赵晴儿解释，&quot;当前余数乘10加上当前位，除以除数得到商的一位，剩下的余数带到下一位。和竖式除法一模一样。&quot;</p><p>给定一个大非负整数 A 和一个小正整数 B，计算 A ÷ B 的商和余数。A 不超过 100000 位，B 不超过 10000。</p>

### Input
<p>两行，第一行非负整数A（不超过100000位），第二行正整数B（B≠0）。</p>

### Output
<p>两行，第一行商，第二行余数。</p>

### Samples
**Sample Input 1**
```
9876543210
123
```
**Sample Output 1**
```
80297099
33
```

### Hint
<p>高精度÷低精度：从高位到低位，当前余数×10+当前位，除以B得商的一位，更新余数。</p><p><a href="https://www.acwing.com/problem/content/796/" target="_blank">原题链接</a></p>

---

## [JD114] 双剑求和

### Description
<p>赵晴儿递给李少白两排有序的铁牌，每排上的数字从小到大排列。她说：&quot;从两排铁牌中各取一块，使它们的数字之和刚好等于一个目标值。&quot;</p><p>李少白想暴力枚举，但每排都有十万块。赵晴儿说：&quot;两排都是有序的——第一个指针从第一排的头部开始，第二个指针从第二排的尾部开始。如果和太大，第二个指针往左移；和太小，第一个指针往右移。两个指针配合，一次遍历就够了。&quot;</p><p>给定两个升序数组 A 和 B，以及目标值 x，找出满足 A[i] + B[j] = x 的数对 (i, j)。保证有唯一解。</p>

### Input
<p>第一行两个整数n和m。第二行n个整数。第三行m个整数。</p>

### Output
<p>一行，两个整数i和j。</p>

### Samples
**Sample Input 1**
```
4 5 6
1 2 4 7
3 4 6 8 9
```
**Sample Output 1**
```
1 1
```

### Hint
<p>双指针：i 从 A 的头，j 从 B 的尾。A[i]+B[j] &lt; x 则 i++，&gt; x 则 j--。O(n+m)。</p><p><a href="https://www.acwing.com/problem/content/802/" target="_blank">原题链接</a></p>

---

## [JD115] 双剑验序

### Description
<p>赵晴儿拿着两卷竹简，上面各写着一串数字。她问：&quot;第二卷的内容是不是第一卷的子序列？子序列不要求连续，但必须保持原有次序。&quot;</p><p>李少白用两个指针：&quot;一个指针遍历第一卷，另一个指向第二卷。如果当前字符匹配，第二卷的指针就往前走。最后看第二卷的指针有没有走到头——走到头就说明全部匹配上了。&quot;</p><p>&quot;对，两个指针各走一遍，O(n)。&quot;</p><p>给定序列 a（长度 n）和序列 b（长度 m），判断 a 是否为 b 的子序列。</p>

### Input
<p>第一行两个整数n和m。第二行n个整数（序列a）。第三行m个整数（序列b）。</p>

### Output
<p>是子序列输出Yes，否则输出No。</p>

### Samples
**Sample Input 1**
```
3 5
1 3 5
1 2 3 4 5
```
**Sample Output 1**
```
Yes
```

### Hint
<p>双指针：i 遍历 a，j 遍历 b。a[i] == b[j] 时 i++。i 到头说明是子序列。</p><p><a href="https://www.acwing.com/problem/content/2819/" target="_blank">原题链接</a></p>

---

## [JD116] 无重之最

### Description
<p>梁嘉峰在沙盘上摆了一排石块，每块上刻着一个数字。他问：&quot;从这排石块中，找出最长的一段——这段里每个数字都不重复。&quot;</p><p>李少白想从头遍历每一段，但石块有十万块。赵晴儿教他：&quot;用两个指针，一左一右，框住一段区间。右指针往右扩展，遇到重复数字就收缩左指针，直到区间内没有重复。每一步都更新最大长度。&quot;</p><p>&quot;两个指针各走各的，总共只走一遍——O(n)。&quot;</p><p>给定一个长度为 n 的整数序列，找出最长的不含重复数字的连续子序列，输出其长度。</p>

### Input
<p>第一行一个整数n。第二行n个整数（1≤n≤100000）。</p>

### Output
<p>一行，最长连续不重复子序列的长度。</p>

### Samples
**Sample Input 1**
```
5
1 2 2 3 5
```
**Sample Output 1**
```
3
```

### Hint
<p>滑动窗口：右指针扩展，用哈希表判断是否重复，重复则左指针收缩。O(n)。</p><p><a href="https://www.acwing.com/problem/content/801/" target="_blank">原题链接</a></p>

---

## [JD121] 蓄势之术

### Description
<p>蓄势阁中，赵晴儿盘膝而坐，面前摆着一排石块，每块上刻着一个数字。</p><p>&quot;如果我问你第3块到第7块的总和，你怎么算？&quot;赵晴儿问。</p><p>李少白：&quot;从第3块加到第7块，五次加法。&quot;</p><p>&quot;如果问一千次呢？&quot;赵晴儿摇头，&quot;每次从头算太浪费了。提前算好从第1块到每一块的累积和——第1块到第7块的和减去第1块到第2块的和，就是第3块到第7块的和。一次减法就够了。&quot;</p><p>&quot;这就是前缀和——蓄势于前，取用于后。&quot;</p><p>给定一个长度为 n 的整数序列和 m 个查询，每个查询求 [l, r] 的区间和。</p>

### Input
<p>第一行两个整数n和m。接下来n行每行两个整数x和c。接下来m行每行两个整数l和r。</p>

### Output
<p>m行，每行一个整数。</p>

### Samples
**Sample Input 1**
```
5 3
2 1 3 6 4
1 3
2 4
1 5
```
**Sample Output 1**
```
6
10
16
```

### Hint
<p>前缀和：s[i] = a[1] + ... + a[i]。区间和 = s[r] - s[l-1]。</p><p><a href="https://www.acwing.com/problem/content/797/" target="_blank">原题链接</a></p>

---

## [JD122] 方阵蓄势

### Description
<p>赵晴儿在沙盘上画了一个 n 行 m 列的数字矩阵。&quot;如果我问你左上角 (x1,y1) 到右下角 (x2,y2) 这个子矩阵里所有数的和，你怎么算？&quot;</p><p>李少白想逐行累加。赵晴儿摇头：&quot;太慢了。和一维前缀和一样的思路——提前算好从 (1,1) 到每个位置的累积和。查询时用容斥原理：大矩形减去左边和上边的多余部分，加上左上角多减的部分。&quot;</p><p>&quot;蓄势蓄到二维，一击覆盖任意子矩阵。&quot;</p><p>给定一个 n×m 的整数矩阵和 q 个查询，每个查询求子矩阵的和。</p>

### Input
<p>第一行一个整数n（1≤n≤100000）。接下来n行每行两个整数l和r。</p>

### Output
<p>q行，每行一个整数，表示每次查询的子矩阵和。</p>

### Samples
**Sample Input 1**
```
3 4 2
1 3 4 5
2 6 9 4
1 4 7 5
1 1 2 2
2 1 3 3
```
**Sample Output 1**
```
18
43
```

### Hint
<p>二维前缀和+容斥。子矩阵和 = s[x2][y2] - s[x1-1][y2] - s[x2][y1-1] + s[x1-1][y1-1]。</p><p><a href="https://www.acwing.com/problem/content/798/" target="_blank">原题链接</a></p>

---

## [JD123] 差分之术

### Description
<p>赵晴儿指着一排石块：&quot;我要把第3块到第7块每块都加上5。如果一块块改，太慢了。&quot;</p><p>梁嘉峰说：&quot;差分——前缀和的逆运算。你在第3块的位置加5，在第8块的位置减5。最后对整排求一次前缀和，第3到第7块就都加了5，其余不变。&quot;</p><p>&quot;就像往水面扔两块石头，&quot;李少白恍然大悟，&quot;波纹叠加后就是最终结果。&quot;</p><p>给定一个长度为 n 的整数序列和 m 个操作，每个操作将 [l, r] 的每个数加 c。输出所有操作后的序列。</p>

### Input
<p>第一行两个整数n和m。第二行n个整数。接下来m行每行两个整数l和r。</p>

### Output
<p>一行，n个整数，空格隔开，表示经过m次操作后的最终序列。</p>

### Samples
**Sample Input 1**
```
5 3
1 2 3 4 5
1 3 2
2 4 1
3 5 3
```
**Sample Output 1**
```
3 5 8 8 8
```

### Hint
<p>差分：b[l] += c, b[r+1] -= c。所有操作完成后，对 b 求前缀和得到最终序列。</p><p><a href="https://www.acwing.com/problem/content/799/" target="_blank">原题链接</a></p>

---

## [JD124] 方阵差分

### Description
<p>赵晴儿在沙盘上画了一个 n 行 m 列的矩阵：&quot;我要把左上角 (x1,y1) 到右下角 (x2,y2) 这个子矩阵里每个数都加上 c。&quot;</p><p>梁嘉峰说：&quot;和一维差分一样的思路——在差分矩阵的四个角加减，最后对整个矩阵求一次二维前缀和，就还原出最终结果了。&quot;</p><p>&quot;蓄势蓄到二维，差分也能覆盖任意子矩阵。&quot;</p><p>给定一个 n×m 的整数矩阵和 q 个操作，每个操作将子矩阵的每个元素加 c。输出所有操作后的矩阵。</p>

### Input
<p>第一行三个整数n、m和q。接下来n行每行m个整数。接下来q行每行四个整数x1、y1、x2、y2。</p>

### Output
<p>n行，每行m个整数，表示操作后的矩阵。</p>

### Samples
**Sample Input 1**
```
3 4 2
1 2 3 4
5 6 7 8
9 10 11 12
1 1 2 2 1
2 2 3 3 2
```
**Sample Output 1**
```
2 3 3 4
6 10 10 8
9 12 14 12
```

### Hint
<p>二维差分：在四个角加减，最后求二维前缀和。</p><p><a href="https://www.acwing.com/problem/content/800/" target="_blank">原题链接</a></p>

---

## [JD125] 离散聚力

### Description
<p>赵晴儿指着一条无限长的数轴：&quot;坐标从负无穷到正无穷，但真正有值的位置只有几个。如果开一个那么大的数组，太浪费了。&quot;</p><p>&quot;所以要把这些稀疏的大坐标映射到连续的小下标上——这就是离散化。&quot;梁嘉峰接话，&quot;映射之后再用前缀和，就能 O(1) 回答区间求和的查询。&quot;</p><p>&quot;先聚力于有用之处，再一击命中。&quot;</p><p>假定有一个无限长的数轴，初始每个坐标上都是0。先进行 n 次操作，每次将位置 x 上的数加 c。然后进行 m 次查询，每次求区间 [l, r] 的和。</p>

### Input
<p>第一行两个整数n和m。第二行n个整数。接下来m行每行三个整数l、r和c。</p>

### Output
<p>m行，每行一个整数，表示每次查询的结果。</p>

### Samples
**Sample Input 1**
```
3 3
1 2
3 6
7 5
1 3
4 6
7 8
```
**Sample Output 1**
```
8
0
5
```

### Hint
<p>离散化：排序去重后映射到连续下标。用前缀和回答区间查询。</p><p><a href="https://www.acwing.com/problem/content/804/" target="_blank">原题链接</a></p>

---

## [JD126] 合围归阵

### Description
<p>梁嘉峰在地上画了一堆区间，有些重叠，有些相邻。&quot;把这些区间合并——有交集的归为一组，最后数一数有几组。&quot;</p><p>赵晴儿蹲下来看了一会儿：&quot;先按左端点从小到大排。然后从左往右扫——如果当前区间的左端点在前一个区间内，说明它们重叠，合并；否则新开一组。&quot;</p><p>&quot;合围之势，聚散有序。&quot;</p><p>给定 n 个区间，合并所有有交集的区间（端点相交也算），输出合并后的区间个数。</p>

### Input
<p>第一行包含整数n，表示区间个数。</p><p>接下来n行，每行包含两个整数l和r，表示一个区间的左右端点。</p>

### Output
<p>一个整数，表示合并后的区间个数。</p>

### Samples
**Sample Input 1**
```
5
1 2
2 4
5 6
7 8
7 10
```
**Sample Output 1**
```
3
```

### Hint
<p>按左端点排序，遍历合并：当前区间左端点 ≤ 前一个右端点则合并，否则新开。</p><p><a href="https://www.acwing.com/problem/content/805/" target="_blank">原题链接</a></p>

---

## [JD127] 一箭穿心

### Description
<p>赵晴儿在数轴上标了 N 个区间，每个区间表示一个敌人的巡逻范围。&quot;用最少的暗器，让每个敌人的巡逻范围里至少中一枚。&quot;</p><p>李少白想每个区间放一枚。赵晴儿摇头：&quot;贪心——按右端点从小到大排。第一枚暗器射在第一个区间的右端点，这样所有包含这个点的区间都中了。然后跳过这些区间，再射下一批。&quot;</p><p>&quot;选右端点是因为它最&#039;靠左&#039;——能覆盖尽可能多的后续区间。&quot;</p><p>给定 N 个闭区间，选择尽量少的点，使得每个区间内至少有一个点。</p>

### Input
<p>第一行一个整数N（1≤N≤100000）。接下来N行每行两个整数a和b。</p>

### Output
<p>一行，最少需要的点数。</p>

### Samples
**Sample Input 1**
```
3
1 3
2 4
3 5
```
**Sample Output 1**
```
1
```

### Hint
<p>按右端点排序，每次选当前区间的右端点，跳过所有包含该点的区间。</p><p><a href="https://www.acwing.com/problem/content/907/" target="_blank">原题链接</a></p>

---

## [JD128] 合果成堆

### Description
<p>果园里有 N 堆果子，每堆重量不同。赵晴儿要把它们合并成一堆，每次只能合并两堆，消耗的能量等于两堆重量之和。</p><p>&quot;如果先合并重的，后面每次合并都要带着这堆重的走，代价越来越大。&quot;赵晴儿说，&quot;所以反过来——每次选最轻的两堆合并，这样每一步的代价都最小。&quot;</p><p>李少白想到用小根堆：&quot;每次取出堆顶（最轻的两堆），合并后放回去。总代价最小。&quot;</p><p>这就是哈夫曼树的思想。</p><p>有 N 堆果子，每次合并两堆（代价为两堆之和），求合并为一堆的最小总代价。</p>

### Input
<p>第一行一个整数N（1≤N≤10000）。第二行N个整数，表示每堆的重量。</p>

### Output
<p>一行，最小总代价。</p>

### Samples
**Sample Input 1**
```
3
1 2 9
```
**Sample Output 1**
```
15
```

### Hint
<p>小根堆：每次取最小的两个合并，结果放回堆中。O(nlogn)。</p><p><a href="https://www.acwing.com/problem/content/150/" target="_blank">原题链接</a></p>

---

## [JD129] 中位之选

### Description
<p>数轴上有 N 个商铺，赵晴儿要建一个货仓，让所有商铺到货仓的货物运输距离之和最小。</p><p>&quot;选在哪里？&quot;李少白问。</p><p>&quot;排序后取中位数。&quot;赵晴儿说，&quot;数学可以证明：中位数使绝对偏差之和最小。如果选在中位数左边，右边的商铺距离全部变远；选在中位数右边，左边的商铺距离全部变远。只有中位数是平衡点。&quot;</p><p>给定 N 个点的坐标，求一个位置使所有点到该位置的绝对距离之和最小，输出最小距离之和。</p>

### Input
<p>第一行一个整数N（1≤N≤100000）。第二行N个整数，表示各点坐标。</p>

### Output
<p>一行，最小距离之和。</p>

### Samples
**Sample Input 1**
```
5
1 2 3 4 5
```
**Sample Output 1**
```
6
```

### Hint
<p>排序后取中位数（下标 n/2），计算所有点到中位数的距离之和。</p><p><a href="https://www.acwing.com/problem/content/106/" target="_blank">原题链接</a></p>

---

## [JD130] 铁链串珠

### Description
<p>兵器阁的深处，梁嘉峰指着一条铁链：&quot;这条链上每颗珠子存着一个值，每颗珠子还指着下一颗——这就是链表。&quot;</p><p>&quot;用数组模拟链表：head指向第一颗珠子，val[]存每颗珠子的值，ne[]存下一颗珠子的下标。插入、删除都只需要改指针，O(1)。&quot;</p><p>赵晴儿说：&quot;链表的好处是插入删除快，代价是不能随机访问。&quot;</p><p>实现一个单链表，支持在头部插入、在第k个插入的元素后面插入、删除第k个插入的元素前面的元素。</p>

### Input
<p>第一行包含整数 M，表示操作次数。</p><p>接下来 M 行，每行包含一个操作命令：</p><ul><li>H x：向链表头插入一个数 x</li><li>D k：删除第 k 个插入的数后面的数（k 为 0 表示删除头结点）</li><li>I k x：在第 k 个插入的数后面插入一个数 x（此操作中 k 均大于 0）</li></ul>

### Output
<p>输出最终链表，从头到尾空格隔开。</p>

### Samples
**Sample Input 1**
```
10
H 9
I 1 1
D 1
H 6
I 3 6
I 4 7
D 3
D 4
I 2 2
D 2
```
**Sample Output 1**
```
6
7
```

### Hint
<p>数组模拟链表：head, val[], ne[]。插入：新节点的ne指向原next，前驱的ne指向新节点。</p><p><a href="https://www.acwing.com/problem/content/828/" target="_blank">原题链接</a></p>

---

## [JD131] 叠石成塔

### Description
<p>梁嘉峰在墙角堆了一摞石块：&quot;栈——后进先出。只能从顶部放石块，也只能从顶部取。&quot;</p><p>赵晴儿指着石块：&quot;push是放石块到顶部，pop是取走顶部的石块，query是看看顶部那块刻着什么数。&quot;</p><p>&quot;生活中到处是栈——叠盘子、摞书、函数调用。&quot;</p><p>实现一个栈，支持push、pop、query、empty操作。</p>

### Input
<p>若干行操作命令：push x（入栈）、pop（出栈）、query（查询栈顶）、empty（判断栈是否为空）。</p>

### Output
<p>对每个query和empty操作输出一行结果。其中query输出栈顶元素，empty输出YES或NO。</p>

### Samples
**Sample Input 1**
```
10
push 5
query
push 6
pop
query
empty
pop
empty
push 3
query
```
**Sample Output 1**
```
5
5
NO
YES
3
```

### Hint
<p>数组模拟栈：tt指向栈顶。push: st[++tt]=x。pop: tt--。query: st[tt]。empty: 判断tt是否为0。</p><p><a href="https://www.acwing.com/problem/content/830/" target="_blank">原题链接</a></p>

---

## [JD132] 列阵待命

### Description
<p>赵晴儿指着一排队列：&quot;队列——先进先出。新来的站队尾，走的从队头走。&quot;</p><p>梁嘉峰说：&quot;push是从队尾加入，pop是从队头弹出，query是看队头是谁。&quot;</p><p>&quot;排队买饭、消息队列、BFS——都是队列。&quot;</p><p>实现一个队列，支持push、pop、query、empty操作。</p>

### Input
<p>若干行操作命令：push x（入队）、pop（出队）、query（查询队头）、empty（判断队列是否为空）。</p>

### Output
<p>对每个query和empty操作输出一行结果。其中query输出队头元素，empty输出YES或NO。</p>

### Samples
**Sample Input 1**
```
10
push 5
query
push 3
pop
query
empty
push 7
pop
pop
empty
```
**Sample Output 1**
```
5
3
NO
YES
```

### Hint
<p>数组模拟队列：hh队头，tt队尾。push: q[++tt]=x。pop: hh++。query: q[hh]。empty: 判断hh是否大于tt。</p><p><a href="https://www.acwing.com/problem/content/831/" target="_blank">原题链接</a></p>

---

## [JD133] 算筹求值

### Description
<p>赵晴儿递来一个算式：&quot;3 + 4 * 2 - ( 1 + 5 )。算出结果。&quot;</p><p>梁嘉峰拿出两个盒子：&quot;数字盒和符号盒。遇到数字放数字盒。遇到符号——如果比栈顶符号优先级低，就把栈顶符号和两个数字算掉。遇到左括号直接放，遇到右括号一直算到左括号。&quot;</p><p>&quot;用两个栈——数字栈和运算符栈，按优先级处理。&quot;</p><p>给定一个包含 +、-、*、/、(、) 的表达式，求值。</p>

### Input
<p>一行包含+、-、*、/、(、)和整数的表达式。</p>

### Output
<p>一行，表达式的值。</p>

### Samples
**Sample Input 1**
```
2+3*4
```
**Sample Output 1**
```
14
```

### Hint
<p>双栈法：数字栈+运算符栈。比较优先级决定是否先算栈顶。</p><p><a href="https://www.acwing.com/problem/content/3305/" target="_blank">原题链接</a></p>

---

## [JD134] 一山更比

### Description
<p>梁嘉峰指着一排山峰：&quot;每座山往左看，找到第一座比自己矮的山。&quot;</p><p>赵晴儿说：&quot;用一个栈维护&#039;还没找到更矮山&#039;的山峰——从左往右扫，遇到更矮的山，栈里比它高的全部弹出，它们的答案就是这座山。&quot;</p><p>&quot;栈里永远是单调递增的——所以叫单调栈。&quot;</p><p>给定一个整数序列，对每个元素找到它左边第一个比它小的数。</p>

### Input
<p>第一行一个整数n。第二行n个整数。</p>

### Output
<p>一行，每个元素左边第一个比它小的数，不存在输出-1。</p>

### Samples
**Sample Input 1**
```
5
3 4 2 7 5
```
**Sample Output 1**
```
-1 3 -1 2 2
```

### Hint
<p>单调栈：遍历时弹出比当前大的元素，栈顶就是答案。维护单调递增栈。</p><p><a href="https://www.acwing.com/problem/content/832/" target="_blank">原题链接</a></p>

---

## [JD135] 窗移镜照

### Description
<p>赵晴儿在沙盘上画了一排数字，用一个框框住其中k个：&quot;这个框每往右移一格，告诉我框里的最小值和最大值。&quot;</p><p>梁嘉峰说：&quot;用单调队列——维护一个单调递增的队列。窗口移动时，队头如果过期就弹出；新元素入队时，把队尾比它大的全部弹出。队头永远是当前窗口的最小值。&quot;</p><p>赵晴儿又说：&quot;反过来，维护一个单调递减的队列，队头就是每个窗口的最大值。&quot;</p><p>&quot;一扇窗户移过整排数字，镜中映出最小与最大。&quot;</p><p>给定一个长度为 n 的整数序列和窗口大小 k，求每个窗口内的最小值和最大值。</p>

### Input
<p>第一行两个整数n和k（窗口大小）。第二行n个整数。</p>

### Output
<p>第一行输出每个窗口的最小值，空格隔开。第二行输出每个窗口的最大值，空格隔开。</p>

### Samples
**Sample Input 1**
```
8 3
1 3 -1 -3 5 3 6 7
```
**Sample Output 1**
```
-1 -3 -3 -3 3 3
3 3 5 5 6 7
```

### Hint
<p>单调队列：维护递增队列求最小值，维护递减队列求最大值。窗口滑动时弹出过期元素。</p><p><a href="https://www.acwing.com/problem/content/156/" target="_blank">原题链接</a></p>

---

## [JD136] 剑谱寻踪

### Description
<p>赵晴儿拿着一本剑谱：&quot;在这本厚厚的剑谱里找一段特定的剑招序列——模式串在文本串中出现了几次？分别在哪里？&quot;</p><p>李少白想一个个比对，但剑谱有十万字。梁嘉峰说：&quot;KMP算法——先预处理模式串，算出每个位置的next数组（最长相等前后缀）。匹配时利用next跳转，不用回退文本指针。O(n+m)。&quot;</p><p>在文本串中查找模式串的所有出现位置。</p>

### Input
<p>第一行一个整数n（模式串长度）。第二行模式串。第三行一个整数m（文本串长度）。第四行文本串。</p>

### Output
<p>一行，模式串在文本串中所有出现的起始位置（从0开始），空格隔开。</p>

### Samples
**Sample Input 1**
```
3
aba
5
ababa
```
**Sample Output 1**
```
0 2
```

### Hint
<p>KMP：预处理next数组（最长相等前后缀），匹配时利用next跳转。</p><p><a href="https://www.acwing.com/problem/content/833/" target="_blank">原题链接</a></p>

---

## [JD137] 堆石成丘

### Description
<p>梁嘉峰在地上堆了一座小丘：&quot;堆——一种特殊的完全二叉树。父节点的值永远比子节点小（小根堆）。&quot;</p><p>赵晴儿说：&quot;用数组存——父节点i的子节点是2i和2i+1。插入时上浮，删除时下沉。支持插入、取最小值、删除最小值、删除任意元素、修改任意元素。&quot;</p><p>实现一个小根堆，支持插入、删除第k个插入的元素、修改第k个插入的元素、查询最小值、删除最小值。</p>

### Input
<p>若干行操作命令：I x（插入x）、PM（查询最小值）、DM（删除最小值）、D k（删除第k个插入的元素）、C k x（修改第k个插入的数为x）。</p>

### Output
<p>对每个PM操作输出一行最小值。</p>

### Samples
**Sample Input 1**
```
5
I 3
I 1
I 4
PM
D 1
```
**Sample Output 1**
```
1
```

**Sample Input 2**
```
8
I 2
I 1
I 3
PM
DM
PM
C 2 8
PM
```
**Sample Output 2**
```
1
2
3
```

### Hint
<p>数组模拟堆：上浮和下沉操作。父节点i的子节点是2i和2i+1。维护ph[]和hp[]数组记录插入顺序与堆中位置的映射。</p><p><a href="https://www.acwing.com/problem/content/841/" target="_blank">原题链接</a></p>

---

## [JD138] 合帮并派

### Description
<p>江湖上有N个门派，每个弟子属于一个门派。赵晴儿问：&quot;两个弟子是不是同门？&quot;梁嘉峰说：&quot;用并查集——合并两个门派用union，查询两个人是否同门用find。路径压缩后几乎O(1)。&quot;</p><p>给定N个元素和M个操作：合并两个集合，或查询两个元素是否在同一集合。</p>

### Input
<p>第一行两个整数N和M。接下来M行，每行M 1 a b（合并a和b所在集合）或Q a b（查询a和b是否同属一个集合）。</p>

### Output
<p>对每个Q操作输出一行Yes或No。</p>

### Samples
**Sample Input 1**
```
4 5
M 1 2
Q 1 2
M 2 3
Q 1 3
Q 1 4
```
**Sample Output 1**
```
Yes
Yes
No
```

### Hint
<p>并查集：find时路径压缩，union时合并两棵树。</p><p><a href="https://www.acwing.com/problem/content/838/" target="_blank">原题链接</a></p>

---

## [JD139] 门派计数

### Description
<p>赵晴儿在并查集的基础上问：&quot;每个门派有多少人？&quot;</p><p>梁嘉峰说：&quot;在合并时，把一个门派的人数加到另一个上。查询时直接读人数。&quot;</p><p>给定N个元素和M个操作：合并两个集合（C a b），查询两个元素是否在同一集合（Q1 a b），或查询某个元素所在集合的大小（Q2 a）。</p>

### Input
<p>第一行两个整数N和M。接下来M行，每行C a b（合并a和b所在集合）、Q1 a b（查询a和b是否在同一集合）、或Q2 a（查询a所在集合的大小）。</p>

### Output
<p>对每个Q1操作输出Yes或No；对每个Q2操作输出一行集合大小。</p>

### Samples
**Sample Input 1**
```
4 5
C 1 2
Q2 1
C 2 3
Q2 1
Q2 4
```
**Sample Output 1**
```
2
3
1
```

### Hint
<p>维护size[]数组，合并时更新size。用C a b合并，Q1 a b查是否同集，Q2 a查集合大小。</p><p><a href="https://www.acwing.com/problem/content/839/" target="_blank">原题链接</a></p>

---

## [JD140] 三界相克

### Description
<p>梁嘉峰说：&quot;A吃B，B吃C，C吃A——三种动物形成环形食物链。给你N个动物和K句话，判断哪些话是假的。&quot;</p><p>赵晴儿解释：&quot;扩展并查集——每个动物拆成三个节点，分别表示&#039;A是A&#039;、&#039;A是B的食物&#039;、&#039;A是C的食物&#039;。用模3的关系判断真假。&quot;</p><p>给定N个动物和K句话，判断假话数量。</p>

### Input
<p>第一行两个整数N和K。接下来K行，每行两个整数x y z（x=1表示y和z同类，x=2表示y吃z）。</p>

### Output
<p>一行，假话的数量。</p>

### Samples
**Sample Input 1**
```
100 7
1 101 1
2 1 2
2 2 3
2 3 3
1 1 3
2 3 1
1 5 5
```
**Sample Output 1**
```
3
```

### Hint
<p>扩展并查集：每个点拆成3个，模3判断关系。</p><p><a href="https://www.acwing.com/problem/content/242/" target="_blank">原题链接</a></p>

---

## [JD141] 雾中排阵

### Description
<p>迷雾弥漫的林间小径上，梁嘉峰递给李少白n枚令牌：&quot;按字典序列出1到n的所有排列。每步选一个没用过的令牌，选完所有就回头换一个——这就是DFS回溯。&quot;</p><p>给定整数n，按字典序输出1到n的所有全排列。</p>

### Input
<p>一个整数n（1≤n≤9）。</p>

### Output
<p>每行一个排列，数字之间空格隔开，按字典序输出。</p>

### Samples
**Sample Input 1**
```
3
```
**Sample Output 1**
```
1 2 3
1 3 2
2 1 3
2 3 1
3 1 2
3 2 1
```

### Hint
<p>DFS+回溯：选→递归→撤销。用used[]标记。</p><p><a href="https://www.acwing.com/problem/content/844/" target="_blank">原题链接</a></p>

---

## [JD142] 棋盘布后

### Description
<p>赵晴儿指着一个n×n的棋盘：&quot;放n个皇后，不能同行、同列、同对角线。有多少种放法？&quot;</p><p>李少白逐行放置，用三个布尔数组标记列和对角线。&quot;每行选一个安全的位置放皇后，递归下一行。冲突就回退。&quot;</p><p>给定n，求n皇后的所有解。</p>

### Input
<p>一个整数n。</p>

### Output
<p>所有解，每个解n行（Q表示皇后，.表示空），解之间空行。</p>

### Samples
**Sample Input 1**
```
4
```
**Sample Output 1**
```
.Q..
...Q
Q...
..Q.

..Q.
Q...
...Q
.Q..
```

### Hint
<p>DFS+回溯：逐行放置，标记列和两条对角线。</p><p><a href="https://www.acwing.com/problem/content/845/" target="_blank">原题链接</a></p>

---

## [JD143] 迷宫寻路

### Description
<p>石墙围成的迷宫，入口在左上角，出口在右下角。赵晴儿问：&quot;最短路径有多长？&quot;</p><p>梁嘉峰说：&quot;BFS——从入口开始，一层一层向外扩展。第一次到达出口时，层数就是最短路径。&quot;</p><p>给定一个n×m的迷宫（0可走，1是墙），求最短路径长度。</p>

### Input
<p>第一行两个整数n和m。接下来n行每行m个整数（0可走，1是墙）。</p>

### Output
<p>一行，最短路径长度。不可达输出-1。</p>

### Samples
**Sample Input 1**
```
5 5
0 1 0 0 0
0 1 0 1 0
0 0 0 0 0
0 1 1 1 0
0 0 0 1 0
```
**Sample Output 1**
```
8
```

### Hint
<p>BFS层序遍历，第一次到达终点就是最短路径。</p><p><a href="https://www.acwing.com/problem/content/846/" target="_blank">原题链接</a></p>

---

## [JD144] 八码迷局

### Description
<p>迷雾中出现一个3×3数字拼盘，有一个空格。赵晴儿说：&quot;从初始状态移到目标状态，最少几步？每次只能把空格和相邻数字交换。&quot;</p><p>梁嘉峰说：&quot;BFS+状态压缩——把整个拼盘编码成一个字符串，每次移动生成新状态，用哈希表判重。&quot;</p><p>给定初始状态和目标状态，求最少移动步数。</p>

### Input
<p>两行，每行9个字符（3×3拼盘，x表示空格）。第一行初始状态，第二行目标状态。</p>

### Output
<p>一行，最少移动步数。无解输出-1。</p>

### Samples
**Sample Input 1**
```
1 2 3
x 4 6
7 5 8

1 2 3
4 5 6
7 8 x
```
**Sample Output 1**
```
2
```

### Hint
<p>BFS+状态编码为字符串，哈希表判重。</p><p><a href="https://www.acwing.com/problem/content/847/" target="_blank">原题链接</a></p>

---

## [JD145] 古树重心

### Description
<p>迷踪林深处有一棵大树。梁嘉峰说：&quot;找到它的重心——删除后最大子树最小的那个节点。&quot;</p><p>赵晴儿说：&quot;DFS遍历树，对每个节点计算：删掉它后，最大子树有多少个节点。取最小的那个。&quot;</p><p>给定一棵树，求其重心和最大子树的最小大小。</p>

### Input
<p>第一行一个整数n。接下来n-1行每行两个整数表示一条边。</p>

### Output
<p>一行，最大子树的最小大小。</p>

### Samples
**Sample Input 1**
```
9
1 2
1 7
1 4
2 8
2 5
4 3
4 6
6 9
```
**Sample Output 1**
```
4
```

### Hint
<p>DFS遍历树，计算每个节点的最大子树大小。重心=max(n-subSize, 各子树size)最小的节点。</p><p><a href="https://www.acwing.com/problem/content/848/" target="_blank">原题链接</a></p>

---

## [JD146] 城池层递

### Description
<p>城际连横。赵晴儿铺开城池图：&quot;城池之间有道路相连。从城1出发，到第n号城池的最短距离是多少？&quot;</p><p>梁嘉峰说：&quot;BFS——从城1开始，每层扩展一步。第一次到达的城池，层数就是最短距离。&quot;</p><p><b>注意</b>：城池编号<b>不一定是 1∼n 的连续整数</b>，可能存在编号大于 n 的城池。例如 n=4，但城池编号可能是 1,3,5,10。请将数组开到足够大（建议 N=100010）。</p>

### Input
<p>第一行两个整数n和m。接下来m行每行两个整数a b表示一条有向边。</p>

### Output
<p>一个整数，表示从 1 号城池到 n 号城池的最短距离（每条边长度为 1）。如果无法到达，输出 -1。</p>

### Samples
**Sample Input 1**
```
4 5
1 2
2 3
3 4
1 3
1 4
```
**Sample Output 1**
```
1
```

### Hint
<p>BFS层序遍历：dist[1]=0，对于每条有向边 u→v，若 dist[v]==-1 则 dist[v]=dist[u]+1。最后输出 dist[n] 即可，不需要输出所有点的距离。</p><p>注意城池编号可能超过 n，建议数组大小 N=100010。</p><p><a href="https://www.acwing.com/problem/content/849/" target="_blank">原题链接</a></p>

---

## [JD147] 拓扑之序

### Description
<p>城际连横。赵晴儿铺开城池图：&quot;城池之间有方向道路。排出一个合法的建设顺序——每条道路都是从先建的城池指向后建的。&quot;</p><p>梁嘉峰说：&quot;拓扑排序——找入度为0的点，输出后删除它的出边，再找下一个入度为0的点。如果有环，就不可能全部输出。&quot;</p><p>给定一个有向图，输出拓扑序。有环则输出-1。</p>

### Input
<p>第一行两个整数n和m。接下来m行每行两个整数a b表示一条有向边。</p>

### Output
<p>一行，拓扑序，空格隔开。有环输出-1。</p>

### Samples
**Sample Input 1**
```
3 3
1 2
2 3
1 3
```
**Sample Output 1**
```
1 2 3
```

### Hint
<p>BFS+入度维护。有环则无解。</p><p><a href="https://www.acwing.com/problem/content/850/" target="_blank">原题链接</a></p>

---

## [JD148] 近者先行

### Description
<p>赵晴儿在城池图上标了距离：&quot;从城1出发，到每个城池的最短距离是多少？边权都是正数。&quot;</p><p>梁嘉峰说：&quot;朴素Dijkstra——每次选未访问的最近点，用它更新邻居的距离。选过的点不再更新。&quot;</p><p>给定一个带权有向图和起点，求到每个点的最短距离。</p>

### Input
<p>第一行两个整数n和m。接下来m行每行三个整数a b w表示一条从a到b的权为w的有向边。</p>

### Output
<p>一行，n个整数表示到点1的最短距离。</p>

### Samples
**Sample Input 1**
```
3 3
1 2 2
2 3 1
1 3 4
```
**Sample Output 1**
```
0 2 3
```

### Hint
<p>Dijkstra：O(n²)。每次选最近未访问点，更新邻居。</p><p><a href="https://www.acwing.com/problem/content/851/" target="_blank">原题链接</a></p>

---

## [JD149] 堆中取近

### Description
<p>&quot;点很多，边很少。用堆优化Dijkstra——用小根堆代替遍历找最近点。&quot;赵晴儿说，&quot;每次从堆顶取最近的未访问点。&quot;</p><p>给定一个带权有向图和起点，求到每个点的最短距离。边数远小于点数的平方。</p>

### Input
<p>第一行两个整数n和m。接下来m行每行三个整数a b w。</p>

### Output
<p>一行，到点1的最短距离。</p>

### Samples
**Sample Input 1**
```
3 3
1 2 2
2 3 1
1 3 4
```
**Sample Output 1**
```
0 2 3
```

### Hint
<p>堆优化Dijkstra：O(mlogn)。用小根堆取最近点。</p><p><a href="https://www.acwing.com/problem/content/852/" target="_blank">原题链接</a></p>

---

## [JD150] 队中松弛

### Description
<p>赵晴儿指着图上的负权边：&quot;Dijkstra处理不了负权边。用SPFA——BFS+松弛。把待更新的点放入队列，每次取一个点，用它更新邻居。邻居变短了就入队。&quot;</p><p>给定一个可能有负权边的有向图，求从 1 号点到 n 号点的最短距离。图中可能有重边和自环。</p>

### Input
<p>第一行两个整数n和m。接下来m行每行三个整数a b w（w可为负）。</p>

### Output
<p>一行一个整数，表示从 1 号点到 n 号点的最短距离。每条边长度可为负。数据保证图中没有负环。</p>

### Samples
**Sample Input 1**
```
3 3
1 2 -1
2 3 2
1 3 3
```
**Sample Output 1**
```
0 -1 1
```

### Hint
<p>SPFA：队列优化Bellman-Ford。</p><p><a href="https://www.acwing.com/problem/content/853/" target="_blank">原题链接</a></p>

---

## [JD151] 万径归一

### Description
<p>梁嘉峰铺开全图：&quot;多源最短路——任意两点之间的最短距离。Floyd算法：三重循环，dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j])。&quot;</p><p>给定一个带权图，求任意两点之间的最短距离。</p>

### Input
<p>第一行三个整数n、m和q。接下来m行每行三个整数a b w。接下来q行每行两个整数a b。</p>

### Output
<p>q行，每行一个整数。不可达输出impossible。</p>

### Samples
**Sample Input 1**
```
3 3 2
1 2 2
2 3 1
1 3 4
1 3
2 1
```
**Sample Output 1**
```
3
3
```

### Hint
<p>Floyd：O(n³)。三重循环枚举中间点。</p><p><a href="https://www.acwing.com/problem/content/856/" target="_blank">原题链接</a></p>

---

## [JD152] 蔓延成网

### Description
<p>赵晴儿指着散落的城池：&quot;用最少的路把所有城池连起来，总路长最短。&quot;</p><p>梁嘉峰说：&quot;Prim算法——类似Dijkstra，每次选离已连通部分最近的未加入点，把那条边加入生成树。&quot;</p><p>给定一个带权无向图，求最小生成树的总权值。</p>

### Input
<p>第一行两个整数n和m。接下来m行每行三个整数a b w。</p>

### Output
<p>一行，最小生成树的总权值。不连通输出impossible。</p>

### Samples
**Sample Input 1**
```
4 5
1 2 1
1 3 2
2 3 3
2 4 4
3 4 5
```
**Sample Output 1**
```
7
```

### Hint
<p>Prim：O(n²)。每次选最近未加入点。</p><p><a href="https://www.acwing.com/problem/content/860/" target="_blank">原题链接</a></p>

---

## [JD153] 逐边成林

### Description
<p>梁嘉峰说：&quot;Kruskal——按边权从小到大排序，逐条加入。如果这条边的两个端点已经在同一连通块里（用并查集判断），就跳过；否则加入。&quot;</p><p>给定一个带权无向图，求最小生成树的总权值。</p>

### Input
<p>第一行两个整数n和m。接下来m行每行三个整数a b w。</p>

### Output
<p>一行，最小生成树的总权值。不连通输出impossible。</p>

### Samples
**Sample Input 1**
```
4 5
1 2 1
1 3 2
2 3 3
2 4 4
3 4 5
```
**Sample Output 1**
```
7
```

### Hint
<p>Kruskal：O(mlogm)。按边权排序，并查集判环。</p><p><a href="https://www.acwing.com/problem/content/860/" target="_blank">原题链接</a></p>

---

## [JD154] 二色分界

### Description
<p>赵晴儿指着一个图：&quot;能不能把所有点分成两组，同组之间没有直接相连的边？&quot;</p><p>梁嘉峰说：&quot;染色法——从任意点开始，染红色；它的邻居染蓝色；邻居的邻居染红色……如果某个点需要同时染两种颜色，就不是二分图。&quot;</p><p>给定一个无向图，判断是否是二分图。</p>

### Input
<p>第一行两个整数n和m。接下来m行每行两个整数a b。</p>

### Output
<p>一行，Yes或No。</p>

### Samples
**Sample Input 1**
```
4 4
1 2
2 3
3 4
4 1
```
**Sample Output 1**
```
Yes
```

### Hint
<p>BFS/DFS染色，冲突则不是二分图。</p><p><a href="https://www.acwing.com/problem/content/862/" target="_blank">原题链接</a></p>

---

## [JD155] 一剑一鞘

### Description
<p>华山脚下，试剑台前。西域刀客赫连铁拔出背上唯一的刀鞘，鞘中却藏着N柄短刀，每柄有重量和锋芒。刀鞘容量有限——选哪些刀，才能让锋芒之和最大？</p><p>李少白拔剑上前。梁嘉峰低声道：&quot;每柄刀只能选一次——01背包。逆序遍历容量，dp[j] = max(dp[j], dp[j-v]+w)。&quot;</p><p>李少白深吸一口气，提笔写下。赫连铁看了答案，缓缓点头：&quot;第一关，过了。&quot;</p>

### Input
<p>第一行两个整数N和V。接下来N行每行两个整数v和w。</p>

### Output
<p>一行，最大价值。</p>

### Samples
**Sample Input 1**
```
4 5
1 2
2 4
3 4
4 5
```
**Sample Output 1**
```
8
```

### Hint
<p>01背包：dp[j] = max(dp[j], dp[j-v[i]]+w[i])，逆序遍历j。</p><p><a href="https://www.acwing.com/problem/content/0/" target="_blank">原题链接</a></p>

---

## [JD156] 无穷剑阵

### Description
<p>第二阵。铸剑山庄庄主出场，身后跟着仆从，抬着无数柄相同的剑。&quot;每柄剑重v，锋利w。我的剑取之不尽——你能装多少？&quot;</p><p>赵晴儿上前一步：&quot;完全背包——每种剑可以拿无限柄，内层循环正序遍历。&quot;她提笔如飞，片刻交卷。庄主愕然：&quot;这么快？&quot;</p>

### Input
<p>第一行两个整数N和V。接下来N行每行两个整数v和w。</p>

### Output
<p>一行，最大价值。</p>

### Samples
**Sample Input 1**
```
4 5
1 2
2 4
3 4
4 5
```
**Sample Output 1**
```
10
```

### Hint
<p>完全背包：内层正序遍历。每种物品可选无限次。</p><p><a href="https://www.acwing.com/problem/content/0/" target="_blank">原题链接</a></p>

---

## [JD157] 三角登峰

### Description
<p>华山云梯，台阶排成三角形，每级刻着一个数字。从顶到底，每步只能向左下或右下。&quot;找出一条路径，使数字之和最大。&quot;裁判宣布。</p><p>李少白仰望云梯，忽然笑了：&quot;从底向上——每级取下方两个方向中较大的，加上自己。一层层往上推，山顶就是答案。&quot;</p>

### Input
<p>第一行一个整数n。接下来n行第i行有i个整数。</p>

### Output
<p>一行，最大路径和。</p>

### Samples
**Sample Input 1**
```
5
7
3 8
8 1 0
2 7 4 4
4 5 2 6 5
```
**Sample Output 1**
```
30
```

### Hint
<p>从底向上DP。dp[i][j] = max(dp[i+1][j], dp[i+1][j+1]) + a[i][j]。</p><p><a href="https://www.acwing.com/problem/content/0/" target="_blank">原题链接</a></p>

---

## [JD158] 递增剑意

### Description
<p>擂台上，青城派弟子摆出一排剑，每把刻着一个数字。&quot;选出最长的递增序列——数字必须递增，不必相邻。&quot;</p><p>李少白用O(n²)的DP接下第一招。梁嘉峰却摇头：&quot;后面数据更大。贪心+二分——维护最小末尾数组，O(nlogn)。&quot;</p><p>李少白重写代码，青城弟子面色一变：&quot;好快的剑！&quot;</p>

### Input
<p>第一行一个整数n。第二行n个整数。</p>

### Output
<p>一行，最长递增子序列的长度。</p>

### Samples
**Sample Input 1**
```
7
3 1 2 1 8 5 6
```
**Sample Output 1**
```
4
```

### Hint
<p>贪心+二分：维护最小末尾数组q[]，二分查找替换。O(nlogn)。</p><p><a href="https://www.acwing.com/problem/content/0/" target="_blank">原题链接</a></p>

---

## [JD159] 双谱共鸣

### Description
<p>峨眉派女侠递来两卷剑谱：&quot;找出两谱中最长的公共剑招序列——顺序一致但不必连续。&quot;</p><p>赵晴儿接过剑谱：&quot;LCS——dp[i][j]表示前i招和前j招的最长公共子序列。相等时加一，否则取较大值。&quot;</p><p>女侠看了答案，微微一笑：&quot;峨眉输了。&quot;</p>

### Input
<p>第一行两个整数n和m。第二行长度为n的字符串。第三行长度为m的字符串。</p>

### Output
<p>一行，最长公共子序列的长度。</p>

### Samples
**Sample Input 1**
```
4 5
abcd
acebd
```
**Sample Output 1**
```
3
```

### Hint
<p>LCS：二维DP。相等时dp[i][j]=dp[i-1][j-1]+1，否则取max(dp[i-1][j], dp[i][j-1])。</p><p><a href="https://www.acwing.com/problem/content/877/" target="_blank">原题链接</a></p>

---

## [JD160] 合石成堆

### Description
<p>华山脚下的石阵——N堆石子排成一行，每次只能合并相邻两堆，代价是两堆之和。&quot;全部合并的最小代价？&quot;</p><p>少林高僧双手合十：&quot;贪心不行，必须区间DP。枚举分割点k，dp[i][j] = min(dp[i][k] + dp[k+1][j]) + sum(i..j)。&quot;</p><p>李少白闭目凝神，三重循环缓缓展开。高僧点头：&quot;施主悟了。&quot;</p>

### Input
<p>第一行一个整数N。第二行N个整数。</p>

### Output
<p>一行，最小总代价。</p>

### Samples
**Sample Input 1**
```
4
1 3 5 2
```
**Sample Output 1**
```
22
```

### Hint
<p>区间DP：枚举分割点。dp[i][j] = min(dp[i][k] + dp[k+1][j]) + sum(i..j)。O(n³)。</p><p><a href="https://www.acwing.com/problem/content/870/" target="_blank">原题链接</a></p>

---

## [JD161] 改字成经

### Description
<p>武当道长递来两卷经文：&quot;把A卷改成B卷，最少几步？增、删、改，每次算一步。&quot;</p><p>李少白沉思：&quot;dp[i][j]表示A的前i个改成B的前j个的最少操作。三种操作取min+1。&quot;</p><p>道长抚须而笑：&quot;小友的剑法，已经入了化境。&quot;</p>

### Input
<p>第一行一个整数 n，表示字符串 A 的长度。<br>第二行一个长度为 n 的字符串 A。<br>第三行一个整数 m，表示字符串 B 的长度。<br>第四行一个长度为 m 的字符串 B。</p>

### Output
<p>一行，编辑距离。</p>

### Samples
**Sample Input 1**
```
3 3
abc
adc
```
**Sample Output 1**
```
1
```

### Hint
<p>编辑距离：dp[i][j] = min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+cost)。</p><p><a href="https://www.acwing.com/problem/content/904/" target="_blank">原题链接</a></p>

---

## [JD162] 雪道寻长

### Description
<p>华山后山，白雪皑皑。一个R×C的滑雪场，从任意高处滑向相邻的低处。&quot;最长能滑多远？&quot;</p><p>赵晴儿踏雪而行：&quot;记忆化搜索——DFS+缓存。每个格子只算一次，取四个方向中最长的路径加一。&quot;</p><p>她的身影在雪道上飞驰，划出一道完美的弧线。</p>

### Input
<p>第一行两个整数R和C。接下来R行每行C个整数表示高度。</p>

### Output
<p>一行，最长递减路径的长度。</p>

### Samples
**Sample Input 1**
```
5 5
1 2 3 4 5
16 17 18 19 6
15 24 25 20 7
14 23 22 21 8
13 12 11 10 9
```
**Sample Output 1**
```
25
```

### Hint
<p>记忆化搜索：DFS+缓存。每个格子只算一次，取四个方向中最长路径+1。</p><p><a href="https://www.acwing.com/problem/content/903/" target="_blank">原题链接</a></p>

---

## [JD117] 独剑无双

### Description
<p>藏剑阁深处，梁嘉峰领着李少白走进一间密室。墙上挂满了剑，每把剑柄上都刻着一个数字。</p><p>&quot;这些剑，成双成对，唯有一把是独一无二的。&quot;梁嘉峰说，&quot;你能在 O(1) 额外空间内找出它吗？&quot;</p><p>李少白想用哈希表记录每把剑出现的次数。赵晴儿摇头：&quot;空间不够。想想异或的性质——a ^ a = 0，a ^ 0 = a。成对的剑异或后消失，留下的就是独剑。&quot;</p><p>给定 n 个整数，其中只有一个数出现了一次，其余数都恰好出现了两次。找出那个只出现一次的数。要求时间复杂度 O(n)，空间复杂度 O(1)。</p>

### Input
<p>第一行一个整数 n（n 为奇数，1 ≤ n ≤ 100000）。第二行 n 个整数，每个数在 int 范围内。</p>

### Output
<p>一行，只出现一次的那个数。</p>

### Samples
**Sample Input 1**
```
5
1 2 3 2 1
```
**Sample Output 1**
```
3
```

### Hint
<p><a href="https://www.acwing.com/problem/content/92/" target="_blank">原题链接</a></p><p>异或性质：a^a=0, a^0=a。所有数异或，成对消失，独者现身。O(n) 时间，O(1) 空间。</p>

---

## [JD118] 剑招收放

### Description
<p>剑道宗大殿前，十八般兵器陈列两旁。梁嘉峰指着 n 把剑说：&quot;每一把，你可以选择施展（选）或收起（不选）。列出所有可能的剑招组合。&quot;</p><p>李少白问：&quot;n 把剑有 2^n 种组合，怎么枚举？&quot;赵晴儿递来一张纸：&quot;递归。对于每把剑，先试&#039;选&#039;，再试&#039;不选&#039;。走到尽头就输出当前组合。&quot;</p><p>给定 n，输出 1~n 的所有非空子集。同一行内的数必须升序排列，相邻两个数之间用空格隔开。各行（不同方案）之间的顺序任意。</p>

### Input
<p>一行一个整数 n（1 ≤ n ≤ 16）。</p>

### Output
<p>每行一个子集，子集内数字升序排列，子集之间按字典序排列。空集不输出。</p>

### Samples
**Sample Input 1**
```
3
```
**Sample Output 1**
```
1
1 2
1 2 3
1 3
2
2 3
3
```

### Hint
<p><a href="https://www.acwing.com/problem/content/94/" target="_blank">原题链接</a></p><p>递归枚举：对每个位置选或不选，到达边界输出。2^n 种组合。</p>

---

## [JD119] 剑阵组合

### Description
<p>练武场上，梁嘉峰递给李少白 n 把剑，说：&quot;从中选出 k 把，列出所有选法。&quot;</p><p>李少白问：&quot;这和子集枚举有什么区别？&quot;赵晴儿说：&quot;子集枚举是选任意数量，组合枚举是恰好选 k 个。多了一个约束——必须选满 k 个才能输出。但递归框架类似，只是多了一个剪枝。&quot;</p><p>给定 n 和 k，按字典序输出从 1~n 中选 k 个数的所有组合。每个组合内数字升序排列。</p>

### Input
<p>一行两个整数 n 和 k（1 ≤ k ≤ n ≤ 16）。</p>

### Output
<p>每行 k 个数（升序），组合之间按字典序排列。</p>

### Samples
**Sample Input 1**
```
4 2
```
**Sample Output 1**
```
1 2
1 3
1 4
2 3
2 4
3 4
```

### Hint
<p><a href="https://www.acwing.com/problem/content/95/" target="_blank">原题链接</a></p><p>递归枚举，每次从上一个数+1开始。剪枝：剩余数字不够则提前返回。C(n,k) 种组合。</p>

---

## [JD120] 江湖真假

### Description
<p>江湖之中，n 位高手各立门派。有人传言：&quot;甲和乙是同门师兄弟。&quot;又有人说：&quot;丙能打败丁。&quot;</p><p>梁嘉峰说：&quot;江湖中，同类不吃同类。但吃的关系是传递的——甲吃乙、乙吃丙，则甲也吃丙。&quot;</p><p>赵晴儿教他：&quot;用带权并查集。每个节点到根的距离 mod 3 表示关系：距离 0 是同类，距离 1 能吃根，距离 2 被根吃。&quot;</p><p>给定 n 个人和 m 条关系声明，判断有多少条是假的（与前面的真话矛盾）。</p>

### Input
<p>第一行两个整数 n 和 m（1 ≤ n ≤ 50000, 1 ≤ m ≤ 100000）。接下来 m 行，每行三个整数 d x y。d=1 表示同类，d=2 表示 x 吃 y。</p>

### Output
<p>一行，假话的数量。</p>

### Samples
**Sample Input 1**
```
100 7
1 101 1
2 1 2
2 2 3
2 3 3
1 1 3
2 3 1
1 5 5
```
**Sample Output 1**
```
3
```

### Hint
<p><a href="https://www.acwing.com/problem/content/242/" target="_blank">原题链接</a></p><p>带权并查集。节点到根距离 mod 3：0=同类，1=吃根，2=被根吃。路径压缩时更新距离。</p>

---

# Contest 362

## [LinK01] A+B

### Description
<p>输入两个整数，求这两个整数的和是多少。</p>

### Input
<p>输入两个整数A,B，用空格隔开</p><p>0≤A,B≤10^8</p>

### Output
<p><span style="color: rgb(51, 51, 51);">输出一个整数，表示这两个数的和</span><br /></p>

### Samples
**Sample Input 1**
```
7 7
```
**Sample Output 1**
```
14
```

### Hint
<p><a href="https://www.bilibili.com/video/BV1D44y1B7DC" target="_blank">Andy的讲解(2021)</a><br /></p>

---

## [LinK02] 完美立方

### Description
<p><span style="color: rgb(35, 31, 23);">形如a^</span>3<span style="color: rgb(35, 31, 23);">= b^</span>3<span style="color: rgb(35, 31, 23);">+ c^</span>3<span style="color: rgb(35, 31, 23);">+ d^</span>3<span style="color: rgb(35, 31, 23);">的等式被称为完美立方等式。例如12^</span>3<span style="color: rgb(35, 31, 23);">= 6^</span>3<span style="color: rgb(35, 31, 23);">+ 8^</span>3<span style="color: rgb(35, 31, 23);">+ 10^</span>3<span style="color: rgb(35, 31, 23);">。编写一个程序，对任给的正整数N (N≤100)，寻找所有的四元组(a, b, c, d)，使得</span><span style="color: rgb(35, 31, 23);">a^</span>3<span style="color: rgb(35, 31, 23);">= b^</span>3<span style="color: rgb(35, 31, 23);">+ c^</span>3<span style="color: rgb(35, 31, 23);">+ d^</span>3<span style="color: rgb(35, 31, 23);">，其中a,b,c,d 大于 1, 小于等于N，且b&lt;=c&lt;=d。</span><br /></p>

### Input
<p><span style="color: rgb(35, 31, 23);">一个正整数N (N≤100)。</span><br /></p>

### Output
<p><span style="color: rgb(35, 31, 23);">每行输出一个完美立方。输出格式为：</span></p><p><span style="color: rgb(35, 31, 23);">Cube = a, Triple = (b,c,d)</span></p><p><span style="color: rgb(35, 31, 23);">其中a,b,c,d所在位置分别用实际求出四元组值代入。</span></p><p><span style="color: rgb(35, 31, 23);">请按照a的值，从小到大依次输出。当两个完美立方等式中a的值相同，则b值小的优先输出、仍相同则c值小的优先输出、再相同则d值小的先输出。</span></p>

### Samples
**Sample Input 1**
```
24
```
**Sample Output 1**
```
Cube = 6, Triple = (3,4,5)
Cube = 12, Triple = (6,8,10)
Cube = 18, Triple = (2,12,16)
Cube = 18, Triple = (9,12,15)
Cube = 19, Triple = (3,10,18)
Cube = 20, Triple = (7,14,17)
Cube = 24, Triple = (12,16,20)
```

### Hint
<p><a href="https://www.bilibili.com/video/bv1Nb4y1C7NJ" target="_blank">Andy讲解(2021)</a><br /></p>

---

## [LinK03] 人的周期

### Description
<p><span style="color: rgb(35, 31, 23);">据说人生来就有三个生理周期，分别为体力周期、感情周期和智力周期，它们的周期长度分别为23天、28天和33天。</span></p><p><span style="color: rgb(35, 31, 23);">每一个周期中有一天是高峰。在高峰这天，人会在相应的方面表现出色。</span><span style="color: rgb(35, 31, 23);">例如，在智力周期的高峰，人会思维敏捷，注意力容易高度集中。</span></p><p><span style="color: rgb(35, 31, 23);">因为三个周期的长度不同，所以通常三个周期的高峰不会落在同一天。</span></p><p><span style="color: rgb(35, 31, 23);">对于每个人，想知道何时三个高峰落在同一天。</span></p><p><span style="color: rgb(35, 31, 23);">对于每个周期，会给出从当前年份的第一天开始，到出现高峰的天数（不一定是第一次高峰出现的时间）。</span></p><p><span style="color: rgb(35, 31, 23);">给定一个从当年第一天开始的天数，你的任务是输出从给定时间开始（不包括给定时间），下一次三个高峰落在同一天的时间（距给定时间的天数）。例如：给定时间为10，下次出现三个高峰同一天的时间是12，则输出2（注意这里不是3）。</span></p>

### Input
<p><span style="color: rgb(35, 31, 23);">输入包含多组数据，每一组数据由四个整数组成，数据以-1 -1 -1 -1 结束。</span></p><p><span style="color: rgb(35, 31, 23);">对于每一行的四个整数p, e, i和d, 其中p, e, i分别表示体力、情感和智力高峰出现的时间（时间从当年的第一天开始计算）。</span></p><p><span style="color: rgb(35, 31, 23);">d是给定的时间，可能小于p, e或i。所有给定时间是非负的并且小于或等于365，所求的时间小于或等于21252。</span></p>

### Output
<p><span style="color: rgb(35, 31, 23);">从给定时间起，下一次三个高峰同一天的时间（距离给定时间的天数）。</span><br /></p>

### Samples
**Sample Input 1**
```
0 0 0 0
0 0 0 100
5 20 34 325
4 5 6 7
283 102 23 320
203 301 203 40
-1 -1 -1 -1
```
**Sample Output 1**
```
Case 1: the next triple peak occurs in 21252 days.
Case 2: the next triple peak occurs in 21152 days.
Case 3: the next triple peak occurs in 19575 days.
Case 4: the next triple peak occurs in 16994 days.
Case 5: the next triple peak occurs in 8910 days.
Case 6: the next triple peak occurs in 10789 days.
```

### Hint
<p><a href="https://www.bilibili.com/video/BV1yo4y1k7kD" target="_blank">Andy讲解(2021)</a><br /></p>

---

## [LinK04] 排序考试

### Description
<p>处于某种原因，一点都不懂编程的某某系小迅老师竟然成功跳槽到计算机系来教大一新生如何编程。</p><p>看着这位在台上胡言乱语，水平比同学小华弱太多的老师，小鲁简直不忍直视。</p><p>那学期的期中考试，小讯老师出的题目竟然是：“请写一个排序算法给数组排序，结果按照升序输出。”</p><p>经过NQ49斩的小鲁分分钟就完成了代码。小讯老师一看，哎呀不得了，得提高期中考试难度。</p><p>他立刻把题目改为：“给定任意T组整数，每组整数都要按升序输出。”</p><p>小鲁笑了笑，原来这类题已经难不倒他了，原来他早就超过了大一上小讯老师的水平了！</p><p>小鲁水平进阶了，你做得到吗？</p>

### Input
<p>第一行是整数T，表示一共有T组数据。</p><p>接下来T行，每行有N+1个数，第一个整数表示该行有N个待排序的数字。</p><p>整数N(1&lt;=N&lt;=1000000），T（1&lt;=T&lt;=100）。</p>

### Output
<p>对于每组整数，按照升序输出排序结果，每个结果占一行。<br /></p>

### Samples
**Sample Input 1**
```
3
4 412 120 5560 3760
5 576 66 35 99 88
4 127 100 510 380
```
**Sample Output 1**
```
120 412 3760 5560
35 66 88 99 576
100 127 380 510
```

---

## [LinK05] 假币问题

### Description
<p>林克有12枚银币。其中有11枚真币和1枚假币。假币看起来和真币没有区别，但是重量不同。但林克不知道假币比真币轻还是重。</p><p>于是他向他朋友约珥借了一架天平，用这架天平称了这些币三次。</p><p><span style="color: rgb(35, 31, 23);">如果用天平称两枚硬币，发现天平平衡，说明两枚都是真的。</span><span style="color: rgb(35, 31, 23);">如果用一枚真币与另一枚银币比较，发现它比真币轻或重，说明它是假币。</span></p><p>经过精心的设计，聪明的林克根据这三次称量结果找出假币，并且能够确定假币是轻是重。<br /></p><p>如果给你林克的称量数据，你也可以找出假币并且确定假币是轻是重吗？（林克提供的称量数据保证一定能找出假币）。</p>

### Input
<p><span style="color: rgb(35, 31, 23);">第一行有一个数字n，表示有n组测试用例。</span></p><p><span style="color: rgb(35, 31, 23);">对于每组测试用例：</span></p><p><span style="color: rgb(35, 31, 23);">输入有三行，每行表示一次称量的结果。林克事先将银币标号为A-L。</span></p><p><span style="color: rgb(35, 31, 23);">每次称量的结果用三个以空格隔开的字符串表示：</span></p><p><span style="color: rgb(35, 31, 23);">天平左边放置的硬币  天平右边放置的硬币  平衡状态。</span></p><p><span style="color: rgb(35, 31, 23);">其中平衡状态用``up&#039;&#039;, ``down&#039;&#039;, 或 ``even&#039;&#039;表示, 分别为右端高、右端低和平衡。天平左右的硬币数总是相等的。</span></p>

### Output
<p><span style="color: rgb(35, 31, 23);">输出哪一个标号的银币是假币，并说明它比真币轻还是重(heavy or light)。</span><br /></p>

### Samples
**Sample Input 1**
```
1
ABCD EFGH even
ABCI EFJK up
ABIJ EFGH even
```
**Sample Output 1**
```
K is the counterfeit coin and it is light.
```

### Hint
<p><a href="https://www.bilibili.com/video/BV1kM4y1u71y" target="_blank">Andy讲解(2021)</a><br /></p>

---

## [LinK06] 两数之和

### Description
<p>双指针是极其常用的算法，这是必须学会，也是不可不会的。</p><p>但是双指针看似简单，背后的思想并不容易掌握，小华深谙此理，为了帮助小鲁一步一步的掌握这编程利器，他为小鲁精心设计了三道题：</p><p>第一题：</p><p>给定一<span style="color: rgb(51, 51, 51);">个目标值 target，请你在</span>不包含重复元素的按升序排列的整数数组 a中，找出和为目标值的那两个整数，并返回他们的数组下标。</p><p>你可以假设每种输入只会对应一个答案。<br /></p><p><span style="color: rgb(227, 55, 55);">例如:给定 a= [2, 7, 10, 15], target = 17，因为 a[1] + a[2] = 7 + 10 = 17，所以返回 [1 2]</span></p>

### Input
<p>输入数据为2行，第一行有两个整数 target和n，其中target代表要搜索的目标和，n表示数组a的元素个数</p><p>第二行表示数组a的n个数，每个元素用空格隔开。</p>

### Output
<p>输出和为target的两个元素的下标 i j ，其中(i&lt;j)。</p>

### Samples
**Sample Input 1**
```
17 7
1 3 5 7 10 11 19
```
**Sample Output 1**
```
3 4
```

### Hint
<p><a href="https://www.bilibili.com/video/BV1s54y1a7Qz" target="_blank">Andy讲解(2021)</a><br /></p>

---

## [LinK07] 三数之和

### Description
<p>看着小鲁AC了第一题，小华接着提出第二问：<br /></p><p>给定一个目标值 target，请在整数数组 a中，找出三个元素(x,y,z) 使x+y+z==target。<br /></p><p>请找到所有满足条件的三元组，并且请按从小到大的顺序输出所有合法的三元组。</p><p>注意：三元组中不允许包含重复数字，且输出的三元组中要求 x&lt;y&lt;z.</p><p><span style="color: rgb(227, 55, 55);">例如:给定target = 17，n=7, 数组<span style="color: rgb(227, 55, 55);">a= [0, 2, 7, 10, 15,18,25]</span></span></p><p><span style="color: rgb(227, 55, 55);">结果返回两个三元组：(0,2, 15), (</span><span style="color: rgb(227, 55, 55);">2,7,10)</span></p>

### Input
<p>输入数据为2行，第一行有两个整数 target和n，其中target代表要搜索的目标和，n表示数组a的元素个数</p><p>第二行表示数组a的n个数，每个元素用空格隔开。</p>

### Output
<p><span style="color: rgb(73, 80, 96);">输出所有满足和为target的三元组(x,y,z)，要求(x&lt; y &lt;z) 并且不允许有重复数字。</span><br /></p><p><span style="color: rgb(73, 80, 96);">把三元组按照x的大小升序输出，x相同的按照y的大小升序输出。</span></p>

### Samples
**Sample Input 1**
```
17 7
0 2 7 10 15 18 25 
```
**Sample Output 1**
```
0 2 15
0 7 10
```

### Hint
<p><a href="https://www.bilibili.com/video/BV1mV411v7NW" target="_blank">Andy讲解(2021)</a><br /></p>

---

## [LinK08] 四数之和

### Description
<p>当小鲁AC了第二问，小华接着提出第三问：<br /></p><p>给定一个目标值 target，请在整数数组 A中，找出四个元素(a,b,c,d) 使a+b+c+d==target。<br /></p><p>请找到所有满足条件的四元组，并且请按从小到大的顺序输出所有合法的四元组。</p><p>注意：四元组中不允许包含重复数字，且输出的四元组中要求 a&lt;b&lt;c&lt;d</p><p><span style="color: rgb(227, 55, 55);">例如:给定target = 17，n=7, 数组a= [0, 2, 5, 10, 15,18,25]</span></p><p><span style="color: rgb(227, 55, 55);">结果返回两个四元组：(0,2,5,10)</span></p>

### Input
<p>输入数据为2行，第一行有两个整数 target和n，其中target代表要搜索的目标和，n表示数组A的元素个数</p><p>第二行表示数组A的n个数，每个元素用空格隔开。</p>

### Output
<p>输出所有满足和为target的四元组<span style="color: rgb(51, 51, 51);">(a,b,c,d) 使(a&lt;b&lt;c&lt;d)</span>并且不允许有重复数字。<br /></p><p>把四元组按照a的大小升序输出，a相同的按照b的大小升序输出,<span style="color: rgb(51, 51, 51);">a,b相同的按照c的大小升序输出</span>。</p>

### Samples
**Sample Input 1**
```
17 7
0 2 5 10 15 18 25 
```
**Sample Output 1**
```
0 2 5 10
```

### Hint
<p><a href="https://www.bilibili.com/video/BV1nV411Y7wF/" target="_blank">Andy讲解(2021)</a><br /></p>

---

## [LinK09] 汉诺塔I

### Description
<p><img alt="image.png" src="/public/upload/c9f1809151.png" width="376" height="216" /><br /></p><p>有三根杆子A，B，C。A杆上有N个(N&gt;1)穿孔圆盘，盘的尺寸由下到上依次变小。要求按下列规则将所有圆盘移至C杆： 每次只能移动一个圆盘； 大盘不能叠在小盘上面。 提示：可将圆盘临时置于B杆，也可将从A杆移出的圆盘重新移回A杆，但都必须遵循上述两条规则。<br /></p><p>问：如何移？最少要移动多少次？</p><p><br /></p><p>解法</p><p>解法的基本思想是递归。假设有A、B、C三个塔，A塔有N块盘，目标是把这些盘全部移到C塔。那么先把A塔顶部的N-1块盘移动到B塔，再把A塔剩下的大盘移到C，最后把B塔的N-1块盘移到C。 每次移动多于一块盘时，则再次使用上述算法来移动。</p>

### Input
<p>盘子个数n(1&lt;=n&lt;=20)</p>

### Output
<p>输出移动的步骤，每行一步，如从A座移动到C座，输出&quot;A-&gt;C&quot;。</p>

### Samples
**Sample Input 1**
```
3
```
**Sample Output 1**
```
A->C
A->B
C->B
A->C
B->A
B->C
A->C
```

### Hint
<p><a href="https://www.bilibili.com/video/BV1qy4y187N1" target="_blank">Andy讲解(2021)</a><br /></p>

---

## [LinK10] 汉诺塔II

### Description
<p><img alt="image.png" src="/public/upload/8c61c1f7d1.png" width="376" height="216" /><br /></p><p>有三根杆子A，B，C。A杆上有N个(N&gt;1)穿孔圆盘，盘的尺寸由下到上依次变小。要求按下列规则将所有圆盘移至C杆： 每次只能移动一个圆盘； 大盘不能叠在小盘上面。 提示：可将圆盘临时置于B杆，也可将从A杆移出的圆盘重新移回A杆，但都必须遵循上述两条规则。<br /></p><p>问：如何移？最少要移动多少次？</p>

### Input
<p><span style="color: rgb(35, 31, 23);">输入为一个整数后面跟三个单字符字符串。</span></p><p><span style="color: rgb(35, 31, 23);">整数为盘子的数目，后三个字符表示三个杆子的编号。</span></p>

### Output
<p><span style="color: rgb(35, 31, 23);">输出每一步移动盘子的记录。一次移动一行。</span></p><p><span style="color: rgb(35, 31, 23);">每次移动的记录为例如3:a-&gt;b 的形式，即把编号为3的盘子从a杆移至b杆。</span></p><p><span style="color: rgb(35, 31, 23);">我们约定圆盘从小到大编号为1, 2, ...n。即最上面那个最小的圆盘编号为1，最下面最大的圆盘编号为n。</span></p>

### Samples
**Sample Input 1**
```
3 a b c
```
**Sample Output 1**
```
1:a->c
2:a->b
1:c->b
3:a->c
1:b->a
2:b->c
1:a->c
```

### Hint
<p><a href="https://www.bilibili.com/video/BV1qy4y187N1" target="_blank">Andy讲解(2021)</a><br /></p>

---

## [LinK11] DFS试炼之排列数字

### Description
<p style="margin-left: 0px;"><img alt="image.png" src="/public/upload/724376adb4.png" width="503" height="315" /><br /></p><p style="margin-left: 0px;">给定一个整数n，将数字1~n排成一排，将会有很多种排列方法。</p><p>现在，请你按照字典序将所有的排列方法输出。</p><p><span style="color: rgb(227, 55, 55);">数据范围：1&lt;=n&lt;=8</span><br /></p>

### Input
<p><span style="color: rgb(51, 51, 51);">共一行，包含一个整数n。</span><br /></p>

### Output
<p><span style="color: rgb(51, 51, 51);">按字典序输出所有排列方案，每个方案占一行。</span><br /></p>

### Samples
**Sample Input 1**
```
3
```
**Sample Output 1**
```
1 2 3
1 3 2
2 1 3
2 3 1
3 1 2
3 2 1
```

### Hint
<p style="margin-left: 0px;"><a href="https://www.bilibili.com/video/BV1jU4y1a7m3" target="_blank">Andy讲解(2021)</a><br /></p><p><a href="https://www.acwing.com/problem/content/844/" target="_blank">原题链接</a></p>

---

## [LinK12] 字符全排列

### Description
<p><span style="color: rgb(35, 31, 23);">给定一个由不同的小写字母组成的字符串，输出这个字符串的所有全排列。</span><br /></p>

### Input
<p><span style="color: rgb(35, 31, 23);">输入只有一行，是一个由不同的小写字母组成的字符串，已知字符串的长度在2到8之间。</span><br /></p>

### Output
<p>输出这个字符串的所有排列方式，每行一个排列。要求字母序比较小的排列在前面。字母序如下定义：</p><p>已知S = s1s2...sk, T = t1t2...tk，则S &lt; T 等价于，存在p (1 &lt;= p &lt;= k)，使得<br />s1= t1, s2= t2, ..., sp - 1= tp - 1, sp&lt; tp成立。</p>

### Samples
**Sample Input 1**
```
abc
```
**Sample Output 1**
```
abc
acb
bac
bca
cab
cba 
```

### Hint
<p><span style="color: rgb(35, 31, 23);">需要对输入的字符串排序！</span><br /></p><p><span style="color: rgb(35, 31, 23);"><a href="https://www.bilibili.com/video/BV1Rf4y1s71T" target="_blank">Andy讲解2021年</a><br /></span></p>

---

## [LinK13] 输出N皇后的全部摆法

### Description
<p><font>随着编程水平的进阶，小华知道是全面扩充小鲁知识面，帮助他快速升级的时候到了，他再给小鲁布置了道经典题：</font></p><p><span style="color: rgb(37, 37, 37);">输入一个正整数N，请写一个程</span><span style="color: rgb(37, 37, 37);">序，</span><span style="color: rgb(37, 37, 37);">输出</span><span style="color: rgb(37, 37, 37);">N</span><span style="color: rgb(37, 37, 37);">皇</span><span style="color: rgb(37, 37, 37);">后问</span><span style="color: rgb(37, 37, 37);">题</span><span style="color: rgb(37, 37, 37);">的全</span><span style="color: rgb(37, 37, 37);">部</span><span style="color: rgb(37, 37, 37);">摆法。</span></p>

### Input
<p><span style="color: rgb(37, 37, 37);">输入皇后的个数n（n&lt;=13）</span><br /></p>

### Output
<p>输出长度为n的正整数。</p><p><span style="color: rgb(37, 37, 37);">输出结果里的每一行都</span><span style="color: rgb(37, 37, 37);">代</span><span style="color: rgb(37, 37, 37);">表一</span><span style="color: rgb(37, 37, 37);">种</span><span style="color: rgb(37, 37, 37);">摆法</span><span style="color: rgb(37, 37, 37);">。</span></p><p><span style="color: rgb(37, 37, 37);">行里</span><span style="color: rgb(37, 37, 37);">的</span><span style="color: rgb(37, 37, 37);">第</span><span style="color: rgb(37, 37, 37);">i</span><span style="color: rgb(37, 37, 37);">个数</span><span style="color: rgb(37, 37, 37);">字</span><span style="color: rgb(37, 37, 37);">如</span><span style="color: rgb(37, 37, 37);">果是n，就代表第</span><span style="color: rgb(37, 37, 37);">i</span><span style="color: rgb(37, 37, 37);">行的</span><span style="color: rgb(37, 37, 37);">皇</span><span style="color: rgb(37, 37, 37);">后应</span><span style="color: rgb(37, 37, 37);">该</span><span style="color: rgb(37, 37, 37);">放在</span><span style="color: rgb(37, 37, 37);">第</span><span style="color: rgb(37, 37, 37);">n</span><span style="color: rgb(37, 37, 37);">列。</span></p><p><span style="color: rgb(37, 37, 37);"><span style="color: rgb(37, 37, 37);">皇后的行、列编号都是</span><span style="color: rgb(37, 37, 37);">从</span><span style="color: rgb(37, 37, 37);">1</span><span style="color: rgb(37, 37, 37);">开始</span><span style="color: rgb(37, 37, 37);">算</span><span style="color: rgb(37, 37, 37);">。</span><br /></span></p>

### Samples
**Sample Input 1**
```
4
```
**Sample Output 1**
```
2413
3142


```

### Hint
<p><a href="https://www.bilibili.com/video/BV1X64y1D7fg" target="_blank">Andy的讲解(2021</a><span style="color: rgb(51, 51, 51);">)</span><br /></p>

---

## [LinK14] 求八皇后的第n种解

### Description
<p><span style="color: rgb(35, 31, 23);">掌握基本的递归函数也明白如何生成N皇后问题后，在小华的指导下，小鲁决定加大难度，下一步挑战的就是n皇后问题的升级版：</span></p><p style="margin-left: 40px;"><span style="color: rgb(35, 31, 23);">国际象棋中的皇后可以在横、竖、斜线上不限步数地吃掉其他棋子。</span><br /></p><p style="margin-left: 40px;"><span style="color: rgb(35, 31, 23);">八</span><span style="color: rgb(35, 31, 23);">个皇后问题是如何将八个皇后放在棋盘上（有</span><span style="color: rgb(35, 31, 23);">8 * 8</span><span style="color: rgb(35, 31, 23);">个方格），使它们谁也不能被其他皇后吃掉！</span></p><p style="margin-left: 40px;"><span style="color: rgb(35, 31, 23);"><span style="color: rgb(35, 31, 23);">已经知道八皇后问题一共有92组解，每组解可以用一个字符串表示：</span></span></p><p style="margin-left: 40px;"><span style="color: rgb(35, 31, 23);">对于某个满足要求的</span><span style="color: rgb(35, 31, 23);">八</span><span style="color: rgb(35, 31, 23);">皇后的摆放方法，定义一个皇后串</span><span style="color: rgb(35, 31, 23);">a</span><span style="color: rgb(35, 31, 23);">与之对应，即</span><span style="color: rgb(35, 31, 23);">a=b</span><span style="color: rgb(35, 31, 23);">1</span><span style="color: rgb(35, 31, 23);">b</span><span style="color: rgb(35, 31, 23);">2</span><span style="color: rgb(35, 31, 23);">...b</span><span style="color: rgb(35, 31, 23);">8</span><span style="color: rgb(35, 31, 23);">，其中b</span><span style="color: rgb(35, 31, 23);">i</span><span style="color: rgb(35, 31, 23);">为相应摆法中第i行皇后所处的列数。</span></p><p><span style="color: rgb(35, 31, 23);"><b>题目是：</b></span></p><p><span style="color: rgb(35, 31, 23);">输入一个数n，要求输出八皇后问题的第n个解，也就是第n个皇后字符串。</span></p><p><span style="color: rgb(35, 31, 23);">串的比较是这样的：皇后串x置于皇后串y之前，当且仅当将x视为整数时比y小。</span></p><p></p><p><span style="color: rgb(35, 31, 23);">请你写一个程序，能够根据输入的数n( 1&lt;=n&lt;=92),输出第n个合法的八皇后串。</span></p>

### Input
<p><span style="color: rgb(35, 31, 23);">第1行是测试数据的组数T，后面跟着T行输入。</span></p><p><span style="color: rgb(35, 31, 23);">每组测试数据<span style="color: rgb(35, 31, 23);">占1行，包含</span>一个正整数n (1 &lt;= n &lt;= 92)</span><br /></p>

### Output
<p><span style="color: rgb(35, 31, 23);">输出有T行，每行输出对应一个输入。输出应是一个正整数，是第n个八皇后串。</span><br /></p>

### Samples
**Sample Input 1**
```
2
1
92
```
**Sample Output 1**
```
15863724
84136275
```

### Hint
<p><a href="https://www.bilibili.com/video/BV1X64y1D7fg" target="_blank">Andy的讲解(2021)</a><br /></p>

---

## [LinK15] 爬天梯

### Description
<p><img alt="image.png" /><br /></p><p>经过激烈的战斗，林克过关斩将终于抵达<span style="color: rgb(51, 51, 51);">初阶</span>递归之试炼的最后一关。<br />在他面前有一座天梯，天梯的顶端就是传说中的递归试炼通过证了。</p><p>林克每步可以跨一级台阶或者跨二级台阶。他必须尝试所有的走法才能得到递归试炼通过证。</p><p>如果天梯的台阶数是N，请问他总共需要尝试多少种走法？</p>

### Input
<p>输入天梯的台阶数N。</p><p style="margin-left: 0.01in;">(0&lt;=N&lt;=46)</p>

### Output
<p>输出林克有几种走法。</p>

### Samples
**Sample Input 1**
```
3
```
**Sample Output 1**
```
3
```

### Hint
<p><a href="https://www.bilibili.com/video/BV1ov411b7Lu" target="_blank">Andy讲解(2021)</a><br /></p>

---

## [LinK16] 放苹果

### Description
<p><span style="color: rgb(35, 31, 23);"><img alt="image.png" src="/public/upload/7b3bce6c56.png" width="470" height="233" /><br /></span></p><p><span style="color: rgb(35, 31, 23);">要寻找克罗克果实，林克需要把苹果放在盘子里，其中只有一种情况可以让克罗克果实出现。</span><span style="color: rgb(35, 31, 23);">所以，林克需要尝试所有的放法。</span></p><p><span style="color: rgb(35, 31, 23);">有M个同样的苹果放在N个同样的盘子里，允许有的盘子空着不放，问共有多少种不同的放法？<br /><br />注意：5，1，1和1，5，1 是同一种<span style="color: rgb(35, 31, 23);">放法</span>。</span><br /></p>

### Input
<p><span style="color: rgb(35, 31, 23);">第一行是测试数据的数目t（0 &lt;= t &lt;= 20）。以下每行均包含二个整数M和N，以空格分开。0&lt;=M，N&lt;=10。</span><br /></p>

### Output
<p><span style="color: rgb(35, 31, 23);">对输入的每组数据M和N，用一行输出相应的K。K为正整数，代表共有几种放法。</span><br /></p>

### Samples
**Sample Input 1**
```
1
7 3
```
**Sample Output 1**
```
8
```

### Hint
<p style="margin-left: 0px;"><a href="https://www.bilibili.com/video/BV1y64y1D7AM" target="_blank">Andy讲解(2021)</a><br /></p><p>改编自《分苹果》</p>

---

## [LinK17] 递归求波兰表达式

### Description
<p>站在巨人的肩膀上，编程之路才能越走越宽。小华继续向小鲁讲授新的知识点：波兰表达式。</p><p style="margin-left: 40px;">逆波兰表达式，英文为 Reverse Polish notation，跟波兰表达式（Polish notation）相对应。</p><p style="margin-left: 40px;">之所以叫波兰表达式和逆波兰表达式，是为了纪念波兰的数理科学家 Jan Łukasiewicz的创意。</p><ul><li>平时我们习惯将表达式写成 (1 + 2) * (3 + 4)，加减乘除等运算符写在中间，因此称呼为中缀表达式。</li><li>而波兰表达式的写法为 (* (+ 1 2) (+ 3 4))，将运算符写在前面，因而也称为前缀表达式。</li><li>逆波兰表达式的写法为 ((1 2 +) (3 4 +) *)，将运算符写在后面，因而也称为后缀表达式。</li></ul><p style="margin-left: 40px;">波兰表达式和逆波兰表达式有个好处，就算将圆括号去掉也没有歧义。上述的波兰表达式去掉圆括号，变为<code>* + 1 2 + 3 4</code>。逆波兰表达式去掉圆括号，变成<code>1 2 + 3 4 + *</code>也是无歧义并可以计算的。事实上我们通常说的波兰表达式和逆波兰表达式就是去掉圆括号的。而中缀表达式，假如去掉圆括号，将 (1 + 2)(3 + 4) 写成 1 + 23 + 4，就改变原来意思了。</p><p style="margin-left: 40px;"><code>(2 + 3) * 4</code>的波兰表示法为<code>* + 2 3 4</code></p><p style="">请写程序求解波兰表达式的值。</p><p style="">注意：本题输入的运算符只包括如下4个运算符：<code>+ - * /</code></p><p style="margin-left: 0px;"><span style="color: rgb(35, 31, 23);">提示：可使用atof(str)把字符串转换为一个double类型的浮点数，方便求解。</span></p>

### Input
<p><span style="color: rgb(35, 31, 23);">输入为一行波兰表达式，其中运算符和运算数之间都用空格分隔，运算数是浮点数。</span><br /></p>

### Output
<p><span style="color: rgb(35, 31, 23);">输出为一行，表达式的值。</span></p><p><span style="color: rgb(35, 31, 23);">可直接用printf(&quot;%f\n&quot;, v)输出表达式的值v。</span></p>

### Samples
**Sample Input 1**
```
* + 11.0 12.0 + 24.0 35.0
```
**Sample Output 1**
```
1357.000000
```

### Hint
<p><a href="https://www.bilibili.com/video/BV12f4y1s7yV" target="_blank">Andy讲解(2021)</a><br /></p>

---

## [LinK18] 2的幂次方表示

### Description
<p><img alt="image.png" src="/public/upload/1285929844.png" width="490" height="465" /><br /></p>

### Input
<p><span style="color: rgb(35, 31, 23);">一个正整数n（n≤20000）。</span><br /></p>

### Output
<p><span style="color: rgb(35, 31, 23);">一行，符合约定的n的0，2表示（在表示中不能有空格）。</span><br /></p>

### Samples
**Sample Input 1**
```
137
```
**Sample Output 1**
```
2(2(2)+2+2(0))+2(2+2(0))+2(0)
```

### Hint
<p><a href="https://www.bilibili.com/video/BV1PA411N7Lg" target="_blank">Andy讲解(2021)</a><br /></p>

---

## [LinK19] 递归实现指数型枚举

### Description
<p>从 1∼n 这 n 个整数中随机选取任意多个，输出所有可能的选择方案。<br /></p>

### Input
<p>输入一个整数 n。<br /></p><p>数据范围：</p><p>1≤n≤15<br /></p>

### Output
<p>每行输出一种方案。</p><p>同一行内的数必须升序排列，相邻两个数用恰好 1 个空格隔开。</p><p>对于没有选任何数的方案，输出空行。</p><p>本题有自定义校验器（SPJ），各行（不同方案）之间的顺序任意。</p>

### Samples
**Sample Input 1**
```
3
```
**Sample Output 1**
```

3
2
2 3
1
1 3
1 2
1 2 3

```

---

## [LinK20] 递归实现组合型枚举

### Description
<p>从 1∼n 这 n 个整数中随机选出 m 个，输出所有可能的选择方案。<br /></p>

### Input
<p>两个整数 n,m ,在同一行用空格隔开。<br /></p><p>数据范围</p><p>n&gt;0 ,</p><p>0≤m≤n ,</p><p>n+(n−m)≤25</p>

### Output
<p>按照从小到大的顺序输出所有方案，每行 1 个。</p><p>首先，同一行内的数升序排列，相邻两个数用一个空格隔开。</p><p>其次，对于两个不同的行，对应下标的数一一比较，字典序较小的排在前面（例如 1 3 5 7 排在 1 3 6 8 前面）。</p>

### Samples
**Sample Input 1**
```
5 3
```
**Sample Output 1**
```
1 2 3 
1 2 4 
1 2 5 
1 3 4 
1 3 5 
1 4 5 
2 3 4 
2 3 5 
2 4 5 
3 4 5 
```

---

## [LinK21] 递归实现排列型枚举

### Description
<p>把 1∼n 这 n 个整数排成一行后随机打乱顺序，输出所有可能的次序。<br /></p>

### Input
<p>一个整数 n。<br /></p><p>数据范围</p><p>1≤n≤9</p>

### Output
<p>按照从小到大的顺序输出所有方案，每行 1 个。</p><p>首先，同一行相邻两个数用一个空格隔开。</p><p>其次，对于两个不同的行，对应下标的数一一比较，字典序较小的排在前面。</p>

### Samples
**Sample Input 1**
```
3
```
**Sample Output 1**
```
1 2 3
1 3 2
2 1 3
2 3 1
3 1 2
3 2 1
```

---

## [LinK22] 算术表达式

### Description
<p>给定一个仅由正整数(<font>数字</font><font>1</font>-数字9)、乘法运算符(<font>“*”</font>)和加法运算符(<font>“+”</font>)组成的算术表达式，计算该算术表达式的值。<br /></p>

### Input
<p>输入共两行，第一行包含一个整数 N( 2 ≤N<span style="color: rgb(51, 51, 51);">≤ 200 000 )</span>，表示待输入表达式中数字的个数。</p><p>第二行包含一个字符串，共 2N-1 个字符，即所给的算术表达式。</p><p>输入保证表达式中每个数字$x_{i} \in\left \{  1,2,3,4,5,6,7,8,9\right \}$，运算符仅为“*”或“+”</p><p><font>对于</font><font>60%</font><font>的数据，保证<span style="color: rgb(51, 51, 51);">2 ≤</span>N<span style="color: rgb(51, 51, 51);">≤ 1000</span></font>。</p><p><font>对于</font><font>40%</font><font>的数据，保证 1000<span style="color: rgb(51, 51, 51);">≤</span>N<span style="color: rgb(51, 51, 51);">≤ 200 000</span></font>。</p>

### Output
<p>输出共一行，包含一个正整数，表示算术表达式的运算结果。</p><p>由于这个结果可能非常大，请你在输出该结果对1000 000 007取模的结果。</p><p>（提示：请考虑运算过程中可能存在的溢出问题，并合理的进行取模）</p>

### Samples
**Sample Input 1**
```
3
1+1*4
```
**Sample Output 1**
```
5
```

**Sample Input 2**
```
3
5*1+4
```
**Sample Output 2**
```
9
```

---

## [LinK23] 二进制密码锁

### Description
<p><img alt="image.png" src="/public/upload/256a24f724.png" width="197" height="134" /><br /></p><p>在海拉鲁大陆有一种特殊的二进制密码锁，由n个相连的按钮组成（n&lt;30），按钮有凹/凸两种状态，用手按按钮会改变其状态。</p><p>然而让人头疼的是，当按一个按钮时，跟它相邻的两个按钮状态也会反转。当然，如果按的是最左或者最右边的按钮，该按钮只会影响到跟它相邻的一个按钮。</p><p>当前密码锁状态已知，需要解决的问题是，林克至少需要按多少次按钮，才能将密码锁转变为所期望的目标状态。</p>

### Input
<p><span style="color: rgb(35, 31, 23);">两行，给出两个由0、1组成的等长字符串，表示当前/目标密码锁状态，其中0代表凹，1代表凸。</span><br /></p>

### Output
<p><span style="color: rgb(35, 31, 23);">至少需要进行的按按钮操作次数，如果无法实现转变，则输出impossible。</span><br /></p>

### Samples
**Sample Input 1**
```
011
000
```
**Sample Output 1**
```
1
```

### Hint
<p><a href="https://www.bilibili.com/video/BV1Zi4y1N7dU" target="_blank">Andy讲解(2021)</a><br /></p>

---

## [LinK24] 熄灯问题

### Description
<p><span style="color: rgb(35, 31, 23);">有一个由按钮组成的矩阵，其中每行有6个按钮，共5行。每个按钮的位置上有一盏灯。当按下一个按钮后，该按钮以及周围位置(上边、下边、左边、右边)的灯都会改变一次。即，如果灯原来是点亮的，就会被熄灭；如果灯原来是熄灭的，则会被点亮。在矩阵角上的按钮改变3盏灯的状态；在矩阵边上的按钮改变4盏灯的状态；其他的按钮改变5盏灯的状态。</span></p><p><img src="http://media.openjudge.cn/images/2811_1.jpg" /></p><p><span style="color: rgb(35, 31, 23);">在上图中，左边矩阵中用X标记的按钮表示被按下，右边的矩阵表示灯状态的改变。对矩阵中的每盏灯设置一个初始状态。请你按按钮，直至每一盏等都熄灭。与一盏灯毗邻的多个按钮被按下时，一个操作会抵消另一次操作的结果。在下图中，第2行第3、5列的按钮都被按下，因此第2行、第4列的灯的状态就不改变。</span></p><p><img src="http://media.openjudge.cn/images/2811_2.jpg" /></p><p><span style="color: rgb(35, 31, 23);">请你写一个程序，确定需要按下哪些按钮，恰好使得所有的灯都熄灭。根据上面的规则，我们知道1）第2次按下同一个按钮时，将抵消第1次按下时所产生的结果。因此，每个按钮最多只需要按下一次；2）各个按钮被按下的顺序对最终的结果没有影响；3）对第1行中每盏点亮的灯，按下第2行对应的按钮，就可以熄灭第1行的全部灯。如此重复下去，可以熄灭第1、2、3、4行的全部灯。同样，按下第1、2、3、4、5列的按钮，可以熄灭前5列的灯。</span></p>

### Input
<p><span style="color: rgb(35, 31, 23);">5行组成，每一行包括6个数字（0或1）。</span></p><p><span style="color: rgb(35, 31, 23);">相邻两个数字之间用单个空格隔开。</span></p><p><span style="color: rgb(35, 31, 23);">0表示灯的初始状态是熄灭的，1表示灯的初始状态是点亮的。</span><br /></p>

### Output
<p><span style="color: rgb(35, 31, 23);">5行组成，每一行包括6个数字（0或1）。</span></p><p><span style="color: rgb(35, 31, 23);">相邻两个数字之间用单个空格隔开。</span></p><p><span style="color: rgb(35, 31, 23);">其中的1表示需要把对应的按钮按下，0则表示不需要按对应的按钮。</span><br /></p>

### Samples
**Sample Input 1**
```
2
0 1 1 0 1 0
1 0 0 1 1 1
0 0 1 0 0 1
1 0 0 1 0 1
0 1 1 1 0 0
0 0 1 0 1 0
1 0 1 0 1 1
0 0 1 0 1 1
1 0 1 1 0 0
0 1 0 1 0 0
```
**Sample Output 1**
```
PUZZLE #1
1 0 1 0 0 1 
1 1 0 1 0 1 
0 0 1 0 1 1 
1 0 0 1 0 0 
0 1 0 0 0 0 
PUZZLE #2
1 0 0 1 1 1 
1 1 0 0 0 0 
0 0 0 1 0 0 
1 1 0 1 0 1 
1 0 1 1 0 1 

注意：PUZZLE行结尾没有空格，数字行最后有一个空格。
```

### Hint
<p><a href="https://www.bilibili.com/video/BV1QK4y1J7en" target="_blank">Andy讲解(2021)</a><br /></p>

---

## [LinK25] 拨钟问题

### Description
<p>有9个时钟，排成一个3*3的矩阵。<br /></p><pre><code>|-------|    |-------|    |-------|<br />|       |    |       |    |   |   |<br />|---O   |    |---O   |    |   O   |<br />|       |    |       |    |       |<br />|-------|    |-------|    |-------|<br />    A            B            C    <br /><br />|-------|    |-------|    |-------|<br />|       |    |       |    |       |<br />|   O   |    |   O   |    |   O   |<br />|   |   |    |   |   |    |   |   |<br />|-------|    |-------|    |-------|<br />    D            E            F    <br /><br />|-------|    |-------|    |-------|<br />|       |    |       |    |       |<br />|   O   |    |   O---|    |   O   |<br />|   |   |    |       |    |   |   |<br />|-------|    |-------|    |-------|<br />    G            H            I    <br />(图 1)</code></pre><p>现在需要用最少的移动，将9个时钟的指针都拨到12点的位置。共允许有9种不同的移动。如下表所示，每个移动会将若干个时钟的指针沿顺时针方向拨动90度。<br /><br /><br /></p><pre><code>移动    影响的时钟<br /> <br /> 1         ABDE<br /> 2         ABC<br /> 3         BCEF<br /> 4         ADG<br /> 5         BDEFH<br /> 6         CFI<br /> 7         DEGH<br /> 8         GHI<br /> 9         EFHI    </code></pre>

### Input
<p><span style="color: rgb(35, 31, 23);">9个整数，表示各时钟指针的起始位置，相邻两个整数之间用单个空格隔开。其中，0=12点、1=3点、2=6点、3=9点。</span><br /></p>

### Output
<p><span style="color: rgb(35, 31, 23);">输出一个最短的时钟指针移动序列，使得9个时钟的指针都指向12点。按照移动的序号从小到大输出结果。相邻两个整数之间用单个空格隔开。</span><br /></p>

### Samples
**Sample Input 1**
```
3 3 0 
2 2 2 
2 1 2 
```
**Sample Output 1**
```
4 5 8 9 
```

---

## [LinK26] 算24

### Description
<p><span style="color: rgb(35, 31, 23);"><img alt="image.png" src="/public/upload/b54dd9013d.png" width="600" height="321.0459183673469" /><br /></span></p><p><span style="color: rgb(35, 31, 23);">林克来到怪物商店，决定开始挑战一道难题：算24！</span></p><p style="margin-left: 40px;"><span style="color: rgb(35, 31, 23);">题目是：给出4个小于10的非负整数，你可以使用加减乘除4种运算以及括号把这4个数连接起来得到一个表达式。</span></p><p style="margin-left: 40px;"><span style="color: rgb(35, 31, 23);">现在的问题是，是否存在一种方式使得得到的表达式的结果等于24。</span></p><p style="margin-left: 40px;"><span style="color: rgb(35, 31, 23);">这里加减乘除以及括号的运算结果和运算的优先级跟我们平常的定义一致（这里的除法定义是实数除法）。</span></p><p style="margin-left: 40px;"><span style="color: rgb(35, 31, 23);">比如，对于5，5，5，1，我们知道5 * (5 – 1 / 5) = 24，因此可以得到24。又比如，对于1，1，4，2，我们怎么都不能得到24。</span></p><p style="margin-left: 40px;"><span style="color: rgb(35, 31, 23);">注意：输入数字的次序可以改变。</span></p>

### Input
<p><span style="color: rgb(35, 31, 23);">输入数据包括多行，每行给出一组测试数据，包括4个小于10的非负整数。最后一组测试数据中包括4个0，表示输入的结束，这组数据不用处理。</span><br /></p>

### Output
<p><span style="color: rgb(35, 31, 23);">对于每一组测试数据，输出一行，如果可以得到24，输出“YES”；否则，输出“NO”。</span><br /></p>

### Samples
**Sample Input 1**
```
5 5 5 1
1 1 4 2
0 0 0 0
```
**Sample Output 1**
```
YES
NO
```

### Hint
<p><a href="https://www.bilibili.com/video/BV12E411E7u9" target="_blank">Andy的讲解(2020)</a><br /></p>

---

## [LinK27] 大数排序

### Description
<p>小鲁虽然编程能力很一般，但是嘴皮子上不服输。他很喜欢拿自己不懂的问题考小华。</p><p>刚学会冒泡排序的他，决定挑战一下小华的智商：</p><p style="margin-left: 0px;">给定你一个长度为n的整数数列。</p><p>请你对这个数列按照从小到大进行排序。</p><p>并将排好序的数列按顺序输出。</p><p>小鲁刻意隐瞒了数据的规模，你觉得小华能够搞定吗?</p><p>偷偷告诉你：<span style="color: rgb(227, 55, 55);">1≤n≤100000</span><span style="color: rgb(227, 55, 55);">，所有整数均在1--10^9范围内</span></p><p><span style="color: rgb(227, 55, 55);"><span style="color: rgb(51, 51, 51);">后记：小华使用快速排序秒过，小鲁惨败，因为他看不懂小华的代码......</span><br /></span></p>

### Input
<p><span style="color: rgb(51, 51, 51);">输入共两行，第一行包含整数 n。</span><br /></p><p><span style="color: rgb(51, 51, 51);"><span style="color: rgb(51, 51, 51);">第二行包含 n 个整数，<span style="color: rgb(51, 51, 51);">表示整个数列。</span></span><br /></span></p>

### Output
<p><span style="color: rgb(51, 51, 51);">输出共一行，包含 n 个整数，表示排好序的数列。</span><br /></p>

### Samples
**Sample Input 1**
```
12
111584322 907287398 13562672 615771042 83035480 323016588 501254568 158361642 388135644 58329696 400904710 38908140
```
**Sample Output 1**
```
13562672 38908140 58329696 83035480 111584322 158361642 323016588 388135644 400904710 501254568 615771042 907287398 
```

### Hint
<p><a href="https://www.bilibili.com/video/BV1SZ4y1w7dZ" target="_blank">Andy讲解(2021)</a><br /></p>

---

## [LinK28] 快速选择第k个数

### Description
<p>给定一个长度为n的整数数列，以及一个整数k，请用快速选择算法求出数列的第k小的数是多少。<br /></p>

### Input
<p>第一行包含两个整数 n 和 k。</p><p>第二行包含 n 个整数（所有整数均在1--10^9范围内），表示整数数列。</p><p><span style="color: rgb(227, 55, 55);">数据范围:1≤n≤100000,1≤k≤n</span></p>

### Output
<p><span style="color: rgb(51, 51, 51);">输出一个整数，表示数列的第k小数。</span><br /></p>

### Samples
**Sample Input 1**
```
5 3
2 4 1 5 3
```
**Sample Output 1**
```
3
```

### Hint
<p style="margin-left: 0px;"><a href="https://www.bilibili.com/video/BV1AK4y1S7wE" target="_blank">Andy讲解(2021)</a></p><p><a href="https://www.acwing.com/problem/content/788/" target="_blank">原题链接</a></p>

---

## [LinK29] 输出前k大的数

### Description
<p><span style="color: rgb(35, 31, 23);">给定一个数组，统计前k大的数并且把这k个数从大到小输出。</span><br /></p>

### Input
<p><span style="color: rgb(35, 31, 23);">第一行包含一个整数n，表示数组的大小。n &lt; 100000。</span></p><p><span style="color: rgb(35, 31, 23);">第二行包含n个整数，表示数组的元素，整数之间以一个空格分开。每个整数的绝对值不超过100000000。</span></p><p><span style="color: rgb(35, 31, 23);">第三行包含一个整数k。k &lt; n。</span></p>

### Output
<p><span style="color: rgb(35, 31, 23);">从大到小输出前k大的数，每个数一行。</span><br /></p>

### Samples
**Sample Input 1**
```
10
4 5 6 9 8 7 1 2 3 0
5
```
**Sample Output 1**
```
9
8
7
6
5
```

### Hint
<p style="margin-left: 0px;"><a href="https://www.bilibili.com/video/av95375978" target="_blank">归并排序讲解</a></p><p><a href="https://www.bilibili.com/video/av95376260" target="_blank">快速排序讲解</a></p><p><a href="https://www.bilibili.com/video/av95376767" target="_blank">Andy的讲解</a></p><p>参考：<a href="http://cxsjsxmooc.openjudge.cn/2020t2spring5/001/" target="_blank">http://cxsjsxmooc.openjudge.cn/2020t2spring5/001/</a></p>

---

## [LinK30] 归并排序

### Description
<p style="margin-left: 0px;">给定你一个长度为n的整数数列。</p><p>请你使用归并排序对这个数列按照从小到大进行排序。</p><p>并将排好序的数列按顺序输出。</p>

### Input
<p>输入共两行，第一行包含整数 n。</p><p>第二行包含 n 个整数（所有整数均在1~109109范围内），表示整个数列。</p><p><span style="color: rgb(227, 55, 55);">数据范围:</span><span style="color: rgb(227, 55, 55);">1</span><span style="color: rgb(227, 55, 55);">≤</span><span style="color: rgb(227, 55, 55);">n</span><span style="color: rgb(227, 55, 55);">≤</span><span style="color: rgb(227, 55, 55);">100000</span></p>

### Output
<p><span style="color: rgb(51, 51, 51);">输出共一行，包含 n 个整数，表示排好序的数列。</span><br /></p>

### Samples
**Sample Input 1**
```
5
3 1 2 4 5
```
**Sample Output 1**
```
1 2 3 4 5
```

### Hint
<p style="margin-left: 0px;"><a href="https://www.bilibili.com/video/BV1PK411w7m8" target="_blank">Andy讲解(2021)</a><br /></p><p><a href="https://www.acwing.com/video/229/" target="_blank">原题链接</a></p>

---

## [LinK31] 求排列的逆序数

### Description
<p>在Internet上的搜索引擎经常需要对信息进行比较，比如可以通过某个人对一些事物的排名来估计他（或她）对各种不同信息的兴趣，从而实现个性化的服务。</p><p>对于不同的排名结果可以用逆序来评价它们之间的差异。考虑1,2,…,n的排列i1，i2，…，in，如果其中存在j,k，满足 j &lt; k 且ij&gt; ik， 那么就称(ij,ik)是这个排列的一个逆序。</p><p>一个排列含有逆序的个数称为这个排列的逆序数。</p><p>例如排列 263451 含有8个逆序(2,1),(6,3),(6,4),(6,5),(6,1),(3,1),(4,1),(5,1)，因此该排列的逆序数就是8。</p><p>显然，由1,2,…,n 构成的所有n!个排列中，最小的逆序数是0，对应的排列就是1,2,…,n；最大的逆序数是n(n-1)/2，对应的排列就是n,(n-1),…,2,1。</p><p>逆序数越大的排列与原始排列的差异度就越大。</p><p>现给定1,2,…,n的一个排列，求它的逆序数。</p>

### Input
<p><span style="color: rgb(35, 31, 23);">第一行是一个整数n，表示该排列有n个数（n &lt;= 100000)。</span></p><p><span style="color: rgb(35, 31, 23);">第二行是n个不同的正整数，之间以空格隔开，表示该排列。</span></p>

### Output
<p><span style="color: rgb(35, 31, 23);">输出该排列的逆序数。</span><br /></p>

### Samples
**Sample Input 1**
```
6
2 6 3 4 5 1
```
**Sample Output 1**
```
8
```

### Hint
<p style="margin-left: 0px;"><a href="https://www.bilibili.com/video/BV14X4y1G77n" target="_blank">Andy讲解(2021)</a><br /></p><p><a href="https://www.bilibili.com/video/av95376969" target="_blank">Andy的讲解(2020)</a></p><p>逆序数可能很多，使用long long存储</p><p><a href="https://www.acwing.com/problem/content/790/" target="_blank">原题链接</a></p>

---

## [LinK32] 查找指定数

### Description
<p><span style="color: rgb(73, 80, 96);"><img alt="image.png" src="/public/upload/a653218c64.png" width="662" height="337" /><br /></span></p><p><span style="color: rgb(73, 80, 96);">面对铺面而来的波克布林大军，林克需要快速制胜，所谓擒贼先擒王，林克需要锁定目标一击必杀。</span></p><p><span style="color: rgb(73, 80, 96);">假设怪物大军共有N只波克布林（1&lt;=N&lt;=100000）和数组nums存储每个怪的编号。根据情报，需要击杀的目标编号是</span><span style="color: rgb(73, 80, 96);">target。</span></p><p><span style="color: rgb(73, 80, 96);">请从nums中迅速找出target的数组下标，如果找不到请输出-1.</span></p>

### Input
<p><span style="color: rgb(73, 80, 96);">第一行N表示数组大小。</span></p><p><span style="color: rgb(73, 80, 96);">第二行为nums的N个元素(不包含重复元素)</span></p><p><span style="color: rgb(73, 80, 96);">第三行T表示接下来又T个元素需要查找。</span></p><p><span style="color: rgb(73, 80, 96);">接下来T行，每行为查找的目标元素target值。</span><br /></p>

### Output
<p><span style="color: rgb(73, 80, 96);">输出为T个目标元素的下标，找不到输出-1</span><br /></p>

### Samples
**Sample Input 1**
```
36
0 1 5 8 10 12 15 17 20 26 36 68 71 80 90 92 96 100 101 104 130 275 345 405 425 519 573 583 608 616 714 780 802 842 910 961 
5
8
42
64
130
912
```
**Sample Output 1**
```
3
-1
-1
20
-1

```

### Hint
<p><a href="https://www.bilibili.com/video/BV1tA41157aa" target="_blank">Andy讲解(2021)</a><br /></p>

---

## [LinK33] 攻击范围

### Description
<p><img alt="image.png" src="/public/upload/e07c64f4c5.png" width="513" height="284" /><br /></p><p>面对铺面而来的怪物大军，林克需要根据怪物类型进行区域攻击。</p><p>假设怪物大军共有N个怪物（1&lt;=N&lt;=100000），升序数组nums存储每个怪物的编号，同一类型的怪物编号相同。</p><p>根据情报，需要击杀的目标编号是target。</p><p>请从nums中迅速找出编号为target的怪物的数组下标范围。</p><p>如果找不到请输出-1 -1.</p>

### Input
<p>第一行包含整数n和q，表示数组长度和询问个数。</p><p>第二行包含n个整数（均在1~10000范围内），表示完整数组。</p><p>接下来q行，每行包含一个整数k，表示一个询问元素。</p><h4><span style="color: rgb(227, 55, 55);">数据范围<br />1≤n≤100000<br />1≤q≤10000<br />1≤k≤10000</span></h4>

### Output
<p>共q行，每行包含两个整数，表示所求元素的起始位置和终止位置<span style="color: rgb(51, 51, 51);">（位置从0开始计数）</span>。</p><p>如果数组中不存在该元素，则返回“-1 -1”。</p>

### Samples
**Sample Input 1**
```
6 3
1 2 2 3 3 4
3
4
5
```
**Sample Output 1**
```
3 4
5 5
-1 -1
```

### Hint
<p style="margin-left: 0px;"><a href="https://www.bilibili.com/video/BV1gi4y1N7XR" target="_blank">Andy讲解(2021)</a></p><p><a href="https://www.acwing.com/problem/content/791/" target="_blank">原题ACW789</a></p>

---

## [LinK34] 求方程的根

### Description
<p>看着小鲁的编程水平再次进阶，小华很欣慰，是时候教导他基本算法的时候了。</p><p>小华喊小鲁过来，对他说：今天要教你一招新招，二分法。这种分而治之的思想是算法中常见的思考方式，也是优化算法必须要掌握的利器。二分法的用途很广。我出道题，你想想要怎么用二分法做。</p><p>说着，小华在纸上写下了一个方程：</p><p><img alt="image.png" src="/public/upload/bc14963296.png" width="200" height="25.85034013605442" /></p><p>请用二分法求方程的根，<span style="color: rgb(51, 51, 51);">精确到小数点后9位。</span></p>

### Input
<p>没有输入。</p>

### Output
<p>5.705085930<br /></p>

### Samples
**Sample Input 1**
```
无
```
**Sample Output 1**
```
5.705085930
```

### Hint
<p><a href="https://www.bilibili.com/video/BV1Cf4y1x7kk" target="_blank">Andy讲解(2021)</a><br /></p>

---

## [LinK35] 数的三次方根

### Description
<p><span style="color: rgb(51, 51, 51);">给定一个浮点数n，求它的三次方根。</span><br /></p><p><span style="color: rgb(227, 55, 55);">数据范围:−10000≤n≤10000</span><br /></p>

### Input
<p><span style="color: rgb(51, 51, 51);">共一行，包含一个浮点数n。</span><br /></p>

### Output
<p>共一行，包含一个浮点数，表示问题的解。</p><p>注意，结果保留6位小数。</p>

### Samples
**Sample Input 1**
```
1000.00
```
**Sample Output 1**
```
10.000000
```

### Hint
<p><a href="https://www.acwing.com/problem/content/792/" target="_blank">原题链接</a></p>

---

## [LinK36] 最小预算值

### Description
<p style="margin-left: 0px;"><img src="http://xmuoj.com/public/upload/efb3594583.png" alt="image.png" /><br /></p><p style="margin-left: 0px;">为了升级希卡之石林克来到了阿卡莱研究所。这个海拉鲁大陆最顶级的研究所，每天都要消耗大量的研究经费，</p><p style="margin-left: 0px;">然而令人惊奇的是这个研究所的经费从不短缺，这完全得益于研究所制定预算的能力。</p><p style="margin-left: 0px;">如果谁能搞清楚阿卡来研究所制定预算的算法，并且给出最佳预算的值，那么他就可以免费升级希卡之石。</p><p style="margin-left: 0px;">林克显然不擅长做预算，作为他好朋友的你，可以出手相助吗？</p><p>已知研究所接下来N天（<span style="color: rgb(73, 80, 96);">1≤N≤ 100,000</span><span style="color: rgb(73, 80, 96);">）</span>每日的固定支出预计为X(N)卢比。</p><p>研究所需要将未来的N天分为M组<span style="color: rgb(73, 80, 96);">(1 ≤M≤N)</span><span style="color: rgb(73, 80, 96);">，</span>每组是1天或者连续的几天。</p><p>（假如第1，2，3天为一组，那么该组的总固定支出Total(1)是这三天的固定支出之和X(0)+X(1)+X(2)）</p><p>请问，如果一定要将未来的N天分为M组，<span style="color: rgb(51, 51, 51);">假设分配给每组的预算是一个固定值Budget，并且</span>不同组所得到的卢比即便有结余也不可以挪用。</p><p>求能够完全满足每组支出需要的最小的<span style="color: rgb(51, 51, 51);">Budget</span>值是多少。</p>

### Input
<p style="margin-left: 0px;"><span style="color: rgb(35, 31, 23);">第一行包含两个整数N,M，用单个空格隔开。</span></p><p><span style="color: rgb(35, 31, 23);">第二行有N个从<span style="color: rgb(35, 31, 23);">1到10000之间的整数，</span>表示接下来N天里每天的固定支出预算。</span></p>

### Output
<p><span style="color: rgb(35, 31, 23);">一个整数，即</span><span style="color: rgb(35, 31, 23);"></span><span style="color: rgb(51, 51, 51);">满足每组支出需要的最小的预算值</span><span style="color: rgb(51, 51, 51);">。</span><br /></p>

### Samples
**Sample Input 1**
```
7 5
100 400 300 100 500 101 400
```
**Sample Output 1**
```
500
```

### Hint
<p><span style="color: rgb(51, 51, 51);"><a href="https://www.bilibili.com/video/av94908717?pop_share=1" target="_blank"></a><a href="https://www.bilibili.com/video/av94908717?pop_share=1" target="_blank">Andy讲解(2020)</a><br />本题改编自Guo Wei的《月度开销》</span><br /></p>

---

## [LinK37] 林克的蛋糕

### Description
<p style="margin-left: 0px;"><img src="http://xmuoj.com/public/upload/fe05a9c861.png" alt="image.png" /><br /></p><p style="margin-left: 0px;">林克被造的纪念日快要到了。根据任天堂公司的惯例，每年到这个时间都会一些蛋糕分给林克的朋友。</p><p style="margin-left: 0px;">这些蛋糕有不同的口味，比如南瓜蛋糕、坚果蛋糕、西瓜蛋糕、胡萝卜蛋糕、水果蛋糕等等（有N种不同口味，大小不同的蛋糕）。<br />为了公平，每个朋友都会分到一块大小相同的蛋糕（不需要同样形状，但是要同一种口味，不允许混合口味，否则就会变成奇怪的菜肴）。<br />假设每个蛋糕都是一个高为1，半径不等的圆柱体，一共有F+1个人（F是林克的朋友个数，还要加上林克的设计者)。</p><p>所有人拿到的蛋糕是同样大小的，请问每个人拿到的蛋糕最大尺寸可以是多少？</p>

### Input
<p><span style="color: rgb(35, 31, 23);">第一行包含两个正整数N和F，1 ≤ N, F ≤ 10 000，表示蛋糕的数量和朋友的数量。</span></p><p><span style="color: rgb(35, 31, 23);">第二行包含N个1到10000之间的整数，表示每个蛋糕的半径。</span></p>

### Output
<p><span style="color: rgb(35, 31, 23);">输出每个人能得到的最大的蛋糕的体积，精确到小数点后三位。</span><br /></p>

### Samples
**Sample Input 1**
```
3 3
4 3 3
```
**Sample Output 1**
```
25.133
```

### Hint
<p><a href="https://www.bilibili.com/video/av94056456/" target="_blank">Andy讲解(2020)</a><br /></p>

---

## [LinK38] 林克的命运之阵

### Description
<p><span style="color: rgb(35, 31, 23);"><img alt="image.png" src="/public/upload/6dbec9b26e.png" width="677" height="426" /><br /></span></p><p><span style="color: rgb(35, 31, 23);">每一个人心中都有一个林克。每一个林克都不一样。在命运矩阵里面，随着选择的不同，没有哪一个林克的命运会一模一样。</span></p><p><span style="color: rgb(35, 31, 23);">有一个方格型的命运矩阵，矩阵边界在无穷远处。我们做如下假设：</span></p><p><span style="color: rgb(35, 31, 23);">1. 每一个格子象征林克命运中的一次抉择，每次只能从相邻的方格中做选择。</span></p><p><span style="color: rgb(35, 31, 23);">2. 从某个格子出发，只能从当前方格移动一格，走到某个相邻的方格上；</span></p><p><span style="color: rgb(35, 31, 23);">3.选择一旦做出就不可更改，因此走过的格子无法走第二次。</span></p><p><span style="color: rgb(35, 31, 23);">4. 从命运矩阵的第1行出发，只能向下、左、右三个方向走；</span></p><p><span style="color: rgb(35, 31, 23);">请问：如果最高允许在方格矩阵上走n步（也就是林克一生最多能做n个选择）。<br />那么随着n的不同，请问一共会有多少种不同选择的方案导致多少个不同的林克？<br />注意，2种走法只要有一步不一样，即被认为是不同的方案。</span></p>

### Input
<p><span style="color: rgb(35, 31, 23);">允许在方格上行走的步数n(n &lt;= 20)</span><br /></p>

### Output
<p><span style="color: rgb(35, 31, 23);">经过n个选择之后，诞生的不同的林克的个数。</span><br /></p>

### Samples
**Sample Input 1**
```
2
```
**Sample Output 1**
```
7
```

**Sample Input 2**
```
20
```
**Sample Output 2**
```
54608393
```

### Hint
<p style="margin-left: 0px;"><a href="https://www.bilibili.com/video/BV1qZ4y1c7nj?pop_share=1" target="_blank">Andy(2021)</a></p><p style="margin-left: 0px;"><a href="https://www.bilibili.com/video/BV1Mz411b7DL" target="_blank">Andy(2020</a>)</p><p>改编自《踩方格》</p>

---

## [LinK39] 净化迷雾森林

### Description
<p><span style="color: rgb(35, 31, 23);"><span style="color: rgb(35, 31, 23);"><img alt="image.png" src="/public/upload/3ec4db1361.png" width="539" height="303" /><br /></span></span></p><p><span style="color: rgb(35, 31, 23);"><span style="color: rgb(35, 31, 23);">迷雾森林被加农的玷污了，原本圣洁无比的迷雾森林，如今被彻底玷污，空气中充满着紫色的恶臭。</span></span></p><p><font>林克临危不惧，带上呼吸面罩，挥舞大师之剑的光芒，净化迷雾。林克所到之处，加农褪去，圣洁回归。</font></p><p><span style="color: rgb(35, 31, 23);"><span style="color: rgb(35, 31, 23);"><span style="color: rgb(35, 31, 23);">如下图，红色代表墙壁，紫色的迷雾代表需要净化的空间，金色代表林克开始净化的起点。</span></span></span></p><p><span style="color: rgb(35, 31, 23);"><span style="color: rgb(35, 31, 23);"><span style="color: rgb(35, 31, 23);">从某处开始，林克只能向</span>相邻的紫色区域移动。请问，林克总共能够净化多少区域？</span><br /></span></p><p><span style="color: rgb(35, 31, 23);"><span style="color: rgb(35, 31, 23);"><span style="color: rgb(35, 31, 23);">图1 初始状态                                                                图2   净化中.....</span><br /></span></span></p><p><span style="color: rgb(35, 31, 23);"><img alt="image.png" src="/public/upload/f48cf16664.png" width="311" height="464" />-----<img alt="image.png" src="/public/upload/d72a7d4360.png" width="313" height="461" /><br /></span></p>

### Input
<p><span style="color: rgb(35, 31, 23);">包括多个数据集合。每个数据集合的第一行是两个整数W和H，分别表示x方向和y方向瓷砖的数量。W和H都不超过20。</span></p><p><span style="color: rgb(35, 31, 23);">在接下来的H行中，每行包括W个字符。</span></p><p><span style="color: rgb(35, 31, 23);">每个字符表示一个区域的状态，规则如下</span></p><p><span style="color: rgb(35, 31, 23);">1）</span><span style="color: rgb(227, 55, 55);">‘.’</span><span style="color: rgb(35, 31, 23);">：代表紫色迷雾<img alt="image.png" src="/public/upload/668de4a15e.png" width="42" height="41" />；</span></p><p><span style="color: rgb(35, 31, 23);">2）</span><span style="color: rgb(227, 55, 55);">‘#’</span><span style="color: rgb(35, 31, 23);">：代表红墙<img alt="image.png" src="/public/upload/65762c10c1.png" width="41" height="40" />；</span></p><p><span style="color: rgb(35, 31, 23);">3）‘@’：代表<span style="color: rgb(35, 31, 23);">林克的起始位置</span><img alt="image.png" src="/public/upload/bb1c64a143.png" width="43" height="40" />(该字符在每个数据集合中唯一出现一次。）</span></p><p><span style="color: rgb(35, 31, 23);">当在一行中读入的是两个零时，表示输入结束。</span></p>

### Output
<p><span style="color: rgb(35, 31, 23);">对每个数据集合，分别输出一行，显示林克从初始位置出发能净化的迷雾数(记数时包括初始位置的迷雾)。</span><br /></p>

### Samples
**Sample Input 1**
```
6 9 
....#. 
.....# 
...... 
...... 
...... 
...... 
...... 
#@...# 
.#..#. 
0 0
```
**Sample Output 1**
```
45
```

### Hint
<p style="margin-left: 0px;"><a href="https://www.bilibili.com/video/BV1r64y1v7ot?pop_share=1" target="_blank">Andy(2021)</a></p><p style="margin-left: 0px;"><a href="https://www.bilibili.com/video/BV13T4y1G7HP" target="_blank">Andy(2020)</a></p><p>（改编自《<a href="http://cxsjsxmooc.openjudge.cn/2020t2springall/018/" target="_blank">红与黑</a>》）</p>

---

## [LinK40] 骑士林克的怜悯(1)

### Description
<p><b></b></p><p><b><img alt="image.png" src="/public/upload/b6774f404c.png" width="476" height="297" /></b></p><p>林克驰骋在海拉鲁大陆的平原上无比自由，他想起二维空间中的国际象棋同伴，回想起自己也活在2D世代的局限，心生怜悯。</p><p>那些骑士，永远被局限在8×8的棋盘之内厮杀，他们的世界永不改变。因此，林克去到阿卡来研究所寻求帮助，他得到新的道具——变形棋盘。</p><p>这个变形棋盘可以根据输入的两个参数的（p,q）创造全新的棋盘空间。</p><p>如下图分别是<span style="color: rgb(51, 51, 51);">（p,q）为</span>(3,9) , (6,3) ,以及(5,5)的棋盘空间。</p><p><b><img alt="image.png" src="/public/upload/1535dce661.png" width="362" height="121" />--<img alt="image.png" src="/public/upload/9a40274901.png" width="121" height="244" />--<img alt="image.png" src="/public/upload/33abb03385.png" width="202" height="202" /><br /></b></p><p>假设2D世界的骑士，移动的方式按字母次序有如下8种：</p><p><img alt="image.png" src="/public/upload/348369f95a.png" width="286" height="273" /><br /></p><p><font>请问对于每一种棋盘<span style="color: rgb(51, 51, 51);">（p,q）</span>，2D骑士是否有一种一次遍历所有棋盘方格的路线？</font></p><p><font>如果有，请输出这条路线（若有多条路线，请输出字典序最小的路线）。</font></p><p><font>如果没有，请输出无。</font></p>

### Input
<p><span style="color: rgb(35, 31, 23);">输入数据第一行为正整数n，代表有多少组输入样例</span></p><p><span style="color: rgb(35, 31, 23);">接下来n行是两个整数代表行p和列q, 代表变形棋盘的行列参数，其中（1 &lt;= p * q &lt;= 26）。</span><br /></p>

### Output
<p>每个样例的输出2行，格式如下：</p><p style="margin-left: 40px;">&quot;#i:&quot; 其中i代表第i种棋盘</p><p style="margin-left: 40px;">骑士跳过的每个格子（<span style="color: rgb(51, 51, 51);">每个访问的格子用大写字母加数字表示），一条可行的路径输出如</span>(A1B3C1A2B4C2A3B1C3A4B2C4)，</p><p>如果没有可行方案，则第二行输出：none</p>

### Samples
**Sample Input 1**
```
5
5 1
5 2
5 3
5 4
5 5
```
**Sample Output 1**
```
#1:
none
#2:
none
#3:
none
#4:
A1B3A5C4D2B1A3B5D4C2B4A2C1D3C5A4B2D1C3D5
#5:
A1B3A5C4A3B1D2E4C5A4B2D1C3B5D4E2C1A2B4D5E3C2E1D3E5
```

### Hint
<p style="margin-left: 0px;"><a href="https://www.bilibili.com/video/BV1BK411F7ns" target="_blank">Andy(2021)</a></p><p style="margin-left: 0px;"><a href="https://www.bilibili.com/video/BV1uK411j7S5" target="_blank">Andy(2020)</a></p>

---

## [LinK41] 英杰们的蛋糕塔

### Description
<p><span style="color: rgb(35, 31, 23);"><img src="https://tse4-mm.cn.bing.net/th?id=OIP.CavPwvaW2jmarrEH3iSs3wHaEo&pid=Api&rs=1" alt="查看源图像" /><br /></span></p><p><span style="color: rgb(35, 31, 23);"><span style="color: rgb(35, 31, 23);">塞尔达公主</span>的生日将近，英杰们预备绞尽脑汁要为公主作一个生日蛋糕塔。</span></p><p><span style="color: rgb(35, 31, 23);">这个蛋糕塔一共有N层，每层都是圆柱体，象征英杰们合一平等的关系。</span></p><p><span style="color: rgb(35, 31, 23);">蛋糕塔的总体积是 V * π 。</span></p><p><span style="color: rgb(35, 31, 23);">最底层的蛋糕半径最大，最上层的蛋糕半径最小，这种结构象征英杰们稳固的生命根基。</span></p><p><span style="color: rgb(35, 31, 23);"><span style="color: rgb(35, 31, 23);">因此从底层往上层数，第i (1 &lt;= i &lt;= N) 层是半径为 r(i), 高度为h(i) 的圆柱体。当 i &lt; N 时，有r(i) &gt; r(i+ 1) 且 h(i) &gt; h(i+1)。</span></span></p><p><span style="color: rgb(35, 31, 23);"><span style="color: rgb(35, 31, 23);">蛋糕塔每一层圆柱体的半径r(i)和高度h(i)都是整数，象征公主英杰们不打折的忠诚。</span></span></p><p><span style="color: rgb(35, 31, 23);">蛋糕塔的表面积，象征英杰们与公主的亲密关系面临的外部挑战。</span></p><p><span style="color: rgb(35, 31, 23);">因此，对于给定的V和N，我们希望找到一个使表面积最小的蛋糕塔制作方案。</span></p><p><span style="color: rgb(35, 31, 23);">令表面积Q = S<span style="color: rgb(35, 31, 23);">* π，</span></span><span style="color: rgb(35, 31, 23);">对<span style="color: rgb(35, 31, 23);">给定的V和N</span>，请输出使Q最小的S是多少。</span></p><p><span style="color: rgb(35, 31, 23);">（除Q外，以上所有数据皆为正整数，下图是蛋糕塔的俯视图和示意图）</span></p><p><span style="color: rgb(35, 31, 23);"><img alt="image.png" src="/public/upload/f92aa2fa22.png" width="405" height="405" /></span><img alt="image.png" src="http://www.xmuoj.com/public/upload/5876ef28f6.png" width="322" height="273" /><span style="color: rgb(35, 31, 23);"><br /></span></p>

### Input
<p><span style="color: rgb(35, 31, 23);">有两行，第一行为V（V &lt;= 100000），表示待制作的蛋糕的体积为<span style="color: rgb(35, 31, 23);">V * π</span>；第二行为N(N &lt;= 20)，表示蛋糕的层数为N。</span><br /></p>

### Output
<p><span style="color: rgb(35, 31, 23);">仅一行，是一个正整数S（若无解则S = 0）。</span><br /></p><p><font>提示：根据题意，我们无需计算<span style="color: rgb(35, 31, 23);">π，因此有</span></font></p><p style="margin-left: 0px;">圆柱<span style="color: rgb(35, 31, 23);">体积v&#039; = r</span>*r*h<br />圆柱<span style="color: rgb(35, 31, 23);">侧面积 s&#039; = 2*r*h<br /></span><span style="color: rgb(35, 31, 23);">圆柱底面积c&#039;= r*r</span></p><p><font><span style="color: rgb(35, 31, 23);"><br /></span></font></p>

### Samples
**Sample Input 1**
```
100
2
```
**Sample Output 1**
```
68
```

### Hint
<p style="margin-left: 0px;"><a href="https://www.bilibili.com/video/BV1Bp4y1C7Qs" target="_blank">Andy讲解(B站)</a>（更正：R和H都要逐层递减，题面无误)</p><p>（改编自《生日蛋糕》，<a href="https://www.acwing.com/video/481/" target="_blank">Y总讲解(付费)</a>）</p><p><a href="https://www.acwing.com/solution/content/31876/" target="_blank">参考题解</a></p><p><a href="https://www.acwing.com/activity/content/code/content/136866/" target="_blank">Y总代码</a></p>

---

## [LinK42] 击杀黄金蛋糕人马

### Description
<p>在海拉鲁大陆冒险，没有绝佳的剑法+想象力是不可能存活下来的。</p><p>这不，林克遇到了一个特别巨大的敌人——黄金蛋糕人马（莱尼尔的变种）</p><p><span style="color: rgb(51, 51, 51);">这黄金蛋糕人马</span>长相非常特别，没有脚没有手没有嘴巴没有头，整个身材就是一个大矩形（喂喂，这不就是黄金莱尼尔吗？）</p><p><img alt="image.png" src="/public/upload/c566399d7b.png" width="863" height="462" /><br />它的长和宽分别是整数w、h。</p><p>林克举起大师之剑，挥向<span style="color: rgb(51, 51, 51);">黄金蛋糕人马</span>，要将其切成m块矩形小块打包走，分给自己的朋友（每块都必须是矩形、且长和宽均为整数）。</p><p>大师之剑无比锐利，每一斩带出的剑气能将<span style="color: rgb(51, 51, 51);">黄金蛋糕人马</span>劈成两半（形成两个小矩形蛋糕）。</p><p>经过m-1斩，<span style="color: rgb(51, 51, 51);">黄金蛋糕人马</span>居然被劈成m块小蛋糕（喂喂，你的想象力也太丰富了，明明切不开好吗？）</p><p>请计算：最后得到的m块小蛋糕中，最大的那块蛋糕的面积下限。<br /><br /></p><p>假设w= 4,h= 4,m= 4，则下面的斩击可使得其中最大蛋糕块的面积最小。(十字斩)</p><p><img src="http://media.openjudge.cn/images/upload/1372385654.gif" /><br /></p><p><span style="color: rgb(35, 31, 23);">假设</span>w<span style="color: rgb(35, 31, 23);">= 4,h= 4,m= 3</span><span style="color: rgb(35, 31, 23);">，则下<span style="color: rgb(51, 51, 51);">面的斩击可</span>使得其中最大蛋糕块的面积最小</span><span style="color: rgb(35, 31, 23);">:.(二连斩)</span><br /></p><p><span style="color: rgb(35, 31, 23);"><img src="http://media.openjudge.cn/images/upload/1372385663.gif" /><br /></span></p>

### Input
<p><span style="color: rgb(35, 31, 23);">共有多行，每行表示一个测试案例。</span></p><p><span style="color: rgb(35, 31, 23);">每行是三个用空格分开的整数w, h, m ，其中1 ≤ w, h, m ≤ 20 ， m ≤ wh.</span></p><p><span style="color: rgb(35, 31, 23);">当 w = h = m = 0 时不需要处理，表示输入结束。</span><br /></p>

### Output
<p><span style="color: rgb(35, 31, 23);">每个测试案例的结果占一行，输出一个整数，表示最大蛋糕块的面积下限。</span><br /></p>

### Samples
**Sample Input 1**
```
4 4 4
4 4 3
0 0 0
```
**Sample Output 1**
```
4
6
```

### Hint
<p><a href="https://www.bilibili.com/video/BV1ti4y1b7s1" target="_blank">Andy讲解</a><br /></p><p>改编自《<a href="https://www.bilibili.com/video/BV1Zb411q7iY?p=33" target="_blank">分蛋糕</a>》</p>

---

## [LinK43] 求二进制中1的个数

### Description
<p><span style="color: rgb(51, 51, 51);"><img alt="料理.gif" src="/public/upload/f9ed434226.gif" width="489" height="366" /><br /></span></p><p>为了寻找失去的回忆碎片，林克必须预备足够的料理。能够快速突破数独试炼，熟练运用lowbit，才能把难题转换为美味佳肴。</p><p><span style="color: rgb(51, 51, 51);">请用lowbit解决如下问题：</span></p><p><span style="color: rgb(51, 51, 51);">输入一个32位整数，输出该数二进制表示中1的个数。</span><br /></p><p>注意：</p><ul><li>负数在计算机中用其绝对值的补码来表示。</li></ul>

### Input
<pre><code style="font-family: Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; font-size: inherit; padding: 0px; color: inherit; background: transparent; border-radius: 3px; margin: 0px; border: none;">输入：9
输出：2
解释：9的二进制表示是1001，一共有2个1。</code></pre>

### Output
<pre><code style="font-family: Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; font-size: inherit; padding: 0px; color: inherit; background: transparent; border-radius: 3px; margin: 0px; border: none;">输入：-2
输出：31
解释：-2在计算机里会被表示成11111111111111111111111111111110，
      一共有31个1。</code></pre>

### Samples
**Sample Input 1**
```
-2
```
**Sample Output 1**
```
31
```

**Sample Input 2**
```
9
```
**Sample Output 2**
```
2
```

### Hint
<p><a href="https://www.bilibili.com/video/BV1Kf4y1S7mB" target="_blank">Andy讲解</a><br /></p>

---

## [LinK44] 二进制中1的最低位位置(打表+Lowbit)

### Description
<p><img alt="lowbit.jpg" src="/public/upload/dcbaca3e1e.jpg" width="474" height="296" /><br /></p><p>打表法是寻找回忆不可或缺的重要方法，如果配合上lowbit，那么更难的问题也能迎刃而解。</p><p>请运用打表法和lowbit算法解决如下问题：</p><p>给定一个16位的十进制数，请把该数转换为二进制数来看待。</p><p>请找到该数看为二进制后，其最低位的1出现的位置。</p><p>也就是这个数最低位的1是二进制中的第几位呢？</p>

### Input
<p>以1开头的二进制数的十进制表示B.</p><p>例如输入9.</p><p><img alt="image.png" src="/public/upload/22827db03d.png" width="391" height="119" /><br /></p>

### Output
<p>输出K，表示B中的1在第K位（K=0,1,2....15)</p><p>9的最低位的1出现在位置0.</p>

### Samples
**Sample Input 1**
```
9

```
**Sample Output 1**
```
0
```

**Sample Input 2**
```
8
```
**Sample Output 2**
```
3
```

### Hint
<p style="margin-left: 0px;"><a href="https://www.bilibili.com/video/BV1dC4y1s7LW" target="_blank">Andy讲解</a></p><p>8 = 2^3 故需要计算以2为底的log(2^3)=3，得到第3位。也就是8的二进制表示中，1出现在第3位。<br /></p><p>用打表法计算Log2。</p>

---

## [LinK45] 真假记忆碎片

### Description
<p style="margin-left: 0px;"><img src="https://pic2.zhimg.com/80/v2-2b8f66b224724de6cfea455f22d5f3c1_720w.jpg" width="400" height="210.5017502917153" /><br /></p><p style="margin-left: 0px;">在千辛万苦得到一个记忆碎片之后，林克需要辨别真假，若是所得到的并不是发生历史中的碎片，乃是后人捏着的，那么林克如何寻回完整的自己呢？</p><p style="margin-left: 0px;">已知林克找到的记忆碎片9×9矩阵是初始矩阵A的解法，也就是记忆碎片A。空白的部分在初始矩阵中用0表示。</p><p><img src="https://cdn.acwing.com/media/article/image/2019/04/18/19_165f3c0a61-1.png" alt="1.png" width="200" height="200" /><img src="https://cdn.acwing.com/media/article/image/2019/04/18/19_18efab2661-2.png" alt="2.png" width="200" height="200" /><br /></p><p>（初始矩阵A）<span style="color: rgb(51, 51, 51);">（记忆碎片A）</span></p><p>请写一个算法，判定找到的记忆碎片是否是真的？</p>

### Input
<p>输入的<span style="color: rgb(51, 51, 51);">记忆碎片A</span>是一个9行9列的数独矩阵。</p><p>每行包含9个数字（均不超过数字为1-9）。</p><p>初始矩阵A：</p><p>530070000</p><p>600195000</p><p>098000060</p><p>800060003</p><p>400803001</p><p>700020006</p><p>060000280</p><p>000419005</p><p>000080079</p>

### Output
<p>如果输入数据真的是<span style="color: rgb(51, 51, 51);">初始矩阵A</span>的解，输出Yes，否则输出No</p>

### Samples
**Sample Input 1**
```
534678912
672195348
198342567
859761423
426853791
713924856
961537284
287419635
345286179
```
**Sample Output 1**
```
Yes
```

**Sample Input 2**
```
123456789
123456789
123456789
123456789
123456789
123456789
123456789
123456789
123456789

```
**Sample Output 2**
```
No
```

**Sample Input 3**
```
534678912
672195348
198342567
859761423
42689993791
713924856
961537284
287419635
345286179
```
**Sample Output 3**
```
No
```

### Hint
<p><a href="https://www.bilibili.com/video/BV1oU4y1h7hV/" target="_blank">Andy(2021)</a><br /></p>

---

## [LinK46] 寻找林克的回忆(1)

### Description
<p style="margin-left: 0px;"><img alt="image.png" src="/public/upload/5651a11e2c.png" width="676" height="349" /><br /></p><p style="margin-left: 0px;">为了找到百年沉睡的原因，寻回百年前与公主一起的记忆碎片，明白自己是谁，林克必须破解数独谜题。</p><p style="margin-left: 0px;">林克需要在限定时间内，把9×9的数独补充完整，使得图中每行、每列、每个3 × 3的九宫格内数字1~9均恰好出现一次。</p><p style="margin-left: 0px;">林克需要寻回失去的记忆碎片，你，作为林克的朋友，需要帮忙林克寻回9×9棋盘中失去的数字。</p><p style="margin-left: 0px;">或许有一天，林克也能帮助你，寻回关于你是谁，你从哪里来的记忆碎片。</p><p style="margin-left: 0px;">这是数独试炼I（<span style="color: rgb(51, 51, 51);">解密成功可以解锁林克前25%的记忆碎片）</span></p><p><img src="http://media.openjudge.cn/images/2982_1.jpg" /><br /></p>

### Input
<p><font>输入为9×9的数据。一共9行，每行有9个数字。</font></p><p>数字为0表示对应的数字盘为空。<br /></p>

### Output
<p><font>对于每个测试用例，程序应以与输入数据相同的格式打印解决方案(9×9)。</font></p><p><font>空单元格必须根据规则进行填充。</font></p><p><font>如果解决方案不是唯一的，则程序可以打印其中任何一种。</font><br /></p>

### Samples
**Sample Input 1**
```
103000509
002109400
000704000
300502006
060000050
700803004
000401000
009205800
804000107
```
**Sample Output 1**
```
143628579
572139468
986754231
391542786
468917352
725863914
237481695
619275843
854396127
```

### Hint
<p style="margin-left: 0px;"><a href="https://www.bilibili.com/video/BV1mU4y1b7WE/" target="_blank">Andy(2021)</a></p><p><a href="https://www.bilibili.com/video/BV1oC4y1s7sF" target="_blank">Andy(2020)</a></p><p>改编自：POJ2676<br /></p><p>《算法竞赛进阶指南》</p>

---

## [LinK47] 寻找林克的回忆(2)

### Description
<p style="margin-left: 0px;"><img alt="image.png" src="/public/upload/13e7012948.png" width="537" height="307" /><br /></p><p>为了找到百年沉睡的原因，寻回百年前与公主一起的记忆碎片，明白自己是谁，林克必须破解数独谜题：</p><p>林克需要在限定时间内，把9×9的数独补充完整，使得图中每行、每列、每个3 × 3的九宫格内数字1~9均恰好出现一次。</p><p>林克需要寻回失去的记忆碎片，你，作为林克的朋友，需要帮忙林克寻回9×9棋盘中失去的数字。</p><p>或许有一天，林克也能帮助你，寻回关于你是谁，你从哪里来的记忆碎片。</p><p><span style="color: rgb(51, 51, 51);">这是数独试炼II（</span><span style="color: rgb(51, 51, 51);">解密成功可以解锁林克25%的记忆碎片）</span><br /></p><p><span style="color: rgb(51, 51, 51);">请编写一个程序填写数独。</span><br /></p><p><span style="color: rgb(51, 51, 51);"><img src="https://www.acwing.com/media/article/image/2019/01/16/19_8cb8eda618-%E6%95%B0%E7%8B%AC.png" alt="数独.png" /><br /></span></p>

### Input
<p>输入包含多组测试用例。</p><p>每个测试用例占一行，包含81个字符，代表数独的81个格内数据（顺序总体由上到下，同行由左到右）。</p><p>每个字符都是一个数字（1-9）或一个”.”（表示尚未填充）。</p><p>您可以假设输入中的每个谜题都只有一个解决方案。</p><p>文件结尾处为包含单词“end”的单行，表示输入结束。</p>

### Output
<p>每个测试用例，输出一行数据，代表填充完全后的数独。</p>

### Samples
**Sample Input 1**
```
.2738..1..1...6735.......293.5692.8...........6.1745.364.......9518...7..8..6534.
......52..8.4......3...9...5.1...6..2..7........3.....6...1..........7.4.......3.
end
```
**Sample Output 1**
```
527389416819426735436751829375692184194538267268174593643217958951843672782965341
416837529982465371735129468571298643293746185864351297647913852359682714128574936
```

### Hint
<p style="margin-left: 0px;"><a href="https://www.bilibili.com/video/BV1uA411V7Nr/" target="_blank">Andy(2021)</a></p><p><a href="https://www.bilibili.com/video/BV1Ki4y1t7mf" target="_blank">Andy(2020)</a><br /></p><p><a href="https://www.acwing.com/problem/content/video/168/" target="_blank">ACWing讲解</a></p><p>来源：<a href="http://bailian.openjudge.cn/practice/2984" target="_blank">2984</a></p>

---

## [LinK48] 寻找林克的回忆(3)

### Description
<p><img src="https://tse4-mm.cn.bing.net/th?id=OIP.RSKuXL8d4jPQ3CHnZ5Z3jQHaEo&pid=Api&rs=1" alt="See the source image" /><br /></p><p>为了寻回百年前与公主一起的记忆碎片，林克历尽千辛万苦总算破解了数独试炼I和II的谜题，寻回50%的记忆碎片。<br /></p><p>如今，摆在他面前是数独试炼III——传说中的靶形数独（通过后可以获得剩下的30%的记忆碎片)。</p><p>靶形数独的方格同普通数独一样，在9×9的大九宫格中有9个3×3的小九宫格（用粗黑色线隔开的）。</p><p>在这个大九宫格中，有一些数字是已知的，根据这些数字，利用逻辑推理，在其他的空格上填入1到9的数字。</p><p>每个数字在每个小九宫格内不能重复出现，每个数字在每行、每列也不能重复出现。</p><p>但靶形数独有一点和普通数独不同，即每一个方格都有一个分值，而且如同一个靶子一样，离中心越近则分值越高（如下图所示）。</p><p><img src="https://www.acwing.com/media/article/image/2019/01/17/19_1add32be19-%E9%9D%B6%E5%AD%90.jpe.jpg" alt="靶子.jpe.jpg" /><br /></p><p><span style="color: rgb(51, 51, 51);">上图具体的分值分布是：</span></p><p style="margin-left: 40px;"><span style="color: rgb(51, 51, 51);">最里面一格（黄色区域）为10分<br /></span>黄色区域外面的一圈（红色区域）每个格子为9分<br />再外面一圈（蓝色区域）每个格子为8分<br />蓝色区域外面一圈（棕色区域）每个格子为7分<br />最外面一圈（白色区域）每个格子为6 分</p><p>每个人必须完成一个给定的数独（每个给定数独可能有不同的填法），而且要争取更高的总分数。</p><p>而这个总分数即每个方格上的分值和完成这个数独时填在相应格上的数字的乘积的总和。</p><p>如图，在以下的这个已经填完数字的靶形数独游戏中，总分数为2829。</p><p>游戏规定，将以总分数的高低决出胜负。</p><p><img src="https://www.acwing.com/media/article/image/2019/01/17/19_55aa03a419-%E9%9D%B6%E5%AD%902.jpe.jpg" alt="靶子2.jpe.jpg" /><br /></p><p><span style="color: rgb(51, 51, 51);">求对于给定的靶形数独，能够得到的最高分数。</span><br /></p>

### Input
<p>输入一共包含9行。</p><p>每行 9 个整数（每个数都在 0—9 的范围内），表示一个尚未填满的数独方格，未填的空格用“0”表示。</p><p>每两个数字之间用一个空格隔开。</p>

### Output
<p>输出可以得到的靶形数独的最高分数。</p><p>如果这个数独无解，则输出整数-1。</p>

### Samples
**Sample Input 1**
```
7 0 0 9 0 0 0 0 1 
1 0 0 0 0 5 9 0 0 
0 0 0 2 0 0 0 8 0 
0 0 5 0 2 0 0 0 3 
0 0 0 0 0 0 6 4 8 
4 1 3 0 0 0 0 0 0 
0 0 7 0 0 2 0 9 0 
2 0 1 0 6 0 8 0 4 
0 8 0 5 0 4 0 1 2 
```
**Sample Output 1**
```
2829
```

### Hint
<p style="margin-left: 0px;"><a href="https://www.bilibili.com/video/bv1Qb4y1D7hY" target="_blank">Andy(2021)</a></p><p><a href="https://www.bilibili.com/video/BV1mA411b7hB" target="_blank">Andy(2020)</a></p><p><a href="https://www.acwing.com/video/272/" target="_blank">ACWing的讲解</a></p>

---

## [LinK49] 寻找林克的回忆(4)

### Description
<p style="margin-left: 0px;"><img alt="image.png" src="/public/upload/452568f066.png" width="652" height="367" /><br /></p><p>为了寻回百年前与公主一起的记忆碎片，林克终于来到了数独试炼的终阶——16*16字母数独</p><p>（如果通过，可以获得最后的的20%的记忆碎片)。</p><p style="margin-left: 0px;">字母数独要求如下：</p><p style="margin-left: 0px;">将一个16x16的数独填写完整，使得每行、每列、每个4x4十六宫格内字母A~P均恰好出现一次。</p><p>保证每个输入只有唯一解决方案。</p><p><img src="https://www.acwing.com/media/article/image/2019/01/16/19_cabce58018-%E6%95%B0%E7%8B%AC2.jpg" alt="数独2.jpg" /><br /></p>

### Input
<p>输入包含多组测试用例。</p><p>每组测试用例包括16行，每行一组字符串，共16个字符串。</p><p>第i个字符串表示数独的第i行。</p><p>字符串包含字符可能为字母A~P或”-“（表示等待填充）。</p><p>测试用例之间用单个空行分隔，输入至文件结尾处终止。</p>

### Output
<p>对于每个测试用例，均要求保持与输入相同的格式，将填充完成后的数独输出。</p><p>每个测试用例输出结束后，输出一个空行。</p>

### Samples
**Sample Input 1**
```
--A----C-----O-I
-J--A-B-P-CGF-H-
--D--F-I-E----P-
-G-EL-H----M-J--
----E----C--G---
-I--K-GA-B---E-J
D-GP--J-F----A--
-E---C-B--DP--O-
E--F-M--D--L-K-A
-C--------O-I-L-
H-P-C--F-A--B---
---G-OD---J----H
K---J----H-A-P-L
--B--P--E--K--A-
-H--B--K--FI-C--
--F---C--D--H-N-
```
**Sample Output 1**
```
FPAHMJECNLBDKOGI
OJMIANBDPKCGFLHE
LNDKGFOIJEAHMBPC
BGCELKHPOFIMAJDN
MFHBELPOACKJGNID
CILNKDGAHBMOPEFJ
DOGPIHJMFNLECAKB
JEKAFCNBGIDPLHOM
EBOFPMIJDGHLNKCA
NCJDHBAEKMOFIGLP
HMPLCGKFIAENBDJO
AKIGNODLBPJCEFMH
KDEMJIFNCHGAOPBL
GLBCDPMHEONKJIAF
PHNOBALKMJFIDCEG
IAFJOECGLDPBHMNK
```

### Hint
<p style="margin-left: 0px;"><a href="https://www.acwing.com/video/103/" target="_blank">ACWing讲解</a></p><p><a href="https://www.bilibili.com/video/bv1Tf4y1p7y4" target="_blank">Andy2021</a></p><p>(来源《算法竞赛进阶指南》)</p>

---

## [LinK50] 寻找林克的回忆(4)

### Description
<p style="margin-left: 0px;"><img alt="image.png" src="/public/upload/452568f066.png" width="652" height="367" /><br /></p><p>为了寻回百年前与公主一起的记忆碎片，林克终于来到了数独试炼的终阶——16*16字母数独</p><p>（如果通过，可以获得最后的的20%的记忆碎片)。</p><p style="margin-left: 0px;">字母数独要求如下：</p><p style="margin-left: 0px;">将一个16x16的数独填写完整，使得每行、每列、每个4x4十六宫格内字母A~P均恰好出现一次。</p><p>保证每个输入只有唯一解决方案。</p><p><img src="https://www.acwing.com/media/article/image/2019/01/16/19_cabce58018-%E6%95%B0%E7%8B%AC2.jpg" alt="数独2.jpg" /><br /></p>

### Input
<p>输入包含多组测试用例。</p><p>每组测试用例包括16行，每行一组字符串，共16个字符串。</p><p>第i个字符串表示数独的第i行。</p><p>字符串包含字符可能为字母A~P或”-“（表示等待填充）。</p><p>测试用例之间用单个空行分隔，输入至文件结尾处终止。</p>

### Output
<p>对于每个测试用例，均要求保持与输入相同的格式，将填充完成后的数独输出。</p><p>每个测试用例输出结束后，输出一个空行。</p>

### Samples
**Sample Input 1**
```
--A----C-----O-I
-J--A-B-P-CGF-H-
--D--F-I-E----P-
-G-EL-H----M-J--
----E----C--G---
-I--K-GA-B---E-J
D-GP--J-F----A--
-E---C-B--DP--O-
E--F-M--D--L-K-A
-C--------O-I-L-
H-P-C--F-A--B---
---G-OD---J----H
K---J----H-A-P-L
--B--P--E--K--A-
-H--B--K--FI-C--
--F---C--D--H-N-
```
**Sample Output 1**
```
FPAHMJECNLBDKOGI
OJMIANBDPKCGFLHE
LNDKGFOIJEAHMBPC
BGCELKHPOFIMAJDN
MFHBELPOACKJGNID
CILNKDGAHBMOPEFJ
DOGPIHJMFNLECAKB
JEKAFCNBGIDPLHOM
EBOFPMIJDGHLNKCA
NCJDHBAEKMOFIGLP
HMPLCGKFIAENBDJO
AKIGNODLBPJCEFMH
KDEMJIFNCHGAOPBL
GLBCDPMHEONKJIAF
PHNOBALKMJFIDCEG
IAFJOECGLDPBHMNK
```

### Hint
<p style="margin-left: 0px;"><a href="https://www.acwing.com/video/103/" target="_blank">ACWing讲解</a></p><p><a href="https://www.bilibili.com/video/bv1Tf4y1p7y4" target="_blank">Andy2021</a></p><p>(来源《算法竞赛进阶指南》)</p>

---

## [LinK51] 净化迷雾森林(广搜)

### Description
<p><span style="color: rgb(35, 31, 23);"><span style="color: rgb(35, 31, 23);"><img alt="image.png" src="/public/upload/3ec4db1361.png" width="539" height="303" /><br /></span></span></p><p><span style="color: rgb(35, 31, 23);"><span style="color: rgb(35, 31, 23);">迷雾森林被加农的玷污了，原本圣洁无比的迷雾森林，如今被彻底玷污，空气中充满着紫色的恶臭。</span></span></p><p><font>林克临危不惧，带上呼吸面罩，挥舞大师之剑的光芒，净化迷雾。林克所到之处，加农褪去，圣洁回归。</font></p><p><span style="color: rgb(35, 31, 23);"><span style="color: rgb(35, 31, 23);"><span style="color: rgb(35, 31, 23);">如下图，红色代表墙壁，紫色的迷雾代表需要净化的空间，金色代表林克开始净化的起点。</span></span></span></p><p><span style="color: rgb(35, 31, 23);"><span style="color: rgb(35, 31, 23);"><span style="color: rgb(35, 31, 23);">从某处开始，林克只能向</span>相邻的紫色区域移动。请问，林克总共能够净化多少区域？</span><br /></span></p><p><span style="color: rgb(35, 31, 23);"><span style="color: rgb(35, 31, 23);"><span style="color: rgb(35, 31, 23);">图1 初始状态                                                                图2   净化中.....</span><br /></span></span></p><p><span style="color: rgb(35, 31, 23);"><img alt="image.png" src="/public/upload/f48cf16664.png" width="311" height="464" />-----<img alt="image.png" src="/public/upload/d72a7d4360.png" width="313" height="461" /><br /></span></p>

### Input
<p><span style="color: rgb(35, 31, 23);">包括多个数据集合。每个数据集合的第一行是两个整数W和H，分别表示x方向和y方向瓷砖的数量。W和H都不超过20。</span></p><p><span style="color: rgb(35, 31, 23);">在接下来的H行中，每行包括W个字符。</span></p><p><span style="color: rgb(35, 31, 23);">每个字符表示一个区域的状态，规则如下</span></p><p><span style="color: rgb(35, 31, 23);">1）</span><span style="color: rgb(227, 55, 55);">‘.’</span><span style="color: rgb(35, 31, 23);">：代表紫色迷雾<img alt="image.png" src="/public/upload/668de4a15e.png" width="42" height="41" />；</span></p><p><span style="color: rgb(35, 31, 23);">2）</span><span style="color: rgb(227, 55, 55);">‘#’</span><span style="color: rgb(35, 31, 23);">：代表红墙<img alt="image.png" src="/public/upload/65762c10c1.png" width="41" height="40" />；</span></p><p><span style="color: rgb(35, 31, 23);">3）‘@’：代表<span style="color: rgb(35, 31, 23);">林克的起始位置</span><img alt="image.png" src="/public/upload/bb1c64a143.png" width="43" height="40" />(该字符在每个数据集合中唯一出现一次。）</span></p><p><span style="color: rgb(35, 31, 23);">当在一行中读入的是两个零时，表示输入结束。</span></p>

### Output
<p><span style="color: rgb(35, 31, 23);">对每个数据集合，分别输出一行，显示林克从初始位置出发能净化的迷雾数(记数时包括初始位置的迷雾)。</span><br /></p>

### Samples
**Sample Input 1**
```
6 9 
....#. 
.....# 
...... 
...... 
...... 
...... 
...... 
#@...# 
.#..#. 
0 0
```
**Sample Output 1**
```
45
```

### Hint
<p><span style="color: rgb(51, 51, 51);">Y总讲解：</span><a href="http://cxsjsxmooc.openjudge.cn/2020t2springall/018/" target="_blank">红与黑</a><br /></p>

---

## [LinK52] 波克布林的巡逻范围

### Description
<p style="margin-left: 0px;"><img alt="image.png" src="/public/upload/6fd3a750d3.png" width="554" height="227" /><br /></p><p style="margin-left: 0px;">有一个m行和n列的方阵区域(m＊n)，横纵坐标范围分别是0∼m−1和0∼n−1。</p><p>一只红色的波克布林从坐标0,0的格子开始巡逻，每一次只能向左，右，上，下四个方向移动一格。</p><p>但是不能进入行坐标和列坐标的数位之和大于k的格子。</p><p>请问该<span style="color: rgb(51, 51, 51);">红色</span><span style="color: rgb(51, 51, 51);">波克布林</span>能够达到多少个格子？</p><p>假如输入：k=18, m=40, n=40</p><p><span style="color: rgb(51, 51, 51);">则输出是：1484</span></p><p><span style="color: rgb(51, 51, 51);">根据题意思：当k为18时，<span style="color: rgb(51, 51, 51);">波克布林</span>能够进入方格（35,37），因为3+5+3+7 = 18。      但是，它不能进入方格（35,38），因为3+5+3+8 = 19。</span><br /></p>

### Input
<p>输入一行，三个整数，由空格隔开，代表k m n</p><p>其中：</p><p><span style="color: rgb(51, 51, 51);">0&lt;=k&lt;=100</span><br /></p><p>0&lt;=m&lt;=50</p><p>0&lt;=n&lt;=50</p>

### Output
<p>一个整数，表示红色<span style="color: rgb(51, 51, 51);">波克布林能达到的多少格子。</span></p><p><code><br /></code><code><br /></code></p>

### Samples
**Sample Input 1**
```
18 40 40
```
**Sample Output 1**
```
1484
```

### Hint
<p><a href="https://www.bilibili.com/video/BV1Lg4y1z73k" target="_blank">Andy的讲解</a><br /></p><p><a href="https://www.acwing.com/video/148/" target="_blank">ACWing讲解</a></p><p>《来源：剑指Offer》</p>

---

## [LinK53] 加农的入侵

### Description
<p><img alt="OIP (2).jpg" src="/public/upload/38df660829.jpg" width="474" height="266" /><br /></p><p>加农是罪的化身，所到之处污秽遍地。原先富丽堂皇的海鲁拉城堡也被加农污秽了。</p><p>根据调查，加农污秽一片地区有如下规律：</p><p>下图是一个矩形区域，Y=3,<span style="color: rgb(51, 51, 51);">X=4。</span><br /></p><p><img alt="image.png" src="/public/upload/258c8317af.png" width="81" height="103" /><br /></p><p><span style="color: rgb(51, 51, 51);">&quot;.&quot;表示干净区域，而&quot;*&quot;表示障碍物。</span><br /></p><p><span style="color: rgb(51, 51, 51);">如果加农一开始在左下角(1,1），那么加农将会以如下态势污染区域：<br /></span></p><p><span style="color: rgb(51, 51, 51);"><img alt="image.png" src="/public/upload/ecfaa33929.png" width="494" height="124" /><br /></span></p><p>加农将在4天后污染整个区域。</p><p>设区域为矩形Y×X（1&lt;=Y,X&lt;=100），假设加农从(Mx,My)开始扩散，请问经过几天，加农会完全占据这个区域呢？</p>

### Input
<p>* 第一行: 四个由空格隔开的整数: X, Y, Mx, My</p><p>* 第2到第Y+1行:<span style="color: rgb(51, 51, 51);">每行包含一个由X个字符（<span style="color: rgb(51, 51, 51);">&quot;.&quot;表示干净区域，而&quot;*&quot;表示障碍物。</span>）构成的字符串，共同描绘了草地的完整地图。</span></p><p><span style="color: rgb(51, 51, 51);">(1≤X,Y≤100)</span><br /></p>

### Output
<p><span style="color: rgb(51, 51, 51);">输出一个整数，表示加农完全占领该区域所需要的天数。</span><br /></p>

### Samples
**Sample Input 1**
```
4 3 1 1
....
..*.
.**.
```
**Sample Output 1**
```
4
```

**Sample Input 2**
```
10 10 7 5
*.........
..........
........*.
..........
.........*
..........
..........
..........
..*.......
..........

```
**Sample Output 2**
```
6
```

### Hint
<p><a href="https://www.bilibili.com/video/bv1Li4y1t7Av" target="_blank">Andy的讲解</a></p><p><a href="https://www.acwing.com/video/1384/" target="_blank">Y总讲解</a></p>

---

## [LinK54] 骑士林克的怜悯(2)

### Description
<p><img alt="image.png" src="/public/upload/49550add79.png" width="527" height="315" /><br /></p><p><span style="color: rgb(73, 80, 96);">帮助自己的2D骑士同伴进入到变形棋盘世界不久，林克意识到既然棋盘可变，但是骑士们的战斗水平却没有长进。</span></p><p><span style="color: rgb(73, 80, 96);">虽然可以在见到更多的风景，探索更多不同的空间，但是如果自身的实力没有提升，那么骑士们感受不到那真正的自由以及成长的快乐。</span></p><p>林克找到去到阿卡来研究所，得到新的道具——试炼棋盘。</p><p>这个新道具可以在骑士的2D空间中创造试炼场以及2D守护者，让骑士们可以开始实战演练，提升攻击力。</p><p>如下图是一个10列<span style="color: rgb(51, 51, 51);">11行</span>的棋盘（11×10）：</p><p>K代表骑士的位置，H代表守护者的位置。</p><p>. 代表可移动的位置，*代表障碍物。</p><p><img alt="image.png" src="/public/upload/7b7e6811e1.png" width="231" height="249" /><br /></p><p><span style="color: rgb(51, 51, 51);">骑士</span>可以按照下图中的A,B,C,D...这条路径用5次跳跃，抵达守护者的位置偷袭它。（有可能其它路线的长度也是5）：<br /></p><p><img alt="image.png" src="/public/upload/dcd9484cd4.png" width="236" height="253" /><br /></p><p>请问，2D骑士要偷袭守护者，至少要跳多少次？</p>

### Input
<p>第一行： 两个数，表示棋盘的列数Column(&lt;=150)和行数Row(&lt;=150)</p><p>第二行到结尾: Row行Column列的棋盘。</p>

### Output
<p>一个数，表示跳跃的最小次数。<br /></p>

### Samples
**Sample Input 1**
```
10 11
..........
....*.....
..........
...*.*....
.......*..
..*..*...H
*.........
...*...*..
.K........
...*.....*
..*....*..

```
**Sample Output 1**
```
5

```

**Sample Input 2**
```
15 18
...............
..*............
...............
...*........**.
.......*.*.....
...K.*.........
...............
..**...........
.*....*......*.
........**.*...
...............
.....*......*..
.*........*....
...............
....H..........
.**.*..*.......
...............
..*....*.......

```
**Sample Output 2**
```
6
```

### Hint
<p><a href="https://www.bilibili.com/video/bv14i4y1t72T" target="_blank">Andy讲解</a></p>

---

## [LinK55] 公主的攻击范围

### Description
<p><img alt="image.png" src="/public/upload/fc4f8b3e16.png" width="844" height="401" /><br /></p><p>塞尔达公主瘦弱的身体里面蕴含着不可思议的神圣力量，这个力量从公主所在的位置释放，可以逐层扩散到加农污秽掌控的区域。</p><p>给定一个N行M列的区域，代号为1的区域是公主能力释放的初始区，代号为0的区域表示需要洁净的区域。</p><p>每经过1毫秒，公主的神圣之光向外扩散一格，洁净相邻区域（4个方向），请计算每个标记为0的区域中加农的势力最多还能得瑟几毫秒。</p><p><img alt="image.png" src="/public/upload/247c7d8854.png" width="962" height="401" /><br /></p><p>格子与格子之间的距离使用曼哈顿距离计算。</p><p>提示：<br /></p><p><img alt="image.png" src="/public/upload/896fdea9e0.png" width="721" height="185" /><br /></p><p><span style="color: rgb(51, 51, 51);">根据如上公式可知：<span style="color: rgb(51, 51, 51);">曼哈顿距离指</span>两点之间的行坐标i距离和列坐标j距离之和。</span><br /></p><p>题目的意思就是求出矩阵中所有节点为0的点，到节点为1的点的曼哈顿距离。</p>

### Input
<p>第一行两个整数n,m。</p><p>接下来一个N行M列的01矩阵，数字之间没有空格。</p><h4>数据范围</h4><p>1≤N,M≤1000</p>

### Output
<p><span style="color: rgb(51, 51, 51);">一个N行M列的矩阵B，相邻两个整数之间用一个空格隔开。每个整数表示加农势力存在的毫秒数（最小<span style="color: rgb(51, 51, 51);">曼哈顿距离值）</span></span><br /></p>

### Samples
**Sample Input 1**
```
3 4
0001
0011
0110
```
**Sample Output 1**
```
3 2 1 0
2 1 0 0
1 0 0 1
```

### Hint
<p><a href="https://www.bilibili.com/video/BV1Rk4y1r7dH" target="_blank">Andy的讲解</a><br /></p><p><a href="https://www.acwing.com/problem/content/video/175/" target="_blank">ACWing讲解</a></p>

---

## [LinK56] 滚石柱

### Description
<p><img alt="image.png" src="/public/upload/a1ca7e018c.png" width="508" height="358" /><br /></p><p>努力练习用磁铁拖拉滚动大铁箱的林克，想起了自己小时候喜欢的一个游戏，<a href="https://www.albinoblacksheep.com/games/bloxorz" target="_blank">滚石柱</a>。</p><p><img alt="image.png" src="http://www.xmuoj.com/public/upload/2f88248417.png" width="689" height="271" /><br /></p><p>这个游戏的任务是滚动一个1×1×2的长方体<span style="color: rgb(51, 51, 51);">石柱</span>，把它滚动到目的地。</p><p>石柱在地面上有3种放置形式，“立”在地面上（1×1的面接触地面）横“躺”或者竖“趟”在地面上（1×2的面接触地面）</p><p><img alt="image.png" src="/public/upload/283bd916f0.png" width="768" height="191" /><br /></p><p><img alt="image.png" src="/public/upload/2e32f16d7c.png" width="760" height="218" /><br /></p><p>迷宫是一个N行M列的矩阵，每个位置可能是硬地（用”.”表示）、易碎地面（用”E”表示）、禁地（用”#”表示）、起点（用”X”表示）或终点（用”O”表示）。</p><p>在每一步操作中，可以按上下左右四个键之一。</p><p>按下按键之后，<span style="color: rgb(51, 51, 51);">石柱</span>向对应的方向沿着棱滚动90度。</p><p>任意时刻，长方体不能有任何部位接触禁地，并且不能立在易碎地面上。</p><p>字符”X”标识长方体的起始位置，地图上可能有一个”X”或者两个相邻的”X”。</p><p>地图上唯一的一个字符”O”标识目标位置。</p><p>求把<span style="color: rgb(51, 51, 51);">石柱</span>移动到目标位置（即立在”O”上）所需要的最少步数。</p><p>在移动过程中，”X”和”O”标识的位置都可以看作是硬地被利用。</p>

### Input
<p>输入包含多组测试用例。</p><p>对于每个测试用例，第一行包括两个整数N和M。</p><p>接下来N行用来描述地图，每行包括M个字符，每个字符表示一块地面的具体状态。</p><p>当输入用例N=0，M=0时，表示输入终止，且该用例无需考虑。</p><h4><span style="color: rgb(227, 55, 55);">数据范围</span></h4><p>3≤N,M≤500</p>

### Output
<p>每个用例输出一个整数表示所需的最少步数，如果无解则输出”Impossible”。</p><p>每个结果占一行。</p>

### Samples
**Sample Input 1**
```
7 7
#######
#..X###
#..##O#
#....E#
#....E#
#.....#
#######
0 0
```
**Sample Output 1**
```
10
```

### Hint
<p><a href="https://www.bilibili.com/video/BV1oK411V7GF" target="_blank">Andy讲解</a><br /></p><p><a href="https://www.acwing.com/problem/content/video/174/" target="_blank">ACWing讲解</a></p><p><span style="color: rgb(51, 51, 51);">《算法竞赛进阶指南》</span><br /></p>

---

## [LinK57] Dijkstra求最短路(1)

### Description
<p style="margin-left: 0px;">给定一个n个点m条边的有向图，图中可能存在重边和自环，所有边权均为正值。</p><p>请你求出1号点到n号点的最短距离，如果无法从1号点走到n号点，则输出-1。</p><p><img alt="image.png" src="/public/upload/ecc566c4b8.png" width="211" height="104" /><br /></p>

### Input
<p>第一行包含整数n和m。</p><p>接下来m行每行包含三个整数x，y，z，表示存在一条从点x到点y的有向边，边长为z。</p>

### Output
<p>输出一个整数，表示1号点到n号点的最短距离。</p><p>如果路径不存在，则输出-1。</p>

### Samples
**Sample Input 1**
```
3 3
1 2 2
2 3 1
1 3 4
```
**Sample Output 1**
```
3
```

### Hint
<p><a href="https://www.acwing.com/problem/content/851/" target="_blank">原题链接</a></p>

---

## [LinK58] Dijkstra求最短路(2)

### Description
<p style="margin-left: 0px;">给定一个n个点m条边的有向图，图中可能存在重边和自环，所有边权均为非负值。</p><p>请你求出1号点到n号点的最短距离，如果无法从1号点走到n号点，则输出-1。</p><p><img alt="image.png" src="/public/upload/eb7a99368d.png" width="286" height="76" /><br /></p>

### Input
<p>第一行包含整数n和m。</p><p>接下来m行每行包含三个整数x，y，z，表示存在一条从点x到点y的有向边，边长为z。</p>

### Output
<p>输出一个整数，表示1号点到n号点的最短距离。</p><p>如果路径不存在，则输出-1。</p>

### Samples
**Sample Input 1**
```
3 3
1 2 2
2 3 1
1 3 4
```
**Sample Output 1**
```
3
```

### Hint
<p><a href="https://www.acwing.com/problem/content/852/" target="_blank">原题链接</a></p>

---

## [LinK59] 维修电路

### Description
<p><span style="color: rgb(51, 51, 51);"><img alt="image.png" src="/public/upload/506795aaeb.png" width="554" height="311" /><br /></span></p><p><span style="color: rgb(51, 51, 51);">林克的大师摩托的飞行装置被撞坏了，极度影响他的卡丁车比赛。下图是飞行装置的</span>电路板示意图。</p><p>电路板的整体结构是一个R行C列的网格（R,C≤500）</p><p><span style="color: rgb(51, 51, 51);"><img src="https://www.acwing.com/media/article/image/2019/01/16/19_be6ff7a219-%E7%94%B5%E8%B7%AF.png" alt="电路.png" /><br /></span></p><p>每个格点都是电线的接点，每个格子都包含一个电子元件。</p><p>电子元件的主要部分是一个<span style="color: rgb(227, 55, 55);">可旋转</span>的、连接一条对角线上的两个接点的短电缆。</p><p>在旋转之后，它就可以连接另一条对角线的两个接点。</p><p>电路板左上角的接点接入直流电源，右下角的接点接入飞行车的发动装置。</p><p>林克发现因为某些元件的方向不小心发生了改变，电路板可能处于断路的状态。</p><p>请问如何旋转最少数量的元件，使电源与发动装置重新连同在一起呢？</p><p>注意：电流只能通过斜向的线段，水平和竖直线段不是电线。</p><p><br /></p><p>提示：<span style="color: rgb(51, 51, 51);">只需要按照下面的方式旋转标准件，就可以使得电源和发动机之间连通。</span></p><p><img src="https://www.acwing.com/media/article/image/2019/01/16/19_a0e8e80a19-%E7%94%B5%E8%B7%AF2.png" alt="电路2.png" /><br /></p>

### Input
<p>输入文件包含多组测试数据。</p><p>第一行包含一个整数T，表示测试数据的数目。</p><p>对于每组测试数据，第一行包含正整数R和C，表示电路板的行数和列数。</p><p>之后R行，每行C个字符，字符是<code>&quot;/&quot;</code>和<code>&quot;\&quot;</code>中的一个，表示标准件的方向。</p><h4><b>数据范围</b></h4><p><img alt="image.png" src="/public/upload/cc98c64485.png" width="182" height="65" /></p>

### Output
<p>对于每组测试数据，在单独的一行输出一个正整数，表示所需的最小旋转次数。</p><p>如果无论怎样都不能使得电源和发动机之间连通，输出NO SOLUTION。</p>

### Samples
**Sample Input 1**
```
1
3 5
\\/\\
\\///
/\\\\
```
**Sample Output 1**
```
1
```

### Hint
<p style="margin-left: 0px;"><a href="https://www.bilibili.com/video/BV1mC4y1W7Zr" target="_blank">Andy讲解</a></p><p><a href="https://www.acwing.com/problem/content/video/177/" target="_blank">ACWing讲解</a></p><p>改编自《电路维修》</p>

---

## [LinK60] 突袭路线

### Description
<p><img alt="image.png" src="/public/upload/d3817e11ae.png" width="554" height="272" /><br /></p><p>为了解救公主，林克必须深入敌后。<br />在备战前，他拿出“关系分析仪”扫描敌营中每个士兵之间的关系。</p><p>关系分析仪的功能说明如下：<br />如果A的活动范围在B的眼皮底下，那么分析仪就会从B出发连一条射线指向A（B--&gt;A).</p><p>经过扫描，林克得到全营敌兵的相互关系。有些敌人被多个同伴看顾，有些敌人背后一个替他守望的都没有。</p><p>林克决定从背后没有人的敌人开始，潜伏到其背后，突袭之，并且避免被其他人发现。</p><p>军营一共有n个敌人，彼此之间的关系有m条射线，请找到一条可以逐个击破敌人的路线图。</p><p>如果找不到这样一条突袭路线，请则输出-1.</p><p><br />提示：<br />问题转化为：给定一个n个点m条边的有向图，点的编号是1到n，图中可能存在重边和自环。</p><p>请输出任意一个该有向图的拓扑序列，如果拓扑序列不存在，则输出-1。</p><p>若一个由图中所有点构成的序列A满足：对于图中的每条边(x, y)，x在A中都出现在y之前，则称A是该图的一个拓扑序列。</p><p><span style="color: rgb(227, 55, 55);">数据范围：1≤n,m≤10^5</span></p>

### Input
<p>第一行包含两个整数n和m</p><p>接下来m行，每行包含两个整数x和y，表示存在一条从点x到点y的有向边(x, y)。</p>

### Output
<p>共一行，如果存在拓扑序列，则输出拓扑序列。</p><p>否则输出-1。</p>

### Samples
**Sample Input 1**
```
3 3
1 2
2 3
1 3
```
**Sample Output 1**
```
1 2 3
```

### Hint
<p><a href="https://www.bilibili.com/video/BV1x5411s7ev" target="_blank">Andy讲解</a></p><p><a href="https://www.acwing.com/video/280/" target="_blank">acwing讲解</a></p><p>改编自《<span style="color: rgb(73, 80, 96);"><a href="https://www.acwing.com/problem/content/description/850/" target="_blank">有向图的拓扑序列</a>》</span></p>

---

## [LinK61] 最省赛程

### Description
<p style="margin-left: 0px;"><img alt="image.png" src="/public/upload/4af77a00ff.png" width="388" height="216" /><br /></p><p style="margin-left: 0px;">为了让自己能够驾驭大师摩托，打开了大师摩托的隐藏任务：“赛车试炼”。</p><p style="margin-left: 0px;">然而这个特殊的赛车试炼，竟然比的不是车速，比的是如何“省”油钱。</p><p style="margin-left: 0px;">林克需要驾驶不同邮箱容量各异的赛车，从起点城市S开到终点城市E。</p><p style="margin-left: 0px;">有N个城市（编号0、1…N-1）和M条赛道(构成一张无向图)。<br /></p><p>在每个城市里边都有一个加油站，不同的加油站的单位油价不一样(有些城市油价贵，有些城市油价便宜些)。</p><p>请计算，如果林克驾驶的是一辆油箱容量为C的赛车，那么他从起点城市S开到终点城市E至少要花多少油钱？<br /></p><p><span style="color: rgb(51, 51, 51);">注意：</span><span style="color: rgb(51, 51, 51);">车子初始时油箱是空的，需要在起点城市加油方可起行。</span><br /></p>

### Input
<p>第一行包含两个整数N和M。</p><p>第二行包含N个整数，代表N个城市的单位油价，第i个数即为第i个城市的油价Pi。</p><p>接下来M行，每行包括三个整数u,v,d，表示城市u与城市v之间存在道路，且赛车从u到v需要消耗的油量为d。</p><p>接下来一行包含一个整数q，代表问题数量（q&lt;100)</p><p>接下来q行，每行包含三个整数C、S、E，分别表示<span style="color: rgb(51, 51, 51);">赛车</span>油箱容量、起点城市S、终点城市E。</p><p><b>数据范围：</b></p><p><img alt="image.png" src="/public/upload/e861511252.png" width="150" height="120.33203125" /><br /></p>

### Output
<p>对于每个问题，输出一个整数，表示所需的最少油钱。</p><p>如果无法从起点城市开到终点城市，则输出”impossible”。</p><p>每个结果占一行。</p>

### Samples
**Sample Input 1**
```
5 5
10 10 20 12 13
0 1 9
0 2 8
1 2 1
1 3 11
2 3 7
2
10 0 3
20 1 4
```
**Sample Output 1**
```
170
impossible
```

### Hint
<p style="margin-left: 0px;"><a href="https://www.bilibili.com/video/BV1sf4y1m7V5" target="_blank">Andy讲解</a></p><p><a href="https://www.acwing.com/problem/content/video/178/" target="_blank">ACWing讲解</a></p><p>改变自《装满的油箱》</p>

---

## [LinK62] 数字三角形

### Description
<p>数字三角形是动态规划的入门题，小鲁如果要入门动态规划，这道题是不可不做的：</p><pre>7<br />3   8<br />8   1   0<br />2   7   4   4<br />4   5   2   6   5<br /><br />(图1)</pre><p><span style="color: rgb(35, 31, 23);">图1给出了一个数字三角形。从三角形的顶部到底部有很多条不同的路径。对于每条路径，把路径上面的数加起来可以得到一个和，你的任务就是找到最大的和。</span></p><p><span style="color: rgb(35, 31, 23);">注意：路径上的每一步只能从一个数走到正下方和右下方的位置。</span></p>

### Input
<p><span style="color: rgb(35, 31, 23);">输入的是一行是一个整数N (1 &lt; N &lt;= 1000)，给出三角形的行数。下面的N行给出数字三角形。数字三角形上的数的范围都在0和100之间。</span><br /></p>

### Output
<p><span style="color: rgb(35, 31, 23);">输出最大的和。</span><br /></p>

### Samples
**Sample Input 1**
```
5
7
3 8
8 1 0 
2 7 4 4
4 5 2 6 5
```
**Sample Output 1**
```
30
```

### Hint
<p><a href="https://www.bilibili.com/video/av97264332" target="_blank">什么是动态规划</a></p><p><a href="https://www.bilibili.com/video/av97263444" target="_blank">Andy的讲解</a></p>

---

## [LinK63] 林克的01背包

### Description
<p>一眨眼一学期快结束了，早就自学完大四4年计算机专业的小华拿到了任天堂公司的offer提前毕业走上他喜爱的设计之路。</p><p>放心不下还在学校苦苦自学的小鲁，小华送给小鲁一套VR装置和一个新名字——林克。</p><p>他对小鲁说：从此以后，我写的VR编程环境来继续引导你自学编程，但是在这新的虚拟世界中，你要化身为林克，接受各种编程试炼的挑战，你愿意吗？</p><p>小鲁知道随着小华的离开，自己自主学习的新时代来了，他挥泪痛别小华，欣然接过小华的赠与，带上林克头套，进入编程大陆，开始了奇妙的VR编程之旅。</p><p>他还来不及为着小华的离开伤感，第一个挑战就来临了。<br /></p><p>“林克”面临一个艰难的选择,他的背包容量有限,而面前摆放着价值不同的物品(各种套装)</p><p>你可以帮帮他吗?</p><p><img alt="image.png" src="/public/upload/4605ef2575.png" width="357" height="201" /><br /></p><p><img alt="image.png" src="/public/upload/6f6acafda3.png" width="612" height="143" /><br /></p>

### Input
<p><img alt="image.png" src="/public/upload/a884a9d2d3.png" width="651" height="72" /><br /></p><p><img alt="image.png" src="/public/upload/a1dc684fed.png" width="192" height="59" /><br /></p>

### Output
<p><span style="color: rgb(51, 51, 51);">输出一个整数，表示最大价值。</span><br /></p>

### Samples
**Sample Input 1**
```
4 5
1 2
2 4
3 4
4 5
```
**Sample Output 1**
```
8
```

**Sample Input 2**
```
16 24
30 34
78 40
96 97
2 38
59 57
10 48
28 65
40 17
95 84
17 5
80 83
74 32
37 28
44 36
25 14
95 29
```
**Sample Output 2**
```
86
```

### Hint
<p><a href="https://www.bilibili.com/video/BV197411y7mb" target="_blank">Andy的讲解</a><br /></p><p><a href="https://www.acwing.com/video/944/" target="_blank">acwing讲解(2020)</a><br /></p>

---

## [LinK64] 林克的完全背包

### Description
<p>搞定了01背包问题，林克继续挑战完全背包问题：</p><p><img src="https://pic4.zhimg.com/80/v2-6fc1150fbb9af0f4ea680b29f2ebea23_720w.jpg" /><br /></p><p>有N种物品和一个容量是V的背包，每种物品都有无限件可用。</p><p>第i种物品的体积是vi，价值是wi。</p><p>求解将哪些物品装入背包，可使这些物品的总体积不超过背包容量，且总价值最大。<br />输出最大价值。</p><p><span style="color: rgb(227, 55, 55);">数据范围</span><br /></p><p><span style="color: rgb(227, 55, 55);">0&lt;N,V≤1000<br />0&lt;vi,wi≤1000</span></p>

### Input
<p>第一行两个整数，N，V，用空格隔开，分别表示物品种数和背包容积。</p><p>接下来有N行，每行两个整数vi,wi，用空格隔开，分别表示第i种物品的体积和价值。</p>

### Output
<p><span style="color: rgb(51, 51, 51);">输出一个整数，表示最大价值。</span><br /></p>

### Samples
**Sample Input 1**
```
7 884
6148 6786
8500 8620
6136 6930
8700 6732
409 3388
9925 642
4324 5208
```
**Sample Output 1**
```
6776
```

### Hint
<p><a href="https://www.acwing.com/video/945/" target="_blank">acwing讲解</a></p>

---

## [LinK65] 多重背包问题(1)

### Description
<p style="margin-left: 0px;"><img alt="image.png" src="/public/upload/f54a4768cf.png" width="600" height="322.2488038277512" /><br /></p><p style="margin-left: 0px;">有N种物品和一个容量是V的背包。</p><p>第i种物品最多有si件，每件体积是vi，价值是wi。</p><p>求解将哪些物品装入背包，可使物品体积总和不超过背包容量，且价值总和最大。<br />输出最大价值。</p><h4><span style="color: rgb(227, 55, 55);">数据范围</span></h4><p><span style="color: rgb(227, 55, 55);">0&lt;N,V≤100<br />0&lt;vi,wi,si≤100</span></p>

### Input
<p>第一行两个整数，N，V，用空格隔开，分别表示物品种数和背包容积。</p><p>接下来有N行，每行三个整数vi,wi,si，用空格隔开，分别表示第i种物品的体积、价值和数量。</p>

### Output
<p><span style="color: rgb(51, 51, 51);">输出一个整数，表示最大价值。</span><br /></p>

### Samples
**Sample Input 1**
```
4 5
1 2 3
2 4 1
3 4 3
4 5 2
```
**Sample Output 1**
```
10
```

### Hint
<p><a href="https://www.acwing.com/problem/content/4/" target="_blank">原题链接</a><br /></p>

---

## [LinK66] 多重背包问题(2)

### Description
<p style="margin-left: 0px;"><img alt="image.png" src="/public/upload/205e8efc71.png" width="600" height="322.2488038277512" /><br /></p><p style="margin-left: 0px;">有N种物品和一个容量是V的背包。</p><p>第i种物品最多有si件，每件体积是vivi，价值是wi。</p><p>求解将哪些物品装入背包，可使物品体积总和不超过背包容量，且价值总和最大。<br />输出最大价值。</p><p><img alt="image.png" src="/public/upload/d98a38438e.png" width="174" height="106" /><br /></p><h5>提示：</h5><p>本题考查多重背包的二进制优化方法。</p>

### Input
<p>第一行两个整数，N，V，用空格隔开，分别表示物品种数和背包容积。</p><p>接下来有N行，每行三个整数vi,wi,si，用空格隔开，分别表示第i种物品的体积、价值和数量。</p>

### Output
<p><span style="color: rgb(51, 51, 51);">输出一个整数，表示最大价值。</span><br /></p>

### Samples
**Sample Input 1**
```
4 5
1 2 3
2 4 1
3 4 3
4 5 2
```
**Sample Output 1**
```
10
```

### Hint
<p><a href="https://www.acwing.com/problem/content/5/" target="_blank">原题链接</a></p>

---

## [LinK67] 分组背包问题

### Description
<p style="margin-left: 0px;"><img alt="image.png" src="/public/upload/904c138622.png" width="600" height="311.04477611940297" /><br /></p><p style="margin-left: 0px;">有N组物品和一个容量是V的背包。</p><p>每组物品有若干个，同一组内的物品最多只能选一个。<br />每件物品的体积是vij，价值是wij，其中i是组号，j是组内编号。</p><p>求解将哪些物品装入背包，可使物品总体积不超过背包容量，且总价值最大。</p><p>输出最大价值。</p><p><img alt="image.png" src="/public/upload/3d0e1e535d.png" width="156" height="118" /><br /></p>

### Input
<p>第一行有两个整数N，V用空格隔开，分别表示物品组数和背包容量。</p><p>接下来有N组数据：</p><p><img alt="image.png" src="/public/upload/5adac9c21a.png" width="487" height="72" /><br /></p>

### Output
<p><span style="color: rgb(51, 51, 51);">输出一个整数，表示最大价值。</span><br /></p>

### Samples
**Sample Input 1**
```
3 5
2
1 2
2 4
1
3 4
1
4 5
```
**Sample Output 1**
```
8
```

### Hint
<p><a href="https://www.acwing.com/problem/content/9/" target="_blank">原题链接</a></p><p><a href="https://www.acwing.com/video/341/" target="_blank">Y总讲解(基础课)</a></p>

---

## [LinK68] 混合背包问题

### Description
<p>有 N 种物品和一个容量是 V 的背包。</p><p>物品一共有三类：</p><p>第一类物品只能用1次（01背包）；</p><p>第二类物品可以用无限次（完全背包）；</p><p>第三类物品最多只能用 si 次（多重背包）；</p><p>每种体积是 vi，价值是 wi。</p><p>求解将哪些物品装入背包，可使物品体积总和不超过背包容量，且价值总和最大。</p><p>输出最大价值。</p>

### Input
<p>第一行两个整数，N，V，用空格隔开，分别表示物品种数和背包容积。</p><p>接下来有 N 行，每行三个整数 vi,wi,si，用空格隔开，分别表示第 i 种物品的体积、价值和数量。</p><p>si=−1 表示第 i 种物品只能用1次；</p><p>si=0 表示第 i 种物品可以用无限次；</p><p>si&gt;0 表示第 i 种物品可以使用 si 次；</p>

### Output
<p><span style="color: rgb(51, 51, 51);">输出一个整数，表示最大价值。</span><br /></p>

### Samples
**Sample Input 1**
```
4 5
1 2 -1
2 4 1
3 4 0
4 5 2
```
**Sample Output 1**
```
8
```

---

## [LinK69] 摘花生

### Description
<p>她来到一片有网格状道路的矩形花生地，从西北角进去，东南角出来。</p><p>地里每个道路的交叉点上都有种着一株花生苗，上面有若干颗花生，经过一株花生苗就能摘走该它上面所有的花生。</p><p>Hello Kitty只能向东或向南走，不能向西或向北走。</p><p>问Hello Kitty最多能够摘到多少颗花生。</p><p><br /></p><p><img src="https://cdn.acwing.com/media/article/image/2019/09/12/19_a8509f26d5-1.gif" alt="1.gif" /><br /></p>

### Input
<p>第一行是一个整数<code>T</code>，代表一共有多少组数据。</p><p>接下来是<code>T</code>组数据。</p><p>每组数据的第一行是两个整数，分别代表花生苗的行数<code>R</code>和列数<code>C</code>。</p><p>每组数据的接下来<code>R</code>行数据，从北向南依次描述每行花生苗的情况。每行数据有<code>C</code>个整数，按从西向东的顺序描述了该行每株花生苗上的花生数目<code>M</code>。</p><p><strong>数据范围</strong></p><p>1 ≤<code>T</code>≤ 100</p><p>1 ≤<code>R</code>，<code>C</code>≤ 100</p><p>0 ≤<code>M</code>≤ 1000</p>

### Output
<p>对每组输入数据，输出一行，内容为Hello Kitty能摘到得最多的花生颗数。</p>

### Samples
**Sample Input 1**
```
2
2 2
1 1
3 4
2 3
2 3 4
1 6 5
```
**Sample Output 1**
```
8
16
```

### Hint
<p><a href="https://www.acwing.com/problem/content/1017/" target="_blank">原题链接</a></p><p><a href="http://www.example.comhttps://www.acwing.com/video/2332/" target="_blank">Y总讲解</a></p><p><a href="https://www.acwing.com/activity/content/code/content/112796/" target="_blank">Y总代码</a></p>

---

## [LinK70] 最低通行费

### Description
<p>一个商人穿过一个N×N的正方形的网格，去参加一个非常重要的商务活动。</p><p>他要从网格的左上角进，右下角出。</p><p>每穿越中间1个小方格，都要花费1个单位时间。</p><p>商人必须在(2N - 1)个单位时间穿越出去。</p><p>而在经过中间的每个小方格时，都需要缴纳一定的费用。</p><p>这个商人期望在规定时间内用最少费用穿越出去。</p><p>请问至少需要多少费用？</p><p>注意：不能对角穿越各个小方格（即，只能向上下左右四个方向移动且不能离开网格）。</p>

### Input
<p>第一行是一个整数，表示正方形的宽度N。</p><p>后面N行，每行N个不大于100的正整数，为网格上每个小方格的费用。</p><p><strong>数据范围</strong></p><p>1 ≤ N ≤ 100</p>

### Output
<p>输出一个整数，表示至少需要的费用。</p><p><strong>样例解释</strong></p><p>样例中，最小值为109 = 1 + 2 + 5 + 7 + 9 + 12 + 19 + 21 + 33。</p>

### Samples
**Sample Input 1**
```
5
1  4  6  8  10
2  5  7  15 17
6  8  9  18 20
10 11 12 19 21
20 23 25 29 33
```
**Sample Output 1**
```
109
```

### Hint
<p><a href="https://www.acwing.com/problem/content/1020/" target="_blank">原题链接</a></p><p><a href="https://www.acwing.com/solution/content/51101/" target="_blank">参考题解</a></p><p><a href="https://www.acwing.com/activity/content/code/content/112797/" target="_blank">Y总代码</a></p><p><a href="https://www.acwing.com/video/353/" target="_blank">Y总讲解</a></p>

---

## [LinK71] 最长上升子序列

### Description
<p><span style="color: rgb(51, 51, 51);">给定一个长度为N的数列，求数值严格单调递增的子序列的长度最长是多少。</span><br /></p><p><span style="color: rgb(51, 51, 51);"><img alt="image.png" src="/public/upload/743ae6c848.png" width="212" height="87" /><br /></span></p>

### Input
<p>第一行包含整数N。</p><p>第二行包含N个整数，表示完整序列。</p>

### Output
<p><span style="color: rgb(51, 51, 51);">输出一个整数，表示最大长度。</span><br /></p>

### Samples
**Sample Input 1**
```
7
3 1 2 1 8 5 6
```
**Sample Output 1**
```
4
```

### Hint
<p><a href="https://www.acwing.com/problem/content/897/" target="_blank">原题链接</a></p>

---

## [LinK72] 最长上升子序列(2)

### Description
<p>给定一个长度为N的数列，求数值严格单调递增的子序列的长度最长是多少。<br /></p><p><span style="color: rgb(51, 51, 51);"><img alt="image.png" src="/public/upload/77823fbbb0.png" width="209" height="85" /></span><br /></p>

### Input
<p>第一行包含整数N。</p><p>第二行包含N个整数，表示完整序列。</p>

### Output
<p><span style="color: rgb(51, 51, 51);">输出一个整数，表示最大长度。</span><br /></p>

### Samples
**Sample Input 1**
```
7
3 1 2 1 8 5 6
```
**Sample Output 1**
```
4
```

### Hint
<p><a href="https://www.acwing.com/problem/content/898/" target="_blank">原题链接</a></p>

---

## [LinK73] 拦截导弹

### Description
<p><font>某国为了防御敌国的导弹袭击，发展出一种导弹</font><font>拦截系统。</font></p><p><font>但是这种导弹拦截系统有一个缺陷：虽然它的第一发炮弹能够到达任意的高度，但是以后每一发炮弹都不能高于前一发的高度。</font></p><p><font>某天，雷达捕捉到敌国的</font><font>导弹来袭。由于该系统还在试用阶段，所以只有一套系统，因此有可能不能拦截所有的导弹。</font><br /><br /><font>输入导弹依次飞来的高度（雷达给出的高度数据是不大于</font>30000的正整数），计算这套系统最多能拦截多少导弹，如果要拦截所有导弹最少要配备多少套这种导弹拦截系统。<br /></p>

### Input
<p><font>一行，为导弹依次飞来的高度</font><br /></p>

### Output
<p><font>两行，分别是最多能拦截的导弹数与要拦截所有导弹最少要配备的系统数</font><br /></p>

### Samples
**Sample Input 1**
```
389 207 155 300 299 170 158 65
```
**Sample Output 1**
```
6
2
```

### Hint
<p><a href="https://www.acwing.com/problem/content/1012/" target="_blank">原题链接</a></p>

---

## [LinK75] 最长公共子序列

### Description
<h4><span style="color: rgb(51, 51, 51);">给定两个长度分别为N和M的字符串A和B，求既是A的子序列又是B的子序列的字符串长度最长是多少。</span><br /></h4><h4 style="margin-left: 0px;">数据范围</h4><p>1≤N,M≤1000</p>

### Input
<p>第一行包含两个整数N和M。</p><p>第二行包含一个长度为N的字符串，表示字符串A。</p><p>第三行包含一个长度为M的字符串，表示字符串B。</p><p>字符串均由小写字母构成。</p>

### Output
<p><span style="color: rgb(51, 51, 51);">输出一个整数，表示最大长度。</span><br /></p>

### Samples
**Sample Input 1**
```
4 5
acbd
abedc
```
**Sample Output 1**
```
3
```

### Hint
<p><a href="https://www.acwing.com/problem/content/899/" target="_blank">原题链接</a></p><p><a href="https://www.acwing.com/video/946/" target="_blank">Y总讲解</a></p>

---

## [LinK76] 石子合并

### Description
<p style="margin-left: 0px;"><img alt="image.png" src="/public/upload/d47e1d10c6.png" width="600" height="336.8560105680317" /><br /></p><p style="margin-left: 0px;">设有N堆石子排成一排，其编号为1，2，3，…，N。</p><p>每堆石子有一定的质量，可以用一个整数来描述，现在要将这N堆石子合并成为一堆。</p><p>每次只能合并相邻的两堆，合并的代价为这两堆石子的质量之和，合并后与这两堆石子相邻的石子将和新堆相邻，合并时由于选择的顺序不同，合并的总代价也不相同。</p><p>例如有4堆石子分别为 1 3 5 2， 我们可以先合并1、2堆，代价为4，得到4 5 2， 又合并 1，2堆，代价为9，得到9 2 ，再合并得到11，总代价为4+9+11=24；</p><p>如果第二步是先合并2，3堆，则代价为7，得到4 7，最后一次合并代价为11，总代价为4+7+11=22。</p><p>问题是：找出一种合理的方法，使总的代价最小，输出最小代价。</p><h4><span style="color: rgb(227, 55, 55);">数据范围</span></h4><p><span style="color: rgb(227, 55, 55);">1≤N≤300</span></p>

### Input
<p>第一行一个数N表示石子的堆数N。</p><p>第二行N个数，表示每堆石子的质量(均不超过1000)。</p>

### Output
<p><span style="color: rgb(51, 51, 51);">输出一个整数，表示最小代价。</span><br /></p>

### Samples
**Sample Input 1**
```
4
1 3 5 2
```
**Sample Output 1**
```
22
```

### Hint
<p><a href="https://www.acwing.com/problem/content/284/" target="_blank">原题链接</a></p><p><a href="https://www.acwing.com/video/943/" target="_blank">ACWing讲解</a></p>

---

## [LinK78] 加分二叉树

### Description
<p>设一个 n 个节点的二叉树 tree 的中序遍历为（1,2,3,…,n），其中数字 1,2,3,…,n 为节点编号。</p><p>每个节点都有一个分数（均为正整数），记第 i 个节点的分数为 di，tree 及它的每个子树都有一个加分，任一棵子树 subtree（也包含 tree 本身）的加分计算方法如下：</p><p>subtree的左子树的加分 × subtree的右子树的加分 ＋ subtree的根的分数</p><p>若某个子树为空，规定其加分为 1。</p><p>叶子的加分就是叶节点本身的分数，不考虑它的空子树。</p><p>试求一棵符合中序遍历为（1,2,3,…,n）且加分最高的二叉树 tree。</p><p>要求输出：</p><p>（1）tree的最高加分</p><p>（2）tree的前序遍历</p>

### Input
<p>第 1 行：一个整数 n，为节点个数。n&lt;=30</p><p>第 2 行：n 个用空格隔开的整数，为每个节点的分数（0&lt;分数&lt;100）。</p>

### Output
<p>第 1 行：一个整数，为最高加分</p><p>第 2 行：n 个用空格隔开的整数（最后一个数后面没空格），为该树的前序遍历。如果存在多种方案，则输出字典序最小的方案。</p>

### Samples
**Sample Input 1**
```
5
5 7 1 2 10
```
**Sample Output 1**
```
145
3 1 2 4 5
```

### Hint
<p><a href="https://www.acwing.com/problem/content/481/" target="_blank">原题链接</a></p>

---

## [LinK80] 没有上司的舞会

### Description
<p style="margin-left: 0px;">Ural大学有N名职员，编号为1~N。</p><p>他们的关系就像一棵以校长为根的树，父节点就是子节点的直接上司。</p><p>每个职员有一个快乐指数，用整数Hi给出，其中1≤i≤N。</p><p>现在要召开一场周年庆宴会，不过，没有职员愿意和直接上司一起参会。</p><p>在满足这个条件的前提下，主办方希望邀请一部分职员参会，使得所有参会职员的快乐指数总和最大，求这个最大值。</p><p><span style="color: rgb(227, 55, 55);">数据范围</span></p><p><span style="color: rgb(227, 55, 55);">1≤N≤6000,<br />−128≤Hi≤127</span></p>

### Input
<p>第一行一个整数N。</p><p>接下来N行，第 i 行表示 i 号职员的快乐指数Hi。</p><p>接下来N-1行，每行输入一对整数L, K,表示K是L的直接上司。</p>

### Output
<p><span style="color: rgb(51, 51, 51);">输出最大的快乐指数。</span><br /></p>

### Samples
**Sample Input 1**
```
7
1
1
1
1
1
1
1
1 3
2 3
6 4
7 4
4 5
3 5
```
**Sample Output 1**
```
5
```

### Hint
<p><a href="https://www.acwing.com/video/471/" target="_blank">acwing讲解</a><br /></p><p><a href="https://www.acwing.com/problem/content/287/" target="_blank">原题链接</a><br /></p><p><a href="https://www.acwing.com/solution/content/3502/" target="_blank">题解参考</a></p>

---

## [LinK14.5] DFS试炼之n皇后问题

### Description
<p><span style="color: rgb(51, 51, 51);">n-皇后问题是指将 n 个皇后放在 n∗n 的国际象棋棋盘上，使得皇后不能相互攻击到，即任意两个皇后都不能处于同一行、同一列或同一斜线上。</span><br /></p><p><span style="color: rgb(51, 51, 51);"><img alt="image.png" src="/public/upload/d21377e949.png" width="256" height="272" /><br /></span></p><p><span style="color: rgb(227, 55, 55);">数据范围:1&lt;=n&lt;=12</span></p>

### Input
<p><span style="color: rgb(51, 51, 51);">共一行，包含整数n。</span><br /></p>

### Output
<p style="margin-left: 0px;">每个解决方案占n行，每行输出一个长度为n的字符串，用来表示完整的棋盘状态。</p><p>其中”.”表示某一个位置的方格状态为空，”Q”表示某一个位置的方格上摆着皇后。</p><p>每个方案输出完成后，输出一个空行。</p><p>输出方案的顺序请根据样例，按照次序从小到大，从左到右输出。</p>

### Samples
**Sample Input 1**
```
4
```
**Sample Output 1**
```
.Q..
...Q
Q...
..Q.

..Q.
Q...
...Q
.Q..
```

### Hint
<p><a href="https://www.acwing.com/problem/content/845/" target="_blank">原题链接</a></p><p><a href="https://www.acwing.com/video/275/" target="_blank">Y总讲解</a></p>

---

