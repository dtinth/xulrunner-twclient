#!/usr/bin/env ruby

require '../twclient'

ENV['CONFIGURATION'] = 'Release'

system('./build.sh') or fail 'cannot create thaiWitter'
Dir.exists?('thaiWitter') or fail 'thaiWitter does not exists'
system('tar cvj thaiWitter > ' + TwClient::build_name + '.tar.bz2')
