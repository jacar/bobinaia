
import { GoogleGenAI, Type } from "@google/genai";
import type { CoilParameters } from '../types';
import { CoilMaterial } from '../types';

if (!process.env.API_KEY) {
    // This is a fallback for development; in the target environment, the key is expected to be present.
    console.warn("La variable de entorno API_KEY no está configurada. Las funciones de IA no funcionarán.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        material: {
            type: Type.STRING,
            description: "El material de la bobina. Debe ser uno de: KS, AL, TL.",
            enum: [CoilMaterial.Kapton, CoilMaterial.Aluminium, CoilMaterial.TILL],
        },
        internalDiameter: {
            type: Type.NUMBER,
            description: "El diámetro interno de la bobina en milímetros.",
        },
        coilHeight: {
            type: Type.NUMBER,
            description: "La altura total del material de la bobina en milímetros.",
        },
        windingHeight: {
            type: Type.NUMBER,
            description: "La altura del devanado de alambre en la bobina en milímetros.",
        },
        impedance: {
            type: Type.NUMBER,
            description: "La impedancia de la bobina en Ohms.",
        },
        numberOfLayers: {
            type: Type.INTEGER,
            description: "El número de capas del devanado, normalmente entre 1 y 4.",
        },
    },
    required: ["material", "internalDiameter", "coilHeight", "windingHeight", "impedance", "numberOfLayers"]
};


export const getAiCoilSuggestions = async (prompt: string): Promise<CoilParameters> => {
    if (!process.env.API_KEY) {
        throw new Error("La clave de API no está configurada. No se pueden usar las funciones de IA.");
    }
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Basado en la solicitud del usuario, proporciona los parámetros para una bobina para parlantes. Incluye la cantidad de capas del devanado. Asegúrate de que los valores sean realistas para aplicaciones de altavoces de audio. Solicitud del usuario: "${prompt}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const jsonText = response.text.trim();
        const suggestedParams = JSON.parse(jsonText);
        
        if (
            !suggestedParams ||
            typeof suggestedParams.internalDiameter !== 'number' ||
            typeof suggestedParams.coilHeight !== 'number' ||
            typeof suggestedParams.windingHeight !== 'number' ||
            typeof suggestedParams.impedance !== 'number' ||
            typeof suggestedParams.numberOfLayers !== 'number' ||
            !Object.values(CoilMaterial).includes(suggestedParams.material)
        ) {
            throw new Error("La respuesta de la IA no coincide con el formato esperado.");
        }
        
        return suggestedParams as CoilParameters;

    } catch (error) {
        console.error("Error al obtener sugerencias de la IA:", error);
        throw new Error("No se pudieron obtener sugerencias de la IA. Revisa la consola para más detalles.");
    }
};
