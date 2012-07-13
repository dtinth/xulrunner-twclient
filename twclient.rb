
module TwClient

  inifile = File.dirname(File.expand_path(__FILE__)) + '/' + 'tw/application.ini'

  File.readlines(inifile).each do |line|
    if line =~ /^BuildID=(\S+)/
      @@build_id = $1
    elsif line =~ /^Version=(\S+)/
      @@version = $1
    end
  end

  def self.build_id
    @@build_id
  end

  def self.version
    @@version
  end

  def self.build_name
    "thaiWitterClient-#{version}-#{build_id}"
  end

end
