const Pizza = require('../../../models/menu');
const { multipleMongooseToObject, mongooseToObject } = require('../../../until/mongoose');

function FoodController () {
    return {
        show(req, res, next) {
            Pizza.find({})
                .then(pizzas => res.render('admin/pizza', {
                    pizzas: multipleMongooseToObject(pizzas)
                }))
                .catch(next)
        },

        create(req, res, next) {
            res.render('admin/action/create');
        },

        store(req, res, next) {
            const formData = req.body
            const pizzas = new Pizza(formData)
            pizzas.save()
                .then(() => res.redirect('/admin/pizza'))
                .catch((error) => {})
        },

        delete(req, res, next) {
            Pizza.deleteOne({ _id: req.params.id })
                .then(() => res.redirect('back'))
                .catch(next);
        },

        edit(req, res, next) {
            Pizza.findById(req.params.id)
                .then((pizzas) =>
                    res.render('admin/action/edit', {
                        pizzas: mongooseToObject(pizzas),
                    }),
                )
                .catch(next);
        },
    
        // [PUT] /food/:id
        update(req, res, next) {
            Pizza.updateOne({ _id: req.params.id }, req.body)
                .then(() => res.redirect('/admin/stored/pizza'))
                .catch(next);
        },


    }
};

module.exports = FoodController;
