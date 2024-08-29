import { useState } from "react";
import "./App.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Toothbrush", quantity: 2, packed: false },
];

function App() {
  const [travelItems, setTravelItems] = useState(initialItems);

  function handleSetTravelItems(newItem) {
    setTravelItems((travelItems) => [...travelItems, newItem]);
  }

  function handleDeleteItem(id) {
    setTravelItems((travelItems) =>
      travelItems.filter((item) => item.id !== id)
    );
  }

  function handlePacked(id) {
    setTravelItems((travelItems) =>
      travelItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form
        travelItems={travelItems}
        handleSetTravelItems={handleSetTravelItems}
      />
      <PackagingList
        travelItems={travelItems}
        handleDeleteItem={handleDeleteItem}
        handlePacked={handlePacked}
      />
      <Stats travelItems={travelItems} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ travelItems, handleSetTravelItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      id: Date.now(),
      quantity,
      description,
      packed: false,
    };
    handleSetTravelItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3> What do you need for your trip ?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="...item"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

function PackagingList({ travelItems, handleDeleteItem, handlePacked }) {
  return (
    <div className="list">
      <ul>
        {travelItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            travelItems={travelItems}
            handleDeleteItem={handleDeleteItem}
            handlePacked={handlePacked}
          />
        ))}
      </ul>
      <div className="actions">
        <select>
          <option value='input'>sort by input order</option>
          <option value='description'>sort by description</option>
          <option value='packed'>sort by packed status</option>
        </select>
        
      </div>
    </div>
  );
}

function Item({ item, travelItems, handleDeleteItem, handlePacked }) {
  return (
    <li>
      <span>
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => handlePacked(item.id)}
        />
      </span>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      <span onClick={() => handleDeleteItem(item.id)}>❌</span>
    </li>
  );
}

function Stats({ travelItems }) {
  const x = travelItems.length;
  const y = travelItems.filter((item) => item.packed).length;

  return (
    <footer className="stats">
      {" "}
      <em>
        {" "}
        You have {x} items in your list, and you have already packed {y}. {"("}
        {Math.round((y * 100) / x)}%{")"}
      </em>
    </footer>
  );
}

export default App;
