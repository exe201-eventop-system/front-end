import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from ".././utils/api/axiosInstance";
import { GenericResponse } from "../types/Generict/GenerictResponse";
import { toast } from "react-toastify";

interface ThunkOptions<RequestType, ResponseType = void> {
  buildUrl?: (payload: RequestType) => string;
  config?: (payload: RequestType) => object;
  buildBody?: (payload: RequestType) => any;
  onSuccess?: (response: GenericResponse<ResponseType>, payload: RequestType) => void;
  onError?: (error: any, payload: RequestType) => void;
  onFinally?: (payload: RequestType) => void;
}
// ===============================
// Generic GET
// ===============================
export function createGetThunk<ResponseType, RequestType = void>(
  typePrefix: string,
  defaultUrl: string,
  options?: ThunkOptions<RequestType>
) {
  return createAsyncThunk<GenericResponse<ResponseType>, RequestType, { rejectValue: string }>(
    typePrefix,
    async (payload, { rejectWithValue }) => {
      try {
        const url = options?.buildUrl?.(payload) ?? defaultUrl;
        const config = options?.config?.(payload);
        const res = await axiosInstance.get<GenericResponse<ResponseType>>(url, config);
        console.log("res", res.data);
        return res.data;
      } catch (err) {
        const error = err as unknown as {
          response?: { data?: { message?: string } };
        };
        const message = error.response?.data?.message || "GET request failed";
        console.error(message);
        return rejectWithValue(message);
      }
    }
  );
}

// ===============================
// Generic POST
// ===============================
export function createPostThunk<ResponseType = void, RequestType = void>(
  typePrefix: string,
  defaultUrl: string,
  options?: ThunkOptions<RequestType, ResponseType>
) {
  return createAsyncThunk<GenericResponse<ResponseType>, RequestType, { rejectValue: string }>(
    typePrefix,
    async (payload, { rejectWithValue }) => {
      try {
        const url = options?.buildUrl?.(payload) ?? defaultUrl;
        const body = options?.buildBody?.(payload) ?? payload;
        const config = options?.config?.(payload);
        console.groupCollapsed(`[POST THUNK] ${typePrefix}`);
        console.log("🔹 URL:", url);
        console.log("🔹 Payload:", payload);
        console.log("🔹 Config:", config);
        const res = await axiosInstance.post<GenericResponse<ResponseType>>(
          url,
          body,
          config
        );
        console.log("res", res.data);
        options?.onSuccess?.(res.data, payload);
        return res.data;
      } catch (err) {
        const error = err as unknown as {
          response?: { data?: { message?: string } };
        };
        console.error("🔹 [PlanningThunk] Error details:", {
          error,
          response: error.response,
          data: error.response?.data,
          message: error.response?.data?.message
        });
        const message = error.response?.data?.message || "POST request failed";
        console.error(message);
        return rejectWithValue(message);
      }
    }
  );
}

// ===============================
// Generic PUT
// ===============================
export function createPutThunk<ResponseType, RequestType = void>(
  typePrefix: string,
  defaultUrl: string,
  options?: ThunkOptions<RequestType>
) {
  return createAsyncThunk<GenericResponse<ResponseType>, RequestType, { rejectValue: string }>(
    typePrefix,
    async (payload, { rejectWithValue }) => {
      try {
        const url = options?.buildUrl?.(payload) ?? defaultUrl;
        const config = options?.config?.(payload);
        const res = await axiosInstance.put<GenericResponse<ResponseType>>(url, payload, config);
        console.log("data nè nha:", res.data.data);
        return res.data;
      } catch (err) {
        const error = err as unknown as {
          response?: { data?: { message?: string } };
        };
        const message = error.response?.data?.message || "PUT request failed";
        console.error(message);
        toast.error(message);
        return rejectWithValue(message);
      }
    }
  );
}

// ===============================
// Generic PATCH
// ===============================
export function createPatchThunk<ResponseType, RequestType = void>(
  typePrefix: string,
  defaultUrl: string,
  options?: ThunkOptions<RequestType>
) {
  return createAsyncThunk<GenericResponse<ResponseType>, RequestType, { rejectValue: string }>(
    typePrefix,
    async (payload, { rejectWithValue }) => {
      try {
        const url = options?.buildUrl?.(payload) ?? defaultUrl;
        const config = options?.config?.(payload);
        const res = await axiosInstance.patch<GenericResponse<ResponseType>>(
          url,
          payload,
          config
        );
        return res.data;
      } catch (err) {
        const error = err as unknown as {
          response?: { data?: { message?: string } };
        };
        const message = error.response?.data?.message || "PATCH request failed";
        console.error(message);
        toast.error(message);
        return rejectWithValue(message);
      }
    }
  );
}

// ===============================
// Generic DELETE
// ===============================
export function createDeleteThunk<ResponseType, RequestType = void>(
  typePrefix: string,
  defaultUrl: string,
  options?: ThunkOptions<RequestType>
) {
  return createAsyncThunk<GenericResponse<ResponseType>, RequestType, { rejectValue: string }>(
    typePrefix,
    async (payload, { rejectWithValue }) => {
      try {
        const url = options?.buildUrl?.(payload) ?? defaultUrl;
        const config = options?.config?.(payload);

        // ✅ Log thông tin đã truyền đi
        console.log("[DELETE Thunk] Payload:", payload);
        console.log("[DELETE Thunk] URL:", url);
        console.log("[DELETE Thunk] Config:", config);

        const res = await axiosInstance.delete<GenericResponse<ResponseType>>(url, config);
        return res.data;
      } catch (err) {
        const error = err as unknown as {
          response?: { data?: { message?: string } };
        };
        const message = error.response?.data?.message || "DELETE request failed";

        console.error("[DELETE Thunk] Error:", message);
        toast.error(message);

        return rejectWithValue(message);
      }
    }
  );
}

