const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const db = require('_helpers/db');


module.exports = {
   
    getrecipe,
    getAll,
    getByName,
    delete: _delete
};

async function getAll() {
    const recipe = await db.recipe.findAll();
    return recipe.map(x => basicDetails(x));
}

async function getByName(name) {
    const recipe = await getRecipe(name);
    return basicDetails(recipe);
}

async function _delete(name) {
    const recipe = await getrecipe(name);
    await recipe.destroy();
}


