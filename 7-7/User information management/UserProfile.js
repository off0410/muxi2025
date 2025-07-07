import { useEffect } from 'react';
import useUserStore from './useUserStore';

const UserProfile = () => {
    const { user, fetchUser, isUserLoaded, userFullName } = useUserStore();

    // 订阅user状态变化并打印
    useEffect(() => {
        const unsubscribe = useUserStore.subscribe(
            (changes, state) => {
                console.log('User state changed:', changes, 'New user:', state.user);
            },
            (state) => state.user // 仅监听user状态
        );

        // 组件卸载时清理订阅
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <button onClick={fetchUser}>加载用户信息</button>
            {!isUserLoaded() ? (
                <p>Loading user...</p>
            ) : (
                <div>
                    <h3>User Profile</h3>
                    <p>Full Name: {userFullName()}</p>
                    <p>Age: {user.age}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}
        </div>
    );
};

export default UserProfile;