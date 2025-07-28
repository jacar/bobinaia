
import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { CoilDesignerForm } from './components/CoilDesignerForm';
import { CoilPreview } from './components/CoilPreview';
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
                            La herramienta de precisión definitiva para la ingeniería de altavoces. Diseñe, simule y exporte especificaciones de bobinas para parlantes.
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
                        <div className="bg-white rounded-lg p-6 shadow-lg ring-1 ring-slate-200 transition-opacity duration-300">
                            <CoilDesignerForm params={coilParams} onParamChange={handleParamChange} />
                        </div>
                        <div className="lg:sticky lg:top-24">
                            <CoilPreview params={coilParams} />
                        </div>
                    </div>
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
    );
};

export default App;
