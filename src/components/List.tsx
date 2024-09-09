import { Item } from "./Item";

type Props = {
  items: Task[];
  onDelete: (id: Task["id"]) => void;
  onToggle: (id: Task["id"]) => void;
};

export const List = ({ items, onDelete, onToggle }: Props) => (

  <ul className="task-list tasks">
    {items.length > 10 && <p>Слишком много задач. Показаны только 10 первых</p>}
    {items.slice(0, 10).map((item) => (
      <Item
        {...item}
        key={item.id}
        onDelete={onDelete}
        onToggle={onToggle} />
    ))}
  </ul>
);
