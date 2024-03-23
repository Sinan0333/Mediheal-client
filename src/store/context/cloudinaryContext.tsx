import  { createContext, ReactNode } from 'react';
import { Cloudinary } from "@cloudinary/url-gen";

export const CloudinaryContext = createContext<Cloudinary | null>(null);

interface CloudinaryProviderProps {
    children: ReactNode;
}

export default function CloudinaryProvider({ children }: CloudinaryProviderProps) {
    const cld = new Cloudinary({
        cloud: {
            cloudName: "dw2cscitl"
        }
    });

    return (
        <CloudinaryContext.Provider value={cld}>
            {children}
        </CloudinaryContext.Provider>
    );
}
