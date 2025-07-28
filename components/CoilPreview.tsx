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
        <div className="bg-white dark:bg-slate-900 rounded-lg p-6 h-full flex flex-col justify-between shadow-lg ring-1 ring-slate-200 dark:ring-slate-800">
            <div>
                <h3 className="text-lg font-semibold leading-6 text-slate-900 dark:text-slate-100">Vista Previa del Diseño</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Diagrama esquemático y medidas exportables.</p>
            </div>

            <div className="my-6 flex-grow flex items-center justify-center min-h-[340px] select-none">
                <svg viewBox="0 0 850 340" className="w-full h-full">
                    <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5"
                            markerWidth="6" markerHeight="6"
                            orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" className="text-slate-400 dark:text-slate-500" />
                        </marker>
                    </defs>

                    <g className="font-orbitron text-slate-900 dark:text-slate-200 text-lg" textAnchor="middle">
                        <text x="60" y="40">{params.material}</text>
                        <text x="155" y="40">{params.internalDiameter}</text>
                        <text x="250" y="40">{params.coilHeight}</text>
                        <text x="345" y="40">{params.windingHeight}</text>
                        <text x="440" y="40">{params.numberOfLayers}</text>
                        <text x="535" y="40">{`${params.impedance}Ω`}</text>
                    </g>

                    <g className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2">
                        <line x1="60" y1="50" x2="535" y2="50" />
                        <line x1="60" y1="50" x2="60" y2="310" />
                        <line x1="155" y1="50" x2="155" y2="280" />
                        <line x1="250" y1="50" x2="250" y2="250" />
                        <line x1="345" y1="50" x2="345" y2="220" />
                        <line x1="440" y1="50" x2="440" y2="190" />
                        <line x1="535" y1="50" x2="535" y2="160" />
                    </g>
                    
                    <g className="font-sans text-slate-600 dark:text-slate-400" fontSize="14">
                        <g className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="1">
                            <line x1="60" y1="310" x2="500" y2="310" markerEnd="url(#arrow)" />
                            <line x1="155" y1="280" x2="500" y2="280" markerEnd="url(#arrow)" />
                            <line x1="250" y1="250" x2="500" y2="250" markerEnd="url(#arrow)" />
                            <line x1="345" y1="220" x2="500" y2="220" markerEnd="url(#arrow)" />
                            <line x1="440" y1="190" x2="500" y2="190" markerEnd="url(#arrow)" />
                            <line x1="535" y1="160" x2="500" y2="160" markerEnd="url(#arrow)" />
                        </g>
                        
                        <text x="510" y="314" className="fill-slate-600 dark:fill-slate-400">Material de la bobina</text>
                        <text x="510" y="284" className="fill-slate-600 dark:fill-slate-400">Diámetro interno</text>
                        <text x="510" y="254" className="fill-slate-600 dark:fill-slate-400">Altura del material de la bobina</text>
                        <text x="510" y="224" className="fill-slate-600 dark:fill-slate-400">Altura del devanado del alambre</text>
                        <text x="510" y="194" className="fill-slate-600 dark:fill-slate-400">Cantidad de capas</text>
                        <text x="510" y="164" className="fill-slate-600 dark:fill-slate-400">Impedancia</text>
                    </g>
                </svg>
            </div>

            <div className="bg-slate-100 dark:bg-slate-800/50 rounded-lg p-4 mt-6 ring-1 ring-slate-200 dark:ring-slate-700">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Información generada</p>
                     <div className="flex items-center space-x-1">
                        <button
                            onClick={handleDownload}
                            className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-sky-400 transition-colors duration-200"
                            title="Descargar medidas"
                        >
                            <DownloadIcon className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleCopy}
                            className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-sky-400 transition-colors duration-200"
                            title="Copiar al portapapeles"
                        >
                            {copied ? <CheckIcon className="w-5 h-5 text-green-500" /> : <ClipboardIcon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
                <p className="font-orbitron text-xl md:text-2xl text-indigo-600 dark:text-sky-400 break-all mt-2">
                    {generatedCode}
                </p>
            </div>
        </div>
    );
};