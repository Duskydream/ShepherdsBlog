$ErrorActionPreference = 'Stop'

function Rgb([string]$hex) {
    $color = [System.Drawing.ColorTranslator]::FromHtml($hex)
    return [System.Drawing.ColorTranslator]::ToOle($color)
}
function Add-Text($slide, [string]$text, [double]$x, [double]$y, [double]$w, [double]$h, [int]$size = 16, [string]$color = '#3A3D47', [bool]$bold = $false, [string]$font = 'Microsoft YaHei', [int]$align = 1) {
    $shape = $slide.Shapes.AddTextbox(1, $x, $y, $w, $h)
    $shape.TextFrame.WordWrap = -1
    $shape.TextFrame.MarginLeft = 0
    $shape.TextFrame.MarginRight = 0
    $shape.TextFrame.MarginTop = 0
    $shape.TextFrame.MarginBottom = 0
    $range = $shape.TextFrame.TextRange
    $range.Text = $text
    $range.Font.Name = $font
    $range.Font.Size = $size
    $range.Font.Color.RGB = Rgb $color
    $range.Font.Bold = if ($bold) { -1 } else { 0 }
    $range.ParagraphFormat.Alignment = $align
    return $shape
}
function Add-Rect($slide, [double]$x, [double]$y, [double]$w, [double]$h, [string]$fill = '#F0F2F5', [string]$line = '#C5C8CC', [bool]$rounded = $true) {
    $shape = $slide.Shapes.AddShape((if ($rounded) { 5 } else { 1 }), $x, $y, $w, $h)
    $shape.Fill.ForeColor.RGB = Rgb $fill
    $shape.Line.ForeColor.RGB = Rgb $line
    $shape.Line.Weight = 0.75
    return $shape
}
function Add-Card($slide, [double]$x, [double]$y, [double]$w, [double]$h, [string]$label, [string]$body, [bool]$accent = $true) {
    $null = Add-Rect $slide $x $y $w $h
    if ($accent) { $bar = Add-Rect $slide $x $y 3 $h '#1E5A94' '#1E5A94' $false; $bar.Line.Visible = 0 }
    Add-Text $slide $label.ToUpper() ($x + 16) ($y + 12) ($w - 32) 16 9 '#1E5A94' $true 'JetBrains Mono' | Out-Null
    Add-Text $slide $body ($x + 16) ($y + 33) ($w - 30) ($h - 40) 13 '#252934' $false 'Microsoft YaHei' | Out-Null
}
function Add-Header($slide, [int]$n, [string]$title) {
    $bar = Add-Rect $slide 0 0 (106.67 * $n) 3 '#1E5A94' '#1E5A94' $false; $bar.Line.Visible = 0
    Add-Text $slide "$n / 9" 870 16 60 16 8 '#6E7480' $false 'JetBrains Mono' 3 | Out-Null
    Add-Text $slide $title 60 44 840 34 24 '#252934' $true | Out-Null
    $rule = Add-Rect $slide 60 86 840 1 '#C5C8CC' '#C5C8CC' $false; $rule.Line.Visible = 0
    Add-Text $slide '*' 473 78 15 16 12 '#1E5A94' $true 'Arial' 2 | Out-Null
    Add-Text $slide 'DUSKYDREAM' 930 220 18 120 7 '#9AA0AA' $false 'JetBrains Mono' 2 | Out-Null
}
function Add-Image($slide, [string]$path, [double]$x, [double]$y, [double]$w, [double]$h) {
    return $slide.Shapes.AddPicture($path, 0, -1, $x, $y, $w, $h)
}

$root = 'F:\Starlight\public'
$assets = Join-Path $root 'ac-screenshots'
$output = Join-Path $root 'presentation.pptx'
$pp = New-Object -ComObject PowerPoint.Application

try {
    $pp.Visible = -1
    $deck = $pp.Presentations.Add()
    $deck.PageSetup.SlideSize = 15

    # 1 Cover
    $s = $deck.Slides.Add(1, 12)
    $top = Add-Rect $s 0 0 112 4 '#1E5A94' '#1E5A94' $false; $top.Line.Visible = 0
    Add-Text $s '从 AC 到体系' 90 140 640 58 42 '#252934' $true | Out-Null
    Add-Text $s '程序设计实践课程学习总结' 94 210 500 28 20 '#6E7480' $false | Out-Null
    $rule = Add-Rect $s 90 268 650 1 '#C5C8CC' '#C5C8CC' $false; $rule.Line.Visible = 0
    Add-Text $s "题目来源：XMUOJ（LinK 系列 34 题为主，JD 系列 16 题补充）`n题目数量：50  ·  语言：C++17" 90 295 650 54 15 '#3A3D47' | Out-Null
    Add-Text $s "姓名`n孟想（Shepherd Meng）" 90 405 230 50 14 '#252934' $true | Out-Null
    Add-Text $s "课程`n程序设计实践" 330 405 160 50 14 '#252934' $true | Out-Null
    Add-Text $s "博客`nwww.lxzm.space/assignment-preview" 570 405 290 50 12 '#252934' $true 'JetBrains Mono' | Out-Null

    # 2 Learning path
    $s = $deck.Slides.Add(2, 12); Add-Header $s 2 '学习路线图'
    $labels = @(@('01 基础算法','排序 · 二分 · 分治 · 数据结构'),@('02 搜索与图论','DFS / BFS · 并查集 · 图论'),@('03 动态规划','背包 DP · 线性 DP · 状压 DP'))
    for ($i=0; $i -lt 3; $i++) { $x=60+($i*292); Add-Rect $s $x 116 245 62 '#FFFFFF' '#16436E' | Out-Null; Add-Text $s $labels[$i][0] ($x+14) 128 210 16 13 '#1E5A94' $true | Out-Null; Add-Text $s $labels[$i][1] ($x+14) 148 220 14 10 '#3A3D47' | Out-Null; if($i -lt 2){ Add-Text $s '→' ($x+252) 134 25 18 18 '#1E5A94' $true 'Arial' 2 | Out-Null } }
    Add-Card $s 60 205 840 70 'Step 1 · 基础算法夯实（18题）' '双指针、二分查找、分治算法、前缀和 / 差分、单调栈 / 队列与 KMP 字符串匹配。'
    Add-Card $s 60 290 840 70 'Step 2 · 状态搜索与图论建图（24题）' 'DFS / BFS 回溯、带权并查集、树形 DFS、拓扑排序、Kruskal MST、Dijkstra 最短路。'
    Add-Card $s 60 375 840 70 'Step 3 · 动态规划升华（8题）' '背包 DP、线性 DP、区间 DP（加分二叉树）、状压 DP（万城巡游 TSP）。'

    # 3 Starting point
    $s = $deck.Slides.Add(3, 12); Add-Header $s 3 '我的成长起点'
    Add-Text $s 'LeetCode 锻炼了“解决问题”的能力；这门课程让我开始建立算法知识体系。' 60 106 840 24 15 '#3A3D47' | Out-Null
    Add-Card $s 60 155 350 115 '曾经 · LeetCode / Luogu' "已完成 240+ 题，Contest Rating 1735，Top 13%`n快速解决单道题目，AC 即跳转下一题`n算法知识零散，缺乏体系化认识"
    Add-Card $s 60 285 350 115 '现在 · 程序设计实践课程' "回到 CS 算法基本功`n趣味题目背景 + 深入浅出课堂`n按算法类别重新组织，建立知识体系"
    Add-Text $s 'LEETCODE 记录' 450 155 250 14 9 '#1E5A94' $true 'JetBrains Mono' | Out-Null
    Add-Image $s (Join-Path $assets 'leetcoderating.png') 450 175 450 105 | Out-Null
    Add-Text $s 'ANDY 老师空间' 450 300 250 14 9 '#1E5A94' $true 'JetBrains Mono' | Out-Null
    Add-Image $s (Join-Path $assets 'andylee.png') 450 320 450 105 | Out-Null
    Add-Text $s '“LeetCode 锻炼了「解决问题」的能力；这门课程让我开始建立算法知识体系。”' 100 455 760 26 16 '#252934' $true 'Microsoft YaHei' 2 | Out-Null

    # 4 Structure
    $s = $deck.Slides.Add(4, 12); Add-Header $s 4 '题解集结构 · 按知识大类编排'
    Add-Text $s '共 50 题 · 每题括号内标注精确知识点 · 整体递进：基础算法 → 搜索图论 → 动态规划' 60 108 840 18 10 '#6E7480' $false 'JetBrains Mono' | Out-Null
    Add-Card $s 60 150 400 145 '一、排序、二分与分治 · 10 题' "◆ 双指针 / 有序数组夹逼  LinK06`n◆ 分治归并 / 逆序对统计  LinK30-31`n◆ 浮点二分 / 精度控制  LinK34-35"
    Add-Card $s 500 150 400 145 '二、递归、回溯与状态搜索 · 15 题' "◆ 汉诺塔 / 递归分治  LinK09`n◆ N 皇后 / DFS 剪枝  LinK13`n◆ BFS 迷宫 / 广度搜索  LinK51"
    Add-Card $s 60 320 400 125 '三、基础数据结构与字符串 · 8 题' "◆ 前缀和 / 差分  JD121-123`n◆ 单调栈 / 滑动窗口  JD134-135`n◆ KMP 字符串匹配  JD136"
    Add-Card $s 500 320 400 125 '四、贪心 · 图论 · 动态规划 · 17 题' "◆ 并查集 / Kruskal MST  JD138`n◆ Dijkstra 最短路  LinK57-58`n◆ 01 背包 / 状压 DP  JD170"

    # 5 Explanation pattern
    $s = $deck.Slides.Add(5, 12); Add-Header $s 5 '三段式题解设计'
    Add-Text $s '每道题严格按“思路、关键代码、总结”组织；代码展示核心逻辑，不是完整程序。' 60 108 840 24 15 '#3A3D47' | Out-Null
    Add-Card $s 60 160 330 70 '01 · 算法动机 / 思路' '说清这题考什么、状态如何定义、为何能用此算法。'
    Add-Text $s '↓' 214 236 20 20 17 '#6E7480' $true 'Arial' 2 | Out-Null
    Add-Card $s 60 255 330 70 '02 · 关键代码' '4–5 行，只保留核心逻辑，附一行状态定义说明。'
    Add-Text $s '↓' 214 331 20 20 17 '#6E7480' $true 'Arial' 2 | Out-Null
    Add-Card $s 60 350 330 70 '03 · 总结复盘' '边界处理、循环顺序和典型易错点。'
    Add-Text $s '示例 · LinK63 林克的 01 背包' 450 160 400 16 10 '#1E5A94' $true 'JetBrains Mono' | Out-Null
    Add-Rect $s 450 185 450 135 '#F6F8FA' '#D0D7DE' | Out-Null
    Add-Text $s "// 关键代码`nfor (int j = V; j >= v; j--)  // 倒序`n  dp[j] = max(dp[j], dp[j-v] + w);" 466 204 420 80 13 '#252934' $false 'JetBrains Mono' | Out-Null
    Add-Text $s '为什么倒序？保证 dp[j-v] 仍来自前 i-1 个物品的状态。' 450 342 450 24 13 '#3A3D47' | Out-Null
    Add-Text $s '示例 · JD170 万城巡游 · 状压 DP / TSP' 450 395 420 18 10 '#1E5A94' $true 'JetBrains Mono' | Out-Null

    # 6 Organizing
    $s = $deck.Slides.Add(6, 12); Add-Header $s 6 '整理，比刷题更难'
    Add-Text $s '做完一道题只需要 AC；但整理一道题，需要真正理解它。' 60 108 840 24 16 '#3A3D47' | Out-Null
    Add-Card $s 60 170 360 210 '纯粹刷题模式' "AC 通过`n↓`n跳转下一题`n`n过程短暂，遗忘迅速，经验碎片化。" $false
    Add-Card $s 540 170 360 210 '整理题解模式' "回顾代码逻辑`n↓`n提炼 4–5 行核心`n↓`n归纳算法类别`n↓`n总结易错规律"
    Add-Text $s '经验只有经过整理，才能真正变成知识。' 160 425 640 26 18 '#252934' $true 'Microsoft YaHei' 2 | Out-Null

    # 7 Website
    $s = $deck.Slides.Add(7, 12); Add-Header $s 7 '让题解成为长期积累'
    Add-Text $s '最终把题解整理到博客，而不是只导出一份 PDF。' 60 108 840 24 16 '#3A3D47' | Out-Null
    Add-Text $s '博客的优势' 60 165 250 24 18 '#252934' $true | Out-Null
    Add-Text $s "◆ 按算法类别分类，结构清晰`n◆ 每题直跳 XMUOJ 原题链接`n◆ 支持 Ctrl+K 全站快速搜索`n◆ 可持续补充新内容，不是一次性提交" 60 205 330 110 14 '#3A3D47' | Out-Null
    Add-Card $s 60 345 330 54 '网站地址' 'www.lxzm.space/assignment-preview' $false
    Add-Image $s (Join-Path $assets 'screenshotwebsite.png') 470 155 430 230 | Out-Null
    Add-Text $s '这不是终点，而是巩固自身能力的里程碑。' 130 425 700 24 16 '#252934' $true 'Microsoft YaHei' 2 | Out-Null

    # 8 Reflection
    $s = $deck.Slides.Add(8, 12); Add-Header $s 8 '课程反思'
    Add-Text $s '“在本学期之前，我已积累了一些刷题经验，却始终缺乏对算法知识成体系的认识和归纳。课程让我重新回到算法基本功，并将积累的经验与相互联系的知识沉淀、串联成博客上的题解集。”' 110 135 740 125 19 '#252934' $false 'Microsoft YaHei' 2 | Out-Null
    $rule = Add-Rect $s 120 300 720 1 '#C5C8CC' '#C5C8CC' $false; $rule.Line.Visible = 0
    $chips = @('算法能力跃升','总结复盘习惯','知识长效沉淀')
    for ($i=0; $i -lt 3; $i++) { $x=110+($i*255); $chip=Add-Rect $s $x 350 220 42 '#16436E' '#1E5A94'; $chip.Line.Weight=0.75; Add-Text $s $chips[$i] $x 362 220 16 13 '#FFFFFF' $true 'Microsoft YaHei' 2 | Out-Null }
    Add-Text $s 'By Shepherd Meng · www.lxzm.space/assignment-preview' 60 440 840 16 10 '#6E7480' $false 'JetBrains Mono' 2 | Out-Null

    # 9 AC records
    $s = $deck.Slides.Add(9, 12); Add-Header $s 9 '通关证明 · AC 记录'
    Add-Text $s '基础算法（LinK 系列）+ 搜索与图论、动态规划（JD 系列）' 60 108 840 18 10 '#6E7480' $false 'JetBrains Mono' | Out-Null
    Add-Rect $s 60 145 400 300 '#F0F2F5' '#C5C8CC' | Out-Null
    Add-Text $s 'LINK 系列 AC 记录' 75 158 240 14 9 '#1E5A94' $true 'JetBrains Mono' | Out-Null
    $linkImgs = @('link_page_1.png','link_page_2.png','link_page_3.png','link_page_4.png')
    for ($i=0; $i -lt 4; $i++) { $x=75+(($i%2)*180); $y=185+([math]::Floor($i/2)*120); Add-Image $s (Join-Path $assets $linkImgs[$i]) $x $y 165 105 | Out-Null }
    Add-Rect $s 500 145 400 300 '#F0F2F5' '#C5C8CC' | Out-Null
    Add-Text $s 'JD 系列 AC 记录' 515 158 240 14 9 '#1E5A94' $true 'JetBrains Mono' | Out-Null
    $jdImgs = @('jd_page_1.png','jd_page_3.png','jd_page_5.png','jd_page_7.png')
    for ($i=0; $i -lt 4; $i++) { $x=515+(($i%2)*180); $y=185+([math]::Floor($i/2)*120); Add-Image $s (Join-Path $assets $jdImgs[$i]) $x $y 165 105 | Out-Null }
    Add-Text $s '感谢李老师一学期的悉心指导，感谢《程序设计实践》课程。' 100 475 760 20 13 '#6E7480' $false 'Microsoft YaHei' 2 | Out-Null

    if (Test-Path -LiteralPath $output) { Remove-Item -LiteralPath $output -Force }
    $deck.SaveAs($output, 24)
    $deck.Close()
} finally {
    $pp.Quit()
    [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($pp)
}
