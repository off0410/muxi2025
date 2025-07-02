import { useState, useEffect, useCallback } from 'react';
import './Counter.css';

// 自定义Hook useCounter封装计数器逻辑
function useCounter(initialValue = 0) {
    const [count, setCount] = useState(initialValue);

    // 使用useCallback优化事件处理函数
    const increment = useCallback(() => {
        setCount(prev => prev + 1);
    }, []);

    const decrement = useCallback(() => {
        setCount(prev => prev - 1);
    }, []);

    const reset = useCallback(() => {
        setCount(initialValue);
    }, [initialValue]);

    // 使用useEffect在数值变化时打印日志
    useEffect(() => {
        console.log(`当前计数值: ${count}`);
    }, [count]);

    return { count, increment, decrement, reset };
}

function CounterApp() {
    const { count, increment, decrement, reset } = useCounter(0);

    return (
        <div className="counter-container">
            <h1 className="count-display">{count}</h1>
            <div className="button-group">
                <button className="btn increment" onClick={increment}>➕ 增加</button>
                <button className="btn decrement" onClick={decrement}>➖ 减少</button>
                <button className="btn reset" onClick={reset}>🔄 重置</button>
            </div>
        </div>
    );
}

export default CounterApp;

