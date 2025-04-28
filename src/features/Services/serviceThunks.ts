import { Service } from "../../types/Services.type";
import { createGetThunk } from "../genericsCreateThunk";  
import { toast } from 'react-toastify';


export const Services = createGetThunk<Service[], void>(  
    `posts/fetchAll`, 
    `posts`,  
    {
        onError: (msg) => toast.error(`Lấy blog thất bại: ${msg}`),  
    }
);

export const ServiceDetail = createGetThunk<Service, { id: string }>( 
    `posts/fetchDetail`,  
    `posts`,  
    {
        buildUrl: (payload) => `posts/${payload.id}`,  
        onError: (msg) => toast.error(`Lấy blog thất bại: ${msg}`),  
    }
);
