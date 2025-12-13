# Download and backup all blog images
param([string]$BackupPath = "F:\Frosti\image-backup")

Write-Host "Starting backup..." -ForegroundColor Cyan

if (!(Test-Path $BackupPath)) { New-Item -ItemType Directory -Path $BackupPath | Out-Null }

$contentPath = "F:\Frosti\src\content"
$markdownFiles = Get-ChildItem -Path $contentPath -Filter "*.md" -Recurse
$imageUrls = @()
$urlPattern = 'https://pic1\.imgdb\.cn/item/[a-zA-Z0-9]+\.(jpg|jpeg|png|gif|webp|svg)'

foreach ($file in $markdownFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $matches = [regex]::Matches($content, $urlPattern)
    foreach ($match in $matches) {
        if ($match.Value -notin $imageUrls) { $imageUrls += $match.Value }
    }
}

Write-Host "Found $($imageUrls.Count) images" -ForegroundColor Yellow

$successCount = 0
foreach ($url in $imageUrls) {
    $fileName = [System.IO.Path]::GetFileName($url)
    $savePath = Join-Path $BackupPath $fileName
    Write-Host "Downloading $fileName..." -NoNewline
    try {
        (New-Object System.Net.WebClient).DownloadFile($url, $savePath)
        Write-Host " OK" -ForegroundColor Green
        $successCount++
    } catch {
        Write-Host " FAIL" -ForegroundColor Red
    }
    Start-Sleep -Milliseconds 500
}

$zipPath = "F:\Frosti\blog-images-$(Get-Date -Format 'yyyyMMdd-HHmmss').zip"
Compress-Archive -Path "$BackupPath\*" -DestinationPath $zipPath -Force
Write-Host "`nDone! Saved to: $zipPath" -ForegroundColor Green
