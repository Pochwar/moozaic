import Project from "../models/Project"

export default class ProjectRepository {
  constructor() {
    this.projectModel = Project
  }

  getProjects() {
    return new Promise((resolve, reject) => {
      this.projectModel.find({})
        .then(projects => resolve(projects))
        .catch(err => reject(err))
    });
  }

  getLastProject() {
    return new Promise((resolve, reject) => {
      this.projectModel.find({}).sort({id:-1}).limit(1)
        .then(project => resolve(project[0]))
        .catch(err => reject(err))
    });
  }

  getLastId() {
    return new Promise((resolve, reject) => {
      this.projectModel.find({}).sort({id:-1}).limit(1)
        .then(project => resolve(project[0].id))
        .catch(err => reject(err))
    })
  }

  async createProject(data) {
    let id = await this.getLastId()
    id ++
    return new Promise((resolve, reject) => {
      this.projectModel.create({
        id: id,
        name: data.name,
        original: data.original,
        keyword: data.keyword,
        summary: data.summary
      })
        .then(project => {
          resolve(project)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}