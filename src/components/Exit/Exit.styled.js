// src/components/Exit/Exit.styled.js
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
`;

export const ModalBlock = styled.div`
  background: ${({ theme }) => theme.colors.bgCard};
  max-width: 370px;
  width: 100%;
  padding: 50px 60px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 0.7px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.colors.shadow};

  @media screen and (max-width: 375px) {
    padding: 50px 20px;
  }
`;

export const Title = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.size.xl};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  line-height: 30px;
  letter-spacing: -0.4px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 375px) {
    flex-direction: column;
  }
`;

export const ButtonYes = styled.button`
  width: 153px;
  height: 30px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  @media screen and (max-width: 375px) {
    width: 100%;
    height: 40px;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

export const ButtonNo = styled.button`
  width: 153px;
  height: 30px;
  background: transparent;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 0.7px solid ${({ theme }) => theme.colors.primary};
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    color: ${({ theme }) => theme.colors.textLight};
  }

  @media screen and (max-width: 375px) {
    width: 100%;
    height: 40px;
  }
`;
