// src/components/Main/Main.jsx
import Column from "../Column/Column";
import { statuses, cards } from "../../data";
import { MainContainer, MainBlock, MainContent } from "./Main.styled";

function Main({ onCardClick }) {
  return (
    <MainContainer>
      <div className="container">
        <MainBlock>
          <MainContent>
            {statuses.map((status) => (
              <Column
                key={status.id}
                title={status.title}
                cards={cards.filter((card) => card.status === status.status)}
                onCardClick={onCardClick}
              />
            ))}
          </MainContent>
        </MainBlock>
      </div>
    </MainContainer>
  );
}

export default Main;
