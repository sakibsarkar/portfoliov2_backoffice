import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useSetSearchParams = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const updateSearchParams = useCallback(
    (params: Record<string, string | undefined>) => {
      const currentParams = new URLSearchParams(location.search);

      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          currentParams.set(key, value);
        } else {
          currentParams.delete(key);
        }
      });

      const search = currentParams.toString();
      const query = search ? `?${search}` : "";

      navigate(`${location.pathname}${query}`);
    },
    [location, navigate]
  );

  const clearSearchParams = useCallback(() => {
    navigate(location.pathname);
  }, [navigate, location.pathname]);

  return {
    searchParams: new URLSearchParams(location.search),
    updateSearchParams,
    clearSearchParams,
  };
};

export default useSetSearchParams;
