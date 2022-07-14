// Author: Tuan Hamid
const db = require("../models");
const Accessory = db.accessory;

exports.create = (req, res) => {
    const accessory = new Accessory({
        image: req.body.image,
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity
    });
    accessory.save((err) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        res.status(201).send({message: 'Accessory created'});

    });
};

exports.update = (req, res) => {
    Accessory.findOne({
        "_id": req.params.id
    })
        .exec((err, accessory) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            if (!accessory) {
                return res.status(404).send({message: "Accessory not found."});
            }
            accessory.image=req.body.image;
            accessory.name=req.body.name;
            accessory.description=req.body.description;
            accessory.category=req.body.category;
            accessory.price=req.body.price;
            accessory.quantity=req.body.quantity;
            accessory.save((errAccessory) => {
                if (errAccessory) {
                    res.status(500).send({message: errAccessory});
                    return;
                }
                res.status(200).send({message: 'Accessory updated'});
            });
        });
};

exports.remove = (req, res) => {
    const id = req.params.id;
    Accessory.deleteOne({_id: id}).exec((err) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        res.status(200).send({message:"Accessory removed"});
    })
}

exports.findById = (req, res) => {
    Accessory.findOne({
        _id: req.params.id
    })
        .exec((err, accessory) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            if (!accessory) {
                return res.status(404).send({message: "Accessory not found"});
            }
            res.status(200).send(accessory);
        });
};

exports.findByCategory = (req, res) => {
    Accessory.find({
        category: req.params.id
    })
        .exec((err, accessories) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            if (!accessories) {
                return res.status(404).send({message: "Category not found"});
            }
            res.status(200).send(accessories);
        });
};