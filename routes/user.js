const express = require('express');
const router = express.Router();

const userController = require('./../controllers/userController');

router.route('/').get((req, res) => {
    res.send('Project Esra Durovi, Ehad Kraja');
});

router.post("/login",userController.login);
router.post("/addObservation",userController.validateAccessToken,userController.addObservation);
router.post("/getAllUserObservations",userController.validateAccessToken,userController.getAllUserObservations);
router.post("/getObservationDetails",userController.validateAccessToken,userController.getObservationDetails);
router.post("/deleteObservation",userController.validateAccessToken,userController.deleteObservation);
router.post("/updateObservation",userController.validateAccessToken,userController.updateObservation);

module.exports = router;
