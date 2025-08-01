import { createGetThunk, createPostThunk, createPutThunk } from "../genericsCreateThunk";
import {
  LoginRequest,
  LoginResponse,
  OPTRequest,
} from "../../types/Auth/Login.type";
import {
  RegisterRequest,
  ConfirmEmailResponse,
} from "../../types/Auth/Register.type";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/api/axiosInstance";
import {
  Province,
  District,
  Ward,
} from "../../types/Auth/Location.type";
import { User, UserProfile } from "../../types/Auth/User.type";

export const signIn = createPostThunk<LoginResponse, LoginRequest>(
  "auth/sign-in",
  "auth/sign-in",
);
export const sentOTP = createPostThunk<void, OPTRequest>(
  `auth/send-otp`,
  `auth/send-otp`,
);
export const getProfile = createGetThunk<UserProfile, void>(
  `users/profile`,
  `users/profile`,
);
export const signUp = createAsyncThunk<string, RegisterRequest, { rejectValue: string }>(
  "auth/sign-up",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/sign-up", payload);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Đăng ký thất bại";
      console.error("Signup error:", message);
      return rejectWithValue(message);
    }
  }
);
export const profile = createGetThunk<User, void>(
  `user`,
  `user`,
);
export const updateProfile = createPutThunk<UserProfile, UserProfile>(
  `user/update`,
  `user`,
);
export const confirmEmail = createPostThunk<
  ConfirmEmailResponse,
  { access_token: string }
>("auth/confirm-email", "auth/confirm-email", {
});

export const fetchProvinces = createAsyncThunk<Province[]>(
  "location/fetchProvinces",
  async (_, { rejectWithValue }) => {
    try {
      // Sử dụng GitHub API - hoạt động cả localhost và Vercel
      const response = await axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');

      const data = response.data;
      if (data && Array.isArray(data)) {
        const provinces = data.map((item: any, index: number) => ({
          code: index + 1,
          name: item.Name
        }));
        return provinces;
      } else {
        throw new Error("Invalid data format");
      }

    } catch (error) {
      console.error("Error fetching provinces:", error);
      return rejectWithValue("Không thể tải dữ liệu tỉnh/thành phố");
    }
  }
);

export const fetchDistricts = createAsyncThunk<District[], number>(
  "location/fetchDistricts",
  async (provinceCode, { rejectWithValue }) => {
    try {
      // Sử dụng GitHub API cho districts
      const response = await axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');

      const data = response.data;
      if (data && Array.isArray(data)) {
        const province = data[provinceCode - 1]; // provinceCode bắt đầu từ 1
        if (province && province.Districts) {
          const districts = province.Districts.map((item: any, index: number) => ({
            code: index + 1,
            name: item.Name,
            provinceCode: provinceCode
          }));
          return districts;
        }
      }

      return rejectWithValue("Không có dữ liệu quận/huyện");
    } catch (error) {
      console.error("Error fetching districts:", error);
      return rejectWithValue("Không thể tải dữ liệu quận/huyện");
    }
  }
);

export const fetchWards = createAsyncThunk<Ward[], number>(
  "location/fetchWards",
  async (districtCode, { rejectWithValue }) => {
    try {
      // Sử dụng GitHub API cho wards
      const response = await axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');

      const data = response.data;
      if (data && Array.isArray(data)) {
        // Tìm district trong tất cả provinces
        for (const province of data) {
          if (province.Districts) {
            for (const district of province.Districts) {
              if (district.Wards) {
                const wards = district.Wards.map((item: any, index: number) => ({
                  code: index + 1,
                  name: item.Name,
                  districtCode: districtCode
                }));
                return wards;
              }
            }
          }
        }
      }

      return rejectWithValue("Không có dữ liệu xã/phường");
    } catch (error) {
      console.error("Error fetching wards:", error);
      return rejectWithValue("Không thể tải dữ liệu xã/phường");
    }
  }
);