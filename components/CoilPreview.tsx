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

    const handleWhatsApp = () => {
        const { material, internalDiameter, coilHeight, windingHeight, impedance, numberOfLayers } = params;
        const materialLabel = MATERIAL_OPTIONS.find(opt => opt.value === material)?.label || material;

        const message = `Hola, estoy interesado en una bobina personalizada con las siguientes especificaciones:

*Diseño de Bobina para Parlantes*
• Material de la bobina: ${materialLabel}
• Diámetro Interno: ${internalDiameter} mm
• Altura del Material de la Bobina: ${coilHeight} mm
• Altura del Devanado del Alambre: ${windingHeight} mm
• Cantidad de Capas: ${numberOfLayers}
• Impedancia: ${impedance} Ω

*Código generado:* ${generatedCode}

¿Podrían cotizarme esta bobina?`;

        const whatsappNumber = '+573134954505';
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
    };


    return (
        <div className="bg-white rounded-lg p-6 h-full flex flex-col justify-between shadow-lg ring-1 ring-slate-200">
            <div>
                <h3 className="text-lg font-semibold leading-6 text-slate-900">Vista Previa del Diseño</h3>
                <p className="mt-1 text-sm text-slate-600">Diagrama esquemático y medidas exportables.</p>
                
                {/* SVG Diagram */}
                <div className="mt-6 flex justify-center">
                    <svg viewBox="0 0 850 340" className="w-full h-full">
                        <defs>
                            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5"
                                markerWidth="6" markerHeight="6"
                                orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" className="text-slate-400" />
                            </marker>
                        </defs>

                        <g className="font-orbitron text-slate-900 text-lg" textAnchor="middle">
                            <text x="60" y="40">{params.material}</text>
                            <text x="155" y="40">{params.internalDiameter}</text>
                            <text x="250" y="40">{params.coilHeight}</text>
                            <text x="345" y="40">{params.windingHeight}</text>
                            <text x="440" y="40">{params.numberOfLayers}</text>
                            <text x="535" y="40">{`${params.impedance}Ω`}</text>
                        </g>

                        <g className="stroke-slate-400" strokeWidth="2">
                            <line x1="60" y1="50" x2="535" y2="50" />
                            <line x1="60" y1="50" x2="60" y2="310" />
                            <line x1="155" y1="50" x2="155" y2="280" />
                            <line x1="250" y1="50" x2="250" y2="250" />
                            <line x1="345" y1="50" x2="345" y2="220" />
                            <line x1="440" y1="50" x2="440" y2="190" />
                            <line x1="535" y1="50" x2="535" y2="160" />
                        </g>
                        
                        <g className="font-sans text-slate-600" fontSize="14">
                            <g className="stroke-slate-400" strokeWidth="1">
                                <line x1="60" y1="310" x2="500" y2="310" markerEnd="url(#arrow)" />
                                <line x1="155" y1="280" x2="500" y2="280" markerEnd="url(#arrow)" />
                                <line x1="250" y1="250" x2="500" y2="250" markerEnd="url(#arrow)" />
                                <line x1="345" y1="220" x2="500" y2="220" markerEnd="url(#arrow)" />
                                <line x1="440" y1="190" x2="500" y2="190" markerEnd="url(#arrow)" />
                                <line x1="535" y1="160" x2="500" y2="160" markerEnd="url(#arrow)" />
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
                    
                    {/* WhatsApp Button */}
                    <div className="mt-4 pt-4 border-t border-slate-200">
                        <button
                            onClick={handleWhatsApp}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                            </svg>
                            <span>Termina tu pedido por WhatsApp</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};