import React, { useState } from "react";
import styled from "@emotion/styled";

import { RecipientBox } from "@/pages/RollingpaperCreationPage/components/RecipientBox";
import TeamRollingpaperCreateForm from "@/pages/RollingpaperCreationPage/components/TeamRollingpaperCreateForm";
import MemberRollingpaperCreateForm from "@/pages/RollingpaperCreationPage/components/MemberRollingpaperCreateForm";

import { RECIPIENT } from "@/constants";
import { Recipient } from "@/types";

const RollingpaperCreationPage = () => {
  const [recipient, setRecipient] = useState<Recipient | null>(null);

  const handleTeamRollingpaperCreateClick = () => {
    setRecipient(RECIPIENT.TEAM);
  };

  const handleMemberRollingpaperCreateClick = () => {
    setRecipient(RECIPIENT.MEMBER);
  };

  if (recipient === RECIPIENT.TEAM) {
    return (
      <StyledMain>
        <TeamRollingpaperCreateForm />
      </StyledMain>
    );
  }

  if (recipient === RECIPIENT.MEMBER) {
    return (
      <StyledMain>
        <MemberRollingpaperCreateForm />
      </StyledMain>
    );
  }

  return (
    <StyledMain>
      <RecipientBox
        type={RECIPIENT.TEAM}
        onClick={handleTeamRollingpaperCreateClick}
      />
      <RecipientBox
        type={RECIPIENT.MEMBER}
        onClick={handleMemberRollingpaperCreateClick}
      />
    </StyledMain>
  );
};

const StyledMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 100vh;
`;

export default RollingpaperCreationPage;
