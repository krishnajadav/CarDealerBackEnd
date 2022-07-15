const db = require("../models");
const Inventory = db.inventory;
/*
Author: Krishna Sanjaybhai Jadav(krishna.jadav@dal.ca)
*/
exports.add = (req, res) => {
    const inventory = new Inventory({
        vehicleName: req.body.vehicleName,
        vehicleModelNumber: req.body.vehicleModelNumber,
        companyName: req.body.companyName,
        vehiclePrice: req.body.vehiclePrice,
        vehicleImageURL:req.body.vehicleImageURL,
        eligibleForLoan: true,
        eligibleForRent: true,
        vehicleSeatCount: req.body.vehicleSeatCount
    });
    inventory.save((err, inventory) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        res.status(201).send({message: 'Vehicle Inserted'});
    });
};

exports.get = (req, res) => {
    Inventory.find({}, {})
        .exec((err, inventories) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            res.status(200).send(inventories);
        });
};

// this method returns cars eligible for rent. Author: Elizabeth James
exports.getFilteredResultsForRent = (req, res) => {
    let seatCount = req.params.seatCount;
    let quoteType = req.params.quoteType;
    let query = {};
    if (quoteType === 'rent'){
        query = {
            vehicleSeatCount : seatCount,
            eligibleForRent : true
            }
    }
    
    else{
        return res.status(400).send("Invalid quote type");
    }
    Inventory.find(query, {})
        .exec((err, inventories) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            res.status(200).send(inventories);
        });
};

// this method returns cars eligible for loan. Author: Elizabeth James
exports.getFilteredResultsForLoan = (req, res) => {    
    let quoteType = req.params.quoteType;
    let query = {};
    if (quoteType === 'loan'){
        query = {
            eligibleForLoan : true
            }
    }
    else{
        return res.status(400).send("Invalid quote type");
    }
    Inventory.find(query, {})
        .exec((err, inventories) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            res.status(200).send(inventories);
        });
};

exports.update = (req, res) => {
    Inventory.findOne({
        "_id": req.params.id
    })
        .exec((err, inventory) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            if (!inventory) {
                return res.status(404).send({message: "Inventory Not found."});
            }
            inventory.vehicleName=req.body.vehicleName;
            inventory.vehicleModelNumber=req.body.vehicleModelNumber;
            inventory.companyName=req.body.companyName;
            inventory.vehiclePrice=req.body.vehiclePrice;
            inventory.vehicleImageURL=req.body.vehicleImageURL;
            inventory.vehicleSeatCount=req.body.vehicleSeatCount;
            inventory.save((err, inventory) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }
                res.status(200).send({message: 'Inventory updated'});
            });
        });
};

exports.delete = (req, res) => {
    Inventory.findOne({
        "_id": req.params.id
    })
        .exec((err, inventory) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            if (!inventory) {
                return res.status(404).send({message: "Inventory Not found."});
            }
            var deleteQuery = { "_id": req.params.id };
            inventory.deleteOne(deleteQuery,(err, inventory) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }
                res.status(200).send({message: 'Inventory Delete'});
            });
        });
};