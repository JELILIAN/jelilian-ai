# 🚀 JELILIAN AI - 重新部署指南

## 📊 当前状态
- ✅ 代码已更新到GitHub
- ✅ 配置已优化
- ✅ 准备重新部署

## 🎯 重新部署选项

### 选项1: 使用新项目名 (推荐)

1. **访问**: https://vercel.com/new
2. **导入仓库**: `JELILIAN/jelilian-ai-assistant`
3. **项目名称**: `jelilian-ai-2025` (新名称，避免冲突)
4. **点击Deploy**

### 选项2: 删除旧项目重新部署

1. **访问Vercel Dashboard**: https://vercel.com/dashboard
2. **找到**: `jelilian-smart-ai` 项目
3. **删除项目**: Settings → Advanced → Delete Project
4. **重新部署**: 使用相同名称 `jelilian-smart-ai`

### 选项3: 强制重新部署

1. **访问项目**: https://vercel.com/dashboard
2. **找到**: `jelilian-smart-ai`
3. **Deployments页面**: 点击最新部署
4. **点击**: "Redeploy" 按钮

## 🔧 优化的配置

新的 `vercel.json` 配置：

```json
{
  "name": "jelilian-ai-2025",
  "functions": {
    "api/chat.js": {
      "runtime": "@vercel/node@3",
      "maxDuration": 30
    },
    "api/config.js": {
      "runtime": "@vercel/node@3"
    },
    "api/usage.js": {
      "runtime": "@vercel/node@3"
    }
  },
  "env": {
    "QWEN_API_KEY": "sk-bddda4e9e2ef4aa5acdb773207ac4036",
    "DEFAULT_PROVIDER": "qwen",
    "ENABLE_API_KEY_INPUT": "false",
    "NODE_ENV": "production"
  }
}
```

## 🌐 部署后的访问地址

### 如果使用新项目名:
- **主站**: https://jelilian-ai-2025.vercel.app
- **API测试**: https://jelilian-ai-2025.vercel.app/api/config
- **简单测试**: https://jelilian-ai-2025.vercel.app/simple-test.html

### 如果保持原名:
- **主站**: https://jelilian-smart-ai.vercel.app
- **API测试**: https://jelilian-smart-ai.vercel.app/api/config
- **简单测试**: https://jelilian-smart-ai.vercel.app/simple-test.html

## 🧪 部署后测试步骤

### 1. 基础测试
访问主页，确认页面正常显示

### 2. API测试
访问 `/api/config`，应该返回JSON配置信息

### 3. 功能测试
- 访问 `/simple-test.html`
- 点击"测试API"按钮
- 点击"测试AI聊天"按钮

### 4. 完整测试
- 在主页输入"你好"
- 点击发送按钮
- 应该收到AI回复

## 🔍 如果仍有问题

### 检查Vercel部署日志
1. 访问Vercel项目页面
2. 点击最新的部署
3. 查看"Function Logs"
4. 寻找错误信息

### 常见问题解决
1. **API 404错误**: 检查函数是否正确部署
2. **环境变量错误**: 确认API密钥设置正确
3. **超时错误**: 检查API调用是否正常

## 📞 推荐行动

**我建议使用选项1 - 新项目名部署**:

1. 访问: https://vercel.com/new
2. 导入: `JELILIAN/jelilian-ai-assistant`
3. 项目名: `jelilian-ai-2025`
4. 部署完成后测试功能

这样可以避免旧配置的干扰，确保全新的部署环境。

---

**🚀 选择一个选项开始重新部署吧！**

*部署完成后，请告诉我测试结果！*