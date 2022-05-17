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
