require('dotenv').config()
import schedule from 'node-schedule'
import Server from 'Server'
import Metapixel from 'Metapixel'
import Giftuh from 'Giftuh'

// Configuration
const keyword = process.env.APP_KEYWORD
const library = './src/giftuh/downloaded_images'
const periodicity = process.env.MTPX_PERIODICITY
const original = `./src/metapixel/${process.env.MTPX_ORIGINAL}`
const tw_options = {
  consumer_key:process.env.TWITTER_CONSUMER_KEY,
  consumer_secret:process.env.TWITTER_CONSUMER_SECRET,
  access_token_key:process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret:process.env.TWITTER_ACCESS_TOKEN_SECRET
}

// Launch server
const server = new Server()
server.run()

// Get Images From Twitter Using Hashtag
const giftuh = new Giftuh(tw_options)
giftuh.run(keyword)

// Build mozaic using metapixel
const metapixel = new Metapixel()
console.log(`RUN METAPIXEL EVERY ${periodicity} MINUTES`)
schedule.scheduleJob(`*/${periodicity}  * * * *`, function() {
  giftuh.mute()
  metapixel.run(library, keyword, original)
    .then(() => {
      giftuh.unmute()
    })
    .catch(err => {
      console.log(err)
    })

})