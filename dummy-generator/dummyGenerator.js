var random = require('random-js')();
var lorem = require('lorem-ipsum');

module.exports = function(mongooseObject, quantity) {
    var ignore = ['__v', '_id'];
    var paths = mongooseObject.schema.paths;
    var properties = Object.keys(paths);

    var items = [];

    for(var i = 0; i < quantity; i++) {
        var item = {};

        properties.forEach(function(property) {
            var instance = paths[property].instance;
            if (ignore.indexOf(property) < 0) {
                // IF BOOLEAN
                if (instance === 'Boolean')
                    item[property] = random.bool();
                // IF NUMBER
                if (instance === 'Number')
                    item[property] = random.real(0, 1);
                // IF STRING
                if (instance === 'String')
                    item[property] = lorem({units: 'words', count: 2, format: 'plain'});
                // IF DATE
                if (instance === 'Date') {
                    var start = new Date();
                    var numberOfDaysToAdd = 6;
                    var end = new Date(start.getDate() + numberOfDaysToAdd); 

                    item[property] = random.date(start, end).toDateString();
                }
            }
        });
        items.push(item);
    }
    
    return items;
}