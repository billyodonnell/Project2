var express = require('express');
var router = express.Router();
var userDal = require('../dal/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.account === undefined) {
      res.render('index');
  }
  else {
    var data = { firstname : req.session.account.firstname };
    res.render('index', data);
  }
});

router.get('/logout', function(req, res) {
  req.session.destroy( function(err) {
    res.render('authentication/logout.ejs');
  });
});

router.get('/authenticate', function(req, res) {
  if (req.session.user == undefined) {

    userDal.GetByEmail(req.query.email, function (err, user) {
      if (err) {
        res.render('authentication/login.ejs', {msg: err});
      }
      else if (user == null) {
        res.render('authentication/login.ejs', {msg: "User not found."});
      }
      else if (user.password != req.query.password)
        res.render('authentication/login.ejs', {msg: "Passwords do not match."});
      else {
        req.session.account = user;
        res.send('User successfully logged in.');
      }
    });
  }
  else {
    res.redirect('/');
  }
});

router.get('/saveUserAjax', function(req, res) {
  res.send('successfully called saveUserAjax');
});

router.get('/signup', function(req, res) {
  res.render('userFormCreate.ejs');
});


router.get('/login', function(req, res) {
    res.render('authentication/login.ejs');
});

module.exports = router;
