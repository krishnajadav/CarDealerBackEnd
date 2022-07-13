//Author: Elizabeth James
//Controller for the rentals feature
const db = require("../models");

const Inventory = db.inventory;
const RentalRate = db.rentalrate;
const RentalFactor = db.rentalfactor;

exports.getBetterDeals = async (req, res) => {
    // let rentalRates = await RentalRate.find();

    let seatCount = req.params.seatCount;
    let startDate = req.params.startDate;
    let endDate = req.params.endDate;
    let distance = req.params.distance;
    let cars = await Inventory.find({vehicleSeatCount:seatCount});
    let allCarDeals = [];
    let startingDate = new Date(startDate);
    let endingDate = new Date(endDate);
    let diffbetweenStartAndEndDate =  Math.ceil(Math.abs(startingDate - endingDate + 1) / (1000 * 60 * 60 * 24));

    for (var i =-7;i <=7;i++){
        if (i === 0){
            continue;
        }
        let nextDay = new Date(startingDate);
        nextDay.setDate(startingDate.getDate()+i)

        let currentDate = new Date();
        const diffTime = Math.abs(nextDay - currentDate);
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <=7){
            diffDays = 7;
        }
        else if (diffDays <=14){
            diffDays = 14;
        }
        else if( diffDays <=21){
            diffDays = 21;
        }
        else{
            diffDays = 28;
        }
        let rentalrate = await RentalRate.findOne({ day : nextDay.getDay() })
        
        let rentalfactor = await RentalFactor.findOne({daysAway: diffDays});
        for (var j =0 ;j <cars.length;j++){
            
            cost = (cars[j].vehiclePrice*rentalfactor.factor*distance*diffbetweenStartAndEndDate*rentalrate.rate).toFixed(2);
            allCarDeals.push({
                date: nextDay.toISOString().split('T')[0],
                name: cars[j].vehicleName,
                seatCount: cars[j].vehicleSeatCount,
                cost: cost,
                imageurl : cars[j].vehicleImageURL
            })
        }
    }

    console.log(allCarDeals.length);
    return res.status(200).send(allCarDeals);
};

exports.getRentFactor = (req, res) => {
    let startDate = req.params.startDate;
    let currentDate = new Date();
    console.log(startDate)
    const sDate = new Date(startDate);
    const diffTime = Math.abs(sDate - currentDate);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    console.log(diffTime + " milliseconds");
    console.log(diffDays + " days");

    if (diffDays <=7){
        diffDays = 7;
    }
    else if (diffDays <=14){
        diffDays = 14;
    }
    else if( diffDays <=21){
        diffDays = 21;
    }
    else{
        diffDays = 28;
    }
    // let diffDays = req.params.startDate;
    let query = {};
    query = {
        daysAway : diffDays
        }
        console.log(query)
        RentalFactor.findOne(query, {})
        .exec((err, rentfactors) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            res.status(200).send(rentfactors);
        });
};

exports.getRentRate = (req, res) => {
    let startDate = req.params.startDate;
    let startDay= new Date(startDate).getDay();
    let query = {};
    query = {
        day : startDay.toString()
        }
        console.log(query)
        RentalRate.findOne(query, {})
        .exec((err, rentalrates) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            res.status(200).send(rentalrates);
        });
};

