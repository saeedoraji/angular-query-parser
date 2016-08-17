var f = require('faker'),
    _sample = require('./product_schema'),
    fn = require('./fn')
var vendorOwner = '56a266a4676494e5c7068363';
f.vendor = () => new require('mongodb').ObjectID(vendorOwner)
f.random.my = {
    collection_name: () => '',
    shape_name: () => '',
    vendor_type: () => '',
    //design_name: () => '',
    vendor_style: () => '',
    vendor_category: () => '',
    category: () => '',
    category1: () => '',
    image: () => '',
    categoryOwner: () => '',
    vendor_color: () => '',
    vendor_size: () => '',
    features: () => []
}
var requestLength = Object.keys(f.random.my).length, start = 0, products = [], total = 0;
var creator = new fn()

function loop() {
    start = 0;

    creator.connect().then( () => {
        creator.find('vendorproduct', { vendorOwner : new require('mongodb').ObjectID(vendorOwner) }, total)
        .then( list => {
            creator.collection_name(list).then( collection_name => {
                f.random.my.collection_name = () => collection_name || '';
                start++;
                createSample(start, requestLength)

            });

            creator.shape_name(list).then( shape_name => {
                f.random.my.shape_name = () => shape_name || '';
                start++;
                createSample(start, requestLength)

            });
            creator.vendor_type(list).then( vendor_type => {
                f.random.my.vendor_type = () => vendor_type || '';
                start++;
                createSample(start, requestLength)

            });
            creator.vendor_style(list).then( vendor_style => {
                f.random.my.vendor_style = () => vendor_style || '';
                start++;
                createSample(start, requestLength)

            });
            creator.vendor_category(list).then( vendor_category => {
                f.random.my.vendor_category = () => vendor_category || '';
                start++;
                createSample(start, requestLength)

            });
            creator.category(list).then( category => {
                f.random.my.category = () => category || '';
                start++;
                createSample(start, requestLength)

            });
            creator.category1(list).then( category1 => {
                f.random.my.category1 = () => category1 || '';
                start++;
                createSample(start, requestLength)

            });

            creator.categoryOwner(list).then( category => {
                f.random.my.categoryOwner = () => category.categoryOwner;
                f.random.my.vendorCategoryOwner = () => category.vendorCategoryOwner;
                start++;

                creator.image(list, category.vendorCategoryOwner).then( image => {
                    f.random.my.image1 = () => image.image1;
                    f.random.my.image2 = () => image.image2;
                    start++;
                    createSample(start, requestLength)

                });

                createSample(start, requestLength)

            });

            creator.vendor_color(list).then( vendor_color => {
                f.random.my.vendor_color = () => vendor_color || '';
                start++;
                createSample(start, requestLength)

            });

            creator.vendor_size(list).then( vendor_size => {
                f.random.my.vendor_size = () => vendor_size || '';
                start++;
                createSample(start, requestLength)

            });

            creator.features(list).then( features => {
                f.random.my.features = () => features || [];
                start++;
                createSample(start, requestLength)
            });

        })

    })
}
loop();
function createSample(start, requestLength) {
    if (start >= requestLength) {
        sample = clone(_sample)
        sample.image_filename_D[0].img = eval(sample.image_filename_D[0].img)
        sample.images[0].name = eval(sample.images[0].name)
        sample.additionalImages[0].name = eval(sample.additionalImages[0].name)
        sample.additionalImages[1].name = eval(sample.additionalImages[1].name)
        for (var i in sample) {
            if (typeof sample[i] != 'object') {
                sample[i] = eval(sample[i]);
            }
        }
        products.push(sample)
        total++;
        console.log(products.length)
        if (products.length <= 500)
            loop();
        else {
            console.log('product length', products.length)
            insertToDB(products);
        }

    }
}

function insertToDB() {
    var creator = new fn()
    creator.connect().then( () => {
        creator.insert('vendorproduct', products)
        .then( () => {
            products = [];
            console.log(total, 'is total')
            if (total < 1000000)
                loop();
        });
    });
}

function clone(obj) {
    var copy;

    if (null == obj || "object" != typeof obj) return obj;

    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }
}
