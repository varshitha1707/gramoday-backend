const router = require('express').Router();
const Report = require('../models/reports.model');
const AggregateReport = require('../models/aggregate-reports.model');


// Posts a report to the database
router.post('/send', (req, res) => {
    const ReportDetails = req.body.reportDetails;
    const userID = ReportDetails.userID;
    const marketID = ReportDetails.marketID;
    const marketName = ReportDetails.marketName;
    const cmdtyID = ReportDetails.cmdtyID;
    const cmdtyName = ReportDetails.cmdtyName;
    const priceUnit = ReportDetails.priceUnit;
    const convFctr = ReportDetails.convFctr;
    const minprice = ReportDetails.minprice;
    const maxprice = ReportDetails.maxprice;

    const newReport = new Report({
        reportDetails: {
            userID: userID,
            marketID: marketID,
            marketName: marketName,
            cmdtyID: cmdtyID,
            cmdtyName: cmdtyName,
            priceUnit: priceUnit,
            convFctr: convFctr,
            minprice: minprice,
            maxprice: maxprice
        }
    });

    newReport.save()
    // response status success and reportid
    .then(() => res.status(201).json({
        status: 'Success',
        reportID: newReport._id
    }))
    // response status error
    .catch(error => res.status(400).json({
        error: error
    }));
});

// make one aggregate report of all the reports in the reports model with same cmdtyID in the aggregate model
router.post('/aggregate', (req, res) => {
    const { cmdtyID } = req.body;
    // find all the reports with same reportDetails.cmdtyID
    Report.find({ cmdtyID: cmdtyID }, (err, reports) => {
        if (err) {
            res.status(500).send("error1:" +err);
        } else if (reports.length === 0) {
            res.status(400).send('No reports found');
        } else {
            const aggregateReport = new AggregateReport({
                cmdtyName: reports[0].cmdtyName,
                cmdtyId: reports[0].cmdtyId,
                marketID: reports[0].marketID,
                marketName: reports[0].marketName,
                users: reports[0].users,
                priceUnit: reports[0].priceUnit,
                minprice: reports[0].minprice,
                maxprice: reports[0].maxprice
            });
            // convert the minprice and maxprice to the same priceUnit using convFctr and then calculate the average
            for (let i = 0; i < reports.length; i++) {
                if (reports[i].priceUnit === aggregateReport.priceUnit) {
                    aggregateReport.minprice += reports[i].minprice * reports[i].convFctr;
                    aggregateReport.maxprice += reports[i].maxprice * reports[i].convFctr;
                } else {
                    aggregateReport.minprice += reports[i].minprice;
                    aggregateReport.maxprice += reports[i].maxprice;
                }
            }
            aggregateReport.minprice = Math.round(aggregateReport.minprice / reports.length);
            aggregateReport.maxprice = Math.round(aggregateReport.maxprice / reports.length);
            // save the aggregate report to the aggregate model
            aggregateReport.save()
            // response status success and aggregateReport
            .then(() => res.status(201).json({
                status: 'Success',
                aggregateReport: aggregateReport
            }))
            // response status error
            .catch(error => res.status(400).json({
                error: error
            }));
        }
    });
});


// Gets aggregate reports of specific cmdtyID from database
router.get('/:cmdtyID', (req, res) => {
    const cmdtyID = req.params.cmdtyID;

    AggregateReport.find({
        'reportDetails.cmdtyID': cmdtyID
    })
    // response status success and reportid
    .then(reports => res.status(201).json({
        status: 'Success',
        reports: reports
    }))
    // response status error
    .catch(error => res.status(400).json({
        error: error
    }));
});


// get all reports
router.get('/', (req, res) => {
    Report.find()
        .then(reports => res.json(reports))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;