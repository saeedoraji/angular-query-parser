'use strict';
var mongojs = require('mongojs')
var db = mongojs('rmi_server_test')
module.exports = class core {
    static getCollections() {
        return new Promise( resolve => {
            db.getCollectionNames((err, collections) => {
                var collectionObject = {};
                for (var collection of collections) {
                    collectionObject[collection] = db.collection(collection);
                }
                resolve(collectionObject)
            })
        })
    }
}
