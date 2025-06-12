import { createGetThunk, createPostThunk } from "../genericsCreateThunk";
import {
  LoginRequest,
  LoginResponse,
  OPTRequest,
} from "../../types/Login.type";
import {
  RegisterRequest,
  ConfirmEmailResponse,
} from "../../types/Register.type";
import { toast } from "react-toastify";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Province,
  District,
  Ward,
  ProvinceDetailResponse,
  DistrictDetailResponse,
} from "../../types/Location.type";
import { User } from "../../types/User.type";

export const signIn = createPostThunk<LoginResponse, LoginRequest>(
  `auth/sign-in`,
  `auth/sign-in`,
  {
    onError: (msg) => toast.error(`Đăng nhập thất bại: ${msg}`),
  }
);
export const sentOTP = createPostThunk<void, OPTRequest>(
  `auth/send-otp`,
  `auth/send-otp`,
  {
    onError: (msg) => toast.error(`Đăng nhập thất bại: ${msg}`),
  }
);
export const signUpWithGoogle = createAsyncThunk<void, void>(
  "auth/signUp-google",
  async (_, { rejectWithValue }) => {
    try {
      const gatewayUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
      window.location.href = `${gatewayUrl}/auth/signin-google`;

      // Trả về promise không bao giờ resolve để ngăn redux xử lý tiếp
      return new Promise(() => { });
    } catch (error) {
      console.error("Error initiating Google login:", error);
      return rejectWithValue("Lỗi khởi tạo đăng nhập Google");
    }
  }
);
export const signUp = createPostThunk<void, RegisterRequest>(
  "auth/sign-up",
  "auth/sign-up",
  {
    onError: (msg) => toast.error(`Đăng ký thất bại: ${msg}`),
  }
);
export const profile = createGetThunk<User, void>(
  `user`,
  `user`,
  {
    onError: (msg) => toast.error(`Đăng nhập thất bại: ${msg}`),
  }
);
export const confirmEmail = createPostThunk<
  ConfirmEmailResponse,
  { access_token: string }
>("auth/confirm-email", "auth/confirm-email", {
  onSuccess: () => toast.success("Xác minh email thành công!"),
  onError: (msg) => toast.error(`Xác minh email thất bại: ${msg}`),
});

export const fetchProvinces = createAsyncThunk<Province[]>(
  "location/fetchProvinces",
  async (_, { rejectWithValue }) => {
    const response = await axios.get<Province[]>(
      `${import.meta.env.VITE_LOCATION_URL}`
    );
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      return rejectWithValue("Response is not an array");
    }
  }
);
export const fetchDistricts = createAsyncThunk<District[], number>(
  "location/fetchDistricts",
  async (provinceCode, { rejectWithValue }) => {
    const response = await axios.get<ProvinceDetailResponse>(
      `${import.meta.env.VITE_LOCATION_URL}/${provinceCode}?depth=2`
    );
    if (response.data?.districts) {
      return response.data.districts;
    } else {
      return rejectWithValue("Không có dữ liệu quận/huyện");
    }
  }
);

export const fetchWards = createAsyncThunk<Ward[], number>(
  "location/fetchWards",
  async (districtCode, { rejectWithValue }) => {
    const response = await axios.get<DistrictDetailResponse>(
      `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
    );
    if (response.data?.wards) {
      return response.data.wards;
    } else {
      return rejectWithValue("Không có dữ liệu xã/phường");
    }
  }
);