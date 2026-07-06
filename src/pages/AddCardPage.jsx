// src/pages/AddCardPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Calendar from "../components/Calendar/Calendar";
import { createTask } from "../services/tasks";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bgPrimary};
  padding: 20px;
`;

const CardWrapper = styled.div`
  background: ${({ theme }) => theme.colors.bgCard};
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 48px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 0.7px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  position: relative;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fonts.size.xl};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  line-height: ${({ theme }) => theme.fonts.size.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Wrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

const Form = styled.form`
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

const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
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

const Textarea = styled.textarea`
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

const Subttl = styled.label`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  line-height: 1;
`;

const Categories = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const CategoriesP = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  line-height: 1;
`;

const CategoriesThemes = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

const CategoryTheme = styled.div`
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
  cursor: pointer;

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

const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

const BtnBg = styled.button`
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.textLight};
  height: 30px;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  a {
    color: ${({ theme }) => theme.colors.textLight};
    text-decoration: none;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    height: 40px;
  }
`;

function AddCardPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Web Design");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const taskData = {
        title: title || "Новая задача",
        topic: selectedCategory || "Research",
        description: description || "",
        date: new Date().toISOString(),
        status: "Без статуса",
      };

      console.log("📤 Создаём задачу:", taskData);
      await createTask(taskData);
      console.log("✅ Задача создана!");
      navigate("/");
    } catch (err) {
      console.error("❌ Ошибка создания:", err);
      setError(err.message || "Ошибка создания задачи");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <CardWrapper>
        <Title>Создание задачи</Title>

        <Wrap>
          <Form onSubmit={handleSubmit}>
            <FormBlock>
              <Subttl htmlFor="formTitle">Название задачи</Subttl>
              <Input
                type="text"
                name="name"
                id="formTitle"
                placeholder="Введите название задачи..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isLoading}
                autoFocus
              />
            </FormBlock>
            <FormBlock>
              <Subttl htmlFor="textArea">Описание задачи</Subttl>
              <Textarea
                name="text"
                id="textArea"
                placeholder="Введите описание задачи..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
              />
            </FormBlock>

            <Categories>
              <CategoriesP>Категория</CategoriesP>
              <CategoriesThemes>
                <CategoryTheme
                  color="orange"
                  $active={selectedCategory === "Web Design"}
                  onClick={() => setSelectedCategory("Web Design")}
                >
                  <p>Web Design</p>
                </CategoryTheme>
                <CategoryTheme
                  color="green"
                  $active={selectedCategory === "Research"}
                  onClick={() => setSelectedCategory("Research")}
                >
                  <p>Research</p>
                </CategoryTheme>
                <CategoryTheme
                  color="purple"
                  $active={selectedCategory === "Copywriting"}
                  onClick={() => setSelectedCategory("Copywriting")}
                >
                  <p>Copywriting</p>
                </CategoryTheme>
              </CategoriesThemes>
            </Categories>

            {error && (
              <p style={{ color: "red", fontSize: 14, marginBottom: 10 }}>
                {error}
              </p>
            )}

            <ButtonsWrapper>
              <BtnBg type="submit" disabled={isLoading}>
                {isLoading ? "Создание..." : "Создать задачу"}
              </BtnBg>
            </ButtonsWrapper>
          </Form>

          <Calendar />
        </Wrap>
      </CardWrapper>
    </Container>
  );
}

export default AddCardPage;
