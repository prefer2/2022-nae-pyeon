import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import RightIcon from "@/assets/icons/bx-chevron-right.svg";

interface SectionHeaderProps {
  title: string;
  count?: number;
  moreLink?: string;
}

const SectionHeader = ({ title, count, moreLink }: SectionHeaderProps) => {
  const navigate = useNavigate();
  return (
    <StyledSectionHeader>
      <StyledTitleWithCount>
        <StyledTitle>{title}</StyledTitle>
        {typeof count === "number" && <StyledCount>{count}</StyledCount>}
      </StyledTitleWithCount>
      {moreLink && (
        <StyledMore onClick={() => navigate(`${moreLink}`)}>
          더보기
          <RightIcon />
        </StyledMore>
      )}
    </StyledSectionHeader>
  );
};

const StyledSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 10px;
  margin-bottom: 10px;
`;

const StyledTitleWithCount = styled.div`
  display: flex;

  align-items: flex-end;
  gap: 8px;
`;

const StyledTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  line-height: 24px;
`;

const StyledCount = styled.div`
  color: ${({ theme }) => theme.colors.GRAY_500};
  line-height: 16px;
`;

const StyledMore = styled.button`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.GRAY_500};
  fill: ${({ theme }) => theme.colors.GRAY_500};

  &:hover {
    color: ${({ theme }) => theme.colors.GRAY_600};
    fill: ${({ theme }) => theme.colors.GRAY_600};
  }
`;

export default SectionHeader;
