import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../features/store';
import { useDispatch, useSelector } from 'react-redux';
import { paymentCallback } from '../../features/Cart/cartThunk';


function useQuery(): URLSearchParams {
    return new URLSearchParams(useLocation().search);
}

const PaymentSuccess: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { paymentLoading } = useSelector((state: RootState) => state.cart);

    const query = useQuery();
    const params = {
        code: query.get("code") || "",
        id: query.get("id") || "",
        cancel: query.get("cancel") || "",
        status: query.get("status") || "",
        orderCode: query.get("orderCode") || "",
    };

    useEffect(() => {
        if (params.status === "PAID") {
            dispatch(paymentCallback(params));
        }
    }, [dispatch, params]);

    useEffect(() => {
        if (!paymentLoading && params.status === "PAID") {
            navigate("/history");
            window.location.reload();

        }
    }, [paymentLoading]);

    return (
        <div className="text-center mt-10 text-xl">
            Đang xác thực thanh toán, vui lòng đợi...
        </div>
    );
};

export default PaymentSuccess; 