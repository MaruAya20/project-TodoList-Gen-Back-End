// 导入必要的模块
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// 创建 Express 应用实例
const app = express();

// 配置中间件
app.use(cors()); // 启用 CORS
app.use(bodyParser.json()); // 解析 JSON 请求体
app.use(bodyParser.urlencoded({ extended: true })); // 解析 URL 编码的请求体

// 连接到 MongoDB 数据库
mongoose.connect('mongodb://root:nsncv227@flandre01-db-mongodb.ns-fuzclk5m.svc:27017/todolist?authSource=admin', {
    serverSelectionTimeoutMS: 5000, // 超时时间设置为 5 秒
    socketTimeoutMS: 45000,         // Socket 超时时间
    connectTimeoutMS: 10000,        // 连接超时时间
})
.then(() => {
    console.log('Successfully connected to MongoDB.');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});

// 添加 mongoose 连接监听
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});


// 导入路由
const todoRoutes = require('./routes/todo');

// 使用路由
app.use('/api', todoRoutes);

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 