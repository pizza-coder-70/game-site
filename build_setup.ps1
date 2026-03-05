Write-Host "Installing Node.js... (A popup may appear asking for permission)"
winget install OpenJS.NodeJS -e --source winget --accept-package-agreements --accept-source-agreements

Write-Host "Updating environment path..."
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "Installing Vite..."
npm install

Write-Host "Building project to a new folder for your friends..."
npm run build

Write-Host "Done! All your HTML pages and assets have been built into the 'dist' folder."
