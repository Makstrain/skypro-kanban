import Column from "./Column";
import { columns } from "../data"; // ← импорт данных

function Main() {
  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          <div className="main__content">
            {columns.map((column) => (
              <Column
                key={column.id} // ← уникальный id колонки
                title={column.title}
                cards={column.cards}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
