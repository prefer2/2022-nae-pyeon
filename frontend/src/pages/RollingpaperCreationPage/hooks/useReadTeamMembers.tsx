import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getTeamMembers } from "@/api/team";

interface TeamMember {
  id: number;
  nickname: string;
}

interface TeamMemberResponse {
  members: TeamMember[];
}

export const useReadTeamMembers = (teamId: number) => {
  return useQuery<TeamMemberResponse>(["team-member", teamId], () =>
    getTeamMembers(+teamId)
  );
};
