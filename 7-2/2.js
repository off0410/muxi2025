import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import './ThemeApp.css';

// 创建ThemeContext
const ThemeContext = createContext();

// 自定义Hook useTheme封装主题逻辑
function useTheme() {
    const [theme, setTheme] = useState('light');

    // 切换主题的方法
    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    }, []);

    // 同步body背景色变化
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return { theme, toggleTheme };
}

// 主题提供者组件
function ThemeProvider({ children }) {
    const themeData = useTheme();
    return (
        <ThemeContext.Provider value={themeData}>
            {children}
        </ThemeContext.Provider>
    );
}

// 自定义Hook用于获取主题状态
function useThemeContext() {
    return useContext(ThemeContext);
}

// 主题卡片组件
function ThemeCard() {
    const { theme } = useThemeContext();
    return (
        <div className={`theme-card ${theme}`}>
            <h2>当前主题: {theme === 'light' ? '亮色模式' : '暗色模式'}</h2>
            <p>这是一个主题展示卡片</p>
        </div>
    );
}

// 主题切换按钮组件
function ThemeButton() {
    const { toggleTheme } = useThemeContext();
    return (
        <button className="theme-btn" onClick={toggleTheme}>
            🎨 切换主题
        </button>
    );
}

// 主应用组件
function ThemeApp() {
    return (
        <ThemeProvider>
            <div className="theme-app">
                <ThemeCard />
                <ThemeButton />
            </div>
        </ThemeProvider>
    );
}

export default ThemeApp;