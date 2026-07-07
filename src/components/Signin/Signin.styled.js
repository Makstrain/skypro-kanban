// src/components/Signin/Signin.styled.js
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
  max-width: 368px;
  width: 100%;
  padding: 50px 60px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 0.7px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.colors.shadow};

  @media screen and (max-width: 375px) {
    padding: 0 16px;
    border: none;
    box-shadow: none;
    border-radius: 0;
  }
`;

export const Title = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.size.xl};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 0.7px solid ${({ theme }) => theme.colors.borderLight};
  outline: none;
  margin-bottom: 7px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fonts.size.sm};
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 30px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textLight};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-top: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  @media screen and (max-width: 375px) {
    height: 40px;
  }
`;

export const FormGroup = styled.div`
  text-align: center;

  p {
    color: rgba(148, 166, 190, 0.4);
    font-size: ${({ theme }) => theme.fonts.size.sm};
  }

  a {
    color: rgba(148, 166, 190, 0.4);
    text-decoration: underline;
    cursor: pointer;
  }
`;
