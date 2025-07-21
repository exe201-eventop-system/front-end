import { DashboardResponseDto, DashboardSupplierDTO } from "../../types/Dashboard/analysis";
import { createGetThunk } from "../genericsCreateThunk";


export const getDashboard = createGetThunk<DashboardResponseDto, void>(
    "dashboard/",
    "dashboard",
);
export const getDashboardSupplier = createGetThunk<DashboardSupplierDTO, void>(
    "dashboard/supplier",
    "dashboard/supplier",
);