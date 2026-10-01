import { useLocation, useNavigate } from 'react-router-dom';

export function useMoveBack() {
    const navigate = useNavigate();
    const location = useLocation();

    // When the page was opened directly there is no history to go back to, so go home instead
    return () => (location.key === 'default' ? navigate('/') : navigate(-1));
}
