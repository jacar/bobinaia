
import React from 'react';
import { UserIcon, WhatsAppIcon, EmailIcon, LocationIcon } from '../constants';

const ContactInfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string; href?: string }> = ({ icon, label, value, href }) => (
    <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
            {icon}
        </div>
        <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-800">{label}</h3>
            {href ? (
                <a 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-md text-indigo-600 hover:text-indigo-800 hover:underline break-all"
                >
                    {value}
                </a>
            ) : (
                <p className="text-md text-slate-600 break-all">{value}</p>
            )}
        </div>
    </div>
);

export const ContactPage: React.FC = () => {
    return (
        <div>
            <p className="text-center text-md text-slate-500 mb-8">
                ¿Preguntas, sugerencias o propuestas? Contáctame.
            </p>
            
            <div className="bg-slate-50 rounded-lg p-6 sm:p-8 shadow-inner ring-1 ring-slate-200">
                <div className="space-y-8">
                    <ContactInfoItem 
                        icon={<UserIcon className="w-6 h-6 text-indigo-600" />}
                        label="Nombre"
                        value="Armando Ovalle J"
                    />
                     <ContactInfoItem 
                        icon={<WhatsAppIcon className="w-6 h-6 text-green-500" />}
                        label="WhatsApp"
                        value="+57 305 289 1719"
                        href="https://wa.me/573052891719"
                    />
                     <ContactInfoItem 
                        icon={<EmailIcon className="w-6 h-6 text-indigo-600" />}
                        label="Email"
                        value="ovalle_938@hotmail.com"
                        href="mailto:ovalle_938@hotmail.com"
                    />
                     <ContactInfoItem 
                        icon={<LocationIcon className="w-6 h-6 text-red-600" />}
                        label="Ubicación"
                        value="Medellín, Colombia"
                    />
                </div>
            </div>
        </div>
    );
};
