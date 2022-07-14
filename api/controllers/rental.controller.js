//Author: Elizabeth James
//Controller for the rentals feature
const db = require("../models");

const Inventory = db.inventory;
const RentalRate = db.rentalrate;
const RentalFactor = db.rentalfactor;


// this function gets better deals in the previous week and next week from the inputted start date.
// rent factor(discounts) and rent rates(rate on each) day is considered while computing the cost.
exports.getBetterDeals = async (req, res) => {

    // inputs from request
    let seatCount = req.params.seatCount;
    let startDate = req.params.startDate;
    let endDate = req.params.endDate;
    let distance = req.params.distance;

    // get list of cars having the inputted seat count
    let cars = await Inventory.find({ vehicleSeatCount: seatCount });
    let allCarDeals = [];

    // get no of days of rental by computing the difference between start and end date of the trip
    let startingDate = new Date(startDate);
    let endingDate = new Date(endDate);
    let diffbetweenStartAndEndDate = Math.ceil(Math.abs(startingDate - endingDate + 1) / (1000 * 60 * 60 * 24));

    // compute the cost for all days in the previous week and next week
    for (var i = -7; i <= 7; i++) {

        // skip loop for the inputted data
        if (i === 0) {
            continue;
        }
        let nextDay = new Date(startingDate);
        nextDay.setDate(startingDate.getDate() + i)

        let currentDate = new Date();

        // skip loop for days before current date

        if (nextDay < currentDate) {
            continue;
        }


        // get diff between the current day and nextday to calculate the rate factor(discount)
        const diffTime = Math.abs(nextDay - currentDate);
        let diffbetweenDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffbetweenDays <= 7) {
            diffbetweenDays = 7;
        }
        else if (diffbetweenDays <= 14) {
            diffbetweenDays = 14;
        }
        else if (diffbetweenDays <= 21) {
            diffbetweenDays = 21;
        }
        else {
            diffbetweenDays = 28;
        }

        // get rental rate for nextday
        let rentalrate = await RentalRate.findOne({ day: nextDay.getDay() })


        //get rental factor for diff
        let rentalfactor = await RentalFactor.findOne({ daysAway: diffbetweenDays });
        for (var j = 0; j < cars.length; j++) {

            // compute cost and add elements to array
            cost = (cars[j].vehiclePrice * rentalfactor.factor * distance * diffbetweenStartAndEndDate * rentalrate.rate).toFixed(2);
            allCarDeals.push({
                date: nextDay.toISOString().split('T')[0], // reference https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
                name: cars[j].vehicleName,
                seatCount: cars[j].vehicleSeatCount,
                cost: cost,
                imageurl: cars[j].vehicleImageURL
            })
        }
    }
    // return array with code 200
    return res.status(200).send(allCarDeals);
};


// this funcion return the rental factor
exports.getRentFactor = (req, res) => {
    // input from request
    let startDate = req.params.startDate;
    let currentDate = new Date();
    // convert string to date and calculate diff between start date and today
    const sDate = new Date(startDate);
    const diffTime = Math.abs(sDate - currentDate);
    let diffbetweenDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // compute the difference factor. it should be either 7, 14,21 or 28 to avail discounts
    if (diffbetweenDays <= 7) {
        diffbetweenDays = 7;
    }
    else if (diffbetweenDays <= 14) {
        diffbetweenDays = 14;
    }
    else if (diffbetweenDays <= 21) {
        diffbetweenDays = 21;
    }
    else {
        diffbetweenDays = 28;
    }
    let query = {};
    query = {
        daysAway: diffbetweenDays
    }
    // find rental factor based on diff between start date and today
    RentalFactor.findOne(query, {})
        .exec((err, rentfactors) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).send(rentfactors);
        });
};

// this funcion return the rental rate
exports.getRentRate = (req, res) => {
    // get input from request and convert string to date
    let startDate = req.params.startDate;
    let startDay = new Date(startDate).getDay();

    let query = {};
    query = {
        day: startDay.toString()
    }
    // query rental rate
    RentalRate.findOne(query, {})
        .exec((err, rentalrates) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).send(rentalrates);
        });
};

