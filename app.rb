require 'sinatra'
require 'erb'
require 'uglifier'
require 'sass'
require 'htmlcompressor'

use HtmlCompressor::Rack
set :scss, views: "public/styles"


get '/' do
  # Use a cached version of the template
  filename = File.dirname(__FILE__) + '/public/cache/_index.html'
  if File.file? filename
    File.open(filename)
  else
    html = erb :index
    File.write(filename, html) unless settings.development?
  
    html
  end
end


before do
  @style = scss :application, style: :compressed
  @scripts = Uglifier.compile([:fonts, :howler, :notifications, :dog, :timer, :application].map{ |file| File.open(File.dirname(__FILE__) + '/public/scripts/' + file.to_s + '.js').read }.join("\n"))
end