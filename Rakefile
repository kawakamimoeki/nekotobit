require 'net/http'
require 'json'
require "rake"
require "mp3info"
require "erb"
require "active_support"
require "active_support/core_ext"

desc "Convert and Upload mp3"
task :convert, ['ep', 'title', 'description'] do |_, args|
  ep = args.ep
  title = args.title
  description = args.description

  artwork = File.join(__dir__, "img", "artwork.jpg")
  raw = File.join(__dir__, "audio", "ep#{ep}-raw.wav")
  mp3 = File.join(__dir__, "audio", "ep#{ep}.mp3")
  wav = File.join(__dir__, "audio", "ep#{ep}.wav")

  `ffmpeg -ss 2 -i #{raw} #{wav}`

  `lame --tt '#{title}' --ta 'Moeki Kawakami' --tl '猫とbit' --ty '#{Date.today.year}' --ti #{artwork} --add-id3v2 #{wav} #{mp3}`

  `mp3gain -r #{mp3}`

  `mp3chaps -i #{mp3}`

  date = Time.current.beginning_of_week(:wednesday).since(1.week).strftime("%Y-%m-%d")
  filesize = File.size(mp3)
  duration = Time.at(Mp3Info.open(mp3).length).utc.strftime("%H:%M:%S")

  File.write(
    File.join(__dir__, "site", "_episodes", "ep#{ep}.md"),
    ERB.new(File.read(File.join(__dir__, "site", "_episodes", "_template.md.erb"))).result(binding)
  )
end

desc "Upload mp3"
task :upload, ['mp3'] do |_, args|
  `gsutil cp #{args.mp3} gs://nekotobit-episodes/`
end

namespace :transcript do
  desc "Recognize mp3"
  task :recognize, ['ep'] do |_, args|
    uri = URI.parse "https://speech.googleapis.com/v1p1beta1/speech:longrunningrecognize?key=#{ENV['GCLOUD_API_KEY']}"
    body = {
      config: {
        encoding: "MP3",
        sampleRateHertz: 44100,
        languageCode: "ja-JP",
        enableWordTimeOffsets: true,
        audioChannelCount: 1,
        model: 'latest_long'
      },
      audio: {
        uri: "gs://nekotobit-episodes/ep#{args.ep}.mp3",
      },
    }
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    req = Net::HTTP::Post.new uri.request_uri
    req['Content-Type'] = 'application/json'
    req.body = JSON.dump body
    resp = http.request req
    warn resp.body
    data = JSON.parse resp.body
    File.write(File.join('transcript', 'operations', "ep#{args.ep}.txt"), data['name'])
  end

  desc "Download transcript"
  task :download, ['ep'] do |_, args|
    name = File.read(File.join('transcript', 'operations', "ep#{args.ep}.txt")).chomp
    uri = URI.parse "https://speech.googleapis.com/v1p1beta1/operations/#{name}?key=#{ENV['GCLOUD_API_KEY']}"
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    req = Net::HTTP::Get.new uri.request_uri
    req['Content-Type'] = 'application/json'
    resp = http.request(req)
    warn resp.body
    data = JSON.parse(resp.body)['response']
    File.write(File.join('site', '_data', 'transcripts', "ep#{args.ep}.json"), JSON.dump(data))
  end
end
