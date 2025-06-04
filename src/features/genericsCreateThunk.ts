import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosInstance";
import { GenericResponse } from "../types/GenerictResponse";

interface ThunkOptions<RequestType> {
  onSuccess?: (result: string) => void;
  buildUrl?: (payload: RequestType) => string;
  config?: (payload: RequestType) => object;
  onError?: (message: string) => void;
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
        console.log("data nè", res.data);
        return res.data;
      } catch (err) {
        const error = err as unknown as {
          response?: { data?: { message?: string } };
        };
        const message = error.response?.data?.message || "GET request failed";
        options?.onError?.(message);
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
  options?: ThunkOptions<RequestType>
) {
  return createAsyncThunk<GenericResponse<ResponseType>, RequestType, { rejectValue: string }>(
    typePrefix,
    async (payload, { rejectWithValue }) => {
      try {
        const url = options?.buildUrl?.(payload) ?? defaultUrl;
        const config = options?.config?.(payload);
        const res = await axiosInstance.post<GenericResponse<ResponseType>>(
          url,
          payload,
          config
        );
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
        options?.onError?.(message);
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
        options?.onError?.(message);
        console.error(message);
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
        options?.onError?.(message);
        console.error(message);
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

        options?.onError?.(message);
        console.error("[DELETE Thunk] Error:", message);

        return rejectWithValue(message);
      }
    }
  );
}
