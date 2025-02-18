import { ACSCandidateProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

declare interface CandidatesResponse {
  results: ACSCandidateProps[];
}

export const useACSCandidates = () => {
  return useQuery<CandidatesResponse, Error>({
    queryKey: ["candidates"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}onboarding-candidate/`);
      return data;
    },
  });
};
