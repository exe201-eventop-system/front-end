import { createGetThunk, createPostThunk } from "../genericsCreateThunk";
import {
    PlaningStep1Request,
    PlaningResponse,
} from "../../types/Planning.type";
import { toast } from "react-toastify";
//import { PaginationResult } from "../../types/PaginationResult.type";

export const addItemToCart = createPostThunk<number, string>(
    "cart/item",
    "cart/item",
    {
        onError: (msg) => toast.error(`Đăng ký thất bại: ${msg}`),
    }
);
export const getAllCart = createGetThunk<PlaningResponse, PlaningStep1Request>(
    "cart",
    "cart",
    {
        onError: (msg) => toast.error(`Đăng ký thất bại: ${msg}`),
    }
);
export const getTotalCart = createGetThunk<number, void>(
    "cart/totalCart",
    "cart/totalCart",
    {
        onError: (msg) => toast.error(`Đăng ký thất bại: ${msg}`),
    }
);

export const getAlanning = createGetThunk<PlaningResponse, { planningId: string }>(
    "planning/detail",
    "planning",
    {
        buildUrl: (payload) => `planning/${payload.planningId}`,
        onError: (msg) => toast.error(`Không thể lấy thông tin chi tiết: ${msg}`),
    }
);
export const getNumberPlaning = createGetThunk<number, void>(
    "planning/number",
    "planning",
    {
        buildUrl: () => `planning/number`,
        onError: (msg) => toast.error(`Không thể lấy thông tin chi tiết: ${msg}`),
    }
);