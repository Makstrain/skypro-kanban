import Card from "./Card";

function Column({ title, cards }) {
  return (
    <div className="main__column column">
      <div className="column__title">
        <p>{title}</p>
      </div>
      <div className="cards">
        {cards.map((card) => (
          <div className="cards__item" key={card.id}>
            {" "}
            {/* ← уникальный id карточки */}
            <Card
              title={card.title}
              theme={card.theme}
              date={card.date}
              themeClass={card.themeClass}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Column;
