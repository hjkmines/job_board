const jobRouter = require("express").Router();

const {
  getJob,
  getJobs,
} = require("../controllers/jobs");

//all jobs "/jobs" endpoint
jobRouter.route("/")
.get(getJobs)
// protect post, put, delete
//.post(protectedRoute, adminValidator, postJob)
// .delete(protectedRoute, adminValidator, deleteJobs)

//individual job "/jobs/jobId" endpoint
jobRouter
  .route("/:jobId")
  .get(getJob)
  // protect put, delete 

module.exports = jobRouter;
