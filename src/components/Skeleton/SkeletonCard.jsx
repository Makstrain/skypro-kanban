// src/components/Skeleton/SkeletonCard.jsx
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonWrapper = styled.div`
  width: 220px;
  height: 130px;
  background-color: ${({ theme }) => theme.colors.bgCard};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 15px 13px 19px;
  border: 0.7px solid ${({ theme }) => theme.colors.borderLight};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SkeletonLine = styled.div`
  height: ${({ $height }) => $height || "12px"};
  width: ${({ $width }) => $width || "100%"};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.bgSecondary};
  background-image: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.bgSecondary} 0%,
    ${({ theme }) => theme.colors.borderLight} 50%,
    ${({ theme }) => theme.colors.bgSecondary} 100%
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  animation: ${shimmer} 1.5s infinite;
  margin-bottom: ${({ $noMargin }) => ($noMargin ? "0" : "8px")};
`;

const SkeletonTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SkeletonTheme = styled.div`
  width: 80px;
  height: 20px;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: ${({ theme }) => theme.colors.bgSecondary};
  background-image: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.bgSecondary} 0%,
    ${({ theme }) => theme.colors.borderLight} 50%,
    ${({ theme }) => theme.colors.bgSecondary} 100%
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  animation: ${shimmer} 1.5s infinite;
`;

const SkeletonDots = styled.div`
  display: flex;
  gap: 4px;
  div {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const SkeletonBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const SkeletonDate = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;

  div {
    width: 13px;
    height: 13px;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.bgSecondary};
    background-image: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.bgSecondary} 0%,
      ${({ theme }) => theme.colors.borderLight} 50%,
      ${({ theme }) => theme.colors.bgSecondary} 100%
    );
    background-size: 200px 100%;
    background-repeat: no-repeat;
    animation: ${shimmer} 1.5s infinite;
  }

  span {
    width: 50px;
    height: 10px;
    border-radius: 3px;
    background: ${({ theme }) => theme.colors.bgSecondary};
    background-image: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.bgSecondary} 0%,
      ${({ theme }) => theme.colors.borderLight} 50%,
      ${({ theme }) => theme.colors.bgSecondary} 100%
    );
    background-size: 200px 100%;
    background-repeat: no-repeat;
    animation: ${shimmer} 1.5s infinite;
  }
`;

function SkeletonCard() {
  return (
    <SkeletonWrapper>
      <SkeletonTop>
        <SkeletonTheme />
        <SkeletonDots>
          <div />
          <div />
          <div />
        </SkeletonDots>
      </SkeletonTop>
      <SkeletonBottom>
        <SkeletonLine $width="80%" $height="16px" />
        <SkeletonLine $width="60%" $height="14px" />
        <SkeletonDate>
          <div />
          <span />
        </SkeletonDate>
      </SkeletonBottom>
    </SkeletonWrapper>
  );
}

export default SkeletonCard;
