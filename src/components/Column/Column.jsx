// src/components/Column/Column.jsx
import { Droppable, Draggable } from "@hello-pangea/dnd";
import Card from "../Card/Card";
import SkeletonCard from "../Skeleton/SkeletonCard";
import {
  ColumnWrapper,
  ColumnTitle,
  CardsContainer,
  CardsItem,
} from "./Column.styled";

function Column({ title, cards, columnId, isLoading }) {
  return (
    <ColumnWrapper>
      <ColumnTitle>
        <p>{title}</p>
      </ColumnTitle>

      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <CardsContainer
            ref={provided.innerRef}
            {...provided.droppableProps}
            $isDraggingOver={snapshot.isDraggingOver}
          >
            {isLoading
              ? // Показываем скелетоны
                Array.from({ length: 3 }).map((_, index) => (
                  <CardsItem key={`skeleton-${index}`}>
                    <SkeletonCard />
                  </CardsItem>
                ))
              : // Показываем реальные карточки
                cards.map((card, index) => (
                  <Draggable
                    key={card.id}
                    draggableId={String(card.id)}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <CardsItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.5 : 1,
                        }}
                        $isDragging={snapshot.isDragging}
                      >
                        <Card
                          title={card.title}
                          theme={card.theme}
                          date={card.date}
                          themeClass={card.themeClass}
                          cardId={card.id}
                        />
                      </CardsItem>
                    )}
                  </Draggable>
                ))}
            {provided.placeholder}
          </CardsContainer>
        )}
      </Droppable>
    </ColumnWrapper>
  );
}

export default Column;
