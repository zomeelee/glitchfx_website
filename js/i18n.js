// 多语言切换功能
class I18n {
    constructor() {
        this.currentLang = 'en'; // 默认语言
        this.translations = {}; // 存储所有语言的翻译
        this.elements = []; // 存储所有需要翻译的元素
        
        // 初始化
        this.init();
    }
    
    // 初始化函数
    async init() {
        // 加载默认语言
        await this.loadLanguage(this.currentLang);
        
        // 查找所有带有 data-i18n 属性的元素
        this.elements = document.querySelectorAll('[data-i18n]');
        
        // 应用翻译
        this.updateContent();
        
        // 设置语言选择器事件
        this.setupLanguageSelector();
        
        // 从本地存储中恢复语言设置
        this.restoreLanguage();
    }
    
    // 加载语言文件
    async loadLanguage(lang) {
        if (this.translations[lang]) {
            return; // 如果已经加载过，直接返回
        }
        
        try {
            const response = await fetch(`js/i18n/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load language file: ${lang}`);
            }
            
            this.translations[lang] = await response.json();
        } catch (error) {
            console.error(error);
            // 如果加载失败，使用默认语言
            this.translations[lang] = this.translations['zh-CN'] || {};
        }
    }
    
    // 更新页面内容
    updateContent() {
        const translation = this.translations[this.currentLang];
        if (!translation) return;
        
        this.elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const value = this.getNestedTranslation(translation, key);
            
            if (value) {
                // 如果是 HTML 内容，使用 innerHTML
                if (value.includes('<') && value.includes('>')) {
                    element.innerHTML = value;
                } else {
                    element.textContent = value;
                }
            }
        });
        
        // 更新当前语言显示
        const currentLangElement = document.querySelector('.current-language span');
        if (currentLangElement) {
            const langNames = {
                'zh-CN': '中文',
                'en': 'English',
                'fr': 'Français'
                // 'de': 'Deutsch',
                // 'ja': '日本語',
                // 'ko': '한국어'
            };
            currentLangElement.textContent = langNames[this.currentLang];
        }
        
        // 更新语言选择器中的活动项
        const langItems = document.querySelectorAll('.language-dropdown li');
        langItems.forEach(item => {
            if (item.getAttribute('data-lang') === this.currentLang) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // 更新 HTML 的 lang 属性
        document.documentElement.lang = this.currentLang;
        
        // 保存语言设置到本地存储
        localStorage.setItem('glitchfx-language', this.currentLang);
    }
    
    // 获取嵌套的翻译值
    getNestedTranslation(obj, path) {
        const keys = path.split('.');
        return keys.reduce((prev, curr) => {
            return prev && prev[curr] ? prev[curr] : null;
        }, obj);
    }
    
    // 设置语言选择器事件
    setupLanguageSelector() {
        const languageSelector = document.querySelector('.language-selector');
        const currentLanguage = document.querySelector('.current-language');
        const languageDropdown = document.querySelector('.language-dropdown');
        const languageItems = document.querySelectorAll('.language-dropdown li');
        
        if (currentLanguage) {
            currentLanguage.addEventListener('click', () => {
                languageSelector.classList.toggle('active');
            });
        }
        
        if (languageItems) {
            languageItems.forEach(item => {
                item.addEventListener('click', async () => {
                    const lang = item.getAttribute('data-lang');
                    if (lang && lang !== this.currentLang) {
                        this.currentLang = lang;
                        await this.loadLanguage(lang);
                        this.updateContent();
                    }
                    languageSelector.classList.remove('active');
                });
            });
        }
        
        // 点击外部关闭下拉菜单
        document.addEventListener('click', (event) => {
            if (languageSelector && !languageSelector.contains(event.target)) {
                languageSelector.classList.remove('active');
            }
        });
    }
    
    // 从本地存储中恢复语言设置
    restoreLanguage() {
        const savedLang = localStorage.getItem('glitchfx-language');
        if (savedLang && savedLang !== this.currentLang) {
            this.currentLang = savedLang;
            this.loadLanguage(savedLang).then(() => {
                this.updateContent();
            });
        }
    }
    
    // 切换语言
    async changeLanguage(lang) {
        if (lang && lang !== this.currentLang) {
            this.currentLang = lang;
            await this.loadLanguage(lang);
            this.updateContent();
        }
    }
}

// 当文档加载完成后初始化多语言功能
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18n();
});