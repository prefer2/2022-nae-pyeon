import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useMutation } from "react-query";

import appClient from "@/api";

import PageTitleWithBackButton from "@/components/PageTitleWithBackButton";
import LabeledInput from "@/components/LabeledInput";
import AutoCompleteInput from "@/components/AutoCompleteInput";
import Button from "@/components/Button";
import RequireLogin from "@/components/RequireLogin";

import { Rollingpaper } from "@/types";

const memberListDummy = [
  {
    id: 1,
    name: "도리",
  },
  {
    id: 2,
    name: "소피아",
  },
  {
    id: 3,
    name: "승팡",
  },
  {
    id: 4,
    name: "알렉스",
  },
  {
    id: 5,
    name: "제로",
  },
  {
    id: 6,
    name: "케이",
  },
];

const RollingpaperCreationPage = () => {
  const navigate = useNavigate();
  const [rollingpaperTitle, setRollingpaperTitle] = useState("");
  const [rollingpaperTo, setRollingpaperTo] = useState("");
  const teamId = 123;

  const { mutate: postRollingpaper } = useMutation(
    ({
      title,
      addresseeId,
    }: Pick<Rollingpaper, "title"> & { addresseeId: number }) => {
      return appClient
        .post(`/teams/${teamId}/rollingpapers`, {
          title,
          addresseeId,
        })
        .then((response) => response.data);
    },
    {
      onSuccess: (data) => {
        const { id: newRollingpaperId } = data;
        navigate(`/rollingpaper/${newRollingpaperId}`, { replace: true });
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleRollingpaperFormSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const member = memberListDummy.find(
      (member) => member.name === rollingpaperTo
    );

    if (!member) {
      alert("올바른 롤링페이퍼 대상을 선택해주세요.");
      return;
    }

    postRollingpaper({ title: rollingpaperTitle, addresseeId: member.id });
  };

  return (
    <RequireLogin>
      <>
        <PageTitleWithBackButton>롤링페이퍼 만들기</PageTitleWithBackButton>
        <StyledForm onSubmit={handleRollingpaperFormSubmit}>
          <LabeledInput
            labelText="롤링페이퍼 이름"
            value={rollingpaperTitle}
            setValue={setRollingpaperTitle}
          />
          <AutoCompleteInput
            labelText="롤링페이퍼 대상"
            value={rollingpaperTo}
            setValue={setRollingpaperTo}
            searchKeywordList={memberListDummy.map((member) => member.name)}
          />
          <Button type="submit">완료</Button>
        </StyledForm>
      </>
    </RequireLogin>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  button {
    align-self: flex-end;
  }
`;

export default RollingpaperCreationPage;
