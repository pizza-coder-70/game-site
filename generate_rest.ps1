$classic_themes = @(
    @("Galactic Shooter", "galactic_shooter", "🛸", "#0f172a", "#1e40af"),
    @("Ping Pong Vintage", "ping_pong_vintage", "🏓", "#0a0a0a", "#1a1a1a"),
    @("Asteroid Miner", "asteroid_miner", "☄️", "#1c1c1c", "#383838"),
    @("Dungeon Crawler", "dungeon_crawler", "⚔️", "#2d0a0a", "#4a0404"),
    @("Snake Extreme", "snake_extreme3", "🐍", "#064e3b", "#065f46"),
    @("Tetromino", "tetromino", "🧱", "#1e3a8a", "#1d4ed8"),
    @("Space Defenders", "space_defenders", "👾", "#000000", "#111827"),
    @("Maze Escaper", "maze_escaper", "🏃", "#0a0010", "#312e81"),
    @("Bomb Squad", "bomb_squad", "💣", "#1c0505", "#450a0a"),
    @("Retro Racing", "retro_racing", "🏎️", "#0f0f0f", "#262626"),
    @("Block Breaker", "block_breaker", "🧱", "#1e1b4b", "#312e81"),
    @("Card Match", "card_match", "🃏", "#0c4a6e", "#075985"),
    @("Number Tap", "number_tap", "🔢", "#4c1d95", "#6b21a8"),
    @("Pixel Art", "pixel_art", "🎨", "#052e16", "#14532d"),
    @("Word Guess", "word_guess", "🅰️", "#431407", "#7c2d12"),
    @("Mine Sweeper", "mine_sweeper3", "🚩", "#000000", "#1e1b4b"),
    @("Solitaire Classic", "solitaire_classic", "♠️", "#022c22", "#065f46"),
    @("Checkers Pro", "checkers_pro", "🔴", "#3f3f46", "#52525b"),
    @("Chess Masters", "chess_masters", "♟️", "#18181b", "#27272a"),
    @("Simon Repeats", "simon_repeats", "🎮", "#1e1b4b", "#312e81")
)

$twod_themes = @(
    @("Jumpy Frog", "jumpy_frog", "🐸", "#14532d", "#166534"),
    @("Run Boy Run", "run_boy_run", "🏃‍♂️", "#0f172a", "#1e293b"),
    @("Flap Bird", "flap_bird", "🐦", "#0c4a6e", "#0369a1"),
    @("Slice Ninja", "slice_ninja", "🗡️", "#450a0a", "#7f1d1d"),
    @("Puzzle Connect", "puzzle_connect", "🧩", "#4c1d95", "#5b21b6"),
    @("Gravity Dash", "gravity_dash", "🔄", "#022c22", "#064e3b"),
    @("Neon Rider", "neon_rider", "🏍️", "#1e1b4b", "#312e81"),
    @("Bubble Burst", "bubble_burst", "🫧", "#075985", "#0ea5e9"),
    @("Zombie Survivor", "zombie_survivor", "🧟‍♂️", "#1c1917", "#292524"),
    @("Farm Dash", "farm_dash", "🚜", "#14532d", "#15803d"),
    @("Space Explorer", "space_explorer", "🚀", "#000000", "#111827"),
    @("Deep Dive", "deep_dive", "🤿", "#082f49", "#0c4a6e"),
    @("Cave Miner", "cave_miner", "⛏️", "#27272a", "#3f3f46"),
    @("Jetpack Joy", "jetpack_joy", "🎒", "#1e3a8a", "#2563eb"),
    @("Temple Run 2D", "temple_run_2d", "🏛️", "#78350f", "#92400e"),
    @("Snowboarder", "snowboarder", "🏂", "#e0f2fe", "#bae6fd"),
    @("Parkour Master", "parkour_master", "🤸", "#1e293b", "#334155"),
    @("Robot Wars", "robot_wars", "🤖", "#0f172a", "#1e293b"),
    @("Laser Defender", "laser_defender", "🔴", "#450a0a", "#7f1d1d"),
    @("Gummy Bears", "gummy_bears", "🐻", "#581c87", "#7e22ce")
)

$threed_themes = @(
    @("City Drive 3D", "city_drive_3d", "🚗", "#0f172a", "#1e293b"),
    @("Space combat 3D", "space_combat_3d", "🚀", "#000000", "#111827"),
    @("FPS Arena", "fps_arena", "🔫", "#450a0a", "#7f1d1d"),
    @("Bowling 3D", "bowling_3d", "🎳", "#1c1917", "#292524"),
    @("Golf 3D", "golf_3d", "⛳", "#14532d", "#15803d"),
    @("Billiards 3D", "billiards_3d", "🎱", "#022c22", "#064e3b"),
    @("Flight Simulator", "flight_simulator", "✈️", "#0c4a6e", "#0284c7"),
    @("Submarine 3D", "submarine_3d", "⚓", "#082f49", "#0369a1"),
    @("Tank Battle 3D", "tank_battle_3d", "💣", "#27272a", "#3f3f46"),
    @("Rollercoaster 3D", "rollercoaster_3d", "🎢", "#1e1b4b", "#312e81"),
    @("Labyrinth 3D", "labyrinth_3d", "🏃", "#4c1d95", "#5b21b6"),
    @("Drone Racing 3D", "drone_racing_3d", "🚁", "#1e293b", "#334155"),
    @("Snowboard 3D", "snowboard_3d", "🏂", "#e0f2fe", "#7dd3fc"),
    @("Skatepark 3D", "skatepark_3d", "🛹", "#111827", "#1f2937"),
    @("Hoverboard 3D", "hoverboard_3d", "💨", "#312e81", "#4338ca"),
    @("Parkour 3D", "parkour_3d", "🦘", "#9a3412", "#c2410c"),
    @("Mech Warrior 3D", "mech_warrior_3d", "🦾", "#1c1917", "#292524"),
    @("Gladiator 3D", "gladiator_3d", "⚔️", "#7f1d1d", "#991b1b"),
    @("Zombie Shooter 3D", "zombie_shooter_3d", "🧟", "#166534", "#15803d"),
    @("Sniper 3D", "sniper_3d", "🎯", "#052e16", "#14532d")
)

New-Item -ItemType Directory -Force -Path "games/classics3" | Out-Null
New-Item -ItemType Directory -Force -Path "games/games2d/more" | Out-Null
New-Item -ItemType Directory -Force -Path "games/games3d/more" | Out-Null

$template = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>__TITLE__</title>
    <style>
        body { background: __COLOR1__; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; flex-direction: column; text-align: center; }
        h1 { font-size: 3rem; margin-bottom: 20px; }
        .icon { font-size: 8rem; margin-bottom: 20px; }
        p { font-size: 1.2rem; max-width: 600px; color: #ccc; }
    </style>
</head>
<body>
    <div class="icon">__EMOJI__</div>
    <h1>__TITLE__</h1>
    <p>Loading game engine...</p>
</body>
</html>
"@

function GenerateCards($themes, $dirpath, $prefix) {
    $cards = @()
    foreach ($theme in $themes) {
        $title = $theme[0]
        $filename = $theme[1]
        $emoji = $theme[2]
        $c1 = $theme[3]
        $c2 = $theme[4]
        
        $content = $template.Replace("__TITLE__", $title).Replace("__EMOJI__", $emoji).Replace("__COLOR1__", $c1)
        $filepath = "$dirpath\$filename.html"
        Set-Content -Path $filepath -Value $content -Encoding UTF8

        $card = "                    <div class=`"game-card`" onclick=`"window.open('$prefix/$filename.html','_blank')`">
                        <div class=`"game-thumb`">
                            <div style=`"width:100%;height:100%;background:linear-gradient(135deg,$c1,$c2);display:flex;align-items:center;justify-content:center;font-size:3.5rem;`">
                                $emoji</div>
                        </div>
                        <div class=`"game-info`">
                            <h3>$title</h3><button class=`"play-btn`">PLAY</button>
                        </div>
                    </div>"
        $cards += $card
    }
    return $cards -join "`n"
}

$classic_html = GenerateCards $classic_themes "games\classics3" "games/classics3"
$twod_html = GenerateCards $twod_themes "games\games2d\more" "games/games2d/more"
$threed_html = GenerateCards $threed_themes "games\games3d\more" "games/games3d/more"

Set-Content -Path "classic_cards.html" -Value $classic_html -Encoding UTF8
Set-Content -Path "2d_cards.html" -Value $twod_html -Encoding UTF8
Set-Content -Path "3d_cards.html" -Value $threed_html -Encoding UTF8
