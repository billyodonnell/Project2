var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetByEmail = function(email, callback) {
    var query = 'CALL User_GetByEmail(?)';
    var query_data = [email];
    connection.query(query, query_data, function(err, result) {
        if(err){
            callback(err, null);
        }
        else if(result[0].length == 1) {
            callback(err, result[0][0]);
        }
        else {
            callback(err, null);
        }
    });
 }



exports.GetAll = function(callback) {
    connection.query('SELECT * FROM users;',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
};


exports.GetByID = function(user_id, callback) {
    console.log(user_id);
    var query = 'SELECT * FROM users WHERE user_id=' + user_id;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
};

exports.Insert = function(user_info, callback) {
    console.log(user_info);

    var dynamic_query = 'INSERT INTO users (firstname, lastname, email, password) VALUES (' +
        '\'' + user_info.firstname + '\', ' +
        '\'' + user_info.lastname + '\', ' +
        '\'' + user_info.email + '\', ' +
        '\'' + user_info.password + '\'' +
        ');';

    console.log("test");
    console.log(dynamic_query);

    connection.query(dynamic_query,
        function (err, result) {
            if(err) {

                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.GetParties = function(user_id, callback){
    console.log(user_id);

    var query = 'SELECT * FROM user_parties WHERE user_id = ' + user_id;

    connection.query(query, function(err, result){
        callback(err, result);
    })
}