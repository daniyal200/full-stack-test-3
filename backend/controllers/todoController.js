const Todo = require('../models/todoModel');
const asyncHandler = require('express-async-handler');

const getCompletedTodos = asyncHandler(async( req,res ) =>{
    const todos = await Todo.find({completed: true});
    if(!todos){
        res.status(404);
        res.send({ message: 'No todos found'})
    } else{
        res.send(todos);
    }
});

const getIncompleteTodos = asyncHandler(async( req,res ) =>{
    const todos = await Todo.find({completed: false});
    if(!todos){
        res.status(404);
        res.send({ message: 'No todos found'})
    } else{
        res.send(todos);
    }
});

const createTodo = asyncHandler(async( req,res ) =>{
    const { title, description } = req.body;
    if(!title || !description){
        res.status(400);
        throw new Error('Please enter all fields');
    }

    const todo = await Todo.create({
        title ,
        description,
     });
    res.status(201).json(todo).send({ message: 'Todo added successfully' });
});

const updateTodo = asyncHandler(async( req,res ) =>{
    const { title, description, completed } = req.body;
    const todo = await Todo.findById(req.params.id);
    if(!todo){
        res.status(404);
        throw new Error('Todo not found');
    }
    todo.title = title;
    todo.description = description;
    todo.completed = completed;
    const updatedTodo = await todo.save();
    res.send(updatedTodo);
});

const deleteTodo = asyncHandler(async( req,res ) =>{
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.json(todo).send({ message: 'Todo removed' });
    if(!todo){
        res.status(404);
        throw new Error('Todo not found');
    }
    
}
);

module.exports = {
    getCompletedTodos,
    getIncompleteTodos,
    createTodo,
    updateTodo,
    deleteTodo
}

