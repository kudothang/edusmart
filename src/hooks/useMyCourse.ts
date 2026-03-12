import { useQuery } from "@tanstack/react-query";
import { getMyCourses } from "../api/courseApi";

export function useMyCourses () {
  return useQuery({
    queryKey: ["myCourses"],
    queryFn: getMyCourses,
    staleTime: Infinity,
  });
};