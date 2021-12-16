const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reportSchema = new Schema({
    cmdtyName :{
        type: String,
        required: true
    },
    cmdtyId :{
        type: String,
        required: true
    },
    marketID :{
        type: String,
        required: true
    },
    marketName :{
        type: String,
        required: true
    },
    users: [{
        userId: {
            type: String,
            required: true
        }
    }],
    priceUnit :{
        type: String,
        required: true
    },
    minprice :{
        type: Number,
        required: true
    },
    maxprice :{
        type: Number,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
});

const AggregateReport = mongoose.model('AggregateReport', reportSchema);

module.exports = AggregateReport;