const jobRouter = require("express").Router();

const {
  getJob,
  getJobs
} = require("../controllers/jobs");

jobRouter
  .route("/")
  .get(getJobs)

jobRouter
  .route("/:jobId")
  .get(getJob)

module.exports = jobRouter;
