import { TimeSlotDto } from "../../types/Schedule/schedule";
import { Service } from "../../types/Services/Services.type";
import { createGetThunk } from "../genericsCreateThunk";


export const getSheduleSupplier = createGetThunk<TimeSlotDto[], { id_supplier: string }>(
    "used-service/supplier",
    "used-service",
    {
        buildUrl: (payload) => `used-service/${payload.id_supplier}/schedule-supplier`,
    }
);

export const GetService = createGetThunk<Service, { id: string }>(
    `services/service`,
    `services`,
    { 
        buildUrl: (payload) => `services/${payload.id}`,
    }
);
