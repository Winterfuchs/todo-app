const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const app = express()
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const todos = {1: "Do home work", 2: "Relax"}

// I know this will overwrite the file everytime you start the server but I think
// it's fine for this example
let data = JSON.stringify(todos);
fs.writeFileSync('todos.json', data);

let rawdata = fs.readFileSync('todos.json');
let todo = JSON.parse(rawdata);

// Home
router.get('/', (req, res, next) => {
  let rawdataRead = fs.readFileSync('todos.json');
  let todos = JSON.parse(rawdataRead);
  res.render('index', { title: 'Todo App', todos: todos })
})

// Todos
router.post('/todo', (req, res, next) => {
  // check for the current index in the json file and add one
  var index = Object.keys(todo).length+1;
  // add the new todo to the json file
  todo[index] = req.body["task"];
  // write the new todo to the json file
  data = JSON.stringify(todo);
  fs.writeFileSync('todos.json', data);

  console.log(todo)
  res.redirect("/")
})

app.use("/", router);

module.exports = router
