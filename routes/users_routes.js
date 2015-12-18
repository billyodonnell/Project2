var express = require('express');
var router = express.Router();
var userDal = require('../dal/users');

router.get('/all', function(req, res) {
  userDal.GetAll(function (err, result) {
        if (err) throw err;
        res.render('users/displayAllUsers.ejs', {rs: result});
      }
  );
});

router.get('/', function (req, res) {
  userDal.GetByID(req.query.user_id,
      function (err, result) {
        if (err) throw err;

        userDal.GetParties(req.query.user_id, function(err, partyResults){

          res.render('users/displayUserInfo.ejs', {
            rs: result,
            user_id: req.query.user_id,
            partyResults: partyResults}
          );

        })

      }
  );
});

router.get('/save', function(req, res, next) {
    console.log("firstname equals: " + req.query.firstname);
    console.log("the lastname submitted was: " + req.query.lastname);
    console.log("the email submitted was: " + req.query.email);
    console.log("the password submitted was: " + req.query.password);
    userDal.Insert(req.query, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the data.");
        }
    });
});
module.exports = router;
