
import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { CoilDesignerForm } from './components/CoilDesignerForm';
import { CoilPreview } from './components/CoilPreview';
import ProductHeroCarousel from './components/ProductHeroCarousel';
import { Modal } from './components/Modal';
import { TermsPage } from './components/TermsPage';
import { PrivacyPage } from './components/PrivacyPage';
import { ContactPage } from './components/ContactPage';
import type { CoilParameters } from './types';
import { CoilMaterial } from './types';

export type ModalType = 'terms' | 'privacy' | 'contact';

const App: React.FC = () => {
    return <AppContent />;
};

const AppContent: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [coilParams, setCoilParams] = useState<CoilParameters>({
        material: CoilMaterial.Kapton,
        internalDiameter: 50.8,
        coilHeight: 50,
        windingHeight: 16,
        impedance: 8,
        numberOfLayers: 2,
    });
    const designerRef = useRef<HTMLDivElement>(null);
    const [activeModal, setActiveModal] = useState<ModalType | null>(null);

    const handleScrollToDesigner = () => {
        designerRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleParamChange = <K extends keyof CoilParameters,>(
        param: K, 
        value: CoilParameters[K]
    ) => {
        setCoilParams(prevParams => ({
            ...prevParams,
            [param]: value,
        }));
    };

    const getModalTitle = () => {
        switch (activeModal) {
            case 'terms': return 'Política de Uso';
            case 'privacy': return 'Política de Privacidad';
            case 'contact': return 'Contacto';
            default: return '';
        }
    };

    const renderModalContent = () => {
        switch (activeModal) {
            case 'terms': return <TermsPage />;
            case 'privacy': return <PrivacyPage />;
            case 'contact': return <ContactPage />;
            default: return null;
        }
    };

            return (
            <>
                <div className="min-h-screen flex flex-col">
                <Header onShowModal={setActiveModal} />
                <main className="flex-grow">
                    {/* Hero Section */}
                    <div 
                        className="relative isolate overflow-hidden w-full py-24 sm:py-32 min-h-[420px] flex items-center justify-center bg-center bg-cover"
                        style={{ backgroundImage: `url('https://www.webcincodev.com/blog/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-26-at-1.51.06-PM.jpeg')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}
                    >
                        <div className="absolute inset-0 bg-black/50" />
                        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto px-4">
                            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 drop-shadow-lg">
                                Diseñador de Bobinas para Parlantes
                            </h1>
                            <p className="text-lg sm:text-xl text-white font-semibold mb-6 drop-shadow">
                                Calcula y visualiza tus bobinas personalizadas para sistemas de audio profesional y automotriz.
                            </p>
                            <button
                                onClick={handleScrollToDesigner}
                                className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-semibold text-white shadow-sm bg-red-600 hover:bg-white hover:text-red-700 border border-red-600 transition-transform duration-200 hover:scale-105"
                            >
                                Empezar a Diseñar
                            </button>
                    </div>
                </div>

                {/* Designer Section */}
                    <div ref={designerRef} id="designer" className="p-4 sm:p-6 lg:p-8">
                        <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8">
                            {/* Formulario de Diseño */}
                            <div className="lg:col-span-2">
                                <CoilDesignerForm 
                                    params={coilParams} 
                                    onParamChange={handleParamChange} 
                                />
                            </div>
                            
                            {/* Vista Previa */}
                            <div className="lg:col-span-3">
                                <CoilPreview params={coilParams} />
                            </div>
                        </div>
                        
                        {/* Materiales Disponibles */}
                        <div className="mt-8 bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-lg border border-red-500 relative overflow-hidden">
                            {/* Imagen de fondo */}
                            <div 
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                                style={{ 
                                    backgroundImage: `url('https://www.webcincodev.com/blog/wp-content/uploads/2025/07/Diseno-sin-titulo-1.png')`
                                }}
                            ></div>
                            {/* Fondo industrial */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-4 right-4 w-16 h-16 border-2 border-red-400 rounded-full"></div>
                                <div className="absolute bottom-8 left-8 w-8 h-8 border border-red-300"></div>
                            </div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-center mb-6">
                                    <h3 className="text-2xl font-bold text-white">MATERIALES DISPONIBLES</h3>
                                </div>
                                <div className="w-32 h-1 bg-red-500 mx-auto mb-8"></div>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                                    {/* Imagen de bobina */}
                                    <div className="flex justify-center">
                                        <div className="w-[600px] h-[600px] rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                                            <img 
                                                src="https://www.webcincodev.com/blog/wp-content/uploads/2025/07/Post-Instagram-Frase-Motivacional-Exito-Minimalista-Blanco-1.png"
                                                alt="Bobina de parlante"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Tablas horizontales */}
                                    <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Tabla izquierda */}
                                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-red-300">
                                            <h4 className="text-lg font-bold text-white mb-4 text-center">CUERPO DE LA BOBINA</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between text-white">
                                                    <span>Aluminio</span>
                                                    <span className="font-mono">AL</span>
                                                </div>
                                                <div className="flex justify-between text-white">
                                                    <span>Kapton</span>
                                                    <span className="font-mono">KP</span>
                                                </div>
                                                <div className="flex justify-between text-white">
                                                    <span>Till</span>
                                                    <span className="font-mono">TL</span>
                                                </div>
                                                <div className="flex justify-between text-white">
                                                    <span>Aluminio negro</span>
                                                    <span className="font-mono">AL-N</span>
                                                </div>
                                                <div className="flex justify-between text-white">
                                                    <span>TGL (Tipo de Kapton grueso/largo)</span>
                                                    <span className="font-mono">TGL</span>
                                                </div>
                                                <div className="flex justify-between text-white">
                                                    <span>TGB (Kapton tipo bobina)</span>
                                                    <span className="font-mono">TGB</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Tabla derecha */}
                                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-red-300">
                                            <h4 className="text-lg font-bold text-white mb-4 text-center">CUERPO DE LA BOBINA</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between text-white">
                                                    <span>EISVW</span>
                                                    <span className="text-xs">Esmaltado + Seda + Vinilo + Nylon</span>
                                                </div>
                                                <div className="flex justify-between text-white">
                                                    <span>PISVW</span>
                                                    <span className="text-xs">Poliéster Imida + Seda + Vinilo + Nylon</span>
                                                </div>
                                                <div className="flex justify-between text-white">
                                                    <span>PICCAR</span>
                                                    <span className="font-mono">TL</span>
                                                </div>
                                                <div className="flex justify-between text-white">
                                                    <span>Kapton</span>
                                                    <span className="text-xs">Poliéster Imida + Capa de Carcasa</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <ProductHeroCarousel />
                        
                        <div className="flex justify-center my-4">
                            <a
                                href="https://www.strongmeropower.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-red-600 hover:bg-white hover:text-red-700 text-white font-bold px-6 py-3 rounded-lg shadow border border-red-600 transition text-lg"
                            >
                                Visita nuestra tienda y busca tu modelo
                            </a>
                        </div>
                        
                        <div className="h-[100px]"></div>
                        
                        <p className="text-slate-700 mb-2">
                            Pioneros en la Fabricación de Bobinas de Calidad en Colombia. Somos líderes en la producción de componentes de sonido de alta calidad para altavoces y equipos de sonido en el mercado colombiano. Nuestra experiencia y compromiso con la excelencia nos han posicionado como fabricantes destacados en la industria.
                        </p>
                        <p className="text-slate-700 mb-2">
                            Descubre nuestras bobinas de voz de primera categoría, diseñadas y fabricadas en Colombia, que garantizan un sonido óptimo y una confiabilidad inigualable. Explore nuestro catálogo de productos, con opciones personalizadas y estándar, y dé un paso adelante en su experiencia de sonido.
                        </p>
                        <p className="text-slate-700">
                            Confíe en <span className="font-bold text-red-700">Strong Mero Power</span> para sus necesidades de bobinas y componentes de sonido de alta fidelidad en Colombia.
                        </p>
                        
                        <div className="h-[200px]"></div>
                        

                    </div>
                </main>
                <footer className="w-full bg-white py-4 mt-8 border-t border-slate-200">
                    <div className="px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
                        <p>&copy; {new Date().getFullYear()} Diseñador de Bobinas para Parlantes. Todos los derechos reservados.</p>
                        <p className="mt-1">Creado por Armando Ovalle J.</p>
                    </div>
                </footer>
                <Modal
                    isOpen={!!activeModal}
                    onClose={() => setActiveModal(null)}
                    title={getModalTitle()}
                >
                    {renderModalContent()}
                </Modal>
            </div>
        </>
    );
};

export default App;
