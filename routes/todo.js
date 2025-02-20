const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET /api/get-todo - 获取所有待办事项
router.get('/get-todo', async (req, res) => {
    try {
        // 查询所有待办事项并按创建时间排序
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ message: 'Error fetching todos' });
    }
});

// POST /api/add-todo - 添加新的待办事项
router.post('/add-todo', async (req, res) => {
    try {
        // 验证请求体
        const { value } = req.body;
        if (!value) {
            return res.status(400).json({ message: 'Value is required' });
        }

        // 创建新的待办事项
        const newTodo = new Todo({
            value,
            isCompleted: false
        });

        // 保存到数据库
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        console.error('Error adding todo:', error);
        res.status(500).json({ message: 'Error adding todo' });
    }
});

// POST /api/update-todo/:id - 更新待办事项状态
router.post('/update-todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // 查找并更新待办事项
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // 更新完成状态（取反）
        todo.isCompleted = !todo.isCompleted;
        const updatedTodo = await todo.save();
        
        res.json(updatedTodo);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ message: 'Error updating todo' });
    }
});

// POST /api/del-todo/:id - 删除待办事项
router.post('/del-todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // 查找并删除待办事项
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ message: 'Error deleting todo' });
    }
});

module.exports = router; 