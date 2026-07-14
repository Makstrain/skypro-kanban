// src/components/Column/Column.styled.js
import styled, { css } from "styled-components";

export const ColumnWrapper = styled.div`
  width: 20%;
  margin: 0 auto;
  display: block;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 100%;
    margin: 0 auto;
    display: block;
  }
`;

export const ColumnTitle = styled.div`
  padding: 0 10px;
  margin: 15px 0;

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fonts.size.sm};
    font-weight: ${({ theme }) => theme.fonts.weight.semibold};
    line-height: 1;
    text-transform: uppercase;
  }
`;

export const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 100px;
  padding: 4px;
  border-radius: 8px;
  transition: background 0.2s ease;

  background: ${({ $isDraggingOver }) =>
    $isDraggingOver ? "rgba(74, 103, 255, 0.05)" : "transparent"};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: row;
    overflow-x: auto;
    min-height: auto;
    padding: 8px;
  }
`;

export const CardsItem = styled.div`
  padding: 5px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  ${({ $isDragging }) =>
    $isDragging &&
    css`
      transform: rotate(2deg) scale(1.02);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    `}

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex: 0 0 auto;
    min-width: 220px;
  }
`;
