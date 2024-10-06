import { Navigate } from 'react-router-dom';

const NavigateUniversal = ({ to, replace = false, state = {} }) => {
  return <Navigate to={to} replace={replace} state={state} />;
};

export default NavigateUniversal;
