
import React, { useState, useEffect } from 'react';
import { MenuIcon, CloseIcon, ShopIcon, SunIcon, MoonIcon } from '../constants';
import type { ModalType } from '../App';
import type { Theme } from '../types';

const NavButton: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => (
    <button
        onClick={onClick}
        className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
    >
        {children}
    </button>
);

export const Header: React.FC<{ 
    onShowModal: (modal: ModalType) => void;
    theme: Theme;
    onToggleTheme: () => void;
}> = ({ onShowModal, theme, onToggleTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isMenuOpen]);

    const handleNavClick = (modal: ModalType) => {
        onShowModal(modal);
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <button onClick={() => window.location.href = '#'} className="flex items-center space-x-2">
                             <img 
                                className="h-10 w-auto" 
                                src="https://dise-o-de-bobinas.vercel.app/logo.png" 
                                alt="Logo Diseñador de Bobinas para Parlantes" 
                            />
                             <span className="font-orbitron font-bold text-slate-800 dark:text-slate-100 hidden sm:inline">Diseñador de Bobinas para Parlantes</span>
                        </button>
                    </div>
                    <div className="hidden md:block">
                        <nav className="ml-10 flex items-center space-x-2">
                            <NavButton onClick={() => handleNavClick('terms')}>Política de Uso</NavButton>
                            <NavButton onClick={() => handleNavClick('privacy')}>Política de Privacidad</NavButton>
                            <NavButton onClick={() => handleNavClick('contact')}>Contacto</NavButton>
                             <a href="https://www.strongmeropower.com/" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1.5">
                                <ShopIcon className="h-5 w-5" />
                                <span>Tienda</span>
                            </a>
                            <button
                                onClick={onToggleTheme}
                                className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                aria-label="Cambiar tema"
                            >
                                {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
                            </button>
                        </nav>
                    </div>
                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)} 
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-sky-500"
                        >
                            <span className="sr-only">Abrir menú principal</span>
                            {isMenuOpen ? <CloseIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 inset-x-0 bg-white dark:bg-slate-950 h-screen z-50">
                    <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 flex flex-col items-center justify-center h-full -mt-16">
                        <button onClick={() => { window.location.href='#'; setIsMenuOpen(false); }} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-sky-400 px-3 py-2 rounded-md text-base font-medium transition-colors">Inicio</button>
                        <NavButton onClick={() => handleNavClick('terms')}>Política de Uso</NavButton>
                        <NavButton onClick={() => handleNavClick('privacy')}>Política de Privacidad</NavButton>
                        <NavButton onClick={() => handleNavClick('contact')}>Contacto</NavButton>
                        <a href="https://www.strongmeropower.com/" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-sky-400 px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-1.5">
                            <ShopIcon className="h-5 w-5" />
                            <span>Tienda</span>
                        </a>
                        <div className="border-t border-slate-200 dark:border-slate-800 w-1/2 my-4"></div>
                        <button
                            onClick={() => {
                                onToggleTheme();
                            }}
                            className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-sky-400 px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2"
                        >
                            {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
                            <span>Cambiar a modo {theme === 'light' ? 'oscuro' : 'claro'}</span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};
