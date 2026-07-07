// src/pages/EditCardPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Calendar from "../components/Calendar/Calendar";
import { getTaskById, updateTask, deleteTask } from "../services/tasks";

// ============ СТИЛИ (без изменений) ============

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
  cursor: pointer;
  transition: all 0.2s;

  p {
    font-size: ${({ theme }) => theme.fonts.size.sm};
    line-height: 1;
    letter-spacing: -0.14px;
  }

  &:hover {
    opacity: 0.8;
  }

  &.selected {
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

  &.not-selected {
    opacity: 0.4;
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
  font-family: inherit;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    height: 40px;
  }
`;

// ============ МАППИНГ СТАТУСОВ ============

const statusKeyMap = {
  "Без статуса": "no-status",
  "Нужно сделать": "to-do",
  "В работе": "in-progress",
  Тестирование: "testing",
  Готово: "done",
};

const themeClassMap = {
  "Web Design": "_orange",
  Research: "_green",
  Copywriting: "_purple",
};

// ============ КОМПОНЕНТ ============

function EditCardPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ добавили состояние загрузки
  const [error, setError] = useState("");

  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editDate, setEditDate] = useState(new Date());

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Загружаем задачу
  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true); // ✅ начинаем загрузку
      try {
        const data = await getTaskById(id);
        setTask(data);
        setEditDescription(data.description || "");
        setEditStatus(data.status || "Без статуса");
        setEditDate(new Date(data.date));
        setError("");
      } catch (err) {
        setError(err.message || "Ошибка загрузки задачи");
      } finally {
        setLoading(false); // ✅ загрузка завершена
      }
    };

    if (id) {
      fetchTask();
    } else {
      setError("ID задачи не передан");
      setLoading(false);
    }
  }, [id]);

  // ✅ Сохранить изменения
  const handleSave = async () => {
    if (!isDirty) return;

    setIsSaving(true);
    try {
      const taskData = {
        title: task.title,
        topic: task.topic,
        description: editDescription,
        status: editStatus,
        date: editDate.toISOString(),
      };

      await updateTask(id, taskData);
      navigate("/", { state: { refresh: true }, replace: true });
    } catch (err) {
      console.error("❌ Ошибка сохранения:", err);
      setError(err.message || "Ошибка сохранения");
      setIsSaving(false);
    }
  };

  // ✅ Отменить изменения
  const handleCancel = () => {
    navigate(`/card/${id}`);
  };

  // ✅ Удалить задачу
  const handleDelete = async () => {
    if (!window.confirm("Вы уверены, что хотите удалить задачу?")) return;

    setIsDeleting(true);
    try {
      await deleteTask(id);
      navigate("/", { state: { refresh: true }, replace: true });
    } catch (err) {
      console.error("❌ Ошибка удаления:", err);
      setError(err.message || "Ошибка удаления задачи");
      setIsDeleting(false);
    }
  };

  // ✅ Закрыть
  const handleClose = () => {
    navigate("/");
  };

  // ✅ Выбор статуса
  const handleStatusClick = (status) => {
    setEditStatus(status);
    setIsDirty(true);
  };

  // ✅ Изменение описания
  const handleDescriptionChange = (e) => {
    setEditDescription(e.target.value);
    setIsDirty(true);
  };

  // ✅ Изменение даты
  const handleDateChange = (date) => {
    setEditDate(date);
    setIsDirty(true);
  };

  // ============ РЕНДЕР ============

  // ✅ Показываем загрузку, пока данные не пришли
  if (loading) {
    return (
      <Container>
        <CardWrapper>
          <Title>Загрузка...</Title>
          <p style={{ color: "#94A6BE", marginTop: 10 }}>
            Пожалуйста, подождите
          </p>
        </CardWrapper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <CardWrapper>
          <Title>Ошибка</Title>
          <p style={{ color: "red" }}>{error}</p>
          <ButtonsWrapper>
            <BtnBg onClick={() => navigate(`/card/${id}`)}>Назад</BtnBg>
          </ButtonsWrapper>
        </CardWrapper>
      </Container>
    );
  }

  if (!task) {
    return (
      <Container>
        <CardWrapper>
          <Title>Задача не найдена</Title>
          <ButtonsWrapper>
            <BtnBg onClick={() => navigate("/")}>На главную</BtnBg>
          </ButtonsWrapper>
        </CardWrapper>
      </Container>
    );
  }

  const themeClass = themeClassMap[task.topic] || "_orange";
  const statusKey = statusKeyMap[editStatus] || "no-status";

  const allStatuses = [
    { key: "no-status", label: "Без статуса" },
    { key: "to-do", label: "Нужно сделать" },
    { key: "in-progress", label: "В работе" },
    { key: "testing", label: "Тестирование" },
    { key: "done", label: "Готово" },
  ];

  return (
    <Container>
      <CardWrapper>
        <TopBlock>
          <Title>
            {task.title} <span>ID: {task._id}</span>
          </Title>
          <ThemeTop color={themeClass}>
            <p>{task.topic}</p>
          </ThemeTop>
        </TopBlock>

        <StatusBlock>
          <StatusP>Статус</StatusP>
          <StatusThemes>
            {allStatuses.map((s) => (
              <StatusTheme
                key={s.key}
                className={editStatus === s.label ? "selected" : "not-selected"}
                $status={s.key}
                onClick={() => handleStatusClick(s.label)}
              >
                <p>{s.label}</p>
              </StatusTheme>
            ))}
          </StatusThemes>
        </StatusBlock>

        <Wrap>
          <FormBlock>
            <Subttl htmlFor="editTextArea">Описание задачи</Subttl>
            <Textarea
              name="text"
              id="editTextArea"
              placeholder="Введите описание задачи..."
              value={editDescription}
              onChange={handleDescriptionChange}
            />
          </FormBlock>
          <Calendar
            title="Срок исполнения:"
            date={editDate}
            onDateChange={handleDateChange}
          />
        </Wrap>

        <ButtonsWrapper>
          <BtnGroup>
            <BtnBg onClick={handleSave} disabled={isSaving || !isDirty}>
              {isSaving ? "Сохранение..." : "Сохранить"}
            </BtnBg>
            <BtnBorder onClick={handleCancel} disabled={isSaving}>
              Отменить
            </BtnBorder>
            <BtnBorder onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Удаление..." : "Удалить"}
            </BtnBorder>
          </BtnGroup>
          <BtnBg onClick={handleClose}>Закрыть</BtnBg>
        </ButtonsWrapper>
      </CardWrapper>
    </Container>
  );
}

export default EditCardPage;
