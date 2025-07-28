
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
    return (
        <div>
            <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">Última actualización: {new Date().toLocaleDateString()}</p>

            <PageSection title="1. Aceptación de los Términos">
                <p>Al acceder y utilizar el "Diseñador de Bobinas para Parlantes" (en adelante, "la Herramienta"), usted acepta y se compromete a cumplir con los términos y condiciones descritos en esta política. Si no está de acuerdo con alguno de estos términos, no debe utilizar la Herramienta.</p>
            </PageSection>

            <PageSection title="2. Descripción del Servicio">
                <p>La Herramienta proporciona a los usuarios la capacidad de diseñar especificaciones para bobinas de parlantes. Esto se puede hacer manualmente, introduciendo parámetros específicos, o utilizando el Asistente de IA, que aprovecha la API de Google Gemini para generar sugerencias de diseño basadas en las descripciones del usuario.</p>
            </PageSection>
            
            <PageSection title="3. Uso Apropiado">
                <p>Usted se compromete a utilizar la Herramienta únicamente con fines legítimos y relacionados con el diseño y la ingeniería de audio. Está prohibido utilizar la Herramienta para:</p>
                <ul>
                    <li>Realizar actividades ilegales o fraudulentas.</li>
                    <li>Introducir datos maliciosos, falsos o que puedan comprometer la integridad de la Herramienta o de la API de IA subyacente.</li>
                    <li>Intentar realizar ingeniería inversa, descompilar o acceder al código fuente de la Herramienta.</li>
                    <li>Saturar el servicio con solicitudes automáticas excesivas (spamming).</li>
                </ul>
            </PageSection>

            <PageSection title="4. Responsabilidad y Exención de Garantía">
                <p>Los diseños y sugerencias generados por la Herramienta, tanto manual como a través de la IA, se proporcionan "tal cual", sin garantías de ningún tipo, ya sean expresas o implícitas. Si bien nos esforzamos por la precisión, no garantizamos que los parámetros generados sean perfectos, óptimos o adecuados para todas las aplicaciones posibles.</p>
                <p>Es responsabilidad exclusiva del usuario verificar, validar y probar los diseños antes de su implementación en cualquier proyecto físico. No nos hacemos responsables de ningún daño, pérdida de material, costo o perjuicio resultante del uso de los diseños generados por esta Herramienta.</p>
            </PageSection>

            <PageSection title="5. Uso de la IA de Terceros">
                <p>El Asistente de IA utiliza la API de Google Gemini. Al utilizar esta función, usted reconoce que sus solicitudes (prompts) se envían a los servidores de Google para su procesamiento. El uso de esta función está sujeto también a los términos de servicio de Google.</p>
            </PageSection>
            
            <PageSection title="6. Modificaciones de los Términos">
                <p>Nos reservamos el derecho de modificar o reemplazar estas políticas en cualquier momento. El uso continuado de la Herramienta después de dichas modificaciones constituirá su aceptación de los nuevos términos.</p>
            </PageSection>
        </div>
    );
};
