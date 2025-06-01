#!/usr/bin/env node

const fs = require('fs');
const modelName = process.argv[2];

if (!modelName) {
  console.error('❌  Model name is required!');
  process.exit(1);
}

const name = modelName.toLowerCase();
const pascal = modelName.charAt(0).toUpperCase() + modelName.slice(1);

// Controller
fs.writeFileSync(`src/controllers/${name}.controller.js`, `
// ${pascal} Controller
exports.create${pascal} = (req, res) => {};
exports.getAll${pascal}s = (req, res) => {};
exports.get${pascal}ById = (req, res) => {};
exports.update${pascal} = (req, res) => {};
exports.delete${pascal} = (req, res) => {};
`);

// Route
fs.writeFileSync(`src/routes/${name}.routes.js`, `
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/${name}.controller');

router.post('/', ctrl.create${pascal});
router.get('/', ctrl.getAll${pascal}s);
router.get('/:id', ctrl.get${pascal}ById);
router.put('/:id', ctrl.update${pascal});
router.delete('/:id', ctrl.delete${pascal});

module.exports = router;
`);

console.log(`✅  CRUD for "${modelName}" generated!`);
