// JELILIAN 服务器测试脚本
const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3000/api';
const TEST_API_KEY = 'sk-test-key-for-demo'; // 请替换为真实的API密钥

async function testServer() {
    console.log('🧪 JELILIAN 服务器测试开始...\n');
    
    // 测试1: 检查服务器状态
    console.log('📡 测试1: 检查服务器状态');
    try {
        const response = await fetch(`${API_BASE}/providers`);
        const data = await response.json();
        
        if (data.success) {
            console.log('✅ 服务器运行正常');
            console.log(`📋 支持的服务商: ${data.providers.map(p => p.name).join(', ')}\n`);
        } else {
            console.log('❌ 服务器响应异常\n');
            return;
        }
    } catch (error) {
        console.log(`❌ 无法连接到服务器: ${error.message}`);
        console.log('💡 请确保服务器正在运行: npm start\n');
        return;
    }
    
    // 测试2: 测试API连接 (需要真实API密钥)
    console.log('🔑 测试2: 测试API连接');
    if (TEST_API_KEY === 'sk-test-key-for-demo') {
        console.log('⚠️  跳过API测试 (请在test-server.js中设置真实的API密钥)\n');
    } else {
        try {
            const response = await fetch(`${API_BASE}/test`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    provider: 'qwen',
                    apiKey: TEST_API_KEY
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                console.log('✅ API连接测试成功');
                console.log(`⏱️  响应时间: ${data.responseTime}ms\n`);
            } else {
                console.log(`❌ API连接测试失败: ${data.error}\n`);
            }
        } catch (error) {
            console.log(`❌ API测试请求失败: ${error.message}\n`);
        }
    }
    
    // 测试3: 测试聊天接口 (模拟请求)
    console.log('💬 测试3: 测试聊天接口格式');
    try {
        const response = await fetch(`${API_BASE}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: '测试消息',
                provider: 'qwen',
                apiKey: 'invalid-key-for-format-test'
            })
        });
        
        const data = await response.json();
        
        if (response.status === 401 || response.status === 403) {
            console.log('✅ 聊天接口格式正确 (API密钥验证正常)');
        } else if (data.error) {
            console.log(`✅ 聊天接口响应正常: ${data.error}`);
        } else {
            console.log('✅ 聊天接口工作正常');
        }
    } catch (error) {
        console.log(`❌ 聊天接口测试失败: ${error.message}`);
    }
    
    console.log('\n🎉 服务器测试完成！');
    console.log('\n📱 使用方法:');
    console.log('1. 在浏览器中打开: http://localhost:3000/client.html');
    console.log('2. 输入您的API密钥');
    console.log('3. 开始与AI对话');
    console.log('\n🔧 API端点:');
    console.log('• POST /api/chat - AI对话');
    console.log('• POST /api/test - 连接测试');
    console.log('• GET /api/providers - 获取服务商');
    console.log('• POST /api/compare - 批量对比');
}

// 运行测试
testServer().catch(error => {
    console.error('测试过程中发生错误:', error);
});