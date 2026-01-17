# 🌐 JELILIAN 公网部署指南

## 🚀 快速部署 (3分钟上线)

### 方法1: Vercel (最推荐)
1. 访问 [vercel.com](https://vercel.com)
2. 用GitHub登录
3. 点击 "New Project"
4. 上传项目文件夹或连接GitHub仓库
5. 自动部署完成！获得 `https://your-site.vercel.app`

### 方法2: Netlify
1. 访问 [netlify.com](https://netlify.com)
2. 拖拽整个项目文件夹到网站
3. 自动部署完成！获得 `https://your-site.netlify.app`

### 方法3: Railway
1. 访问 [railway.app](https://railway.app)
2. 连接GitHub仓库
3. 自动检测Node.js项目并部署

## 📁 需要上传的文件

### 必需文件:
- ✅ `server.js` (后端服务器)
- ✅ `package.json` (依赖配置)
- ✅ `public-client.html` (公网版客户端)
- ✅ `vercel.json` (Vercel配置)
- ✅ `netlify.toml` (Netlify配置)
- ✅ 所有HTML/CSS/JS文件

### 可选文件:
- `client.html` (本地测试版)
- `validate-key.html` (密钥验证工具)
- 其他测试文件

## 🔧 环境变量设置

在部署平台设置以下环境变量:
- `NODE_ENV=production`
- `PORT=3000` (通常自动设置)

## 🌍 访问方式

部署完成后:
1. **主页**: `https://your-domain.com/public-client.html`
2. **API**: `https://your-domain.com/api/chat`
3. **测试**: `https://your-domain.com/validate-key.html`

## 📱 使用说明

1. 用户访问你的网站
2. 输入自己的API密钥 (阿里千问或OpenAI)
3. 开始使用AI功能
4. 所有API调用通过你的服务器，无CORS问题

## 🔒 安全说明

- ✅ API密钥由用户自己提供
- ✅ 服务器不存储任何密钥
- ✅ 所有通信使用HTTPS加密
- ✅ 支持CORS跨域访问

## 💡 推广建议

1. **分享链接**: 直接分享部署后的网址
2. **社交媒体**: 发布到微博、朋友圈等
3. **技术社区**: 分享到GitHub、掘金等
4. **SEO优化**: 添加关键词和描述

## 🆘 常见问题

**Q: 部署后无法访问API?**
A: 检查 `vercel.json` 或 `netlify.toml` 配置是否正确

**Q: 用户反馈API调用失败?**
A: 引导用户检查API密钥格式，使用验证工具

**Q: 如何更新网站?**
A: 重新上传文件或推送到GitHub，自动重新部署

## 📞 技术支持

如需帮助，请检查:
1. 浏览器控制台错误信息
2. 部署平台的构建日志
3. API响应状态码

---

🎉 **恭喜！你的JELILIAN网站即将上线，让全世界都能使用！**