import { FeedbackDTO } from "../../types/Feedback/feedback.type";
import { PaginationResult } from "../../types/Generict/PaginationResult.type";
import { ServiceRating } from "../../types/Services/ServiceRating.type";
import { Categories, GetServicesQuery, Service, ServiceRatingDetailDto, Services } from "../../types/Services/Services.type";
import { createGetThunk, createPostThunk } from "../genericsCreateThunk";


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
