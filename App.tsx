
import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { CoilDesignerForm } from './components/CoilDesignerForm';
import { CoilPreview } from './components/CoilPreview';
import { AiAssistant } from './components/AiAssistant';
import { Modal } from './components/Modal';
import { TermsPage } from './components/TermsPage';
import { PrivacyPage } from './components/PrivacyPage';
import { ContactPage } from './components/ContactPage';
import type { CoilParameters } from './types';
import { CoilMaterial } from './types';

export type ModalType = 'terms' | 'privacy' | 'contact';

const App: React.FC = () => {
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
    
    const handleAiSuggestion = (params: CoilParameters) => {
        setCoilParams(params);
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
        <div className="min-h-screen flex flex-col">
            <Header onShowModal={setActiveModal} />
            <main className="flex-grow">
                {/* Hero Section */}
                <div 
                    className="relative text-center py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
                    style={{ backgroundImage: `url('https://www.strongmeropower.com/wp-content/uploads/2025/07/header.png')` }}
                >
                    <div className="absolute inset-0 bg-slate-900/60"></div>
                    <div className="relative">
                        <h1 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white text-shadow">
                            Diseñador de Bobinas para Parlantes
                        </h1>
                        <p className="mt-6 text-lg text-slate-200 max-w-2xl mx-auto text-shadow">
                            La herramienta de precisión definitiva para la ingeniería de altavoces. Diseñe, simule y exporte especificaciones de bobinas para parlantes con el poder de la IA.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={handleScrollToDesigner}
                                className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-semibold text-white shadow-sm bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-transform duration-200 hover:scale-105"
                            >
                                Empezar a Diseñar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Designer Section */}
                <div ref={designerRef} id="designer" className="p-4 sm:p-6 lg:p-8">
                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className={`bg-white rounded-lg p-6 shadow-lg ring-1 ring-slate-200 transition-opacity duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                            <CoilDesignerForm params={coilParams} onParamChange={handleParamChange} />
                            <AiAssistant onSuggestionReady={handleAiSuggestion} setIsLoading={setIsLoading} isLoading={isLoading} />
                        </div>
                        <div className="lg:sticky lg:top-24">
                            <CoilPreview params={coilParams} />
                        </div>
                    </div>
                </div>

                {/* Loading Overlay */}
                {isLoading && (
                    <div className="fixed inset-0 bg-slate-100/80 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="flex flex-col items-center">
                            <svg className="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="mt-4 text-lg font-semibold font-orbitron text-indigo-700">La IA está pensando...</p>
                        </div>
                    </div>
                )}
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
    );
};

export default App;
