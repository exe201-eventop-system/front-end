import { createPostThunk, createGetThunk, createPutThunk, createDeleteThunk } from "../genericsCreateThunk";
import {
  PlaningStep1Request,
  PlaningResponse,
  PlaningStep2Request,
  AddServiceRequest,
  DeleteServiceRequest,

} from "../../types/Planning/Planning.type";
import { PaginationResult } from "../../types/Generict/PaginationResult.type";


export const createPlanningStep1 = createPostThunk<PlaningResponse, PlaningStep1Request>(
  "planning/step1",
  "planning/step1",

);

export const createPlanningStep2 = createPutThunk<PlaningResponse, PlaningStep2Request>(
  "planning/step2",
  "planning/step2",
);

export const getPlanning = createGetThunk<PaginationResult<PlaningResponse>, {
  status?: string;
  search?: string;
  page?: number;
  size?: number;
}>(
  "planning/get",
  "planning",
);

export const getAPlanning = createGetThunk<PlaningResponse, { planningId: string }>(
  "planning/detail",
  "planning",
  {
    buildUrl: (payload) => `planning/${payload.planningId}`,
  }
);
export const deletePlanning = createDeleteThunk<boolean, { planningId: string }>(
  "planning/delete",
  "planning",
  {
    buildUrl: (payload) => `planning/${payload.planningId}`,
  }
);
export const getNumberPlaning = createGetThunk<number, void>(
  "planning/total-planning",
  "planning/total-planning",
  {
    buildUrl: () => `planning/total-planning`,
  }
);

export const addServiceToPlanning = createPostThunk<string, AddServiceRequest>(
  'planning/addServiceToPlanning',
  'planning/add-service',
);

export const deleteServiceFromPlanning = createDeleteThunk<void, DeleteServiceRequest>(
  'planning/deleteServiceFromPlanning',
  '', // dùng buildUrl nên defaultUrl để rỗng
  {
    buildUrl: ({ sessionId }) => `/planning/delete-service/${sessionId}`,
    config: () => ({}), // nếu cần header thì thêm ở đây
  }
);

export const acceptAIPlanning = createPutThunk<PlaningResponse, { planningId: string }>(
  'planning/acceptAI',
  'planning',
  {
    buildUrl: (payload) => `planning/${payload.planningId}/accept`,
  }
);
