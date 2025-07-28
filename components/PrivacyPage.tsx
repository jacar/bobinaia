
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
    return (
        <div>
            <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">Última actualización: {new Date().toLocaleDateString()}</p>
            
            <PageSection title="1. Compromiso con la Privacidad">
                <p>Su privacidad es importante para nosotros. Esta Política de Privacidad explica qué información procesamos, cómo la usamos y con qué propósito. Esta política se aplica al "Diseñador de Bobinas para Parlantes" (en adelante, "la Herramienta").</p>
            </PageSection>

            <PageSection title="2. Información que No Recopilamos">
                <p>No recopilamos, almacenamos ni solicitamos ninguna información de identificación personal (PII) como su nombre, dirección de correo electrónico, dirección física o número de teléfono. La Herramienta está diseñada para ser utilizada de forma anónima.</p>
            </PageSection>

            <PageSection title="3. Información Procesada por el Asistente de IA">
                <p>Al utilizar la función "Generar con IA", el texto que usted introduce (el "prompt") se envía a la API de Google Gemini para generar los parámetros de la bobina. Este proceso es necesario para que la función de IA opere.</p>
                <ul>
                    <li>No almacenamos sus prompts en nuestros servidores una vez que la solicitud a la API ha sido completada.</li>
                    <li>El uso que Google hace de estos datos se rige por su propia política de privacidad y términos de servicio. Le recomendamos no incluir información sensible o personal en sus prompts.</li>
                    <li>Utilizamos la clave de API directamente en el cliente, lo que significa que la solicitud va desde su navegador a los servidores de Google.</li>
                </ul>
            </PageSection>

            <PageSection title="4. Datos de Diseño y Almacenamiento Local">
                 <p>Los parámetros de la bobina que usted introduce manualmente o que son generados por la IA se procesan localmente en su navegador para renderizar el diagrama y el código. La preferencia de tema (claro/oscuro) se guarda en el Almacenamiento Local de su navegador para mejorar su experiencia en visitas futuras. Aparte de esto, no guardamos ni rastreamos los diseños que usted crea.</p>
            </PageSection>
            
            <PageSection title="5. Cookies">
                <p>Actualmente, la Herramienta no utiliza cookies.</p>
            </PageSection>
            
            <PageSection title="6. Seguridad">
                <p>Nos tomamos en serio la seguridad de la aplicación. Sin embargo, ninguna transmisión de datos a través de internet es 100% segura. Al enviar prompts a la API de IA, usted acepta los riesgos inherentes de la transmisión de datos en línea.</p>
            </PageSection>

            <PageSection title="7. Contacto">
                 <p>Si tiene alguna pregunta sobre esta Política de Privacidad, puede contactarnos a través de la información proporcionada en la sección de Contacto, accesible desde el menú principal.</p>
            </PageSection>
        </div>
    );
};
