const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: [true, 'Please provide a job title'],
    },
    company: {
        type: String,
        required: [true, 'please provide a company'],
    },
    company: {
        type: String,
        required: [true, 'please provide a link'],
    },
    location: {
        type: String,

    },
    date_posted: {
        type: String
    },
    remote: {
        type: Boolean
    },
    min_salary: {
        type: Number
    },
    max_salary: {
        type: Number
    },
    salary_type: {
        type: String
    }


}, {
    timestamps: true,
    collection: 'indeed_test'
})

module.exports = mongoose.model('Job', JobSchema);