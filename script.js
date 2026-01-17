// 全局变量和性能优化
let isTyping = false;
let currentCategory = 'all';
let animationFrame = null;
let debounceTimer = null;

// 性能优化：缓存DOM元素
const domCache = {};

// 获取并缓存DOM元素
function getCachedElement(selector) {
    if (!domCache[selector]) {
        domCache[selector] = document.querySelector(selector);
    }
    return domCache[selector];
}

// 防抖函数
function debounce(func, wait) {
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(debounceTimer);
            func(...args);
        };
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 使用requestAnimationFrame优化初始化
    requestAnimationFrame(() => {
        initializeNavigation();
        initializeToolFilters();
        initializePlayground();
        initializeAnimations();
        initializeChatDemo();
        preloadCriticalResources();
    });
});

// 预加载关键资源
function preloadCriticalResources() {
    // 预加载关键图片和资源
    const criticalResources = [
        // 可以添加关键图片URL
    ];
    
    criticalResources.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = 'image';
        document.head.appendChild(link);
    });
}

// 导航功能 - 优化版
function initializeNavigation() {
    const hamburger = getCachedElement('.hamburger');
    const navMenu = getCachedElement('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // 平滑滚动 - 使用事件委托优化
    document.addEventListener('click', function(e) {
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
    
    // 导航栏滚动效果 - 使用节流优化
    const handleScroll = throttle(function() {
        const navbar = getCachedElement('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }, 16); // 约60fps
    
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// 工具分类过滤 - 优化版
function initializeToolFilters() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const toolCards = document.querySelectorAll('.tool-card');
    
    // 使用事件委托优化
    document.querySelector('.tool-categories')?.addEventListener('click', function(e) {
        const btn = e.target.closest('.category-btn');
        if (!btn) return;
        
        const category = btn.dataset.category;
        
        // 更新按钮状态
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // 使用requestAnimationFrame优化动画
        requestAnimationFrame(() => {
            toolCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
        
        currentCategory = category;
    });
}

// 试用区域功能
function initializePlayground() {
    const input = document.getElementById('playgroundInput');
    const sendBtn = document.getElementById('sendBtn');
    
    if (input && sendBtn) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !isTyping) {
                sendMessage();
            }
        });
        
        sendBtn.addEventListener('click', sendMessage);
    }
    
    // 预览控制按钮
    const previewBtns = document.querySelectorAll('.preview-btn');
    previewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            previewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.dataset.view;
            updatePreviewView(view);
        });
    });
}

// 发送消息功能
function sendMessage() {
    const input = document.getElementById('playgroundInput');
    const message = input.value.trim();
    
    if (!message || isTyping) return;
    
    // 添加用户消息
    addMessage(message, 'user');
    input.value = '';
    
    // 模拟AI响应
    setTimeout(() => {
        generateAIResponse(message);
    }, 1000);
}

// 快速提示功能
function sendQuickPrompt(prompt) {
    const input = document.getElementById('playgroundInput');
    input.value = prompt;
    sendMessage();
}

// 添加消息到聊天
function addMessage(content, type) {
    const messagesContainer = document.getElementById('playgroundMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    if (type === 'user') {
        messageDiv.innerHTML = `
            <div class="message-content">${content}</div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">${content}</div>
        `;
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// 生成AI响应
function generateAIResponse(userMessage) {
    isTyping = true;
    
    // 添加打字指示器
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai-message typing-message';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    const messagesContainer = document.getElementById('playgroundMessages');
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // 模拟AI思考时间 - 极速响应
    setTimeout(() => {
        messagesContainer.removeChild(typingDiv);
        
        const response = getAIResponse(userMessage);
        addMessage(response.text, 'ai');
        
        // 更新预览
        if (response.preview) {
            updatePreview(response.preview);
        }
        
        isTyping = false;
    }, 300 + Math.random() * 500);
}

// 获取AI响应内容
function getAIResponse(message) {
    const responses = {
        '餐厅网站': {
            text: `我来为您创建一个现代化的餐厅网站！我将包含以下功能：
            <ul>
                <li>✅ 精美的菜单展示页面</li>
                <li>✅ 在线预订系统</li>
                <li>✅ 餐厅介绍和环境展示</li>
                <li>✅ 联系方式和地图</li>
                <li>✅ 移动端优化</li>
                <li>✅ SEO优化</li>
            </ul>
            <div class="build-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 90%;"></div>
                </div>
                <span class="progress-text">正在生成网站... 90%</span>
            </div>`,
            preview: 'restaurant'
        },
        '产品介绍PPT': {
            text: `我来为您制作一个专业的产品介绍PPT！包含：
            <ul>
                <li>✅ 产品概述和亮点</li>
                <li>✅ 市场分析和竞争优势</li>
                <li>✅ 功能特性详细介绍</li>
                <li>✅ 用户案例和反馈</li>
                <li>✅ 定价和商业模式</li>
                <li>✅ 专业设计模板</li>
            </ul>
            正在生成PowerPoint文件...`,
            preview: 'presentation'
        },
        '营销邮件': {
            text: `我来为您撰写一封高转化率的营销邮件！包含：
            <ul>
                <li>✅ 吸引人的主题行</li>
                <li>✅ 个性化开头</li>
                <li>✅ 清晰的价值主张</li>
                <li>✅ 强有力的行动号召</li>
                <li>✅ 专业的邮件格式</li>
                <li>✅ A/B测试建议</li>
            </ul>
            正在生成邮件内容...`,
            preview: 'email'
        },
        '公司Logo': {
            text: `我来为您设计一个专业的公司Logo！设计过程包含：
            <ul>
                <li>✅ 品牌理念分析</li>
                <li>✅ 多种设计方案</li>
                <li>✅ 颜色和字体选择</li>
                <li>✅ 不同尺寸适配</li>
                <li>✅ 矢量格式输出</li>
                <li>✅ 品牌使用指南</li>
            </ul>
            正在生成Logo设计...`,
            preview: 'logo'
        }
    };
    
    // 检查是否匹配预设响应
    for (const [key, response] of Object.entries(responses)) {
        if (message.includes(key)) {
            return response;
        }
    }
    
    // 默认响应
    return {
        text: `我理解您想要${message}。我可以帮您：
        <ul>
            <li>✅ 分析需求和目标</li>
            <li>✅ 制定实施方案</li>
            <li>✅ 生成相关内容</li>
            <li>✅ 提供专业建议</li>
        </ul>
        请提供更多详细信息，我将为您定制最佳解决方案！`,
        preview: 'default'
    };
}

// 更新预览内容
function updatePreview(type) {
    const previewContent = document.getElementById('previewContent');
    
    const previews = {
        'restaurant': `
            <div style="width: 100%; height: 100%; background: white; padding: 20px; overflow: auto;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h2 style="color: #d97706; margin-bottom: 10px;">美味餐厅</h2>
                    <p style="color: #6b7280;">正宗中式料理，传承经典味道</p>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
                        <h3 style="color: #374151; margin-bottom: 10px;">招牌菜品</h3>
                        <ul style="color: #6b7280; font-size: 14px;">
                            <li>宫保鸡丁 - ¥38</li>
                            <li>麻婆豆腐 - ¥28</li>
                            <li>红烧肉 - ¥48</li>
                        </ul>
                    </div>
                    <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
                        <h3 style="color: #374151; margin-bottom: 10px;">在线预订</h3>
                        <button style="background: #d97706; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">立即预订</button>
                    </div>
                </div>
            </div>
        `,
        'presentation': `
            <div style="width: 100%; height: 100%; background: #1e293b; color: white; padding: 20px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <h1 style="font-size: 2rem; margin-bottom: 20px; text-align: center;">产品介绍</h1>
                <div style="background: white; color: #1e293b; padding: 20px; border-radius: 8px; width: 80%; text-align: center;">
                    <h2 style="color: #6366f1; margin-bottom: 15px;">创新解决方案</h2>
                    <p style="margin-bottom: 15px;">提升效率 • 降低成本 • 优化体验</p>
                    <div style="display: flex; justify-content: space-around; margin-top: 20px;">
                        <div style="text-align: center;">
                            <div style="font-size: 2rem; color: #10b981;">95%</div>
                            <div style="font-size: 0.8rem;">客户满意度</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 2rem; color: #10b981;">50%</div>
                            <div style="font-size: 0.8rem;">效率提升</div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        'email': `
            <div style="width: 100%; height: 100%; background: white; padding: 20px; overflow: auto; font-family: Arial, sans-serif;">
                <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                    <div style="background: #6366f1; color: white; padding: 20px; text-align: center;">
                        <h2 style="margin: 0;">🎉 特别优惠来了！</h2>
                    </div>
                    <div style="padding: 20px;">
                        <p style="color: #374151; line-height: 1.6;">亲爱的客户，</p>
                        <p style="color: #374151; line-height: 1.6;">我们很高兴为您带来这个月的特别优惠！现在购买我们的产品可享受：</p>
                        <ul style="color: #374151; line-height: 1.6;">
                            <li>✅ 30% 折扣优惠</li>
                            <li>✅ 免费送货服务</li>
                            <li>✅ 延长保修期</li>
                        </ul>
                        <div style="text-align: center; margin: 30px 0;">
                            <button style="background: #10b981; color: white; border: none; padding: 12px 24px; border-radius: 6px; font-size: 16px; cursor: pointer;">立即购买</button>
                        </div>
                        <p style="color: #6b7280; font-size: 14px;">优惠截止日期：2026年2月28日</p>
                    </div>
                </div>
            </div>
        `,
        'logo': `
            <div style="width: 100%; height: 100%; background: #f8fafc; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <div style="background: white; padding: 40px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center;">
                    <div style="width: 120px; height: 120px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: white; font-size: 3rem; font-weight: bold;">J</div>
                    <h2 style="color: #1e293b; margin-bottom: 10px;">JELILIAN</h2>
                    <p style="color: #64748b; margin-bottom: 20px;">智能创作平台</p>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <div style="width: 60px; height: 60px; background: #667eea; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">J</div>
                        <div style="width: 60px; height: 60px; background: #1e293b; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">J</div>
                        <div style="width: 60px; height: 60px; background: #10b981; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">J</div>
                    </div>
                </div>
            </div>
        `,
        'default': `
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #f8fafc;">
                <div style="text-align: center; color: #64748b;">
                    <i class="fas fa-cog fa-spin" style="font-size: 48px; color: #6366f1; margin-bottom: 16px;"></i>
                    <h3 style="color: #1e293b; margin-bottom: 8px;">AI正在工作</h3>
                    <p>正在分析您的需求并生成内容...</p>
                </div>
            </div>
        `
    };
    
    previewContent.innerHTML = previews[type] || previews['default'];
}

// 更新预览视图
function updatePreviewView(view) {
    const previewContent = document.getElementById('previewContent');
    const currentContent = previewContent.innerHTML;
    
    // 根据视图类型调整样式
    const viewStyles = {
        'desktop': 'transform: scale(1);',
        'tablet': 'transform: scale(0.8);',
        'mobile': 'transform: scale(0.6);'
    };
    
    previewContent.style.cssText = viewStyles[view] || viewStyles['desktop'];
}

// 初始化动画
function initializeAnimations() {
    // 滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 为需要动画的元素添加观察
    const animateElements = document.querySelectorAll('.feature-card, .tool-card, .pricing-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // 按钮涟漪效果
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .pricing-btn, .tool-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// 初始化聊天演示
function initializeChatDemo() {
    setTimeout(() => {
        const typingIndicator = document.querySelector('.typing-indicator');
        const aiResponse = document.querySelector('.ai-response');
        
        if (typingIndicator && aiResponse) {
            setTimeout(() => {
                typingIndicator.style.display = 'none';
                aiResponse.style.display = 'block';
            }, 3000);
        }
    }, 2000);
}

// 全局函数
function openPlayground() {
    document.getElementById('playground').scrollIntoView({
        behavior: 'smooth'
    });
}

function playDemo() {
    // 播放演示视频或动画
    alert('演示功能即将推出！');
}