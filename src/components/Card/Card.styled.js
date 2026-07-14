// src/components/Card/Card.styled.js
import styled from "styled-components";

export const CardWrapper = styled.div`
  width: 220px;
  height: 130px;
  background-color: ${({ theme }) => theme.colors.bgCard};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  padding: 15px 13px 19px;
  border: 0.7px solid ${({ theme }) => theme.colors.borderLight};
  box-shadow: ${({ theme }) => theme.colors.shadow};
`;

export const CardGroup = styled.div`
  width: 100%;
  height: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardTheme = styled.div`
  width: auto;
  height: 20px;
  padding: 5px 14px;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background-color: ${({ theme, color }) => {
    switch (color) {
      case "_orange":
        return theme.colors.orange.bg;
      case "_green":
        return theme.colors.green.bg;
      case "_purple":
        return theme.colors.purple.bg;
      default:
        return theme.colors.orange.bg;
    }
  }};

  p {
    font-size: ${({ theme }) => theme.fonts.size.xs};
    font-weight: ${({ theme }) => theme.fonts.weight.semibold};
    line-height: 10px;
    color: ${({ theme, color }) => {
      switch (color) {
        case "_orange":
          return theme.colors.orange.text;
        case "_green":
          return theme.colors.green.text;
        case "_purple":
          return theme.colors.purple.text;
        default:
          return theme.colors.orange.text;
      }
    }};
  }
`;

export const CardBtn = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2px;
  cursor: pointer;

  div {
    width: 4px;
    height: 4px;
    border-radius: ${({ theme }) => theme.borderRadius.round};
    background-color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const CardContent = styled.div`
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  line-height: 18px;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 10px;
`;

export const CardDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  svg {
    width: 13px;
  }

  p {
    margin-left: 6px;
    font-size: ${({ theme }) => theme.fonts.size.xs};
    line-height: 13px;
    color: ${({ theme }) => theme.colors.textSecondary};
    letter-spacing: 0.2px;
  }
`;
