// src/components/Main/Main.styled.js
import styled from "styled-components";

export const MainContainer = styled.main`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
`;

export const MainBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;

  @media screen and (max-width: 1200px) {
    padding: 40px 0 64px;
  }
`;

export const MainContent = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 1200px) {
    display: block;
  }

  // ===== НОВЫЕ СТИЛИ =====
  .empty-tasks {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    padding: 40px 20px;
  }

  .empty-tasks__text {
    font-size: ${({ theme }) => theme.fonts.size.lg};
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
    color: ${({ theme }) => theme.colors.textSecondary};
    text-align: center;
  }

  .empty-column {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 120px;
    padding: 20px 10px;
  }

  .empty-column__text {
    font-size: ${({ theme }) => theme.fonts.size.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
    text-align: center;
  }
`;
