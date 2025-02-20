const mongoose = require('mongoose');

// 定义 Todo 模型的架构
const todoSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true // 设置为必填字段
    },
    isCompleted: {
        type: Boolean,
        default: false // 设置默认值为 false
    }
}, {
    timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
    collection: 'list' // 指定集合名为 'list'
});

// 导出 Todo 模型
module.exports = mongoose.model('Todo', todoSchema); 