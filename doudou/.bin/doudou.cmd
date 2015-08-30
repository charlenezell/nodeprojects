@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\test.js" %*
) ELSE (
  node "%~dp0\..\test.js" %*
)
