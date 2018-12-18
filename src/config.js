require('dotenv').config()

const conf = {
  app_debug: process.env.APP_DEBUG,
  run_giftuh: process.env.RUN_GIFTUH,
  run_metapixel: process.env.RUN_METAPIXEL,
  app_pwd: process.env.APP_PWD,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  db_name: process.env.DB_NAME,
  mtpx_periodicity: process.env.MTPX_PERIODICITY,
  tw_ck: process.env.TWITTER_CONSUMER_KEY,
  tw_cs: process.env.TWITTER_CONSUMER_SECRET,
  tw_atk: process.env.TWITTER_ACCESS_TOKEN_KEY,
  tw_ats: process.env.TWITTER_ACCESS_TOKEN_SECRET,
}

export default conf