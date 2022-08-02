import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";

import { appClient } from "@/api";

import TeamDescriptionBox from "@/pages/TeamDetailPage/components/TeamDescriptionBox";
import RollingpaperList from "@/pages/TeamDetailPage/components/RollingpaperList";
import TeamJoinSection from "@/pages/TeamDetailPage/components/TeamJoinSection";

import { CustomError } from "@/types";
interface Team {
  id: number;
  name: string;
  description: string;
  emoji: string;
  color: string;
  joined: boolean;
}

const TeamDetailPage = () => {
  const { teamId } = useParams();

  const {
    isLoading: isLoadingTeamDetail,
    isError: isErrorTeamDetail,
    error: TeamDetailError,
    data: teamDetail,
  } = useQuery<Team>(["team", teamId], () =>
    appClient.get(`/teams/${teamId}`).then((response) => response.data)
  );

  if (isLoadingTeamDetail) {
    return <div>로딩중</div>;
  }

  if (isErrorTeamDetail) {
    if (axios.isAxiosError(TeamDetailError) && TeamDetailError.response) {
      const customError = TeamDetailError.response.data as CustomError;
      return <div>{customError.message}</div>;
    }
    return <div>에러</div>;
  }

  if (!teamDetail) {
    return <div>에러</div>;
  }

  return (
    <StyledMain>
      <TeamDescriptionBox
        emoji={teamDetail.emoji}
        name={teamDetail.name}
        description={teamDetail.description}
        color={teamDetail.color}
        joined={teamDetail.joined}
      />
      {teamDetail.joined ? <RollingpaperList /> : <TeamJoinSection />}
    </StyledMain>
  );
};

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 40px;

  padding: 28px 0;
`;

export default TeamDetailPage;
