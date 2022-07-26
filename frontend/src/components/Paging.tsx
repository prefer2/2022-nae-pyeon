import React, { Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled";

import IconButton from "@/components/IconButton";

import LeftIcon from "@/assets/icons/bx-chevron-left.svg";
import RightIcon from "@/assets/icons/bx-chevron-right.svg";

interface PagingProp {
  currentPage: number;
  maxPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

type StyledPaging = {
  isCurrent: boolean;
};

const Paging = ({ currentPage, maxPage, setCurrentPage }: PagingProp) => {
  const handleNumberclick = (number: number) => {
    setCurrentPage(number);
  };

  const handleMinusClick = () => {
    if (currentPage <= 1) {
      return;
    }
    setCurrentPage((prev) => prev - 1);
  };

  const handlePlusClick = () => {
    if (currentPage >= maxPage) {
      return;
    }
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <StyledPaging>
      <IconButton onClick={handleMinusClick}>
        <LeftIcon />
      </IconButton>
      {currentPage < 3 || maxPage <= 5 ? (
        <StyledPageButtons>
          {[...Array(maxPage > 5 ? 5 : maxPage).keys()].map((num) => (
            <StyledPage
              isCurrent={currentPage === num + 1}
              key={num}
              onClick={() => handleNumberclick(num + 1)}
            >
              {num + 1}
            </StyledPage>
          ))}
        </StyledPageButtons>
      ) : currentPage > maxPage - 2 ? (
        <StyledPageButtons>
          {[...Array(5).keys()].reverse().map((num) => (
            <StyledPage
              isCurrent={currentPage === maxPage - num}
              key={num}
              onClick={() => handleNumberclick(maxPage - num)}
            >
              {maxPage - num}
            </StyledPage>
          ))}
        </StyledPageButtons>
      ) : (
        <StyledPageButtons>
          <StyledPage
            isCurrent={false}
            onClick={() => handleNumberclick(currentPage - 2)}
          >
            {currentPage - 2}
          </StyledPage>
          <StyledPage
            isCurrent={false}
            onClick={() => handleNumberclick(currentPage - 1)}
          >
            {currentPage - 1}
          </StyledPage>
          <StyledPage
            isCurrent={true}
            onClick={() => handleNumberclick(currentPage)}
          >
            {currentPage}
          </StyledPage>
          <StyledPage
            isCurrent={false}
            onClick={() => handleNumberclick(currentPage + 1)}
          >
            {currentPage + 1}
          </StyledPage>
          <StyledPage
            isCurrent={false}
            onClick={() => handleNumberclick(currentPage + 2)}
          >
            {currentPage + 2}
          </StyledPage>
        </StyledPageButtons>
      )}
      <IconButton onClick={handlePlusClick}>
        <RightIcon />
      </IconButton>
    </StyledPaging>
  );
};

const StyledPaging = styled.div`
  display: flex;

  svg {
    font-size: 24px;
  }
`;

const StyledPageButtons = styled.div`
  display: flex;
`;

const StyledPage = styled.div<StyledPaging>`
  width: 24px;
  text-align: center;
  line-height: 24px;
  margin: 2px;

  color: ${(props) =>
    props.isCurrent ? props.theme.colors.WHITE : props.theme.colors.BLACK};

  background-color: ${(props) =>
    props.isCurrent && props.theme.colors.SKY_BLUE_300};
  border-radius: 50%;

  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      !props.isCurrent && props.theme.colors.SKY_BLUE_100};
  }
`;

export default Paging;
