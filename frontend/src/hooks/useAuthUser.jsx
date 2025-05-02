import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../Store/useAuthStore";

const useAuthUser = () => {
  const { checkAuth } = useAuthStore();

  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: checkAuth,
    retry: false,
  });

  return {
    isLoading: query.isLoading,
    authUser: query.data?.data,
  };
};

export default useAuthUser;
