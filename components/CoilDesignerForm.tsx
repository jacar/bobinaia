
import React from 'react';
import { MATERIAL_OPTIONS } from '../constants';
import type { CoilParameters, CoilMaterial } from '../types';

interface CoilDesignerFormProps {
    params: CoilParameters;
    onParamChange: <K extends keyof CoilParameters>(param: K, value: CoilParameters[K]) => void;
}

const InputField: React.FC<{
    id: string;
    label: string;
    value: number;
    onChange: (value: number) => void;
    unit: string;
    min?: number;
    max?: number;
    step?: number;
}> = ({ id, label, value, onChange, unit, min, max, step }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">
            {label}
        </label>
        <div className="relative mt-1">
            <input
                type="number"
                id={id}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                min={min}
                max={max}
                step={step}
                className="block w-full rounded-md border border-black py-2 pl-3 pr-12 bg-white text-slate-900 focus:border-black focus:ring-black placeholder:text-slate-400 sm:text-sm transition-shadow"
            />
            <span className="text-slate-500 sm:text-sm">{unit}</span>
        </div>
    </div>
);

export const CoilDesignerForm: React.FC<CoilDesignerFormProps> = ({ params, onParamChange }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold leading-6 text-slate-900">Parámetros de la Bobina</h3>
            <p className="mt-1 text-sm text-slate-600">Define las especificaciones para tu bobina de parlante.</p>
            
            <div className="mt-6 space-y-6">
                <div>
                    <label htmlFor="material" className="block text-sm font-medium text-slate-700">
                        Material de la Bobina
                    </label>
                    <select
                        id="material"
                        value={params.material}
                        onChange={(e) => onParamChange('material', e.target.value as CoilMaterial)}
                        className="mt-1 block w-full rounded-md border border-black bg-white py-2 pl-3 pr-10 text-slate-900 focus:border-black focus:ring-black sm:text-sm transition-shadow"
                    >
                        {MATERIAL_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                
                <InputField
                    id="internalDiameter"
                    label="Diámetro Interno"
                    value={params.internalDiameter}
                    onChange={(value) => onParamChange('internalDiameter', value)}
                    unit="mm"
                    min={10}
                    max={200}
                    step={0.1}
                />
                
                <InputField
                    id="coilHeight"
                    label="Altura del Material de la Bobina"
                    value={params.coilHeight}
                    onChange={(value) => onParamChange('coilHeight', value)}
                    unit="mm"
                    min={10}
                    max={100}
                    step={1}
                />
                
                <InputField
                    id="windingHeight"
                    label="Altura del Devanado del Alambre"
                    value={params.windingHeight}
                    onChange={(value) => onParamChange('windingHeight', value)}
                    unit="mm"
                    min={5}
                    max={50}
                    step={1}
                />
                
                <InputField
                    id="numberOfLayers"
                    label="Cantidad de Capas"
                    value={params.numberOfLayers}
                    onChange={(value) => onParamChange('numberOfLayers', value)}
                    unit=""
                    min={1}
                    max={4}
                    step={1}
                />
                
                <InputField
                    id="impedance"
                    label="Impedancia"
                    value={params.impedance}
                    onChange={(value) => onParamChange('impedance', value)}
                    unit="Ω"
                    min={2}
                    max={16}
                    step={0.1}
                />
            </div>
        </div>
    );
};
