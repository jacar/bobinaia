
import React, { useState, useEffect } from 'react';
import { MenuIcon, CloseIcon, ShopIcon } from '../constants';
import type { ModalType } from '../App';

const NavButton: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => (
    <button
        onClick={onClick}
        className="bg-red-600 text-white hover:bg-white hover:text-red-700 px-3 py-2 rounded-md text-sm font-bold transition-colors border border-red-600 w-full sm:w-auto"
    >
        {children}
    </button>
);

export const Header: React.FC<{
    onShowModal: (modal: ModalType) => void;
}> = ({ onShowModal }) => {
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
        <header className="bg-gradient-to-r from-red-100 via-white to-red-50 shadow-md sticky top-0 z-40">
            <div className="px-4 sm:px-6 lg:px-8 pb-2 pt-2">
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                        <button onClick={() => window.location.href = '#'} className="flex items-center space-x-2">
                            <img 
                                className="h-12 w-auto drop-shadow" 
                                src="https://dise-o-de-bobinas.vercel.app/logo.png" 
                                alt="Logo Diseñador de Bobinas para Parlantes" 
                            />
                            <span className="font-orbitron font-bold text-slate-800 text-lg sm:text-xl">Diseñador de Bobinas</span>
                        </button>

                    </div>

                    <div className="hidden md:block">
                        <nav className="ml-10 flex items-center space-x-2">
                            <NavButton onClick={() => handleNavClick('terms')}>Política de Uso</NavButton>
                            <NavButton onClick={() => handleNavClick('privacy')}>Política de Privacidad</NavButton>
                            <NavButton onClick={() => handleNavClick('contact')}>Contacto</NavButton>
                             <a href="https://www.strongmeropower.com/" target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white hover:bg-white hover:text-red-700 px-3 py-2 rounded-md text-sm font-bold transition-colors border border-red-600 flex items-center space-x-1.5 w-full sm:w-auto">
                                <ShopIcon className="h-5 w-5" />
                                <span>Tienda</span>
                            </a>
                        </nav>
                    </div>
                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)} 
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-indigo-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            <span className="sr-only">Abrir menú principal</span>
                            {isMenuOpen ? <CloseIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 inset-x-0 bg-white h-screen z-50">
                    <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 flex flex-col items-center justify-center h-full -mt-16">
                        <button onClick={() => { window.location.href='#'; setIsMenuOpen(false); }} className="bg-red-600 text-white hover:bg-white hover:text-red-700 px-3 py-2 rounded-md text-base font-bold transition-colors border border-red-600 w-full sm:w-auto">Inicio</button>
                        <NavButton onClick={() => handleNavClick('terms')}>Política de Uso</NavButton>
                        <NavButton onClick={() => handleNavClick('privacy')}>Política de Privacidad</NavButton>
                        <NavButton onClick={() => handleNavClick('contact')}>Contacto</NavButton>
                        <a href="https://www.strongmeropower.com/" target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white hover:bg-white hover:text-red-700 px-3 py-2 rounded-md text-base font-bold transition-colors border border-red-600 flex items-center space-x-1.5 w-full sm:w-auto">
                            <ShopIcon className="h-5 w-5" />
                            <span>Tienda</span>
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};
