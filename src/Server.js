import express from 'express'
import path from 'path';

export default class Server {
  constructor() {
    // init app server
    this._app = express();

    // set public directory where to put client css an js files
    this._app.use(express.static(path.join(__dirname, '/../public')))

    // set app port
    this.port = process.env.PORT || 2440;

    // Routes
    this._app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname + '/../index.html'))
    })
  }

  run() {
    this._app.listen(this.port, () => console.log(`Server available at http://localhost:${this.port}!`));
  }
}