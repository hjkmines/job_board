const Job = require('../models/Job');

const getJobs = async (req, res, next) => {
  
  try {
    console.log(req.query)
    
    if (req.query.latest) {

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1)
      yesterday.setHours(0)
      yesterday.setMinutes(0)
      yesterday.setSeconds(0)
      yesterday.setMilliseconds(0)
     
      const jobs = await Job.find({ date: { $gte: yesterday, $lte: today }}).sort({ date: -1 }).lean();

      return res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(jobs)

    } else if (req.query.lat && req.query.long) {
      
      const jobs = await Job.find({
        points: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [parseFloat(req.query.long), parseFloat(req.query.lat)]
            },
            $maxDistance: parseFloat(req.query.radius),
          }
        }
      }).sort({ 'date': 'desc' }).lean();

      return res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(jobs)

    }

    else {
      const jobs = await Job.find().sort({ 'date': 'desc' }).limit(req.query.limit).lean();
      return res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(jobs)
    }


  } catch (err) {
    console.log('Error getting jobs');
    res.status(501).send(`Can't get job data, ${err.message}`);
    next(err);
  }
}

const getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.jobId);
    res.status(200).setHeader("Content-type", "application/json").json(job);
  } catch (err) {
    res.status(501).send(`Can't get job data, ${err.message}`);
    next(err);
  }
};

module.exports = {
  getJobs,
  getJob
}
