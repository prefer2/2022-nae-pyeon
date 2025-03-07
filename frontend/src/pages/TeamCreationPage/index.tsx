import React from "react";
import styled from "@emotion/styled";

import useCreateTeam from "@/pages/TeamCreationPage/hooks/useCreateTeam";
import useTeamCreationForm from "@/pages/TeamCreationPage/hooks/useTeamCreationForm";

import LabeledInput from "@/components/LabeledInput";
import LabeledRadio from "@/components/LabeledRadio";
import Button from "@/components/Button";

import LabeledSwitch from "@/components/LabeledSwitch";

import { COLORS, REGEX } from "@/constants";
import PageTitle from "@/components/PageTitle";

const emojis = [
  { id: 1, value: "🐶" },
  { id: 2, value: "❤️" },
  { id: 3, value: "👍" },
  { id: 4, value: "✏️" },
  { id: 5, value: "🏃‍♀️" },
  { id: 6, value: "☕️" },
];

const colors = Object.values(COLORS).map((color, index) => ({
  backgroundColor: color.value,
  id: index,
}));

const TeamCreationPage = () => {
  const {
    teamName,
    teamDescription,
    emoji,
    color,
    nickname,
    isSecretTeam,
    handleTeamNameChange,
    handleTeamDescriptionChange,
    setEmoji,
    setColor,
    handleNicknameChange,
    handleSwitchClick,
  } = useTeamCreationForm();

  const { mutate: createTeam } = useCreateTeam();

  const handleTeamCreationSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!REGEX.TEAM_NAME.test(nickname)) {
      return alert("모임명을 입력해주세요");
    }
    if (!REGEX.TEAM_DESCRIPTION.test(teamDescription)) {
      return alert("모임 설명을 입력해주세요");
    }
    if (!REGEX.USERNAME.test(nickname)) {
      return alert("올바르지 않은 닉네임 형식입니다");
    }
    if (!emoji) {
      return alert("이모지를 선택해주세요");
    }
    if (!color) {
      return alert("모임 색상을 선택해주세요");
    }

    createTeam({
      name: teamName,
      description: teamDescription,
      emoji,
      color,
      nickname,
      secret: isSecretTeam,
    });
  };

  return (
    <>
      <PageTitle title={"모임 추가하기"} titleAlign="center" />
      <StyledForm>
        <LabeledInput
          labelText="모임명"
          value={teamName}
          pattern={REGEX.TEAM_NAME.source}
          onChange={handleTeamNameChange}
          errorMessage={"1~20자 사이의 모임명을 입력해주세요"}
        />
        <LabeledInput
          labelText="한 줄 소개"
          value={teamDescription}
          pattern={REGEX.TEAM_DESCRIPTION.source}
          onChange={handleTeamDescriptionChange}
          minLength={1}
          maxLength={80}
          placeholder={
            "어떤 모임인지 소개해주세요. 최대 80자까지 입력 가능합니다."
          }
          errorMessage={"최대 80자까지 입력 가능합니다."}
          showValueLength
        />
        <LabeledInput
          labelText="나의 닉네임"
          value={nickname}
          pattern={REGEX.USERNAME.source}
          onChange={handleNicknameChange}
          errorMessage={"2~20자 사이의 닉네임을 입력해주세요"}
        />
        <LabeledRadio
          labelText="모임을 표현하는 이모지를 선택해주세요"
          radios={emojis}
          onClickRadio={setEmoji}
        />
        <LabeledRadio
          labelText="모임을 표현하는 색상을 선택해주세요"
          radios={colors}
          onClickRadio={setColor}
        />
        <LabeledSwitch
          labelText="비공개로 만들기"
          isChecked={isSecretTeam}
          onClick={handleSwitchClick}
        />
        <Button
          type="submit"
          onClick={handleTeamCreationSubmit}
          disabled={
            !(
              REGEX.TEAM_NAME.test(nickname) &&
              REGEX.TEAM_DESCRIPTION.test(teamDescription) &&
              REGEX.USERNAME.test(nickname) &&
              emoji &&
              color
            )
          }
        >
          확인
        </Button>
      </StyledForm>
    </>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding-bottom: 20px;

  fieldset {
    margin-bottom: 20px;
  }
`;
export default TeamCreationPage;
