import { useLocation, useNavigate } from "react-router-dom";

const useCustomNavigate = params => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  navigate(pathname + !search.length ? `?${params}` : `${search}&${params}`);
};

export { useCustomNavigate };
