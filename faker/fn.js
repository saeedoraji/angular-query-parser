'use strict';
var core = require('./core'),
    f = require('faker'),
    util = require('./util');
module.exports = class fn {
    connect() {
        return new Promise( resolve => {
            if (this.db) return resolve(this.db)
            core.getCollections()
            .then( db => {
                this.db = db;
                resolve(db);
            })
        })
    }
    find(collection, condition, len) {

        return new Promise( resolve => {
            if (len % 10000 && len > 0) return resolve(this.list)
            this.db[collection].find(condition).skip(parseInt(f.random.number().toString().slice(0, 3))).limit(1000, (err, list) => {
                console.log(list.length, 'list length')
                this.list = list;
                resolve(list);
            })
        })
    }

    insert(collection, list) {
        return new Promise( resolve => {
            this.db[collection].insert(list, (err, lists) => {
                resolve(list);
            })
        })
    }
    collection_name(list) {
        return new Promise( resolve => {
            var result = [];
            list = list.map( item => item.collection_name)
            list.forEach( item =>{
                if (result.filter( fitem => fitem[0] == item).length == 0 )
                    result.push([ item, list.filter( fitem => fitem == item).length ])
            });
            if (f.random.number() % 3) {
                resolve(util.generateRandomWeighted(result)[0])
            } else {
                resolve(f.random.word())
            }
        })
    }

    shape_name(list) {
        return new Promise( resolve => {
            var result = [];
            list = list.map( item => item.shape_name)
            list.forEach( item =>{
                if (result.filter( fitem => fitem[0] == item).length == 0 )
                    result.push([ item, list.filter( fitem => fitem == item).length ])
            });
            if (f.random.number() % 3) {
                resolve(util.generateRandomWeighted(result)[0])
            } else {
                resolve(f.random.word())
            }
        })
    }
    design_name(list) {
        return new Promise( resolve => {
            var result = [];
            list = list.map( item => item.design_name)
            list.forEach( item =>{
                if (result.filter( fitem => fitem[0] == item).length == 0 )
                    result.push([ item, list.filter( fitem => fitem == item).length ])
            });
            if (f.random.number() % 3) {
                resolve(util.generateRandomWeighted(result)[0])
            } else {
                resolve(f.random.word())
            }
        })
    }

    vendor_type(list) {
        return new Promise( resolve => {
            var result = [];
            list = list.map( item => item.vendor_type)//.filter( item => !item.vendor_type)
            list.forEach( item =>{
                if (result.filter( fitem => fitem[0] == item).length == 0 )
                    result.push([ item, list.filter( fitem => fitem == item).length ])
            });
            if (f.random.number() % 3) {
                resolve(util.generateRandomWeighted(result)[0])
            } else {
                resolve(f.random.word())
            }
        })
    }
    vendor_style(list) {
        return new Promise( resolve => {
            var result = [];
            list = list.map( item => item.vendor_style)
            list.forEach( item =>{
                if (result.filter( fitem => fitem[0] == item).length == 0 )
                    result.push([ item, list.filter( fitem => fitem == item).length ])
            });
            if (f.random.number() % 3) {
                resolve(util.generateRandomWeighted(result)[0])
            } else {
                resolve(f.random.word())
            }
        })
    }
    vendor_category(list) {
        return new Promise( resolve => {
            var result = [];
            list = list.map( item => item.vendor_category)
            list.forEach( item => {
                if (result.filter( fitem => fitem[0] == item).length == 0 )
                    result.push([ item, list.filter( fitem => fitem == item).length ])
            });
            resolve(util.generateRandomWeighted(result)[0])
        })
    }
    category(list) {
        return new Promise( resolve => {
            resolve(f.random.word())
        })
    }
    category1(list) {
        return new Promise( resolve => {
            resolve(f.random.word())
        })
    }
    image(list, vendorCategoryOwner) {
        return new Promise( resolve => {
            var result = [];
            list = list.filter( item => item.vendorCategoryOwner[0].toString() == vendorCategoryOwner[0].toString()).map( item => item.images)
            list.forEach( item => {
                result.push([ item, list.filter( fitem => fitem == item).length ])
            });
            resolve({ image1: util.generateRandomWeighted(result)[0][0].name, image2: util.generateRandomWeighted(result)[0][0].name })
        })
    }

    categoryOwner(list) {
        return new Promise( resolve => {
            var result = [];
            list = list.map( item => {
                return {categoryOwner: item.categoryOwner, vendorCategoryOwner: item.vendorCategoryOwner}
            })

            list.forEach( item => {
                result.push([ item, list.filter( fitem => fitem == item).length ])
            });
            resolve(util.generateRandomWeighted(result)[0])
        })
    }

    vendor_color(list) {
        return new Promise( resolve => {
            var result = [];
            list = list.map( item => item.vendor_color)
            list.forEach( item =>{
                if (result.filter( fitem => fitem[0] == item).length == 0 )
                    result.push([ item, list.filter( fitem => fitem == item).length ])
            });
            if (f.random.number() % 3) {
                resolve(util.generateRandomWeighted(result)[0])
            } else {
                resolve(f.commerce.color())
            }
        })
    }

    vendor_size(list) {
        return new Promise( resolve => {
            var result = [];
            list = list.map( item => item.vendor_size).filter( item => item && item != '')
            list.forEach( item => {
                if (result.filter( fitem => fitem[0] == item).length == 0 )
                    result.push([ item, list.filter( fitem => fitem == item).length ])
            });
            resolve(util.generateRandomWeighted(result)[0])
        })
    }

    features(list) {
        return new Promise( resolve => {
            var result = [];
            list = list.map( item => item.features)
            list.forEach( item => {
                if (result.filter( fitem => fitem[0] == item).length == 0 )
                    result.push([ item, list.filter( fitem => fitem == item).length ])
            });
            resolve(util.generateRandomWeighted(result)[0])
        })
    }
}
