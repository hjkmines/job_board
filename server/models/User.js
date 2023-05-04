const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const crypto = require('crypto')

//sub schema --> saved jobs 
const SavedJobSchema = new Schema({
    savedJob: {
        type: Schema.Types.ObjectId,
        ref:'Job',
        unique: true
    }
}, {
    timestamp: true
    
})
//sub schema applied jobs -> timestamp -> include date.now()
const AppliedJobSchema = new Schema({
    appliedJob: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        unique: true  
    }
})


const UserSchema = new Schema({
    userName: {
        type: String, 
        unique: true,
        required: true,
        maxLength: 20
    },
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        required: true,
        unique: true,
        validate: (email) => validator.isEmail(email)
    },
    password: {
        type: String,
        required: true,
        validate: (password) => validator.isStrongPassword(password)
    },
    admin: {
        type: Boolean,
        default: false
    },
    //sub schemas
    //jobs saved by user ('hearting' / 'save for later')
    savedJobs: {
        type: [SavedJobSchema]
    },
    //already submitted applications 
    appliedJobs: {
        type: [AppliedJobSchema]
    },
    // token stuff 
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    }
}, {
    timestamps: true
})

//get signed JWT token
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}


//pre - method to save / re-hash password if updated
UserSchema.pre('save', async function(next) {
    //if pw was never modified coming from the user, it means user is hitting the log in endpint. Dont re-hash password
    if (!this.isModified('password')) next()

    const salt = await bcrypt.genSalt(10);
    console.log('this is salting', salt)
    this.password = await bcrypt.hash(this.password, salt)
    console.log('this is the new password', this.password)
    next();
})

//method to match passwords -> check to see if user has entered the correct password 
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex')

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000

    return resetToken;
}


module.exports = mongoose.model('User', UserSchema)