const express = require('express');
const router = express.Router();
// import {getAllUsers,addUser,validateAccessToken} from "../controllers/adminContorller";
// const getAllUsers = require("../controllers.a")

const adminController = require('./../controllers/adminContorller');

router.post('/addUser',
    adminController.validateAccessToken,
    adminController.addUser
);

router.post('/deleteUser',
    adminController.validateAccessToken,
    adminController.deleteUser
);

router.post('/getAllUsers',
    adminController.validateAccessToken,
    adminController.getAllUsers
);


router.post('/getObservationsToBeApproved',
    adminController.validateAccessToken,
    adminController.getObservationsToBeApproved
);

router.post('/getObservationsApproved',
    adminController.validateAccessToken,
    adminController.getObservationsApproved
);

router.post('/getObservationsRejected',
    adminController.validateAccessToken,
    adminController.getObservationsRejected
);


router.post('/deleteObservation',
    adminController.validateAccessToken,
    adminController.deleteObservation
);

router.post('/approveObservation',
    adminController.validateAccessToken,
    adminController.approveObservation
);

router.post('/rejectObservation',
    adminController.validateAccessToken,
    adminController.rejectObservation
);

router.post('/getHighestReports',
    adminController.validateAccessToken,
    adminController.getHighestReports
);
router.post('/getHighestApproved',
    adminController.validateAccessToken,
    adminController.getHighestApproved
);
router.post('/getHighestRejected',
    adminController.validateAccessToken,
    adminController.getHighestRejected
);

module.exports = router;
