#!/usr/bin/env ruby

require '../twclient'

system('gen-app.bat') or fail 'cannot create thaiWitter'
Dir.exists?('App/thaiWitterClient') or fail 'thaiWitterClient does not exists'
name = TwClient::build_name('Portable')
system('7z.exe a -mx=9 ' + name + '.7z App\\ thaiWitterPortable.exe') or fail 'cannot create 7z version'
system('7z.exe a -mx=9 ' + name + '.zip App\\ thaiWitterPortable.exe') or fail 'cannot create zip version'
