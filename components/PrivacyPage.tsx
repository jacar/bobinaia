
import React from 'react';

const PageSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="text-xl font-bold font-orbitron text-slate-800 dark:text-slate-100 mb-2">{title}</h3>
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
            {children}
        </div>
    </div>
);

export const PrivacyPage: React.FC = () => {
    const title = "Política de Privacidad";
    
    return (
        <div>
            <h3 className="text-xl font-bold font-orbitron text-slate-800 mb-2">{title}</h3>
            <div className="prose prose-slate max-w-none text-slate-600">
                <p className="mb-4">
                    Su privacidad es importante para nosotros. Esta política describe cómo recopilamos, usamos y protegemos su información cuando utiliza el Diseñador de Bobinas para Parlantes.
                </p>
                
                <h4 className="text-lg font-semibold text-slate-800 mt-6 mb-3">Información que Recopilamos</h4>
                <p className="mb-4">
                    No recopilamos información personal identificable. Los parámetros de diseño que ingrese se procesan localmente en su navegador y no se almacenan en nuestros servidores.
                </p>
                
                <h4 className="text-lg font-semibold text-slate-800 mt-6 mb-3">Procesamiento de Datos</h4>
                <p className="mb-4">
                    Todos los cálculos y generación de parámetros se realizan localmente en su dispositivo. No enviamos datos a servidores externos.
                </p>
                
                <h4 className="text-lg font-semibold text-slate-800 mt-6 mb-3">Cookies y Almacenamiento</h4>
                <p className="mb-4">
                    Utilizamos localStorage del navegador para recordar sus preferencias de diseño. Esta información se almacena únicamente en su dispositivo.
                </p>
            </div>
            <p className="mb-6 text-sm text-slate-500">Última actualización: {new Date().toLocaleDateString()}</p>
        </div>
    );
};
