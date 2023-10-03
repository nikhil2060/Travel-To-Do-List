export default function Stats({ items }) {
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
