
var dbManager = function (dbname) {
    var dbase = new Object();
    var mongoModule = require('mongoDb');

    // create the mongo Client 
    var mongoClient = mongoModule.MongoClient;
    // provide with url :  ie where our db is existing
    var url = 'mongodb:localhost/' + dbname;

    // Connect to db
    this.connect = function () {
        mongoClient.connect(url, function (err, db) {
            if (err) throw new Error('DB connectivity problem');
            console.log('Db connected');
            // Database referrence/ instance pointing to the database called dBmane
            dbase = db;
        });
    };
    // Fetch records from Db
    this.fetchDoc = function (tableName) {
        // cursor will be fetching the entire data
        var cursor = dbase.collection(tableName).find();
        // Interating through every row of the table
        cursor.each(function (err, doc) {
            console.log('retrieving docs', doc)
        })
    };
    this.insertDoc = function (tableName, item) {
        // item :   {uId: userId, uName: name, email: emValue}
        dbase.collection(tableName).insertOne(item);
    };
    this.updateDoc = function (tableName, fieldToUpdate, oldValue, updatedValue) {
        /**
         * 
        { "EmployeeName": "Soumya"},
         {
           $set: {
                 "EmployeeName": "Mohan"
                }
          }
         */
        dbase.collection(tableName).updateOne({fieldToUpdate : oldValue }, { $set: {fieldToUpdate: updatedValue} });
    };
     this.deleteDoc = function (tableName, fieldToDelete, valueToDelete) {
        dbase.collection(tableName).updateOne({fieldToDelete : valueToDelete});
    };

}

module.exports = dbManager;
