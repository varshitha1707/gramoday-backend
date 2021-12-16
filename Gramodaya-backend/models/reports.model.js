const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    reportDetails: {
        userID:{
            type: String,
            required: true
        },
        marketID:{
            type: String,
            required: true
        },
        marketName:{
            type: String,
            required: true
        },
        cmdtyID:{
            type: String,
            required: true
        },
        cmdtyName:{
            type: String,
            required: true
        },
        priceUnit:{
            type: String,
            required: true
        },
        convFctr:{
            type: Number,
            required: true
        },
        minprice:{
            type: Number,
            required: true
        },
        maxprice:{
            type: Number,
            required: true
        },
    },
    date: {
        type: Date,
        default: Date.now
    }
});


const Report = mongoose.model('Report', reportSchema);

module.exports = Report;