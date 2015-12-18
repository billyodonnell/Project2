var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);


exports.GetAll = function(callback) {
    connection.query('SELECT * FROM location;',
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

exports.Insert = function(location_info, callback) {
    var query_data = [location_info.zip, location_info.street, location_info.city];
    var query = "INSERT INTO location (zip, street, city) VALUES" +
        "(?, ?, ?);";

    console.log(query);

    connection.query(query, query_data, function (err, result) {
        if (err) {
            console.log(err);
            callback(err);
            return;
        }
        else {
            callback(err, result);
        }
    })
};