// src/components/Column/Column.jsx
import Card from "../Card/Card";
import {
  ColumnWrapper,
  ColumnTitle,
  CardsContainer,
  CardsItem,
} from "./Column.styled";

function Column({ title, cards }) {
  return (
    <ColumnWrapper>
      <ColumnTitle>
        <p>{title}</p>
      </ColumnTitle>
      <CardsContainer>
        {cards.map((card) => (
          <CardsItem key={card.id}>
            <Card
              title={card.title}
              theme={card.theme}
              date={card.date}
              themeClass={card.themeClass}
              cardId={card.id}
            />
          </CardsItem>
        ))}
      </CardsContainer>
    </ColumnWrapper>
  );
}

export default Column;
