import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../config/axiosInstance';

interface ThunkOptions<RequestType> {
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
  return createAsyncThunk<ResponseType, RequestType, { rejectValue: string }>(
    typePrefix,
    async (payload, { rejectWithValue }) => {
      try {
        const url = options?.buildUrl?.(payload) ?? defaultUrl;
        const config = options?.config?.(payload);
        const res = await axiosInstance.get<ResponseType>(url, config);
        console.log(res.data)
        return res.data;
      } catch (err) {
        const error = err as unknown as { response?: { data?: { message?: string } } };
        const message = error.response?.data?.message || 'GET request failed';
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
export function createPostThunk<ResponseType, RequestType = void>(
  typePrefix: string,
  defaultUrl: string,
  options?: ThunkOptions<RequestType>
) {
  return createAsyncThunk<ResponseType, RequestType, { rejectValue: string }>(
    typePrefix,
    async (payload, { rejectWithValue }) => {
      try {
        const url = options?.buildUrl?.(payload) ?? defaultUrl;
        const config = options?.config?.(payload);
        const res = await axiosInstance.post<ResponseType>(url, payload, config);
        return res.data;
      } catch (err) {
        const error = err as unknown as { response?: { data?: { message?: string } } };
        const message = error.response?.data?.message || 'GET request failed';
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
  return createAsyncThunk<ResponseType, RequestType, { rejectValue: string }>(
    typePrefix,
    async (payload, { rejectWithValue }) => {
      try {
        const url = options?.buildUrl?.(payload) ?? defaultUrl;
        const config = options?.config?.(payload);
        const res = await axiosInstance.put<ResponseType>(url, payload, config);
        return res.data;
      } catch (err) {
        const error = err as unknown as { response?: { data?: { message?: string } } };
        const message = error.response?.data?.message || 'GET request failed';
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
  return createAsyncThunk<ResponseType, RequestType, { rejectValue: string }>(
    typePrefix,
    async (payload, { rejectWithValue }) => {
      try {
        const url = options?.buildUrl?.(payload) ?? defaultUrl;
        const config = options?.config?.(payload);
        const res = await axiosInstance.patch<ResponseType>(url, payload, config);
        return res.data;
      } catch (err) {
        const error = err as unknown as { response?: { data?: { message?: string } } };
        const message = error.response?.data?.message || 'GET request failed';
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
  return createAsyncThunk<ResponseType, RequestType, { rejectValue: string }>(
    typePrefix,
    async (payload, { rejectWithValue }) => {
      try {
        const url = options?.buildUrl?.(payload) ?? defaultUrl;
        const config = options?.config?.(payload);
        const res = await axiosInstance.delete<ResponseType>(url, config);
        return res.data;
      } catch (err) {
        const error = err as unknown as { response?: { data?: { message?: string } } };
        const message = error.response?.data?.message || 'GET request failed';
        options?.onError?.(message);
        console.error(message);
        return rejectWithValue(message);
      }
      
    }
  );
}
