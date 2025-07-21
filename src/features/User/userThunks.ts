// userThunks.ts
import { createGetThunk } from "../genericsCreateThunk";
import { UserAllInfo } from "../../types/Auth/User.type";
import { PaginationResult } from "../../types/Generict/PaginationResult.type";
import { GetAllUserQuery } from "../../types/User/User.type";



// Lấy danh sách tất cả users
export const getAllUser = createGetThunk<PaginationResult<UserAllInfo>, GetAllUserQuery>(
    "getAllUser", // action name
    "users", // endpoint
    {
        buildUrl: (params) => {
            const query = new URLSearchParams();
            query.append('page', (params.page ?? 1).toString());
            query.append('page_size', (params.page_size ?? 5).toString());
            if (params.search) query.append('search', params.search);
            return `users?${query.toString()}`;
        }
    }
);
