const Pizza = require('../../../models/menu');
const { mongooseToObject, multipleMongooseToObject } = require('../../../until/mongoose');

function FoodController () {
    return {
        create(req, res, next) {
            res.render('food/create');
        },

        store(req, res, next) {
            const formData = req.body
            const pizzas = new Pizza(formData)
            pizzas.save()
                .then(() => res.redirect('/admin/stored/pizza'))
                .catch((error) => {})
        },

        // [GET] /food/:id/edit
        edit(req, res, next) {
            Pizza.findById(req.params.id)
                .then((pizzas) =>
                    res.render('food/edit', {
                        pizzas: mongooseToObject(pizzas),
                    }),
                )
                .catch(next);
        },
        
        delete(req, res, next) {
            Pizza.deleteOne({ _id: req.params.id })
                .then(() => res.redirect('/admin/stored/pizza'))
                .catch(next);
        },

        update(req, res, next) {
            Pizza.updateOne({ _id: req.params.id }, req.body)
                .then(() => res.redirect('/admin/stored/pizza'))
                .catch(next);
        },


    }
};

module.exports = FoodController;
