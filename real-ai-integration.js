// 真实AI集成示例 - 支持多个AI服务商

class RealAIIntegration {
    constructor() {
        this.apiKeys = {
            openai: 'your-openai-api-key',
            qwen: 'your-qwen-api-key',
            claude: 'your-claude-api-key'
        };
        
        this.endpoints = {
            openai: 'https://api.openai.com/v1/chat/completions',
            qwen: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
            claude: 'https://api.anthropic.com/v1/messages'
        };
        
        this.currentProvider = 'openai'; // 默认使用OpenAI
    }
    
    // OpenAI GPT调用
    async callOpenAI(message, options = {}) {
        try {
            const response = await fetch(this.endpoints.openai, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKeys.openai}`
                },
                body: JSON.stringify({
                    model: options.model || 'gpt-4',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are JELILIAN, an AI assistant that helps users build websites, create content, and solve problems. Respond in Chinese.'
                        },
                        {
                            role: 'user',
                            content: message
                        }
                    ],
                    max_tokens: options.maxTokens || 2000,
                    temperature: options.temperature || 0.7
                })
            });
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error.message);
            }
            
            return {
                success: true,
                text: data.choices[0].message.content,
                model: options.model || 'gpt-4',
                tokens: data.usage.total_tokens,
                provider: 'openai'
            };
            
        } catch (error) {
            console.error('OpenAI API Error:', error);
            return {
                success: false,
                error: error.message,
                provider: 'openai'
            };
        }
    }
    
    // 阿里千问调用 - 修复版本
    async callQwen(message, options = {}) {
        try {
            // 阿里千问的正确端点和格式
            const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKeys.qwen}`,
                    'X-DashScope-SSE': 'disable'
                },
                body: JSON.stringify({
                    model: options.model || 'qwen-turbo',
                    input: {
                        messages: [
                            {
                                role: 'system',
                                content: '你是JELILIAN，一个帮助用户构建网站、创作内容和解决问题的AI助手。请用中文回复。'
                            },
                            {
                                role: 'user',
                                content: message
                            }
                        ]
                    },
                    parameters: {
                        result_format: 'message',
                        max_tokens: options.maxTokens || 1500,
                        temperature: options.temperature || 0.8,
                        top_p: 0.8
                    }
                })
            });
            
            const data = await response.json();
            
            // 详细的错误处理
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${data.message || '请求失败'}`);
            }
            
            if (data.code && data.code !== '200') {
                throw new Error(`API错误 ${data.code}: ${data.message}`);
            }
            
            // 检查响应格式
            if (!data.output || !data.output.choices || !data.output.choices[0]) {
                throw new Error('API响应格式错误');
            }
            
            return {
                success: true,
                text: data.output.choices[0].message.content,
                model: options.model || 'qwen-turbo',
                tokens: data.usage ? data.usage.total_tokens : 0,
                provider: 'qwen'
            };
            
        } catch (error) {
            console.error('Qwen API Error:', error);
            
            // 更详细的错误信息
            let errorMessage = error.message;
            if (error.message.includes('401')) {
                errorMessage = 'API密钥无效或已过期';
            } else if (error.message.includes('403')) {
                errorMessage = 'API密钥权限不足';
            } else if (error.message.includes('429')) {
                errorMessage = 'API调用频率超限';
            } else if (error.message.includes('CORS')) {
                errorMessage = '跨域请求被阻止，请在服务器环境中运行';
            }
            
            return {
                success: false,
                error: errorMessage,
                provider: 'qwen',
                originalError: error.message
            };
        }
    }
    
    // Claude调用
    async callClaude(message, options = {}) {
        try {
            const response = await fetch(this.endpoints.claude, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKeys.claude,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: options.model || 'claude-3-sonnet-20240229',
                    max_tokens: options.maxTokens || 2000,
                    messages: [
                        {
                            role: 'user',
                            content: `你是JELILIAN，一个帮助用户构建网站、创作内容和解决问题的AI助手。用户问题：${message}`
                        }
                    ]
                })
            });
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error.message);
            }
            
            return {
                success: true,
                text: data.content[0].text,
                model: options.model || 'claude-3-sonnet-20240229',
                tokens: data.usage.input_tokens + data.usage.output_tokens,
                provider: 'claude'
            };
            
        } catch (error) {
            console.error('Claude API Error:', error);
            return {
                success: false,
                error: error.message,
                provider: 'claude'
            };
        }
    }
    
    // 统一调用接口
    async chat(message, options = {}) {
        const provider = options.provider || this.currentProvider;
        
        switch (provider) {
            case 'openai':
                return await this.callOpenAI(message, options);
            case 'qwen':
                return await this.callQwen(message, options);
            case 'claude':
                return await this.callClaude(message, options);
            default:
                throw new Error(`Unsupported provider: ${provider}`);
        }
    }
    
    // 切换AI服务商
    switchProvider(provider) {
        if (['openai', 'qwen', 'claude'].includes(provider)) {
            this.currentProvider = provider;
            console.log(`Switched to ${provider}`);
        } else {
            throw new Error(`Invalid provider: ${provider}`);
        }
    }
    
    // 设置API密钥
    setApiKey(provider, apiKey) {
        if (this.apiKeys.hasOwnProperty(provider)) {
            this.apiKeys[provider] = apiKey;
            console.log(`API key set for ${provider}`);
        } else {
            throw new Error(`Invalid provider: ${provider}`);
        }
    }
    
    // 批量对比不同AI的响应
    async compareResponses(message, providers = ['openai', 'qwen', 'claude']) {
        const results = {};
        
        for (const provider of providers) {
            try {
                const response = await this.chat(message, { provider });
                results[provider] = response;
            } catch (error) {
                results[provider] = {
                    success: false,
                    error: error.message,
                    provider
                };
            }
        }
        
        return results;
    }
}

// 使用示例
const realAI = new RealAIIntegration();

// 设置API密钥
// realAI.setApiKey('openai', 'sk-your-openai-key');
// realAI.setApiKey('qwen', 'your-qwen-key');
// realAI.setApiKey('claude', 'your-claude-key');

// 调用示例
async function testRealAI() {
    try {
        // 使用OpenAI
        const openaiResponse = await realAI.chat('帮我创建一个餐厅网站', {
            provider: 'openai',
            model: 'gpt-4'
        });
        console.log('OpenAI Response:', openaiResponse);
        
        // 使用千问
        const qwenResponse = await realAI.chat('帮我创建一个餐厅网站', {
            provider: 'qwen',
            model: 'qwen-turbo'
        });
        console.log('Qwen Response:', qwenResponse);
        
        // 对比多个AI的响应
        const comparison = await realAI.compareResponses('创建一个电商网站需要什么功能？');
        console.log('AI Comparison:', comparison);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// 导出供其他文件使用
if (typeof window !== 'undefined') {
    window.RealAIIntegration = RealAIIntegration;
} else if (typeof module !== 'undefined') {
    module.exports = RealAIIntegration;
}