import { CategoryResponseDto } from "../../types/Category/category";
import { createGetThunk } from "../genericsCreateThunk";

export const getCategory = createGetThunk<CategoryResponseDto[], void>(
    "category/",
    "category/list"
);
