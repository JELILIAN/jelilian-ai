# 🚀 JELILIAN AI 配置指南

## 📋 关于网站访问权限

### 当前状态 (http://localhost:3000)
- **仅本机访问**: 只有你的电脑可以访问
- **局域网访问**: 同一WiFi下的设备可以通过你的IP地址访问
- **外网无法访问**: 互联网用户无法直接访问

### 让所有人都能访问的方法

#### 方法1: Vercel部署 (推荐) 🌐
- **全球访问**: https://jelilian-ai.vercel.app
- **免费**: 无需付费
- **自动部署**: GitHub更新后自动部署
- **HTTPS**: 安全连接

#### 方法2: 内网穿透 (临时)
```bash
# 安装ngrok
npm install -g ngrok

# 开放3000端口给全世界
ngrok http 3000
```

#### 方法3: 云服务器 (长期)
- 阿里云ECS
- 腾讯云CVM
- AWS EC2

## 🔑 配置阿里千问API密钥

### 步骤1: 获取API密钥
1. 访问 [阿里云百炼平台](https://bailian.console.aliyun.com/)
2. 登录阿里云账号
3. 进入"API-KEY管理"
4. 创建新密钥并复制

### 步骤2: 配置服务器
编辑 `.env` 文件：
```env
# 替换为你的真实API密钥
QWEN_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxx
DEFAULT_PROVIDER=qwen
ENABLE_API_KEY_INPUT=false
```

### 步骤3: 重启服务器
```bash
npm start
```

## ✅ 配置完成后的效果

- ✅ 用户访问网站无需输入API密钥
- ✅ 直接开始使用AI功能
- ✅ 所有费用由你的API密钥承担
- ✅ 用户体验更流畅

## 🔒 安全提醒

### API密钥安全
- 不要将API密钥提交到GitHub
- 定期检查API使用量和费用
- 考虑设置使用限制

### 访问控制建议
- 监控网站访问量
- 考虑添加用户认证
- 设置API调用频率限制

## 🧪 测试配置

访问测试页面验证配置：
- http://localhost:3000/final-test.html
- 检查"系统配置"是否显示"已配置默认API密钥"

## 📞 技术支持

如果遇到问题：
1. 检查 `.env` 文件是否正确配置
2. 确认API密钥有效且有余额
3. 查看服务器控制台日志
4. 访问测试页面进行诊断

---
*配置完成后，JELILIAN AI将为所有用户提供无缝的AI助手体验*