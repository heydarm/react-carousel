import { useMemo, useState } from "react";

const cardsPerView = 3;

function App() {
  const [currentCard, setCurrentCard] = useState(0);
  const [direction, setDirection] = useState("");

  const moveToPrev = () => {
    setCurrentCard((prev) => {
      const nextValue = prev - 1;
      return nextValue < 0 ? listOfCards.length - 1 : nextValue;
    });
    setTimeout(() => {
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
      <div className={`cards direction-${direction}`}>
        {filteredCard.map((item, index) => {
          return (
            <Card
              key={item.color}
              title={item.title}
              index={index}
              color={item.color}
            />
          );
        })}
      </div>

      <button onClick={() => moveToPrev()}>Prev</button>
      <button onClick={() => moveToNext()}>Next</button>
    </div>
  );
}

const Card = ({ title, index, color }) => {
  return (
    <div
      className="card"
      style={{
        "--pos": index,
        "--last-pos": listOfCards.length - index,
        backgroundColor: color,
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
