
import React from 'react';
import { MATERIAL_OPTIONS } from '../constants';
import type { CoilParameters, CoilMaterial } from '../types';

interface CoilDesignerFormProps {
    params: CoilParameters;
    onParamChange: <K extends keyof CoilParameters>(param: K, value: CoilParameters[K]) => void;
}

const InputField: React.FC<{
    label: string;
    id: keyof CoilParameters;
    value: number;
    unit: string;
    onParamChange: (param: keyof CoilParameters, value: number) => void;
    step?: string;
}> = ({ label, id, value, unit, onParamChange, step = "0.1" }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
            <input
                type="number"
                name={id}
                id={id}
                className="block w-full rounded-md border-0 py-2 pl-3 pr-12 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-sky-500 sm:text-sm transition-shadow"
                placeholder="0.0"
                value={value}
                onChange={(e) => onParamChange(id, parseFloat(e.target.value) || 0)}
                step={step}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-slate-500 dark:text-slate-400 sm:text-sm">{unit}</span>
            </div>
        </div>
    </div>
);

export const CoilDesignerForm: React.FC<CoilDesignerFormProps> = ({ params, onParamChange }) => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold leading-6 text-slate-900 dark:text-slate-100">Parámetros de la Bobina</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Define las especificaciones para tu bobina de parlante.</p>
            </div>
            
            <div>
                <label htmlFor="material" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Material de la Bobina
                </label>
                <select
                    id="material"
                    name="material"
                    className="mt-1 block w-full rounded-md border-0 bg-white dark:bg-slate-900 py-2 pl-3 pr-10 text-slate-900 dark:text-slate-200 ring-1 ring-inset ring-slate-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-sky-500 sm:text-sm transition-shadow"
                    value={params.material}
                    onChange={(e) => onParamChange('material', e.target.value as CoilMaterial)}
                >
                    {MATERIAL_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <InputField label="Diámetro Interno" id="internalDiameter" value={params.internalDiameter} unit="mm" onParamChange={onParamChange as any} />
            <InputField label="Altura del Material de la Bobina" id="coilHeight" value={params.coilHeight} unit="mm" onParamChange={onParamChange as any} />
            <InputField label="Altura del Devanado del Alambre" id="windingHeight" value={params.windingHeight} unit="mm" onParamChange={onParamChange as any} />
            <InputField label="Cantidad de Capas" id="numberOfLayers" value={params.numberOfLayers} unit="capas" onParamChange={onParamChange as any} step="1" />
            <InputField label="Impedancia" id="impedance" value={params.impedance} unit="Ω" onParamChange={onParamChange as any} />
        </div>
    );
};
