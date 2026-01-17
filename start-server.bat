@echo off
echo 🚀 启动JELILIAN后端服务器
echo.

echo 📦 检查依赖...
if not exist "node_modules" (
    echo ❌ 依赖未安装，正在安装...
    npm install express cors node-fetch
)

echo.
echo 🚀 启动服务器...
echo 📍 服务器地址: http://localhost:3000
echo 📱 客户端地址: http://localhost:3000/client.html
echo 🔧 API地址: http://localhost:3000/api
echo.
echo 按 Ctrl+C 停止服务器
echo.

node server.js