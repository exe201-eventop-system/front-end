import { FeedbackDTO } from "../../types/Feedback/feedback.type";
import { PaginationResult } from "../../types/Generict/PaginationResult.type";
import { ServiceRating } from "../../types/Services/ServiceRating.type";
import { Categories, CreateProductCommand, CreateProductFormDTO, DeleteProductResult, GetServicesQuery, ProductSummaryItems, Service, ServiceRatingDetailDto, Services, UploadedImage, UploadProductImageFormDTO } from "../../types/Services/Services.type";
import { createDeleteThunk, createGetThunk, createPostThunk } from "../genericsCreateThunk";


export const getServices = createGetThunk<PaginationResult<Services>, GetServicesQuery>(
    `services/services`,
    `services`,
    {
        buildUrl: (params) => {
            const query = new URLSearchParams();
            query.append('page', (params.page ?? 1).toString());
            query.append('page_size', (params.page_size ?? 12).toString());
            if (params.search) query.append('search', params.search);
            if (params.package_name) query.append('package_name', params.package_name);
            return `services?${query.toString()}`;
        }
    }
);

export const GetService = createGetThunk<Service, { id: string }>(
    `services/service`,
    `services`,
    {
        buildUrl: (payload) => `services/${payload.id}`,
    }
);
export const getServiceFeedback = createGetThunk<Service, { id: string }>(
    `services/service-feedback`,
    `services`,
    {
        buildUrl: (payload) => `services/${payload.id}`,
    }
);
export const getCategories = createGetThunk<Categories[], void>(
    `category/list`,
    `category/list`,
);
export const getServiceRating = createGetThunk<ServiceRating[], void>(
    `services/rating`,
    `services/by-rating`,
);
export const getServicesDetailRating = createGetThunk<ServiceRatingDetailDto, { service_id: string }>(
    "supplier/detail-rating",
    "supplier/detail-rating",
    {
        buildUrl: (payload) => `feedback/service/${payload.service_id}`,
    }
);

export const feedbackServiceSupplier = createPostThunk<
    void,
    { id: string; feedback: FeedbackDTO }
>(
    "feedback/detail-rating",
    "feedback/detail-rating",
    {
        buildUrl: (payload) => `feedback/after-service/${payload.id}`,
        buildBody: (payload) => payload.feedback,
    }
);
export const createService = createPostThunk<
    void,
    CreateProductFormDTO
>(
    "services/create",
    "services",
);
export const uploadImage = createPostThunk<
    void,
    UploadProductImageFormDTO
>(
    "services/create",
    "services/${id}/image",
);
export const getServcielIstSupplier = createGetThunk<
    ProductSummaryItems[],
    void
>(
    "services/supplier",
    "services/supplier",
);

export const createProduct = createPostThunk<
    string,
    CreateProductCommand
>(
    "services/supplier/create",
    "services",
);
export const uploadImageProduct = createPostThunk<
    UploadedImage[],
    UploadProductImageFormDTO
>(
    "services/image/create",
    "services/image",
    {
        buildBody: (payload) => {
            const formData = new FormData();
            formData.append('productId', payload.productId);

            // Add thumbnail if exists
            if (payload.thumbnail) {
                formData.append('thumbnail', payload.thumbnail);
            }

            // Add multiple images
            payload.images.forEach((image) => {
                formData.append('images', image);
            });
            return formData;
        },
        config: () => ({
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
    }
);
export const deleteProduct = createDeleteThunk<
    DeleteProductResult,
    { id: string }
>(
    "services/supplier/delete",
    "services",
    {
        buildUrl: (payload) => `services/${payload.id}`,
    }
);