import { useGetUrlQuery } from "@/api";

const useGetAllUrl = () => {
    const { data, isLoading, refetch } = useGetUrlQuery(undefined, {
        pollingInterval: 0,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });
    return { data, isLoading, refetch };
};

export default useGetAllUrl;