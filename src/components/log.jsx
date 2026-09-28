export default function Log({ truns }) {
  return (
    <ol id="log">
      {truns.map((turn, index) => (
        <li key={`${turn.squry.row}-${turn.squry.cal}-${index}`}>
          {turn.player} selected row {turn.squry.row}, {turn.squry.cal}
        </li>
      ))}
    </ol>
  );
}