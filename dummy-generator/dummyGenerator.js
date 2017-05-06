var faker = require('faker');

module.exports = function(mongooseObject, quantity) {
    var ignore = ['__v', '_id'];
    var paths = mongooseObject ? mongooseObject.schema.paths : {username:'String', cash:'Number', dateCreated:'Date'};
    var properties = Object.keys(paths);

    var items = [];
    
    for(var i = 0; i < quantity; i++) {
        var item = {};

        properties.forEach(function(property) {
            var instance = paths[property].instance || paths[property];
            if (ignore.indexOf(property) < 0) {
                // IF BOOLEAN
                if (instance === 'Boolean')
                    item[property] = fake('random.boolean');
                // IF NUMBER
                if (instance === 'Number')
                    item[property] = fake('random.number')
                // IF STRING
                if (instance === 'String')
                    item[property] = fake('random.words')
                // IF DATE
                if (instance === 'Date') {
                    item[property] = fake('date.future');
                }
            }
        });
        items.push(item);
    }
    
    return items;
}

function fake(item) {
    return faker.fake('{{' + item + '}}');
}