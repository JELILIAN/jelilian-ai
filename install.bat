@echo off
echo 🚀 JELILIAN 后端服务器安装脚本
echo.

echo 📦 检查Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 未检测到Node.js，请先安装Node.js
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js已安装
node --version

echo.
echo 📦 安装依赖包...
npm install express cors node-fetch

if %errorlevel% neq 0 (
    echo ❌ 依赖安装失败
    pause
    exit /b 1
)

echo.
echo ✅ 安装完成！
echo.
echo 🚀 启动服务器请运行: npm start
echo 🌐 或直接运行: node server.js
echo 📱 客户端地址: http://localhost:3000/client.html
echo.
pause