@echo off
echo ========================================
echo    JELILIAN 一键部署脚本
echo ========================================
echo.

echo 正在检查环境...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 未检测到Node.js，请先安装Node.js
    pause
    exit /b 1
)

echo ✅ Node.js环境正常

echo.
echo 正在安装依赖...
npm install

echo.
echo 正在启动服务器...
echo 🚀 服务器将在 http://localhost:3000 启动
echo 📱 公网访问请使用 public-client.html
echo.
echo 按 Ctrl+C 停止服务器
echo.

npm start