import React, { useEffect } from 'react';
import { useBlocker } from 'react-router-dom';

const UnsavedChangesGuard = ({ hasChanges }) => {
    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            hasChanges && currentLocation.pathname !== nextLocation.pathname
    );

    useEffect(() => {
        if (blocker.state === 'blocked') {
            const shouldProceed = window.confirm(
                '您有未保存的更改，确定要离开吗？\n\n' +
                '当前页面：' + blocker.location.pathname + '\n' +
                '目标页面：' + blocker.nextLocation.pathname
            );

            if (shouldProceed) {
                blocker.proceed();
            } else {
                blocker.reset();
            }
        }
    }, [blocker]);

    return null;
};

export default UnsavedChangesGuard;