import { useMemo, useState } from "react";

const cardsPerView = 3;

function App() {
  const [currentCard, setCurrentCard] = useState(0);
  const [direction, setDirection] = useState("");

  const moveToPrev = () => {
    setTimeout(() => {
      setCurrentCard((prev) => {
        const nextValue = prev - 1;
        return nextValue < 0 ? listOfCards.length - 1 : nextValue;
      });
      setDirection("");
    }, 250);

    setDirection("prev");
  };

  const moveToNext = () => {
    setTimeout(() => {
      setCurrentCard((prev) => {
        const nextValue = prev + 1;
        return nextValue > listOfCards.length - 1 ? 0 : nextValue;
      });
      setDirection("");
    }, 250);

    setDirection("next");
  };

  const filteredCard = useMemo(() => {
    const lastIndex = currentCard + cardsPerView;
    const res = listOfCards.slice(currentCard, lastIndex);

    const num = lastIndex - listOfCards.length;

    if (num > 0) {
      res.push(...listOfCards.slice(0, num));
    }

    return res;
  }, [currentCard]);

  return (
    <div className="app">
      <div className="cards">
        {filteredCard.map((item, index) => {
          let className;

          if (direction) {
            if (index === 0) {
              className = direction === "prev" ? "grow" : "shrink";
            }

            if (index === filteredCard.length - 1) {
              className = direction === "prev" ? "shrink" : "grow";
            }
          }

          return (
            <Card
              key={item.color + className}
              title={item.title}
              index={index}
              color={item.color}
              className={className}
            />
          );
        })}
      </div>

      <button onClick={() => moveToPrev()}>Prev</button>
      <button onClick={() => moveToNext()}>Next</button>
    </div>
  );
}

const Card = ({ title, index, color, className }) => {
  const diff = listOfCards.length - index;

  return (
    <div
      className={`card ${className}`}
      style={{
        backgroundColor: color,
        height: diff * 30,
        left: index * 40,
        zIndex: diff + 1,
      }}
    >
      {title}
    </div>
  );
};

export default App;

// - Given a list of cards
// - Render them as an **infinite** stack
// - The **maximum number** of visible cards is 3
// - Implement Previous and Next buttons click logic (only next button or previous button implementation is enough)
// - Implement simple CSS animation effect on prev&next buttons click

const listOfCards = [
  { title: "CARD #1", color: "green" },
  { title: "CARD #2", color: "brown" },
  { title: "CARD #3", color: "red" },
  { title: "CARD #4", color: "black" },
  { title: "CARD #5", color: "blue" },
  { title: "CARD #6", color: "purple" },
];
