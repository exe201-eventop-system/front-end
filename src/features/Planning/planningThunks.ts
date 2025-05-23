import { createPostThunk, createGetThunk } from "../genericsCreateThunk";
import {
  PlaningStep1Request,
  PlaningResponse,
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

export const getPlanning = createGetThunk<PaginationResult<PlaningResponse>, {
  status?: string;
  search?: string;
  page?: number;
  size?: number;
}>(
  "planning",
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
