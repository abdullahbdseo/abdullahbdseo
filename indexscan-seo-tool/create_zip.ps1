$destZip = "E:\automatic seo tool\indexscan-seo-tool.zip"
if (Test-Path $destZip) {
    Remove-Item $destZip -Force
}

$items = Get-ChildItem -Path "E:\automatic seo tool" -Exclude "node_modules", "dist", ".git", "*.zip", "*.tmp" | ForEach-Object { $_.FullName }

Compress-Archive -Path $items -DestinationPath $destZip -Force

Get-Item $destZip | Select-Object Name, Length, LastWriteTime
