$ErrorActionPreference = 'Stop'

$renderDir = 'F:\Temp\codex-presentations\presentation-html-conversion\tmp\html-renders'
$output = 'F:\Starlight\public\presentation.pptx'
$powerPoint = New-Object -ComObject PowerPoint.Application

try {
    $powerPoint.Visible = -1
    $presentation = $powerPoint.Presentations.Add()
    $presentation.PageSetup.SlideSize = 15
    $slideWidth = $presentation.PageSetup.SlideWidth
    $slideHeight = $presentation.PageSetup.SlideHeight

    foreach ($index in 1..9) {
        $slide = $presentation.Slides.Add($presentation.Slides.Count + 1, 12)
        $image = Join-Path $renderDir "slide-$index.png"
        $null = $slide.Shapes.AddPicture($image, 0, -1, 0, 0, $slideWidth, $slideHeight)
    }

    if (Test-Path -LiteralPath $output) {
        Remove-Item -LiteralPath $output -Force
    }
    $presentation.SaveAs($output, 24)
    $presentation.Close()
} finally {
    $powerPoint.Quit()
    [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($powerPoint)
}
