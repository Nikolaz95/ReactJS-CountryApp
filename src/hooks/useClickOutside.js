import { useEffect } from 'react';

// Calls onOutside when the user clicks/taps outside ref or presses Escape
const useClickOutside = (ref, onOutside, enabled = true) => {
    useEffect(() => {
        if (!enabled) return;

        const handlePointer = (e) => {
            if (ref.current && !ref.current.contains(e.target)) onOutside();
        };
        const handleKey = (e) => {
            if (e.key === 'Escape') onOutside();
        };

        document.addEventListener('pointerdown', handlePointer);
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('pointerdown', handlePointer);
            document.removeEventListener('keydown', handleKey);
        };
    }, [ref, onOutside, enabled]);
};

export default useClickOutside;
