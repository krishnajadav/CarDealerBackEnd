//Author: Leah Isenor
exports.getAllAppointments = (req, res) => {
    res.status(201).send({message: 'get all apointments'});
}

exports.getAppointmentsForUser = (req, res) => {
    res.status(201).send({message: 'get all users Appointment'});
}

exports.getAllTimeslots = (req, res) => {
    res.status(201).send({message: 'getAllTimeslots'});
}

exports.bookAppointment = (req, res) => {
    res.status(201).send({message: 'bookAppointment'});
}

exports.cancelAppointment = (req, res) => {
    res.status(201).send({message: 'cancelAppointment'});
}