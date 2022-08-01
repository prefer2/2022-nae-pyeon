import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import styled from "@emotion/styled";

import appClient from "@/api";

import LineButton from "@/components/LineButton";
import Modal from "@/components/Modal";
import UnderlineInput from "@/components/UnderlineInput";

import { REGEX } from "@/constants";
import { useSnackbar } from "@/context/SnackbarContext";

interface TeamJoinModalFormProp {
  onClickCloseButton: React.MouseEventHandler<HTMLButtonElement>;
  mode: string;
}

interface TeamJoinFormInfo {
  nickname: string;
}

const MODE = {
  JOIN: "join",
  EDIT: "edit",
} as const;

const TeamJoinModalForm = ({
  onClickCloseButton,
  mode,
}: TeamJoinModalFormProp) => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const { teamId } = useParams();
  const [nickname, setNickname] = useState("");

  const { mutate: joinTeam } = useMutation(
    async ({ nickname }: TeamJoinFormInfo) => {
      const response = await appClient.post(`/teams/${teamId}`, { nickname });
      return response.data;
    },
    {
      onSuccess: () => {
        openSnackbar("모임 가입 완료");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const { mutate: editTeamNickname } = useMutation(
    async ({ nickname }: TeamJoinFormInfo) => {
      const response = await appClient.put(`/teams/${teamId}/me`, { nickname });
      return response.data;
    },
    {
      onSuccess: () => {
        openSnackbar("닉네임 수정 완료");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleTeamJoinSubmit =
    (mode: string): React.FormEventHandler<HTMLFormElement> =>
    (e) => {
      e.preventDefault();

      if (!REGEX.USERNAME.test(nickname)) {
        alert("닉네임은 한글, 영어, 숫자만 가능합니다.");
        return;
      }

      if (mode === MODE.JOIN) {
        joinTeam({ nickname });
      }

      if (mode === MODE.EDIT) {
        editTeamNickname({ nickname });
      }
    };

  return (
    <Modal onClickCloseButton={onClickCloseButton}>
      <StyledJoinForm onSubmit={handleTeamJoinSubmit(mode)}>
        <p>모임에서 사용할 닉네임을 입력해주세요. (2 ~ 20자)</p>
        <UnderlineInput
          value={nickname}
          setValue={setNickname}
          pattern={REGEX.USERNAME.source}
          errorMessage="한글, 영어, 숫자 / 2 ~ 20자"
        />
        {mode === MODE.JOIN && (
          <LineButton type="submit">모임 가입하기</LineButton>
        )}
        {mode === MODE.EDIT && <LineButton type="submit">수정하기</LineButton>}
      </StyledJoinForm>
    </Modal>
  );
};

const StyledJoinForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;

  p {
    margin: 20px 0 100px;
  }

  button {
    margin-top: 8px;
  }
`;

export default TeamJoinModalForm;
