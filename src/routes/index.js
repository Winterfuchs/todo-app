const express = require('express')
const router = express.Router()
const fs = require('fs');

const todos = {
  todos: [
    {
      id: 1,
      task: 'Do homework',
    },
    {
      id: 2,
      task: 'Relax',
    }]
}

let todosJSON = getTodoJSON()

/* ------------------------- Routes ------------------------- */
router.get('/', (req, res, next) => {
  todosJSON = getTodoJSON()
  res.render('index', { title: 'Todo App', todos: todosJSON.todos })
})

router.post('/add/todo', (req, res, next) => {
  handleAddTodo(req, res, next);
})

router.post('/delete/todo', (req, res, next) => {
  handleDeleteTodo(req, res, next);
});

/* --------------------------------------------------------- */

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

// Handle the add todo request and add the new todo to the todos.json file
function handleAddTodo(req, res, next) {
  let todosJSON = getTodoJSON();
  let newTodo = req.body;
  let newTodoId = todosJSON.todos.length + 1;
  let newTodoTask = newTodo.task;
  let newTodoObj = {
    id: newTodoId,
    task: newTodoTask
  }
  if (newTodoTask === '') {
    res.redirect('/');
  } else {
    if (todosJSON.todos.some(todo => todo.id === newTodoId)) {
      // Get the id with the highest value and add 1 to it
      let highestId = todosJSON.todos.reduce((acc, curr) => {
        return acc.id > curr.id? acc : curr
      }).id;
      newTodoId = highestId + 1;
      newTodoObj = {
        id: newTodoId,
        task: newTodoTask
      }

      todosJSON['todos'].push(newTodoObj);
      let data = JSON.stringify(todosJSON);
      fs.writeFileSync('todos.json', data);
    } else {
      todosJSON.todos.push(newTodoObj);
      let data = JSON.stringify(todosJSON);
      fs.writeFileSync('todos.json', data);
    }
    res.redirect('/');
  }
}

// Handle the delete todo request and delete the todo from the todos.json file
function handleDeleteTodo(req, res, next) {
  todosJSON = getTodoJSON()
  todosJSON['todos'] = todosJSON['todos'].filter(todo => todo.id!= req.body["id"])
  let data = JSON.stringify(todosJSON);
  fs.writeFileSync('todos.json', data);
  res.redirect("/")
}