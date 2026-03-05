$index = Get-Content -Raw "index.html" -Encoding UTF8

$clickerBase = Get-Content -Raw "clicker_cards.html" -Encoding UTF8
$classicBase = Get-Content -Raw "classic_cards.html" -Encoding UTF8
$twodBase = Get-Content -Raw "2d_cards.html" -Encoding UTF8
$threedBase = Get-Content -Raw "3d_cards.html" -Encoding UTF8

# Trim them up
$clicker_html = $clickerBase.Trim()
$classic_html = $classicBase.Trim()
$twod_html = $twodBase.Trim()
$threed_html = $threedBase.Trim()

# Target keys using their previous exact lines in index.html
$targetClicker = @"
                        <div class="game-info">
                            <h3>Candy Kingdom</h3><button class="play-btn">PLAY</button>
                        </div>
                    </div>
"@
$index = $index.Replace($targetClicker, "$targetClicker`n$clicker_html")

$targetClassic = @"
                        <div class="game-info">
                            <h3>Rhythm Tap</h3><button class="play-btn">PLAY</button>
                        </div>
                    </div>
"@
$index = $index.Replace($targetClassic, "$targetClassic`n$classic_html")

$target2D = @"
                        <div class="game-info">
                            <h3>Neon Asteroids</h3><button class="play-btn">PLAY</button>
                        </div>
                    </div>
"@
$index = $index.Replace($target2D, "$target2D`n$twod_html")

$target3D = @"
                        <div class="game-info">
                            <h3>Asteroid Belt</h3><button class="play-btn">PLAY</button>
                        </div>
                    </div>
"@
$index = $index.Replace($target3D, "$target3D`n$threed_html")

# Write out with UTF8 NoBOM
$utf8NoBom = New-Object System.Text.UTF8Encoding $False
[IO.File]::WriteAllText("E:\Code\game-site\index.html", $index, $utf8NoBom)

Write-Host "Injection Complete"
