const jwt = require("jsonwebtoken");
const db = require('../db/querys')

const secret = Buffer.from("62197fc8886bd3b739dd2cc8aa109d0b", "hex");

const addUser = async (req, res, next) => {
    const users = await db.addUser(req.body)
    if (users) {
        res.json({
            status: "Success",
            data: users
        });
    } else {
        res.json({
            status: "error",
            message: "Data not correct"
        })
    }
};


const deleteUser = async (req, res, next) => {
    const users = await db.deleteUser(req.body)
    if (users) {
        res.json({
            status: "Success",
            data: users
        });
    } else {
        res.json({
            status: "error",
            message: "Data not correct or user not found"
        })
    }

};

const getAllUsers = async (req, res, next) => {

    const users = await db.getUsers()
    res.json({
        status: "Success",
        data: users
    })
};


const getObservationsToBeApproved = async (req, res, next) => {
    const observations = await db.getObservationsToBeApproved()
    res.json({
        status: "Success",
        data: observations
    })
}


const getObservationsApproved = async (req, res, next) => {
    const observations = await db.getObservationsApproved()
    res.json({
        status: "Success",
        data: observations
    })
};


const getHighestReports = async (req, res, next) => {
    const observations = await db.getHighestReports()
    res.json({
        status: "Success",
        data: observations
    })
};

const getHighestApproved = async (req, res, next) => {
    const observations = await db.getHighestApproved()
    res.json({
        status: "Success",
        data: observations
    })
};

const getHighestRejected = async (req, res, next) => {
    const observations = await db.getHighestRejected()
    res.json({
        status: "Success",
        data: observations
    })
};



const getObservationsRejected = async (req, res, next) => {
    const observations = await db.getObservationsRejected()
    res.json({
        status: "Success",
        data: observations
    })
};


const deleteObservation = async (req, res, next) => {
    const observation = await db.deleteObservation(req.body)
    if (observation) {
        res.json({
            status: "Success",
            data: observation
        });
    } else {
        res.json({
            status: "error",
            message: "Data not correct or user not found"
        })
    }
};


const approveObservation = async (req, res, next) => {
    const observation = await db.approveObservation(req.body)
    if (observation) {
        res.json({
            status: "Success",
            data: observation
        });
    } else {
        res.json({
            status: "error",
            message: "Data not correct or user not found"
        })
    }
};


const rejectObservation = async (req, res, next) => {
    const observation = await db.rejectObservation(req.body)
    if (observation) {
        res.json({
            status: "Success",
            data: observation
        });
    } else {
        res.json({
            status: "error",
            message: "Data not correct or user not found"
        })
    }
};


const validateAccessToken = (req, res, next) => {

    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
        const bearerToken = bearerHeader.split(" ")[1];

        req.token = bearerToken;

        jwt.verify(bearerToken, secret, async (err, authData) => {
            if (err) {
                res.json({
                    status: "error",
                    message: "Not authorized"
                })
            } else {
                req.authData = authData
                if (authData.user.role == "admin") {
                    next()
                } else {
                    res.json({
                        status: "error",
                        message: "Not authorized"
                    })
                }
            }
        });
    } else {
        res.sendStatus(403);
    }
}

module.exports = {
    validateAccessToken,
    addUser,
    getAllUsers,
    deleteUser,
    getObservationsToBeApproved,
    getObservationsApproved,
    getObservationsRejected,
    deleteObservation,
    approveObservation,
    rejectObservation,
    getHighestReports,
    getHighestApproved,
    getHighestRejected
};
