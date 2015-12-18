var express = require('express');
var router = express.Router();
var partyDal = require('../dal/parties');
var userDal = require('../dal/users');
var locationDal = require('../dal/location');

router.get('/all', function(req, res) {
    partyDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('parties/displayAllParties', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
    partyDal.GetByID(req.query.party_id,
        function (err, result) {
            if (err) throw err;

            partyDal.GetHost(req.query.party_id, function (err, userResults) {
                res.render('parties/displayPartyInfo', {
                        rs: result,
                        party_id: req.query.party_id,
                        userResults: userResults
                    }
                );
            })
        }
    );
});

router.get('/party_guests/', function(req, res) {

    partyDal.GetByID(req.query.party_id,
        function (err, result) {
            if (err) throw err;

        partyDal.GetPartyGuests(req.query.party_id, function (err, party_results) {
            userDal.GetAll(function(err, users_results) {
                    console.log(users_results);
                    var data = {
                        rs: result,
                        party_results: party_results,
                        users_results: users_results
                    };
                    res.render('parties/singlePartyWithGuests', data);
                })
            });
        });
});

router.get('/save', function(req, res, next) {
    console.log(req.query);
    partyDal.Insert(req.query, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the data.");
        }
    });
});

router.get('/total', function(req, res) {
    partyDal.GetTotal(function(err, total_results) {
        partyDal.GetAvg(function(err, avg_results){
            console.log(avg_results);
            console.log(total_results);
            var data = {
                total_results: total_results,
                avg_results: avg_results
            };
            res.render('parties/numPartiesUsersTotal', data);
        });
    });
});

router.get('/create', function(req, res) {
            userDal.GetAll(function(err, users_results) {
            locationDal.GetAll(function(err, location_results){
                console.log(location_results);
                console.log(users_results);
                var data = {
                    location_results: location_results,
                    users_results: users_results
                };
                res.render('parties/partyFormCreate', data);
            })
            });
        });

router.get('/party', function(req, res) {
    partyDal.GetAll(function(err, party_results) {
            console.log(party_results);
            var data = {
                party_results: party_results
            };
            res.render('parties/displayPartyGuests', data);
        })
});

module.exports = router;