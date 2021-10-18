const Pizza = require('../../../models/menu');
const { multipleMongooseToObject } = require('../../../until/mongoose');

function AdminController () {
    return {
        // [GET] /stored/pizza
        show(req, res, next) {
            Pizza.find({})
                .then(pizzas => res.render('admin/pizza', {
                    pizzas: multipleMongooseToObject(pizzas)
                }))
                .catch(next)
        },


    }
};

module.exports = AdminController;
