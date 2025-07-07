import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCounterStore = create(
    persist(
        (set, get) => ({
            count: 0,
            // 增加计数器
            increment: () => set((state) => ({ count: state.count + 1 })),
            // 减少计数器
            decrement: () => set((state) => ({ count: state.count - 1 })),
            // 派生状态：判断count是否为正数
            isPositive: () => get().count > 0
        }),
        {
            name: 'counter-store', // 存储名称，用于localStorage的key
            // 默认使用localStorage，如需sessionStorage可配置storage: sessionStorage
        }
    )
);