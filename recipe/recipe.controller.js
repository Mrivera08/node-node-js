const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const recipeService = require('./recipe.service');

// routes

router.get('/', authorize(Role.Admin), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(Role.Admin), createSchema, create);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;


function getAll(req, res, next) {
    recipeService.getAll()
        .then(recipe => res.json(recipe))
        .catch(next);
}


function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        ingredients: Joi.string().required(),
        image: Joi.string().email().required()     
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    accountService.create(req.body)
        .then(account => res.json(account))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schemaRules = {
        name: Joi.string().empty(''),
        description: Joi.string().empty(''),
        ingredients: Joi.string().empty(''),
        image: Joi.string().email().empty('')
  };

}


