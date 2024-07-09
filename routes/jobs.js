const express = require('express')
const router = express.Router()
const Job = require('../models/Job')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// get a specific job based on its ID
router.get('/:id', (req, res) => {
  const { id } = req.params
  
  Job.findOne({
    where: {
      id
    }
  })
    .then(job => {
      if (job) {
        res.json(job)
      } else {
        res.statusMessage = 'There is not a job with that ID'
        res.sendStatus(404)
      }
    })
    .catch(err => console.log(`Error on retrieving job info with ID ${id}:`, err))
})

// list all jobs
router.get('/list', (req, res) => {
  const search = req.query.job
  const query = '%' + search + '%' // PH -> PHP, word -> Wordpress, press -> Wordpress

  if (!search) {
    Job.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    })
      .then(jobs => {
        res.json(jobs)
      })
      .catch(err => console.log('Error on retriving all jobs: ', err))
  } else {
    Job.findAll({
      where: {
        title: {
          [Op.like]: query
        }
      },
      order: [
        ['createdAt', 'DESC']
      ]
    })
      .then(jobs => {
        res.json(jobs)
      })
      .catch(err => console.log('Error on retrieving all jobs with a name filter: ', err))
  }
})

// add new job via post
router.post('/add', (req, res) => {
  let { title, salary, company, description, email, new_job } = req.body

  // insert data in DB
  Job.create({
    title,
    description,
    salary,
    company,
    email,
    new_job
  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
