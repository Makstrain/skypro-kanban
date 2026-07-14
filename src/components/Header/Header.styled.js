// src/components/Header/Header.styled.js
import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.bgCard};
`;

export const HeaderBlock = styled.div`
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  padding: 0 10px;
`;

export const Logo = styled.div`
  img {
    width: 85px;
  }
`;

export const Nav = styled.nav`
  max-width: 290px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CreateButton = styled.button`
  width: 178px;
  height: 30px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  border: none;
  font-size: ${({ theme }) => theme.fonts.size.sm};
  line-height: 1;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  margin-right: 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  a {
    color: #ffffff;
    text-decoration: none;
  }
`;

export const UserLink = styled.a`
  height: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fonts.size.sm};
  line-height: 20px;
  color: ${
    ({ theme }) =>
      theme.colors.white === "#ffffff"
        ? theme.colors.primary // белая тема → синий (#565EEF)
        : theme.colors.textLight // тёмная тема → белый (#FFFFFF)
  };
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }

  &::after {
    content: "";
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 1px;
    border-left: 1.9px solid
      ${({ theme }) =>
        theme.colors.white === "#ffffff"
          ? theme.colors.primary
          : theme.colors.textLight};
    border-bottom: 1.9px solid
      ${({ theme }) =>
        theme.colors.white === "#ffffff"
          ? theme.colors.primary
          : theme.colors.textLight};
    transform: rotate(-45deg);
    margin: -6px 0 0 5px;
    padding: 0;
  }

  &:hover::after {
    border-left-color: ${({ theme }) => theme.colors.primaryHover};
    border-bottom-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export const PopUserContainer = styled.div`
  position: absolute;
  top: 61px;
  right: 0;
`;
