import { createPostThunk, createGetThunk, createPutThunk, createDeleteThunk } from "../genericsCreateThunk";
import {
  PlaningStep1Request,
  PlaningResponse,
  PlaningStep2Request,
} from "../../types/Planning.type";
import { toast } from "react-toastify";
import { PaginationResult } from "../../types/PaginationResult.type";

export const createPlanningStep1 = createPostThunk<PlaningResponse, PlaningStep1Request>(
  "planning/step-1",
  "planning/step-1",
  {
    onError: (msg) => toast.error(`Đăng ký thất bại: ${msg}`),
  }
);

export const createPlanningStep2 = createPutThunk<PlaningResponse, PlaningStep2Request>(
  "planning/step-2",
  "planning/step-2",
  {
    onError: (msg) => toast.error(`Đăng ký thất bại: ${msg}`),
  }
);

export const getPlanning = createGetThunk<PaginationResult<PlaningResponse>, {
  status?: string;
  search?: string;
  page?: number;
  size?: number;
}>(
  "planning/get",
  "planning",
  {
    onError: (msg) => toast.error(`Đăng ký thất bại: ${msg}`),
  }
);

export const getAPlanning = createGetThunk<PlaningResponse, { planningId: string }>(
  "planning/detail",
  "planning",
  {
    buildUrl: (payload) => `planning/${payload.planningId}`,
    onError: (msg) => toast.error(`Không thể lấy thông tin chi tiết: ${msg}`),
  }
);
export const deletePlanning = createDeleteThunk<void, { planningId: string }>(
  "planning/delete",
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