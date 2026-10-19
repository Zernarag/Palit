$f = 'c:\Users\narag_fm9f9ai\Palit\src\global.scss'
$content = [System.IO.File]::ReadAllText($f)
$content = $content.Replace('-webkit-line-clamp: 2; -webkit-box-orient', '-webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient')
$tmpf = $f + '.tmp'
[System.IO.File]::WriteAllText($tmpf, $content)
[System.IO.File]::Delete($f)
[System.IO.File]::Move($tmpf, $f)
Write-Host 'Done'
