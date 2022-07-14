//Author: Leah Isenor
//Controller for the test drive booking feature
const db = require("../models");
const TestDrives = db.testDrives;
const TestDriveCars = db.testDriveCars;
const TestDriveTimes = db.testDriveTimes;

exports.getUnavailableSlots = (req, res) => {
    TestDrives.find().exec((err, testDrives) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        var timeslots = getUnavailableTimeSlotsFromAppointments(testDrives);
        res.status(200).send(timeslots);
    });
}

exports.getAppointmentsForUser = (req, res) => {
    const id = req.params.userid;
    TestDrives.find({userId: id}).exec((err,appointments) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        res.status(200).send(appointments);
    })
}

exports.getTimeslots = (req, res) => {
    TestDriveTimes.find().exec((err, testdrivetimes) => {
        if (err) {
            res.status(500).send({message: err});l
            return;
        }
        res.status(200).send(testdrivetimes[0].timeslots);
    });
}

exports.getCars = (req, res) => {
    TestDriveCars.find().exec((err, testDriveCars) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        var cars = [];
        for (let car of testDriveCars) {
            cars.push(car.name);
        }
        res.status(200).send(cars);
    });
}

exports.bookAppointment = (req, res) => {
    const details = {
        car: req.body.car,
        date: req.body.date,
        time: req.body.time,
    }

    TestDrives.find(details).exec((err, appointment) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        
        //check appointment isn't already booked
        if (appointment.length) {
            res.status(409).send({message: "Appointment is already taken"});
            return;
        }

        //add userId and save appointment
        details.userId = req.params.userid;
        const drive = new TestDrives(details);
         drive.save((err, drive) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            res.status(201).send({message: 'Test drive booked'});
        });
    });
}

exports.cancelAppointment = (req, res) => {
    const id = req.params.appointmentid;
    TestDrives.deleteOne({_id: id}).exec((err,deleteResponse) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        res.status(200).send({message:" appointment canceled"});
    })
}

//Extracts car, date and time from booked appointments and formats it 
//to be used by front end when displaying available booking options
const getUnavailableTimeSlotsFromAppointments = (appointments) => {
    timeslots = {};
    for (let appointment of appointments){
        let car = appointment.car;
        if (!(car in timeslots)) {
            timeslots[car] = {};
        }
        let date = appointment.date;
        if (!(date in timeslots[car])) {
            timeslots[car][date] = [];
        }
        let time = appointment.time;
        timeslots[car][date].push(time);
    }
    return timeslots;
}