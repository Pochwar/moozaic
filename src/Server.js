import express from 'express'
import path from 'path'
import ejs from 'ejs'
import Controller from 'Controller'

export default class Server {
  constructor() {
    // init app server
    this._app = express()

    // set public directory where to put client css an js files
    this._app.use(express.static(path.join(__dirname, '/../public')))

    // set template engine
    this._app.set('view engine', 'ejs')
    this._app.set('views', path.join(__dirname, '../src/views/'));

    // set app port
    this.port = process.env.PORT || 2440;

    // Routes
    const controller = new Controller()
    this._app.get('/', controller.index.bind(controller))
    this._app.get('/c', controller.create.bind(controller))
  }

  run() {
    this._app.listen(this.port, () => console.log(`Server available at http://localhost:${this.port}!`));
  }
}