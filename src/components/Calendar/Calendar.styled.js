// src/components/Calendar/Calendar.styled.js
import styled from "styled-components";

export const CalendarWrapper = styled.div`
  width: 182px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 340px;
    width: 100%;
  }
`;

export const CalendarTitle = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding: 0 7px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  line-height: ${({ theme }) => theme.fonts.lineHeight.tight};
`;

export const CalendarBlock = styled.div`
  display: block;
`;

export const CalendarNav = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding: 0 7px;
`;

export const CalendarMonth = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  line-height: 25px;
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavAction = styled.div`
  width: 18px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const CalendarContent = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const DaysNames = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 7px 0;
  padding: 0 7px;
`;

export const DayName = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fonts.size.xs};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  line-height: normal;
  letter-spacing: -0.2px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fonts.size.sm};
  }
`;

export const CellsContainer = styled.div`
  width: 182px;
  height: 126px;
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 344px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;

export const Cell = styled.div`
  width: 22px;
  height: 22px;
  margin: 2px;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fonts.size.xs};
  line-height: ${({ theme }) => theme.fonts.lineHeight.tight};
  letter-spacing: -0.2px;
  cursor: pointer;

  &.other-month {
    opacity: 0;
  }

  &.cell-day:hover {
    color: ${({ theme }) => theme.colors.textSecondary};
    background-color: ${({ theme }) => theme.colors.bgSecondary};
  }

  &.current {
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
  }

  &.active-day {
    background-color: ${({ theme }) => theme.colors.textSecondary};
    color: ${({ theme }) => theme.colors.textLight};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 42px;
    height: 42px;
    font-size: ${({ theme }) => theme.fonts.size.sm};
  }
`;

export const CalendarPeriod = styled.div`
  padding: 0 7px;
`;

export const PeriodText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fonts.size.xs};
  line-height: ${({ theme }) => theme.fonts.lineHeight.tight};

  span {
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fonts.size.sm};
  }
`;
