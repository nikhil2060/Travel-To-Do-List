import { useState } from "react";
import "./index.css";
import Logo from "./Logi";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
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
