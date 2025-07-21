export interface Province {
  code: number;
  name: string;
}

export interface District {
  code: number;
  name: string;
  provinceCode: number;
}

export interface Ward {
  code: number;
  name: string;
  districtCode: number;
}

export interface ProvinceDetailResponse extends Province {
  districts: District[];
}

export interface DistrictDetailResponse extends District {
  wards: Ward[];
}
