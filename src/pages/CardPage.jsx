// src/pages/CardPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { cards } from "../data";
import Calendar from "../components/Calendar/Calendar";

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
  padding: 40px 30px 38px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 0.7px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  position: relative;
`;

const TopBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fonts.size.xl};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  line-height: ${({ theme }) => theme.fonts.size.xxl};

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fonts.size.sm};
    font-weight: ${({ theme }) => theme.fonts.weight.regular};
    margin-left: ${({ theme }) => theme.spacing.md};
  }
`;

const ThemeTop = styled.div`
  display: block;
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
  padding: 8px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.xxl};
  opacity: 1;

  p {
    font-size: ${({ theme }) => theme.fonts.size.sm};
    font-weight: ${({ theme }) => theme.fonts.weight.semibold};
    line-height: ${({ theme }) => theme.fonts.size.sm};
    white-space: nowrap;
  }
`;

const StatusBlock = styled.div`
  margin-bottom: 11px;
`;

const StatusP = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  line-height: 1;
`;

const StatusThemes = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

const StatusTheme = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.xxl};
  border: 0.7px solid ${({ theme }) => theme.colors.borderLight};
  padding: 11px 14px 10px;
  margin-right: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  p {
    font-size: ${({ theme }) => theme.fonts.size.sm};
    line-height: 1;
    letter-spacing: -0.14px;
  }

  &.active {
    background: ${({ theme, status }) => {
      switch (status) {
        case "no-status":
          return "transparent";
        case "to-do":
          return theme.colors.gray.bg;
        case "in-progress":
          return theme.colors.orange.bg;
        case "testing":
          return theme.colors.green.bg;
        case "done":
          return theme.colors.purple.bg;
        default:
          return "transparent";
      }
    }};
    color: ${({ theme, status }) => {
      switch (status) {
        case "no-status":
          return theme.colors.textSecondary;
        case "to-do":
          return theme.colors.gray.text;
        case "in-progress":
          return theme.colors.orange.text;
        case "testing":
          return theme.colors.green.text;
        case "done":
          return theme.colors.purple.text;
        default:
          return theme.colors.textSecondary;
      }
    }};
    border-color: ${({ theme, status }) => {
      switch (status) {
        case "no-status":
          return theme.colors.borderLight;
        case "to-do":
          return theme.colors.gray.bg;
        case "in-progress":
          return theme.colors.orange.bg;
        case "testing":
          return theme.colors.green.bg;
        case "done":
          return theme.colors.purple.bg;
        default:
          return theme.colors.borderLight;
      }
    }};
  }

  &.hide {
    display: none;
  }
`;

const Wrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

const FormBlock = styled.div`
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`;

const Textarea = styled.textarea`
  max-width: 370px;
  width: 100%;
  outline: none;
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 0.7px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  line-height: 1;
  letter-spacing: -0.14px;
  margin-top: ${({ theme }) => theme.spacing.sm};
  height: 200px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;
    height: 37px;
  }
`;

const Subttl = styled.label`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  line-height: 1;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const BtnGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const BtnBorder = styled.button`
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 0.7px solid ${({ theme }) => theme.colors.primary};
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  height: 30px;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    color: ${({ theme }) => theme.colors.textLight};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }

  &:hover a {
    color: ${({ theme }) => theme.colors.textLight};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    height: 40px;
  }
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

const statusMap = {
  "no-status": "Без статуса",
  "to-do": "Нужно сделать",
  "in-progress": "В работе",
  testing: "Тестирование",
  done: "Готово",
};

function CardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const card = cards.find((c) => c.id === Number(id));

  if (!card) {
    return (
      <Container>
        <CardWrapper>
          <Title>Карточка не найдена</Title>
          <ButtonsWrapper>
            <BtnBg onClick={() => navigate("/")}>На главную</BtnBg>
          </ButtonsWrapper>
        </CardWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <CardWrapper>
        <TopBlock>
          <Title>
            {card.title} <span>ID: {id}</span>
          </Title>
          <ThemeTop color={card.themeClass}>
            <p>{card.theme}</p>
          </ThemeTop>
        </TopBlock>

        <StatusBlock>
          <StatusP>Статус</StatusP>
          <StatusThemes>
            <StatusTheme
              className={`active ${card.status === "no-status" ? "" : "hide"}`}
              status={card.status}
            >
              <p>Без статуса</p>
            </StatusTheme>
            <StatusTheme
              className={`active ${card.status === "to-do" ? "" : "hide"}`}
              status={card.status}
            >
              <p>Нужно сделать</p>
            </StatusTheme>
            <StatusTheme
              className={`active ${card.status === "in-progress" ? "" : "hide"}`}
              status={card.status}
            >
              <p>В работе</p>
            </StatusTheme>
            <StatusTheme
              className={`active ${card.status === "testing" ? "" : "hide"}`}
              status={card.status}
            >
              <p>Тестирование</p>
            </StatusTheme>
            <StatusTheme
              className={`active ${card.status === "done" ? "" : "hide"}`}
              status={card.status}
            >
              <p>Готово</p>
            </StatusTheme>
          </StatusThemes>
        </StatusBlock>

        <Wrap>
          <FormBlock>
            <Subttl htmlFor="textArea01">Описание задачи</Subttl>
            <Textarea
              name="text"
              id="textArea01"
              readOnly
              placeholder="Введите описание задачи..."
              value={`${card.title} — это пример описания задачи.`}
            />
          </FormBlock>
          <Calendar title="Срок исполнения:" date={card.date} />
        </Wrap>

        <ButtonsWrapper>
          <BtnGroup>
            <BtnBorder>
              <a href="#">Редактировать задачу</a>
            </BtnBorder>
            <BtnBorder>
              <a href="#">Удалить задачу</a>
            </BtnBorder>
          </BtnGroup>
          <BtnBg onClick={() => navigate("/")}>Закрыть</BtnBg>
        </ButtonsWrapper>
      </CardWrapper>
    </Container>
  );
}

export default CardPage;
