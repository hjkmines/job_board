const Job = require('../models/Job');

const getJobs = async (req, res, next) => {
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

const getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.jobId);
    res.status(200).setHeader("Content-type", "application/json").json(job);
  } catch (err) {
    res.status(404).send(`Can't get job data, ${err.message}`);
    next(err);
  }
};

module.exports = {
    getJobs,
    getJob
}
