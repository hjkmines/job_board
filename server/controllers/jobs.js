const axios = require('axios')
const Job = require('../models/Job');

const getJobs = async (req, res, next) => {

  try {
    if (req.query.latest) {
      console.log('latest jobs')
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1)
      yesterday.setHours(0)
      yesterday.setMinutes(0)
      yesterday.setSeconds(0)
      yesterday.setMilliseconds(0)


      const jobs = await Job.find({ date: { $gte: yesterday } }).sort({ 'date': -1 }).lean();


      return res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(jobs)

    } else if (req.query.remoteOnly === 'true') {
      console.log('remoteOnly');
      console.log(req.query);

      if (req.query.search) {
        console.log('remoteOnly + search');
        const filter =
          [{ '$search': {

            text: {
              query: `${req.query.search}`,
              path: ["description", "company", "title"]
            }
          }
          }, { '$match': {

            'remote': true
          }
          }]

        const jobs = await Job.aggregate(filter).sort({ "date": -1 })

        return res
          .status(200)
          .setHeader('Content-Type', 'application/json')
          .json(jobs)

      } else {
        console.log('remoteOnly no search');
        const jobs = await Job.find({
          'remote': true
        }).sort({ "date": -1 }).lean()

        return res
          .status(200)
          .setHeader('Content-Type', 'application/json')
          .json(jobs)
      }

    } else if (req.query.location) {
      console.log('search location and geo');
      console.log(req.query);
      const radiusSphere = 0.000621371 * req.query.radius / 3963.2;
      const coords = []

      axios.get('https://geocode.maps.co/search', { params: { q: req.query.location } }).then((res) => {
        coords.push(parseFloat(res.data[0].lon))
        coords.push(parseFloat(res.data[0].lat))
      })

      // Don't spam the geocode API
      await new Promise(r => setTimeout(r, 500));

      if (req.query.search) {

        const jobs = await Job.find({
          "$text": { "$search": `${req.query.search}` },
          "points": {
            "$geoWithin": {
              "$centerSphere": [coords, radiusSphere]
            }
          }
        }).sort({ "date": -1 }).lean()

        return res
          .status(200)
          .setHeader('Content-Type', 'application/json')
          .json(jobs)


      } else {
        const jobs = await Job.find({
          "points": {
            "$near": {
              "$geometry": {
                "type": "Point",
                "coordinates": coords
              },
              "$maxDistance": parseFloat(req.query.radius),
            }
          }
        }).sort({ 'date': 'desc' }).lean();
        return res
          .status(200)
          .setHeader('Content-Type', 'application/json')
          .json(jobs)
      }

    }

    else if (req.query.lat && !req.query.search) {
      // Geospatial search only
      console.log('geospatial search')
      const jobs = await Job.find({
        "points": {
          "$near": {
            "$geometry": {
              "type": "Point",
              "coordinates": [parseFloat(req.query.long), parseFloat(req.query.lat)]
            },
            "$maxDistance": parseFloat(req.query.radius),
          }
        }
      }).sort({ 'date': 'desc' }).lean();

      return res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(jobs)


    }


    else if (req.query.lat && req.query.search) {
      console.log('search text and geo');
      console.log(req.query);
      const radiusSphere = 0.000621371 * req.query.radius / 3963.2;
      const jobs = await Job.find({
        "$text": { "$search": `${req.query.search}` },
        "points": {
          "$geoWithin": {
            "$centerSphere": [[
              parseFloat(req.query.long),
              parseFloat(req.query.lat)
            ], radiusSphere]
          }
        }
      }).sort({ "date": -1 }).lean()

      return res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(jobs)

    }

    else if (req.query.search) {
      console.log('text search')
      const filter = {
        "$search": {
          "text": {
            "query": `${req.query.search}`,
            "path": ["description", "company", "title"],
          },
        }
      }

      const jobs = await Job.aggregate([filter]).sort({ "date": -1 })

      return res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(jobs)

    }

    else {
      const jobs = await Job.find().sort({ 'date': -1 }).limit(req.query.limit).lean();
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
