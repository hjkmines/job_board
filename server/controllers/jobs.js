const Job = require('../models/Job');

//for "/jobs" endpoint
const getJobs = async (req, res, next) => {
    //query param
    const filter = {};
    const options = {}; 
    if (Object.keys(req.query).length) {
      const {
        job_title,
        company,
        location, 
        date_posted,
        remote,
        sortBySalary,
        limit
      } = req.query;
    
    if (job_title) filter.job_title = true;
    if (company) filter.company = true;
    if (location) filter.location = true;
    if (date_posted) filter.date_posted = true;
    if (remote) filter.remote = true;
    
    if (limit) options.limit = limit;
    if (sortBySalary) options.sort = {
      salary: sortBySalary
    }
  }
    try {
        const jobs = await Job.find().limit(10);
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(jobs)

    } catch (err) {
        console.log('Error getting jobs');
        next(err);
    }
}

//for '/jobs/:jobId' single resource
const getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.jobId);
    res
    .status(200)
    .setHeader("Content-type", "application/json")
    .json(job);
  } catch (err) {
    res.status(404).send(`Can't get job data, ${err.message}`);
    next(err);
  }
};

module.exports = {
    getJobs,
    getJob
}
