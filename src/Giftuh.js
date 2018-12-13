import Twitter from 'twitter'
import download from 'image-downloader'
import mkdirp from 'mkdirp'
import fs from 'fs'

export default class Giftuh {
  constructor(tw_options) {
    this.client = new Twitter(tw_options)
    this.muteStream = false
  }

  run(keyword) {
    console.log('########################################')
    console.log(`# Looking for "${keyword}" images`)
    console.log('########################################')

    this.client.stream('statuses/filter', {track: keyword}, function(stream) {
      stream.on('data', function(event) {
        var user_id = event.user.id
        var user_name = event.user.screen_name

        if (event && event.entities && event.entities.media) {
          var media_url = event.entities.media[0].media_url
          var media_id = event.entities.media[0].id_str
          this.consoleLog('########################################')
          this.consoleLog(`New result found for keyword: ${keyword}`)
          this.consoleLog(`User ID: ${user_id}`)
          this.consoleLog(`User name: @${user_name}`)
          this.consoleLogYellow('One media found :D')
          this.consoleLogYellow(`URL: ${media_url}`)

          // Set subfolder path where to save images
          var path = `./src/giftuh/downloaded_images/${keyword}`

          // Create subfolder if not exist
          mkdirp(path, function (err) {
            if (err) {
              this.consoleError(err)
            } else {
              // Set download options
              var options = {
                url: media_url,
                dest: `${path}/${media_id}-@${user_name}-(id:${user_id}).jpg`
              }

              // Check if file is new
              var isNew = true
              fs.readdirSync(path).forEach(file => {
                var pattern = new RegExp(/([0-9]*)(-@)(.*)/gm)
                var res = pattern.exec(file)
                if (res[1] == media_id) {
                  isNew = false
                }
              })

              // Save image
              if (isNew) {
                download.image(options)
                  .then(({filename, image}) => {
                    this.consoleLogGreen(`File saved to: ${filename}`)
                  })
                  .catch((err) => {
                    this.consoleError(err)
                  })
              } else {
                this.consoleLogRed("File already exists, download aborted")
              }
            }
          }.bind(this))
        }
      }.bind(this))

      stream.on('error', function(error) {
        this.consoleError(`Error: ${error}`)
      })
    }.bind(this))
  }

  mute() {
    this.consoleLogCyan("MUTE STREAM")
    this.muteStream = true
  }

  unmute() {
    this.muteStream = false
    this.consoleLogCyan("UNMUTE STREAM")
  }

  // Console.log that can be muted
  consoleLog(string) {
    if (!this.muteStream) {
      console.log(string)
    }
  }

  // Console.error that can be muted
  consoleError(string) {
    if (!this.muteStream) {
      console.error(string)
    }
  }

  // Colored console log
  consoleLogYellow(string) {
    if (!this.muteStream) {
      console.log('\x1b[33m', string, '\x1b[0m')
    }
  }
  consoleLogRed(string) {
    if (!this.muteStream) {
      console.log('\x1b[31m', string, '\x1b[0m')
    }
  }
  consoleLogGreen (string) {
    if (!this.muteStream) {
      console.log('\x1b[32m', string, '\x1b[0m')
    }
  }
  consoleLogBlue (string) {
    if (!this.muteStream) {
      console.log('\x1b[34m', string, '\x1b[0m')
    }
  }
  consoleLogMagenta (string) {
    if (!this.muteStream) {
      console.log('\x1b[35m', string, '\x1b[0m')
    }
  }
  consoleLogCyan (string) {
    if (!this.muteStream) {
      console.log('\x1b[36m', string, '\x1b[0m')
    }
  }
}