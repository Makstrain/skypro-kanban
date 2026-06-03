import Column from "./Column";

function Main() {
  const columns = [
    {
      title: "Без статуса",
      cards: [
        { title: "Название задачи", theme: "Web Design", date: "30.10.23", themeClass: "_orange" },
        { title: "Название задачи", theme: "Research", date: "30.10.23", themeClass: "_green" },
        { title: "Название задачи", theme: "Web Design", date: "30.10.23", themeClass: "_orange" },
        { title: "Название задачи", theme: "Copywriting", date: "30.10.23", themeClass: "_purple" },
        { title: "Название задачи", theme: "Web Design", date: "30.10.23", themeClass: "_orange" },
      ],
    },
    {
      title: "Нужно сделать",
      cards: [
        { title: "Название задачи", theme: "Research", date: "30.10.23", themeClass: "_green" },
      ],
    },
    {
      title: "В работе",
      cards: [
        { title: "Название задачи", theme: "Research", date: "30.10.23", themeClass: "_green" },
        { title: "Название задачи", theme: "Copywriting", date: "30.10.23", themeClass: "_purple" },
        { title: "Название задачи", theme: "Web Design", date: "30.10.23", themeClass: "_orange" },
      ],
    },
    {
      title: "Тестирование",
      cards: [
        { title: "Название задачи", theme: "Research", date: "30.10.23", themeClass: "_green" },
      ],
    },
    {
      title: "Готово",
      cards: [
        { title: "Название задачи", theme: "Research", date: "30.10.23", themeClass: "_green" },
      ],
    },
  ];

  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          <div className="main__content">
            {columns.map((column, index) => (
              <Column key={index} title={column.title} cards={column.cards} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;