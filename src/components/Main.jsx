import Column from "./Column";
import { statuses, cards } from "../data";

function Main() {
  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          <div className="main__content">
            {statuses.map((status) => (
              <Column
                key={status.id}
                title={status.title}
                // Фильтруем карточки: оставляем только те, у которых статус совпадает
                cards={cards.filter((card) => card.status === status.status)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
