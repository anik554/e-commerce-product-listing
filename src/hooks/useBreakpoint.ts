import { useEffect, useState } from 'react';

export const useBreakpoint = () => {
    const [screen, setScreen] = useState<'sm' | 'md' | 'lg'>('lg');

    useEffect(() => {
        const update = () => {
            const width = window.innerWidth;

            if (width < 640) setScreen('sm');
            else if (width < 1024) setScreen('md');
            else setScreen('lg');
        };

        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    return screen;
};