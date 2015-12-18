var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM PartyLocationView;',
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

exports.GetByID = function(party_id, callback) {
    console.log(party_id);
    var query = 'SELECT * FROM parties WHERE party_id=' + party_id;
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

exports.Insert = function(party_info, callback) {
    var query_data = [party_info.title, party_info.num_guests, party_info.party_start,
        party_info.party_end, party_info.host_id];
    var query = "INSERT INTO parties (title, num_guests, party_start, party_end, host_id) VALUES" +
        "(?, ?, ?, ?, ?);";

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

exports.GetPartyGuests = function(party_id, callback){
    console.log(party_id);

    var query = 'SELECT * FROM PartyGuestView WHERE party_id = ' + party_id;

    connection.query(query, function(err, result){
        callback(err, result);
    })
};

exports.GetTotal = function(callback){
    var query = 'SELECT * FROM NumGuestPartyView;';
    connection.query(query, function(err, result){
        callback(err, result);
    })
};

exports.GetAvg = function(callback) {
    var query = 'SELECT TotalGuests / TotalParties FROM (SELECT sum(num_guests) as TotalGuests, ' +
        'COUNT(party_id) as TotalParties from parties) as AverageGuests;'
    connection.query(query, function(err, result){
        callback(err, result);
    })
};

exports.GetHost = function(party_id, callback){
    console.log(party_id);

    var query = 'SELECT * FROM PartyHostView WHERE party_id = ' + party_id;

    connection.query(query, function(err, result){
        callback(err, result);
    })
};