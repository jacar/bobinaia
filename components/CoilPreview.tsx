import React, { useState, useEffect } from 'react';
import type { CoilParameters } from '../types';
import { ClipboardIcon, CheckIcon, DownloadIcon, MATERIAL_OPTIONS } from '../constants';

interface CoilPreviewProps {
    params: CoilParameters;
}

export const CoilPreview: React.FC<CoilPreviewProps> = ({ params }) => {
    const [generatedCode, setGeneratedCode] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const { material, internalDiameter, coilHeight, windingHeight, impedance, numberOfLayers } = params;
        const code = `${material} ${internalDiameter}*${coilHeight}*${windingHeight}*${numberOfLayers}L-${impedance}Ω`;
        setGeneratedCode(code);
    }, [params]);

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const { material, internalDiameter, coilHeight, windingHeight, impedance, numberOfLayers } = params;
        const materialLabel = MATERIAL_OPTIONS.find(opt => opt.value === material)?.label || material;

        const fileContent = `
Diseño de Bobina para Parlantes
---------------------------
Fecha de Generación: ${new Date().toLocaleString()}

Parámetros:
- Material de la bobina: ${materialLabel}
- Diámetro Interno: ${internalDiameter} mm
- Altura del Material de la Bobina: ${coilHeight} mm
- Altura del Devanado del Alambre: ${windingHeight} mm
- Cantidad de Capas: ${numberOfLayers}
- Impedancia: ${impedance} Ω

Información generada:
${generatedCode}
`.trim();

        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `diseño-bobina-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };


    return (
        <div className="bg-white rounded-lg p-6 h-full flex flex-col justify-between shadow-lg ring-1 ring-slate-200">
            <div>
                <h3 className="text-lg font-semibold leading-6 text-slate-900">Vista Previa del Diseño</h3>
                <p className="mt-1 text-sm text-slate-600">Diagrama esquemático y medidas exportables.</p>
                
                {/* SVG Diagram */}
                <div className="mt-6 flex justify-center">
                    <svg width="600" height="400" viewBox="0 0 600 400" className="w-full max-w-lg">
                        {/* Background */}
                        <rect width="600" height="400" fill="white" />
                        
                        {/* Arrow indicators */}
                        <g className="text-slate-400">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                        </g>
                        
                        {/* Title */}
                        <g className="font-orbitron text-slate-900 text-lg" textAnchor="middle">
                            <text x="300" y="30">Diseño de Bobina para Parlantes</text>
                        </g>
                        
                        {/* Coil representation */}
                        <g className="stroke-slate-400" strokeWidth="2">
                            <circle cx="200" cy="200" r="80" fill="none" />
                            <circle cx="200" cy="200" r="60" fill="none" />
                            <circle cx="200" cy="200" r="40" fill="none" />
                        </g>
                        
                        {/* Measurements */}
                        <g className="font-sans text-slate-600" fontSize="14">
                            <g className="stroke-slate-400" strokeWidth="1">
                                <line x1="290" y1="120" x2="290" y2="280" />
                                <line x1="280" y1="120" x2="300" y2="120" />
                                <line x1="280" y1="280" x2="300" y2="280" />
                            </g>
                            <text x="510" y="314" className="fill-slate-600">Material de la bobina</text>
                            <text x="510" y="284" className="fill-slate-600">Diámetro interno</text>
                            <text x="510" y="254" className="fill-slate-600">Altura del material de la bobina</text>
                            <text x="510" y="224" className="fill-slate-600">Altura del devanado del alambre</text>
                            <text x="510" y="194" className="fill-slate-600">Cantidad de capas</text>
                            <text x="510" y="164" className="fill-slate-600">Impedancia</text>
                        </g>
                    </svg>
                </div>
                
                {/* Generated Code Section */}
                <div className="bg-slate-100 rounded-lg p-4 mt-6 ring-1 ring-slate-200">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-600">Información generada</p>
                        <div className="flex space-x-2">
                            <button
                                onClick={handleCopy}
                                className="p-1.5 rounded-md hover:bg-slate-200 text-slate-500 hover:text-indigo-600 transition-colors duration-200"
                                title="Copiar código"
                            >
                                {copied ? <CheckIcon className="w-5 h-5" /> : <ClipboardIcon className="w-5 h-5" />}
                            </button>
                            <button
                                onClick={handleDownload}
                                className="p-1.5 rounded-md hover:bg-slate-200 text-slate-500 hover:text-indigo-600 transition-colors duration-200"
                                title="Descargar especificaciones"
                            >
                                <DownloadIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <p className="font-orbitron text-xl md:text-2xl text-indigo-600 break-all mt-2">
                        {generatedCode}
                    </p>
                </div>
            </div>
        </div>
    );
};