var express = require('express');
var router = express.Router();
var locationDal = require('../dal/location');

router.get('/all', function(req, res) {
    locationDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('locations/displayAllLocations', {rs: result});
        }
    );
});

router.get('/save', function(req, res, next) {
    console.log(req.query);
    locationDal.Insert(req.query, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the data.");
        }
    });
});

router.get('/create', function(req, res) {
            res.render('locations/locationFormCreate');
});

module.exports = router;
