require 'sinatra'
require 'erb'


get '/' do
  erb :index
end


before do
  @scripts = [:dog, :timer, :application].map{ |file| File.open(File.dirname(__FILE__) + '/public/scripts/' + file.to_s + '.js').read }.join("\n")
end