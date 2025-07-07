import { create } from 'zustand';

const useUserStore = create((set, get) => ({
    user: {}, // 初始用户信息为空对象
    // 异步获取用户信息
    fetchUser: async () => {
        // 模拟API请求
        const mockUser = {
            firstName: 'John',
            lastName: 'Doe',
            age: 30,
            email: 'john.doe@example.com'
        };
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
        set({ user: mockUser });
    },
    // 派生状态：用户信息是否加载完成
    isUserLoaded: () => Object.keys(get().user).length > 0,
    // 派生状态：用户全名
    userFullName: () => {
        const { user } = get();
        return `${user.firstName || ''} ${user.lastName || ''}`.trim();
    }
}));

export default useUserStore;