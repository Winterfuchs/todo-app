const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const app = express()
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const todos = {1: "Do home work", 2: "Relax"}

let todosJSON = getTodoJSON()

// Home
router.get('/', (req, res, next) => {
  // Read the todos.json file and give it the view
  todosJSON = getTodoJSON()
  res.render('index', { title: 'Todo App', todos: todosJSON })
})

// Todos
router.post('/todo', (req, res, next) => {
  // Check for the current index in the json file and add one
  var index = Object.keys(todosJSON).length+1;
  // Add the new todo to the json
  todosJSON[index] = req.body["task"];
  // Write the new todo to the json file
  let data = JSON.stringify(todosJSON);
  fs.writeFileSync('todos.json', data);

  console.log(todosJSON)
  res.redirect("/")
})

app.use("/", router);

module.exports = router

// Get the todos.json file and return it as a json object
// If the file doesn't exist, create it
function getTodoJSON() {
  try {
    if (!fs.existsSync('todos.json')) {
      let data = JSON.stringify(todos);
      fs.writeFileSync('todos.json', data);
      let rawdata = fs.readFileSync('todos.json');
      let todosJSON = JSON.parse(rawdata);
      return todosJSON;
    } else {
      let rawdata = fs.readFileSync('todos.json');
      let todosJSON = JSON.parse(rawdata);
      return todosJSON;
    }
  } catch(err) {
    console.error(err)
  }
}
