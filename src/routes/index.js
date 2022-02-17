const express = require('express')
const router = express.Router()

const todos = ["Do home work", "Relax"]

// Home
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Todo App' })
})

module.exports = router
