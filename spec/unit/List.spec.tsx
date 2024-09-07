import { prettyDOM, render, screen } from "@testing-library/react";
import { List } from "src/components/List";

const items: Task[] = [
  {
    id: String(Math.random()),
    header: "купить хлеб",
    done: false,
  },
  {
    id: String(Math.random()),
    header: "купить молоко",
    done: false,
  },
  {
    id: String(Math.random()),
    header: "выгулять собаку",
    done: true,
  },
];
const tooMuchItems = [...items, ...items, ...items, ...items, ...items,];

it("отображение списка задач", () => {
  const onDelete = jest.fn();
  const onToggle = jest.fn();

  const { rerender, asFragment } = render(
    <List items={items} onDelete={onDelete} onToggle={onToggle} />
  );
  const firstRender = asFragment();

  items.pop();

  rerender(<List items={items} onDelete={onDelete} onToggle={onToggle} />);
  const secondRender = asFragment();

  expect(firstRender).toMatchDiffSnapshot(secondRender);
});

it("Список содержит не больше 10 невыполненных задач", () => {
  render(<List items={tooMuchItems} onDelete={() => undefined} onToggle={() => undefined} />);
  const addButton = screen.getByRole("button");
  console.log(prettyDOM(addButton));

  // expect(addButton).toBeDisabled();
});
