Add-Type -AssemblyName System.Drawing
$ErrorActionPreference='Stop'

function C([string]$h){ [System.Drawing.ColorTranslator]::ToOle([System.Drawing.ColorTranslator]::FromHtml($h)) }
function Txt($s,[string]$t,[double]$x,[double]$y,[double]$w,[double]$h,[int]$z=12,[string]$c='#3A3D47',[bool]$b=$false,[string]$f='Microsoft YaHei',[int]$a=1){
  $o=$s.Shapes.AddTextbox(1,$x,$y,$w,$h); $o.TextFrame.MarginLeft=0;$o.TextFrame.MarginRight=0;$o.TextFrame.MarginTop=0;$o.TextFrame.MarginBottom=0;$o.TextFrame.WordWrap=-1
  $r=$o.TextFrame.TextRange;$r.Text=$t;$r.Font.Name=$f;$r.Font.Size=$z;$r.Font.Color.RGB=C $c;$r.Font.Bold=if($b){-1}else{0};$r.ParagraphFormat.Alignment=$a;return $o
}
function Box($s,$x,$y,$w,$h,[string]$fill='#F0F2F5',[string]$line='#C5C8CC',[bool]$round=$true){$g=if($round){5}else{1};$o=$s.Shapes.AddShape($g,$x,$y,$w,$h);$o.Fill.ForeColor.RGB=C $fill;$o.Line.ForeColor.RGB=C $line;$o.Line.Weight=.6;return $o}
function Pic($s,[string]$p,$x,$y,$w,$h){$im=[Drawing.Image]::FromFile($p);try{$q=[Math]::Min($w/$im.Width,$h/$im.Height);$ww=$im.Width*$q;$hh=$im.Height*$q;return $s.Shapes.AddPicture($p,0,-1,$x+(($w-$ww)/2),$y+(($h-$hh)/2),$ww,$hh)}finally{$im.Dispose()}}
function Card($s,$x,$y,$w,$h,[string]$label,[string]$body){Box $s $x $y $w $h|Out-Null;$q=Box $s $x $y 3 $h '#1E5A94' '#1E5A94' $false;$q.Line.Visible=0;Txt $s $label.ToUpper() ($x+13) ($y+9) ($w-25) 13 8 '#1E5A94' $true 'JetBrains Mono'|Out-Null;Txt $s $body ($x+13) ($y+28) ($w-22) ($h-33) 10 '#252934'|Out-Null}
function Chrome($s,$n,[bool]$cover=$false){$bar=Box $s 0 0 (106.667*$n) 3 '#1E5A94' '#1E5A94' $false;$bar.Line.Visible=0;Txt $s "$n / 9" 875 12 60 12 7 '#8A9099' $false 'JetBrains Mono' 3|Out-Null;Txt $s 'DUSKYDREAM' 930 210 15 125 6 '#9AA0AA' $false 'JetBrains Mono' 2|Out-Null;Box $s 398 500 164 26 '#FFFFFF' '#8A9099'|Out-Null;Txt $s '◀' 412 506 18 12 9 '#3A3D47' $false 'Arial' 2|Out-Null;Txt $s "$n / 9" 450 506 60 12 8 '#6E7480' $false 'JetBrains Mono' 2|Out-Null;Txt $s '▶' 530 506 18 12 9 '#3A3D47' $false 'Arial' 2|Out-Null}
function Title($s,$n,[string]$t){Chrome $s $n;Txt $s $t 60 40 840 30 22 '#252934' $true|Out-Null;$rule=Box $s 60 80 840 1 '#C5C8CC' '#C5C8CC' $false;$rule.Line.Visible=0;Txt $s '✦' 468 73 24 15 10 '#1E5A94' $true 'Arial' 2|Out-Null}

$root='F:\Starlight\public';$a=Join-Path $root 'ac-screenshots';$out=Join-Path $root 'presentation.pptx';$app=New-Object -ComObject PowerPoint.Application
try{
  $app.Visible=-1;$d=$app.Presentations.Add()
  # 1
  $s=$d.Slides.Add(1,12);Chrome $s 1 $true
  Txt $s '从 AC 到体系' 90 135 600 52 40 '#252934' $true|Out-Null
  Txt $s '—— 程序设计实践课程学习总结' 94 194 520 25 17 '#6E7480'|Out-Null
  $rule=Box $s 90 240 650 1 '#8A9099' '#8A9099' $false;$rule.Line.Visible=0
  Txt $s "题目来源：XMUOJ（LinK 系列 34 题为主，JD 系列 16 题补充）`n题目数量：50 · 语言：C++17" 90 258 620 42 13 '#3A3D47'|Out-Null
  Txt $s "姓名`n孟想（Shepherd Meng）" 90 355 205 38 11 '#252934' $true|Out-Null
  Txt $s "课程`n程序设计实践" 330 355 170 38 11 '#252934' $true|Out-Null
  Txt $s "博客`nwww.lxzm.space/assignment-preview" 570 355 300 38 10 '#252934' $true 'JetBrains Mono'|Out-Null
  # 2
  $s=$d.Slides.Add(2,12);Title $s 2 '学习路线图 (Learning Path)'
  $steps=@(@('① 基础算法','排序 · 二分 · 分治 · 数据结构'),@('② 搜索与图论','DFS / BFS · 并查集 · 图论'),@('③ 动态规划','背包 DP · 线性 DP · 状压 DP'))
  for($i=0;$i -lt 3;$i++){$x=60+($i*290);Box $s $x 105 240 53 '#FFFFFF' '#16436E'|Out-Null;Txt $s $steps[$i][0] ($x+13) 115 205 13 12 '#1E5A94' $true|Out-Null;Txt $s $steps[$i][1] ($x+13) 132 215 12 9 '#3A3D47'|Out-Null;if($i-lt 2){Txt $s '➔' ($x+245) 120 35 15 13 '#1E5A94' $true 'Arial' 2|Out-Null}}
  Card $s 60 175 840 74 'Step 1 · 基础算法夯实（18题）' '双指针、二分查找、分治算法（归并排序与逆序对）、前缀和 / 差分、单调栈 / 队列与 KMP 字符串匹配。'
  Card $s 60 260 840 74 'Step 2 · 状态搜索与图论建图（24题）' 'DFS / BFS 回溯（汉诺塔、N皇后、迷宫）、带权并查集、树形 DFS 重心、拓扑排序、Kruskal MST、二分图染色、Dijkstra 最短路。'
  Card $s 60 345 840 74 'Step 3 · 动态规划升华（8题）' '背包 DP（01 / 完全 / 多重）、线性 DP、区间 DP（加分二叉树）、状压 DP（万城巡游 TSP）。'
  # 3
  $s=$d.Slides.Add(3,12);Title $s 3 '我的成长起点'
  Txt $s '在本学期之前，我已经通过 Luogu、LeetCode 等平台积累了些许刷题经验，也从灵茶山艾府等人那里初步学习了算法知识和做题技巧。' 60 96 840 26 12 '#3A3D47'|Out-Null
  Card $s 60 135 350 110 '曾经 · LeetCode / Luogu' "◆ 已完成 240+ 题，Contest Rating 1735，Top 13%`n◆ 快速解决单道题目，AC 即跳转下一题`n◆ 算法知识零散，缺乏体系化认识`n◆ AI 时代下，亲身实践愈加生疏"
  Card $s 60 255 350 110 '现在 · 程序设计实践课程' "◆ Andy 老师的课程将我拉回 CS 算法基本功`n◆ 趣味横生的题目背景 + 深入浅出的算法课堂`n◆ 沉下心来在屏幕前敲击键盘，AC 陌生而熟悉的题目`n◆ 按算法类别重新组织，建立知识体系"
  Txt $s 'LEETCODE 记录' 445 135 220 12 8 '#1E5A94' $true 'JetBrains Mono'|Out-Null;Pic $s (Join-Path $a 'leetcoderating.png') 445 150 455 100|Out-Null;Txt $s 'Rating 1735 · Top 13%' 445 252 250 11 8 '#6E7480'|Out-Null
  Txt $s 'ANDY 老师空间' 445 275 220 12 8 '#1E5A94' $true 'JetBrains Mono'|Out-Null;Pic $s (Join-Path $a 'andylee.png') 445 290 455 100|Out-Null;Txt $s '程序设计实践课程' 445 392 250 11 8 '#6E7480'|Out-Null
  Txt $s '“LeetCode 锻炼了「解决问题」的能力；这门课程让我开始建立算法知识体系。”' 90 435 780 24 15 '#252934' $true 'Microsoft YaHei' 2|Out-Null
  # 4
  $s=$d.Slides.Add(4,12);Title $s 4 '题解集结构 · 按知识大类编排';Txt $s '共 50 题 · 每题括号内标注精确知识点 · 整体递进：基础算法 → 搜索图论 → 动态规划' 60 96 840 15 9 '#6E7480' $false 'JetBrains Mono'|Out-Null
  Card $s 60 125 400 145 '一、排序、二分与分治 · 10 题' "◆ 双指针 / 有序数组夹逼  LinK06`n◆ 比较排序 / long long 范围  LinK27`n◆ 分治归并 / 逆序对统计  LinK30-31`n◆ 浮点二分 / 精度控制  LinK34-35"
  Card $s 500 125 400 145 '二、递归、回溯与状态搜索 · 15 题' "◆ 汉诺塔 / 递归分治  LinK09`n◆ N皇后 / DFS 剪枝  LinK13`n◆ BFS 迷宫 / 广度搜索  LinK51`n◆ 树形 DP / 雪道寻长  JD162"
  Card $s 60 290 400 125 '三、基础数据结构与字符串 · 8 题' "◆ 前缀和 / 差分  JD121-123`n◆ 单调栈 / 滑动窗口  JD134-135`n◆ KMP 字符串匹配  JD136"
  Card $s 500 290 400 125 '四、贪心 · 图论 · 动态规划 · 17 题' "◆ 并查集 / Kruskal MST  JD138`n◆ Dijkstra 最短路  LinK57-58`n◆ 01背包 / 完全背包  LinK63-64`n◆ 状压 DP / TSP  JD170"
  # 5
  $s=$d.Slides.Add(5,12);Title $s 5 '三段式题解设计';Txt $s '每道题严格按“思路、关键代码、总结”组织；代码展示核心逻辑，不是完整程序。' 60 96 840 18 12 '#3A3D47'|Out-Null
  Card $s 60 135 310 62 '① 算法动机 / 思路' '一句话说清楚这题在考什么、状态如何定义、为何能用此算法。';Txt $s '↓' 210 198 20 12 12 '#6E7480' $true 'Arial' 2|Out-Null
  Card $s 60 215 310 62 '② 关键代码' '4–5 行，只保留核心逻辑，带一行注释说明 dp[i] 含义。';Txt $s '↓' 210 278 20 12 12 '#6E7480' $true 'Arial' 2|Out-Null
  Card $s 60 295 310 62 '③ 总结复盘' '边界处理、循环顺序、易错点（如为何倒序、为何自底向上）。'
  Txt $s '示例 · LinK63 林克的01背包 · 背包 DP / 倒序容量转移' 410 135 485 12 8 '#1E5A94' $true 'JetBrains Mono'|Out-Null;Box $s 410 151 490 103 '#F6F8FA' '#D0D7DE'|Out-Null
  Txt $s "// ② 关键代码`nfor(int i=1; i<=n; i++){`n  cin >> v >> w;`n  for(int j=V; j>=v; j--) // 倒序`n    dp[j] = max(dp[j], dp[j-v]+w);`n}" 422 161 465 78 8 '#252934' $false 'JetBrains Mono'|Out-Null
  Txt $s '为什么倒序？倒序保证在考虑第 i 个物品时，dp[j-v] 还没有被当前物品更新过——即来自前 i-1 个物品的状态。' 410 263 490 30 10 '#3A3D47'|Out-Null
  Txt $s '示例 · JD170 万城巡游 · 状压 DP / TSP' 410 310 470 12 8 '#1E5A94' $true 'JetBrains Mono'|Out-Null;Box $s 410 326 490 80 '#F6F8FA' '#D0D7DE'|Out-Null
  Txt $s "for (int mask=1; mask<(1<<n); mask++)`n  for (int i=0; i<n; i++) if(mask>>i&1)`n    for (int j=0; j<n; j++) if(!(mask>>j&1))`n      dp[mask|(1<<j)][j] = min(dp[mask|(1<<j)][j], dp[mask][i]+w[i][j]);" 422 337 465 55 7 '#252934' $false 'JetBrains Mono'|Out-Null
  # 6
  $s=$d.Slides.Add(6,12);Title $s 6 '整理，比刷题更难';Txt $s '做完一道题只需要 AC；但整理一道题，需要真正理解它。' 60 96 840 18 14 '#3A3D47'|Out-Null
  Card $s 60 145 360 205 '纯粹刷题模式' "AC 通过`n↓`n跳转下一题`n`n过程短暂，遗忘迅速，经验碎片化。"
  Card $s 540 145 360 205 '整理题解模式' "回顾代码逻辑`n↓`n提炼 4-5 行核心`n↓`n归纳算法类别`n↓`n总结易错规律"
  Txt $s '“经验只有经过整理，才能真正变成知识。”' 150 400 660 24 17 '#252934' $true 'Microsoft YaHei' 2|Out-Null
  # 7
  $s=$d.Slides.Add(7,12);Title $s 7 '让题解成为长期积累';Txt $s '最终把题解整理到博客，而不是只导出一份 PDF——希望它不仅完成这次课程作业，也能成为以后继续学习算法时的长期积累。' 60 96 840 32 12 '#3A3D47'|Out-Null
  Txt $s '博客的优势' 60 150 220 18 16 '#252934' $true|Out-Null;Txt $s "◆ 按算法类别分类，结构清晰`n◆ 每题直跳 XMUOJ 原题链接`n◆ 支持 Ctrl+K 全站快速搜索`n◆ 后续可持续补充新内容，不是一次性提交" 60 180 350 90 12 '#3A3D47'|Out-Null
  Card $s 60 305 350 55 '网站地址' 'www.lxzm.space/assignment-preview';Pic $s (Join-Path $a 'screenshotwebsite.png') 470 145 430 230|Out-Null
  Txt $s '“这不是终点，而是巩固自身能力的里程碑。未来会不断回顾和丰富这上面的内容，形成属于我自己的宝库。”' 100 410 760 32 14 '#252934' $true 'Microsoft YaHei' 2|Out-Null
  # 8
  $s=$d.Slides.Add(8,12);Title $s 8 '课程反思 (Reflection)'
  Txt $s '“在本学期之前，我已经通过 Luogu、LeetCode 等平台积累了些许刷题经验，也从灵茶山艾府等人那里初步学习到了算法知识和做题技巧。然而，却始终缺乏对算法知识成体系的认识和归纳，也在 AI 时代下，对程序设计和算法的亲身实践愈加生疏。好在 Andy 老师的课程又将我拉回我们作为 CS 学生的算法基本功，在趣味横生的题目背景和深入浅出的算法课堂中，我又沉下心来在电脑屏幕面前敲击键盘，AC 掉陌生而又熟悉的题目。最终，我把积累的经验和分类归纳的、相互联系的知识积淀下来、串联起来，形成了博客网站上我的题解集。相信这不是终点，而是巩固自身能力的里程碑。”' 105 120 750 155 15 '#252934' $false 'Microsoft YaHei' 2|Out-Null
  $rule=Box $s 110 300 740 1 '#C5C8CC' '#C5C8CC' $false;$rule.Line.Visible=0;$chips=@('算法能力跃升','总结复盘习惯','知识长效沉淀');for($i=0;$i-lt 3;$i++){$x=105+($i*255);Box $s $x 340 220 39 '#16436E' '#1E5A94'|Out-Null;Txt $s $chips[$i] $x 352 220 13 12 '#FFFFFF' $true 'Microsoft YaHei' 2|Out-Null};Txt $s 'By Shepherd Meng · www.lxzm.space/assignment-preview' 60 425 840 14 9 '#6E7480' $false 'JetBrains Mono' 2|Out-Null
  # 9
  $s=$d.Slides.Add(9,12);Title $s 9 '通关证明 · AC 记录';Txt $s '基础算法（LinK 系列）+ 搜索与图论、动态规划（JD 系列）' 60 96 840 14 9 '#6E7480' $false 'JetBrains Mono'|Out-Null
  Box $s 60 125 400 320|Out-Null;Txt $s 'LinK 系列 AC 记录' 75 139 230 12 8 '#1E5A94' $true 'JetBrains Mono'|Out-Null;$links=@('link_page_1.png','link_page_2.png','link_page_3.png','link_page_4.png');for($i=0;$i-lt 4;$i++){$x=75+(($i%2)*180);$y=165+([math]::Floor($i/2)*130);Pic $s (Join-Path $a $links[$i]) $x $y 165 115|Out-Null}
  Box $s 500 125 400 320|Out-Null;Txt $s 'JD 系列 AC 记录' 515 139 230 12 8 '#1E5A94' $true 'JetBrains Mono'|Out-Null;$jds=@('jd_page_1.png','jd_page_3.png','jd_page_5.png','jd_page_7.png');for($i=0;$i-lt 4;$i++){$x=515+(($i%2)*180);$y=165+([math]::Floor($i/2)*130);Pic $s (Join-Path $a $jds[$i]) $x $y 165 115|Out-Null}
  Txt $s '感谢李老师一学期的悉心指导，感谢《程序设计实践》课程。' 100 465 760 18 12 '#6E7480' $false 'Microsoft YaHei' 2|Out-Null
  if(Test-Path $out){Remove-Item $out -Force};$d.SaveAs($out,24);$d.Close()
}finally{$app.Quit();[void][Runtime.InteropServices.Marshal]::ReleaseComObject($app)}
