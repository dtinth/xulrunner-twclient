cd %~dp0
cd App
cd thaiWitterClient
xcopy ..\..\..\tw /e /y
xcopy ..\..\xulrunner xulrunner /e /y /i
copy xulrunner\xulrunner-stub.exe tw.exe
copy xulrunner\gkmedias.dll .