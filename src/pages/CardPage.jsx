// src/pages/CardPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { getTaskById, deleteTask, getTasks } from "/src/services/tasks";
import { ERROR_MESSAGES, getErrorMessage } from "/src/constants/errorMessages";
import Calendar from "../components/Calendar/Calendar";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  padding: 20px;
  z-index: 1000;
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
  z-index: 1001;
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
    background: ${({ theme, $status }) => {
      switch ($status) {
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
    color: ${({ theme, $status }) => {
      switch ($status) {
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
    border-color: ${({ theme, $status }) => {
      switch ($status) {
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
  color: ${({ theme }) => theme.colors.textPrimary};

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
  border: 0.7px solid ${({ theme }) => theme.colors.borderColor};
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.borderColor};
  height: 30px;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textLight};
    border-color: ${({ theme }) => theme.colors.textLight};
  }

  a {
    color: ${({ theme }) => theme.colors.borderColor};
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

// ============ МАППИНГ ============

const themeClassMap = {
  "Web Design": "_orange",
  Research: "_green",
  Copywriting: "_purple",
};

// ============ КОМПОНЕНТ ============

function CardPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskById(id);
        setTask(data);
        setError("");
      } catch (err) {
        if (err.status === 404) {
          setError(ERROR_MESSAGES.TASK_NOT_FOUND.message);
          return;
        }

        const errorInfo = getErrorMessage(err);
        setError(errorInfo.message);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(ERROR_MESSAGES.DELETE_CONFIRM.message)) return;

    setIsDeleting(true);
    setError("");

    try {
      await deleteTask(id);
      await getTasks();
      navigate("/", { state: { refresh: true }, replace: true });
    } catch (err) {
      const errorInfo = getErrorMessage(err);
      setError(errorInfo.message);
      setIsDeleting(false);
    }
  };

  if (error) {
    return (
      <Container>
        <CardWrapper>
          <Title>Ошибка</Title>
          <p style={{ color: "red" }}>{error}</p>
          <ButtonsWrapper>
            <BtnBg onClick={() => navigate("/")}>На главную</BtnBg>
          </ButtonsWrapper>
        </CardWrapper>
      </Container>
    );
  }

  if (!task) {
    return null;
  }

  const themeClass = themeClassMap[task.topic] || "_orange";
  const statusKey =
    task.status === "Без статуса"
      ? "no-status"
      : task.status === "Нужно сделать"
        ? "to-do"
        : task.status === "В работе"
          ? "in-progress"
          : task.status === "Тестирование"
            ? "testing"
            : task.status === "Готово"
              ? "done"
              : "no-status";

  return (
    <Container>
      <CardWrapper>
        <TopBlock>
          <Title>{task.title}</Title>
          <ThemeTop color={themeClass}>
            <p>{task.topic}</p>
          </ThemeTop>
        </TopBlock>

        <StatusBlock>
          <StatusP>Статус</StatusP>
          <StatusThemes>
            <StatusTheme
              className={`active ${statusKey === "no-status" ? "" : "hide"}`}
              $status={statusKey}
            >
              <p>Без статуса</p>
            </StatusTheme>
            <StatusTheme
              className={`active ${statusKey === "to-do" ? "" : "hide"}`}
              $status={statusKey}
            >
              <p>Нужно сделать</p>
            </StatusTheme>
            <StatusTheme
              className={`active ${statusKey === "in-progress" ? "" : "hide"}`}
              $status={statusKey}
            >
              <p>В работе</p>
            </StatusTheme>
            <StatusTheme
              className={`active ${statusKey === "testing" ? "" : "hide"}`}
              $status={statusKey}
            >
              <p>Тестирование</p>
            </StatusTheme>
            <StatusTheme
              className={`active ${statusKey === "done" ? "" : "hide"}`}
              $status={statusKey}
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
              value={task.description || "Нет описания"}
            />
          </FormBlock>
          <Calendar title="Срок исполнения:" date={new Date(task.date)} />
        </Wrap>

        <ButtonsWrapper>
          <BtnGroup>
            <BtnBorder>
              <Link to={`/edit-card/${task._id}`}>Редактировать задачу</Link>
            </BtnBorder>
            <BtnBorder onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Удаление..." : "Удалить задачу"}
            </BtnBorder>
          </BtnGroup>
          <BtnBg onClick={() => navigate("/")}>Закрыть</BtnBg>
        </ButtonsWrapper>
      </CardWrapper>
    </Container>
  );
}

export default CardPage;
