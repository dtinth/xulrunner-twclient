#!/usr/bin/env ruby

require '../twclient'

ENV['CONFIGURATION'] = 'Release'

system('./build.sh') or fail 'cannot create thaiWitter.app'
Dir.exists?('thaiWitter.app') or fail 'thaiWitter.app does not exists'
system('ditto -c -k --sequesterRsrc --keepParent thaiWitter.app ' + TwClient::build_name + '.app.zip')
