
import React from 'react';

const PageSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="text-xl font-bold font-orbitron text-slate-800 dark:text-slate-100 mb-2">{title}</h3>
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
            {children}
        </div>
    </div>
);

export const TermsPage: React.FC = () => {
    const title = "Política de Uso";
    
    return (
        <div>
            <h3 className="text-xl font-bold font-orbitron text-slate-800 mb-2">{title}</h3>
            <div className="prose prose-slate max-w-none text-slate-600">
                <p className="mb-4">
                    Bienvenido al Diseñador de Bobinas para Parlantes. Esta herramienta está diseñada para ayudar a ingenieros y entusiastas del audio a diseñar bobinas para parlantes de manera precisa y eficiente.
                </p>
                
                <h4 className="text-lg font-semibold text-slate-800 mt-6 mb-3">Uso de la Herramienta</h4>
                <p className="mb-4">
                    Esta aplicación utiliza inteligencia artificial para sugerir parámetros de diseño basados en descripciones de proyectos. Los resultados son estimaciones y deben ser validados por profesionales antes de su implementación.
                </p>
                
                <h4 className="text-lg font-semibold text-slate-800 mt-6 mb-3">Limitaciones</h4>
                <p className="mb-4">
                    Las sugerencias de la IA son informativas y no garantizan resultados específicos. Siempre consulte con expertos en audio y realice pruebas antes de implementar cualquier diseño.
                </p>
            </div>
            <p className="mb-6 text-sm text-slate-500">Última actualización: {new Date().toLocaleDateString()}</p>
        </div>
    );
};
