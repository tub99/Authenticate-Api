function MongooseDbManager(dbname) {
    var dbase = new Object();
    var mongooseModule = require('mongoose');
    // provide with url :  ie where our db is existing
    var url = 'mongodb://' + 'localhost/' + dbname;

    // Connect to db
    this.connect = function () {
        var resolve, reject,
            connectPromise = new Promise(function (res, rej) {
                resolve = res;
                reject = rej;
            });
        if(global.isConnected) {
             resolve(true);
        }    
        var that = this;
        mongooseModule.connect(url, function (err) {
            if (err) reject(false);
            console.log('Db connected');
            // Database referrence/ instance pointing to the database called dBmane
            global.isConnected = true;
            resolve(true);
        });
        return connectPromise;
    };
    // Fetch records from Db
    this.fetchDoc = function (Model, paramsObj) {
        var resolve, reject,
            fetchPromise = new Promise(function (res, rej) {
                resolve = res;
                reject = rej;
            });
        var model;
        // if (paramsObj) {
        //     model = new Model(paramsObj);
        // } else {
        //     model = new Model();
        // }
        Model.find({}, function (err, docs) {
            if (err) {
                reject(false);
            }
            console.log('this fires after the post find hook', docs);
            resolve(docs);
        });
        return fetchPromise;
    };
    this.insertDoc = function (Model, item) {
        var resolve, reject,
            insertPromise = new Promise(function (res, rej) {
                resolve = res;
                reject = rej;
            });
        var model = new Model(item);
        model.save(function (err) {
            if (err) reject(err);
            console.log('this fires after the `post` hook');
            resolve(true);
        });
        return insertPromise;

    };
    this.updateDoc = function (tableName, fieldToUpdate, oldValue, updatedValue) {


    };
    this.deleteDoc = function (tableName, fieldToDelete, valueToDelete) {
        dbase.collection(tableName).updateOne({
            fieldToDelete: valueToDelete
        });
    };

}

module.exports = MongooseDbManager;