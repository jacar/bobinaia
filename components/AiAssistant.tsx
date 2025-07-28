
import React, { useState } from 'react';
import { getAiCoilSuggestions } from '../services/geminiService';
import type { CoilParameters } from '../types';
import { SparklesIcon } from '../constants';

interface AiAssistantProps {
    onSuggestionReady: (params: CoilParameters) => void;
    setIsLoading: (isLoading: boolean) => void;
    isLoading: boolean;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ onSuggestionReady, setIsLoading, isLoading }) => {
    const [prompt, setPrompt] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) {
            setError('Por favor, ingresa una descripción.');
            return;
        }
        setError('');
        setIsLoading(true);
        try {
            const suggestedParams = await getAiCoilSuggestions(prompt);
            onSuggestionReady(suggestedParams);
        } catch (err: any) {
            setError(err.message || 'Ocurrió un error desconocido.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-lg font-semibold leading-6 text-slate-900 flex items-center">
                <SparklesIcon className="w-6 h-6 mr-2 text-indigo-500" />
                Asistente de IA
            </h3>
            <p className="mt-1 text-sm text-slate-600">Describe tu proyecto de altavoz y deja que la IA sugiera un diseño de bobina.</p>
            
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <textarea
                    rows={3}
                    className="block w-full rounded-md border-0 py-2 px-3 bg-white text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm transition-shadow"
                    placeholder="Ej: 'Un subwoofer de 12 pulgadas para bajos profundos', 'Un altavoz de medios de 6 pulgadas para un sistema de audio doméstico'"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isLoading}
                />
                 <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex justify-center items-center rounded-md border border-transparent bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed transition-all duration-300"
                >
                    {isLoading ? (
                        <>
                           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                           Generando...
                        </>
                    ) : (
                        <>
                           <SparklesIcon className="w-5 h-5 mr-2" />
                           Generar con IA
                        </>
                    )}
                </button>
                {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
            </form>
        </div>
    );
};
