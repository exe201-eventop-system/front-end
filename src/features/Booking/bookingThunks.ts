import { createGetThunk, createPostThunk } from "../genericsCreateThunk";
import { BookingHistoryDTO } from "../../types/History/bookingHitstory";
import { UsedServiceStatus } from "../../types/Services/Services.type";
import { SystemFeedbackGroup,  UserAnswerSystem } from "../../types/Feedback/feedback.type";


export const getBookingHistory = createGetThunk<BookingHistoryDTO[], { status: UsedServiceStatus }>(
    "cart/used-service",
    "used-service",
    {
        buildUrl: (payload) => `used-service/${payload.status}`,
    }
);
export const getQuestionSystem = createGetThunk<SystemFeedbackGroup[], void>(
    "feedback/system/question",
    "feedback/system/question",
);

export const createQuestionSystem = createPostThunk<void, UserAnswerSystem>(
    "feedback/system",
    "feedback/system",
);