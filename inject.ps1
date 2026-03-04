$base_dir = "e:\GameSite\games"
$dirs = @("games2d", "games3d")
$injection = "`n    <script src=`"../mobile_controls.js`"></script>`n"

$count = 0
foreach ($d in $dirs) {
    $path = Join-Path $base_dir $d
    $files = Get-ChildItem -Path $path -Filter *.html
    foreach ($f in $files) {
        $content = Get-Content -Path $f.FullName -Raw -Encoding UTF8
        if (-not $content.Contains("mobile_controls.js")) {
            if ($content.Contains("</body>")) {
                $content = $content.Replace("</body>", $injection + "</body>")
            } else {
                $content += $injection
            }
            # Write using UTF8 without BOM
            $utf8NoBom = New-Object System.Text.UTF8Encoding $false
            [System.IO.File]::WriteAllText($f.FullName, $content, $utf8NoBom)
            Write-Host "Injected into $($f.Name)"
            $count++
        } else {
            Write-Host "Skipped $($f.Name) (already contains injection)"
        }
    }
}
Write-Host "Total files updated: $count"
