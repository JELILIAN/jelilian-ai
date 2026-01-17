# JELILIAN 网站部署指南

## 🚀 快速部署方案

### 方案1: Vercel (推荐 - 免费)
1. 注册 [Vercel](https://vercel.com)
2. 连接GitHub仓库
3. 自动部署，获得 `https://your-site.vercel.app` 域名

### 方案2: Netlify (免费)
1. 注册 [Netlify](https://netlify.com)
2. 拖拽文件夹到网站
3. 获得 `https://your-site.netlify.app` 域名

### 方案3: GitHub Pages (免费)
1. 创建GitHub仓库
2. 上传所有文件
3. 启用Pages功能
4. 获得 `https://username.github.io/repo-name` 域名

### 方案4: Railway (免费额度)
1. 注册 [Railway](https://railway.app)
2. 连接GitHub
3. 自动部署Node.js应用

## 📋 部署前准备

### 需要的文件:
- ✅ 所有HTML文件
- ✅ CSS和JS文件
- ✅ package.json (后端)
- ✅ server.js (后端)

### 环境变量设置:
- `PORT`: 服务器端口
- `NODE_ENV`: production

## 🔧 配置文件

已为你准备好所有配置文件，直接部署即可！