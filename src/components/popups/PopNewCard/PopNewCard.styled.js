// src/components/popups/PopNewCard/PopNewCard.styled.js
import styled from "styled-components";

export const PopNewCardContainer = styled.div`
  display: block;
  width: 100%;
  min-width: 375px;
  height: 100%;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
`;

export const PopNewCardBlock = styled.div`
  display: block;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.bgCard};
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 48px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 0.7px solid ${({ theme }) => theme.colors.border};
  position: relative;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 20px 16px 32px;
  }
`;

export const PopNewCardContent = styled.div`
  display: block;
  text-align: left;
`;

export const PopNewCardTtl = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fonts.size.xl};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  line-height: ${({ theme }) => theme.fonts.size.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const CloseButton = styled.a`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xl};
  right: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const PopNewCardWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

export const PopNewCardForm = styled.form`
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;
    width: 100%;
    display: block;
  }
`;

export const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormInput = styled.input`
  width: 100%;
  outline: none;
  padding: ${({ theme }) => theme.spacing.sm};
  background: transparent;
  border: 0.7px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  line-height: 1;
  letter-spacing: -0.14px;
  margin: ${({ theme }) => theme.spacing.xl} 0;

  &::placeholder {
    font-weight: ${({ theme }) => theme.fonts.weight.regular};
    font-size: ${({ theme }) => theme.fonts.size.sm};
    line-height: 1px;
    color: ${({ theme }) => theme.colors.textSecondary};
    letter-spacing: -0.14px;
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  max-width: 370px;
  outline: none;
  padding: ${({ theme }) => theme.spacing.sm};
  background: transparent;
  border: 0.7px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  line-height: 1;
  letter-spacing: -0.14px;
  margin-top: ${({ theme }) => theme.spacing.sm};
  height: 200px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;
    height: 34px;
  }

  &::placeholder {
    font-weight: ${({ theme }) => theme.fonts.weight.regular};
    font-size: ${({ theme }) => theme.fonts.size.sm};
    line-height: 1px;
    color: ${({ theme }) => theme.colors.textSecondary};
    letter-spacing: -0.14px;
  }
`;

export const Subttl = styled.label`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  line-height: 1;
`;

export const Categories = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const CategoriesP = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  line-height: 1;
`;

export const CategoriesThemes = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const CategoryTheme = styled.div`
  display: inline-block;
  width: auto;
  height: 30px;
  padding: 8px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.xxl};
  margin-right: ${({ theme }) => theme.spacing.sm};
  opacity: ${(props) => (props.$active ? 1 : 0.4)};
  background-color: ${({ theme, color }) => {
    switch (color) {
      case "orange":
        return theme.colors.orange.bg;
      case "green":
        return theme.colors.green.bg;
      case "purple":
        return theme.colors.purple.bg;
      default:
        return theme.colors.orange.bg;
    }
  }};

  p {
    font-size: ${({ theme }) => theme.fonts.size.sm};
    font-weight: ${({ theme }) => theme.fonts.weight.semibold};
    line-height: ${({ theme }) => theme.fonts.size.sm};
    white-space: nowrap;
    color: ${({ theme, color }) => {
      switch (color) {
        case "orange":
          return theme.colors.orange.text;
        case "green":
          return theme.colors.green.text;
        case "purple":
          return theme.colors.purple.text;
        default:
          return theme.colors.orange.text;
      }
    }};
  }
`;

export const CreateButton = styled.button`
  width: 132px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 0;
  outline: none;
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  line-height: 1;
  color: ${({ theme }) => theme.colors.textLight};
  float: right;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    height: 40px;
  }
`;
