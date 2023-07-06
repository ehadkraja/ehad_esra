const jwt = require("jsonwebtoken");
const db = require('../db/querys')

const secret = Buffer.from("62197fc8886bd3b739dd2cc8aa109d0b", "hex");

const login = async (req, res, next) => {
    const {email, password} = req.body
    const user = await db.login(email, password);
    if (user) {
        jwt.sign({user: user}, secret, {expiresIn: "1d", algorithm: 'HS256'}, (err, token) => {
            res.json({
                status: "Success",
                data: {token: token}
            });
        });
    } else {
        res.json({
            status: "Error",
            message: "User not found or wrong password"
        });
    }
    ;
};


const addObservation = async (req, res, next) => {
    const observation = await db.addObservation(req.body)
    if (observation) {
        res.json({
            status: "Success",
            data: observation
        });
    } else {
        res.json({
            status: "error",
            message: "Data not correct"
        })
    }
};


const updateObservation = async (req, res, next) => {
    const observation = await db.updateObservation(req.body)
    if (observation) {
        res.json({
            status: "Success",
            data: observation
        });
    } else {
        res.json({
            status: "error",
            message: "Data not correct"
        })
    }
}


const getAllUserObservations = async (req, res, next) => {
    const observation = await db.getUserObservations(req.body)
    res.json({
        status: "Success",
        data: observation
    })
};


const getObservationDetails = async (req, res, next) => {
    const observation = await db.getUserObservation(req.body)
    res.json({
        status: "Success",
        data: observation
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
                req.body.userId = authData.user.id
                if (authData.user.role == "user") {
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
    login,
    addObservation,
    getAllUserObservations,
    getObservationDetails,
    deleteObservation,
    updateObservation
};
