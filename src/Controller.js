import _ from 'lodash'
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
    if (req.query.pwd != process.env.APP_PWD) {
      res.json({error: "you can't access this page"})
    } else {
      if (
        req.query.name == undefined ||
        req.query.original == undefined ||
        req.query.keyword == undefined ||
        req.query.summary == undefined
      ) {
        res.json({error: "missing parameters"})
      } else {
        this.projectRepository.createProject({
          name: req.query.name,
          original: req.query.original,
          keyword: req.query.keyword,
          summary: req.query.summary,
        })
          .then(res.json('project created successfully'))
      }
    }
  }
}