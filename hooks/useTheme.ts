import { useState, useEffect } from 'react';
import type { Theme } from '../types';

export const useTheme = () => {
    const [theme, setThemeState] = useState<Theme>(() => {
        // Verificar si estamos en el navegador
        if (typeof window !== 'undefined') {
            // Primero verificar localStorage
            const savedTheme = localStorage.getItem('theme') as Theme;
            if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
                return savedTheme;
            }
            
            // Si no hay tema guardado, verificar preferencia del sistema
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        }
        return 'light';
    });

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        
        try {
            localStorage.setItem('theme', theme);
        } catch (error) {
            console.warn('No se pudo guardar el tema en localStorage:', error);
        }
    }, [theme, isLoaded]);

    // Escuchar cambios en las preferencias del sistema
    useEffect(() => {
        if (!isLoaded) return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleChange = (e: MediaQueryListEvent) => {
            // Solo cambiar si no hay un tema guardado en localStorage
            const savedTheme = localStorage.getItem('theme');
            if (!savedTheme) {
                setThemeState(e.matches ? 'dark' : 'light');
            }
        };
        
        mediaQuery.addEventListener('change', handleChange);
        
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, [isLoaded]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    const toggleTheme = () => {
        setThemeState(currentTheme => {
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Aplicar el cambio inmediatamente al DOM
            const root = document.documentElement;
            if (newTheme === 'dark') {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
            
            // Guardar en localStorage
            try {
                localStorage.setItem('theme', newTheme);
            } catch (error) {
                console.warn('No se pudo guardar el tema en localStorage:', error);
            }
            
            return newTheme;
        });
    };

    return {
        theme,
        setTheme,
        toggleTheme,
        isLoaded
    };
}; 