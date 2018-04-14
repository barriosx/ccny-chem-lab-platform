const Schedule = require('../models/schedule');
const jwt = require('jsonwebtoken');
const dbConfig = require('../config/database');
const verifyToken = require('./middlewares');
const moment = require('moment');

module.exports = (router) => {
    router.get('/requests', verifyToken, (request, response) => {
        Schedule.find('id start end serviced', (err, schedule) => {
            if (err) {
                // Connection error was found
                response.status(500).json({ success: false, message: err });
            } else {
                if (schedule) {
                    response.status(200).json({ success: true, schedule: schedule });
                } else {
                    response.status(404).json({ success: false, message: "No scheduled pickups in system." });
                }
            }
        });
        // TODO: implement the storage and supply request endpoints

    });

    // TODO: implement later
    //   router.patch('/pickupRequests/:id',verifyToken,(request, response) => {
    //     //The only thing that is able to change is the pending attribute
    //     Waste.findOneAndUpdate({_id: request.params.id}, request.body.pending, (err,waste_request) => {
    //       if (err) {
    //         console.log(err);
    //         response.status(500).json({ success: false, message: err });
    //       }
    //       else if (!waste_request) {
    //         response.status(200).json({ success: false, message: "Request does not exist" });
    //       }
    //       else {
    //         response.status(200).json({ success: true, message: "Patched!" });
    //       }
    //     });
    //   });



    /* router.post('/', verifyToken, (request, response) => {
        let schedule_request = new Schedule({
            id: request.body.id, // user id - request.body._id 
            start: moment().format("YYYY-MM-DDTHH:mm:ss"), // Location of lab
            end: request.body.end,
            serviced: false
        });
        schedule_request.save((error) => {
            if (error) {
                response.json({ success: false, message: error });
            } else {
                response.json({ success: true, message: 'Waste request sent!' });
            }
        });
    }); */
    return router;
}