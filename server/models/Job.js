const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    job_title: {
        type: String,
        unique: true,
        required: [true, 'Please provide a job title'],
    },
    company: {
        type: String,
        required: [true, 'please provide a company'],
    },
    link: {
        type: String,
        required: [true, 'please provide a link'],
    },
    location: {
        type: String,
    },
    source: {
        type: String,
    },
    date: {
        type: Date
    },
    remote: {
        type: Boolean
    }

}, {
    timestamps: true,
    collection: 'jobs_test'
})

module.exports = mongoose.model('Job', JobSchema);