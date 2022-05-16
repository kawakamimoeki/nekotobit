require "rake"
require "mp3info"
require "erb"
require "active_support"
require "active_support/core_ext"

desc "Convert and Upload mp3"
task :podcast, ['ep', 'title', 'description'] do |_, args|
  gcs_bucket = config["gcs_bucket"]
  ep = args.ep
  title = args.title
  description = args.description

  artwork = File.join(__dir__, "artwork.jpg")
  raw = File.join(__dir__, "ep#{ep}-raw.wav")
  mp3 = File.join(__dir__, "ep#{ep}.mp3")
  wav = File.join(__dir__, "ep#{ep}.wav")

  `ffmpeg -ss 2 -i #{raw} #{wav}`

  `lame --tt #{title} --ta 'Moeki Kawakami' --tl 猫とbit --ty #{Date.today.year} --ti #{artwork} --noreplaygain -q 2 --cbr -b 64 -m m --resample 44.1 --add-id3v2 #{wav} #{mp3}`

  `mp3gain -r #{mp3}`

  date = Time.current.beginning_of_week(:wednesday).since(1.week).strftime("%Y-%m-%d")
  filesize = File.size(mp3)
  duration = Time.at(Mp3Info.open(mp3).length).utc.strftime("%H:%M:%S")

  File.write(
    File.join(__dir__, "site", "_episodes", "#{ep}.md"),
    ERB.new(File.read(File.join(__dir__, "site", "_episodes", "_template.md.erb"))).result(binding)
  )

  `gsutil cp #{mp3} gs://nekotobit-episodes/`
end
