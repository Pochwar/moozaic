import _ from 'lodash'
var util = require('util')
var exec = util.promisify(require('child_process').exec)
import conf from 'config'
import ProjectRepository from "repositories/ProjectRepository"
import ContributionRepository from "repositories/ContributionRepository"

export default class Controller {
  constructor() {
    this.projectRepository = new ProjectRepository();
    this.contributionRepository = new ContributionRepository();
  }

  async index(req, res) {
    const project = await this.projectRepository.getLastProject()
    const contributions = await this.contributionRepository.getContributionsByProject(project.id)
    const contributors = contributions.map(contribution => {
      return contribution.tweet.user.name
    })
    res.render('index.ejs', {
      project: project,
      contributors: _.uniq(contributors)
    })
  }

  create(req, res) {
    let err_msg = ''
    switch (req.query.e) {
      case '1':
        err_msg =  "you're not allowed to perform this action"
        break
      case '2':
        err_msg = 'missing parameters'
        break
      case '3':
        err_msg = 'invalid image format'
        break
      case '4':
        err_msg = 'an error occured, check the console for more infos'
        break
    }
    let success_msg = req.query.s == '1' ? 'Project created successfully' : ''
    res.render('create.ejs', {err: err_msg, success: success_msg})
  }

  async store(req, res, next) {
    console.log('body', req.body)
    console.log('file', req.file)

    // check password
    if (req.body.pwd == '' || req.body.pwd != conf.app_pwd) {
      res.redirect('/create?e=1')
    } else {
      if (
        req.body.name == '' ||
        req.file == undefined ||
        req.body.original_credit == '' ||
        req.body.keyword == '' ||
        req.body.summary == ''
      ) {
        res.redirect('/create?e=2')
      } else {
        // check file extension
        if (req.file.mimetype != 'image/jpeg' && req.file.mimetype != 'image/png') {
          res.redirect('/create?e=3')
        } else {
          const originalName = req.file.originalname

          // copy file to metapixel folder
          console.log('\nCopy file')
          var { stdout, stderr } = await exec(`cp ${req.file.path} src/metapixel/originals/${originalName}`);
          console.log('stdout:', stdout)
          console.log('stderr:', stderr)

          if (stderr == '') {
            // delete temp file
            console.log('\nDelete file')
            var { stdout, stderr } = await exec(`rm ${req.file.path}`);
            console.log('stdout:', stdout)
            console.log('stderr:', stderr)

            // create project
            this.projectRepository.createProject({
              name: req.body.name,
              original: originalName,
              original_credit: req.body.original_credit,
              keyword: req.body.keyword,
              summary: req.body.summary,
            })
              .then(() => {
                console.log('win')
                res.redirect('/create?s=1')
              })
              .catch((err) => {
                console.log('loose', err)
                res.redirect('/create?e=4')
              })
          } else {
            res.redirect('/create?e=4')
          }
        }
      }
    }
  }
}