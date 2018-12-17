import Contribution from "../models/Contribution"

export default class ContributionRepository {
  constructor() {
    this.contributionModel = Contribution
  }

  getContributions() {
    return new Promise((resolve, reject) => {
      this.contributionModel.find({})
        .then(contributions => resolve(contributions))
        .catch(err => reject(err))
    });
  }

  getContributionsByProject(projectId) {
    return new Promise((resolve, reject) => {
      this.contributionModel.find({project_id: projectId})
        .then(contributions => {
          // const uniqueContributors = {}
          // contributors.
          resolve(contributions)
        })
        .catch(err => reject(err))
    });
  }

  createContribution(data) {
    return new Promise((resolve, reject) => {
      this.contributionModel.create({
        tweet: data.tweet,
        project_id: data.project_id
      })
        .then(contribution => {
          resolve(contribution)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}