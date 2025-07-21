import { createDeleteThunk, createGetThunk, createPostThunk, createPutThunk } from "../genericsCreateThunk";
import {
    AiPlanningRes,
    PlaningResponse,
} from "../../types/Planning/Planning.type";
import { Carts } from "../../types/Cart/Cart.type";
import { PaymentParams, TransactionDTOs, UsedService } from "../../types/Transaction/Payment.types";
import { FeedbackQuestionAnswer, RevenueDto } from "../../types/Dashboard/analysis";

export const addItemToCart = createPostThunk<{ total_cart_item: number }, { product_id: string }>(
    "cart/items",
    "cart/items",
);
export const checkoutCart = createPostThunk<{ payment_url: string }, UsedService>(
    "payment/checkout",
    "payment/checkout",
);
export const paymentCallback = createPostThunk<boolean, PaymentParams>(
    "payment/callback",
    "payment/callback",
);
export const getAllCart = createGetThunk<Carts, void>(
    "cart",
    "cart",
);
export const getTotalCart = createGetThunk<{ total_cart_item: number }, void>(
    "cart/total-cart",
    "cart/total-cart",
);
export const deleteCartItem = createDeleteThunk<{ total_cart_item: number }, { id_cart_item: string }>(
    "cart/deleteItemCart",
    "cart",
    {
        buildUrl: (payload) => `cart/${payload.id_cart_item}`,
    }
);
export const getAlanning = createGetThunk<PlaningResponse, { planningId: string }>(
    "planning/detail",
    "planning",
    {
        buildUrl: (payload) => `planning/${payload.planningId}`,
    }
);
export const getNumberPlaning = createGetThunk<number, void>(
    "planning/number",
    "planning",
    {
        buildUrl: () => `planning/number`,
    }
);
export const getTransaction = createGetThunk<TransactionDTOs[], void>(
    "payment/transaction",
    "payment/transaction",
);
export const getRevenue = createGetThunk<RevenueDto[], void>(
    "payment/revenue",
    "payment/revenue",
);

export const getFeedbackSystem = createGetThunk<FeedbackQuestionAnswer[], void>(
    "feedback/system",
    "feedback/system",
);
export const chatWithAI = createPostThunk<string, string>(
    "cart/chat",
    "planning/chat",
);
export const generatePlanning = createPostThunk<AiPlanningRes, string>(
    "cart/generate-planning",
    "planning/generate",
);
export const acceptPlanning = createPutThunk<AiPlanningRes, string>(
    "cart/accept-planning",
    "planning/accept",
);
