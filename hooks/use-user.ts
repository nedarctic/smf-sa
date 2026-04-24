import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/lib/api/fetch-user";
import { User } from "@/types/user";

export function useUser(id:string){
    return useQuery<User>({
        queryKey: ["user"],
        queryFn: () => fetchUser(id),
        enabled: !!id,
    });
}