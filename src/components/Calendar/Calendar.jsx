// src/components/Calendar/Calendar.jsx
import { useState, useEffect } from "react";
import {
  CalendarWrapper,
  CalendarTitle,
  CalendarBlock,
  CalendarNav,
  CalendarMonth,
  NavActions,
  NavAction,
  CalendarContent,
  DaysNames,
  DayName,
  CellsContainer,
  Cell,
  CalendarPeriod,
  PeriodText,
} from "./Calendar.styled";

function Calendar({ title, date, onDateChange }) {
  // Текущая дата для отображения (месяц/год)
  const [currentDate, setCurrentDate] = useState(new Date());
  // Выбранная дата
  const [selectedDate, setSelectedDate] = useState(date || new Date());
  // Дни в текущем месяце
  const [days, setDays] = useState([]);

  // Названия месяцев на русском
  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  // Генерация дней для текущего месяца
  const generateDays = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // День недели первого дня (0 - воскресенье, 1 - понедельник)
    let firstDayOfWeek = firstDay.getDay();
    // Корректировка для понедельника как первого дня
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const daysArray = [];

    // Дни из предыдущего месяца
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      daysArray.push({
        day: prevMonthLastDay - i,
        month: month - 1,
        year: year,
        isCurrentMonth: false,
      });
    }

    // Дни текущего месяца
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push({
        day: i,
        month: month,
        year: year,
        isCurrentMonth: true,
      });
    }

    // Дни следующего месяца (до заполнения сетки)
    const remainingDays = 42 - daysArray.length; // 6 строк по 7 дней
    for (let i = 1; i <= remainingDays; i++) {
      daysArray.push({
        day: i,
        month: month + 1,
        year: year,
        isCurrentMonth: false,
      });
    }

    return daysArray;
  };

  // Обновляем дни при смене месяца
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    setDays(generateDays(year, month));
  }, [currentDate]);

  // Обновляем выбранную дату если изменилась извне
  useEffect(() => {
    if (date) {
      setSelectedDate(new Date(date));
    }
  }, [date]);

  // Переключение на предыдущий месяц
  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  // Переключение на следующий месяц
  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  // Выбор дня
  const handleDayClick = (day, month, year) => {
    if (!day.isCurrentMonth) return; // Нельзя выбрать день из другого месяца

    const newDate = new Date(year, month, day.day);
    setSelectedDate(newDate);

    // Если есть колбэк - вызываем
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  // Проверка, является ли день сегодняшним
  const isToday = (day, month, year) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  // Проверка, выбран ли день
  const isSelected = (day, month, year) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    );
  };

  // Форматирование даты для отображения
  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Проверка, выходной ли день
  const isWeekend = (index) => {
    const dayOfWeek = index % 7;
    return dayOfWeek === 5 || dayOfWeek === 6; // суббота и воскресенье
  };

  return (
    <CalendarWrapper>
      <CalendarTitle>Даты</CalendarTitle>
      <CalendarBlock>
        <CalendarNav>
          <CalendarMonth>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </CalendarMonth>
          <NavActions>
            <NavAction onClick={prevMonth}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="11"
                viewBox="0 0 6 11"
              >
                <path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z" />
              </svg>
            </NavAction>
            <NavAction onClick={nextMonth}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="11"
                viewBox="0 0 6 11"
              >
                <path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z" />
              </svg>
            </NavAction>
          </NavActions>
        </CalendarNav>
        <CalendarContent>
          <DaysNames>
            <DayName>пн</DayName>
            <DayName>вт</DayName>
            <DayName>ср</DayName>
            <DayName>чт</DayName>
            <DayName>пт</DayName>
            <DayName className="-weekend-">сб</DayName>
            <DayName className="-weekend-">вс</DayName>
          </DaysNames>
          <CellsContainer>
            {days.map((day, index) => (
              <Cell
                key={index}
                className={`
                  ${!day.isCurrentMonth ? "other-month" : "cell-day"}
                  ${isToday(day.day, day.month, day.year) ? "current" : ""}
                  ${isSelected(day.day, day.month, day.year) ? "active-day" : ""}
                  ${isWeekend(index) ? "weekend" : ""}
                `}
                onClick={() => handleDayClick(day, day.month, day.year)}
              >
                {day.day}
              </Cell>
            ))}
          </CellsContainer>
        </CalendarContent>
        <CalendarPeriod>
          <PeriodText>
            {title || "Выберите срок исполнения"}{" "}
            <span className="date-control">
              {selectedDate ? formatDate(selectedDate) : ""}
            </span>
          </PeriodText>
        </CalendarPeriod>
      </CalendarBlock>
    </CalendarWrapper>
  );
}

export default Calendar;
