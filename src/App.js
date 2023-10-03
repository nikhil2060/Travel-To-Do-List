import { useState } from "react";
import "./index.css";

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleReset() {
    const confirmed = window.confirm("Do you want to clear your list");

    confirmed && setItems([]);
  }

  return (
    <div className="App">
      <Logo />
      <Form onAdditems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteitem={handleDeleteItem}
        onToggleItems={handleToggleItem}
        onResetItems={handleReset}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1></h1>;
  //   return <h1>Trip Planner</h1>;
}

function Form({ onAdditems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAdditems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip ?</h3>
      <select onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((opt) => (
          <option value={opt} key={opt}>
            {opt}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Enter item.."
        onChange={(e) => setDescription(e.target.value)}
      />

      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteitem, onToggleItems, onResetItems }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteitem}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by Packed status</option>
        </select>

        <button onClick={() => onResetItems()}>Clear</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length) return <p className="stats">No items Present</p>;
  const numTotal = items.length;
  const numPacked = items.filter((item) => item.packed === true).length;
  const percentage = Math.floor((numPacked * 100) / numTotal);
  console.log(numPacked);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You packed everything"
          : `You have ${numTotal} items in your List. You already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}

export default App;
