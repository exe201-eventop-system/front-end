import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';       
import type { AppDispatch } from '../../../features/store';  
import { confirmEmail } from '../../../features/Auth/authThunks';

export default function ConfirmEmailPage() {
  const [searchParams] = useSearchParams();
  const access_token = searchParams.get('token');
  const dispatch = useDispatch<AppDispatch>();  
  const navigate = useNavigate();  // <-- Khai báo useNavigate

  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');

  useEffect(() => {
    if (access_token) {
      dispatch(confirmEmail({ access_token }))
        .unwrap()
        .then(() => {
          setStatus('success');
                  navigate('/', { replace: true, state: { showOtpPopup: true } });
        })
        .catch(() => setStatus('error'));
    } else {
      setStatus('error');
    }
  }, [access_token, dispatch, navigate]);

  if (status === 'pending') return <div>Đang xác minh email...</div>;
  if (status === 'success') return <div>Email của bạn đã được xác minh thành công ✅</div>;
  return <div>Xác minh email thất bại ❌</div>;
}
