import { prettyDOM, render, screen } from "@testing-library/react";
import { List } from "src/components/List";
import { App } from "src/App";
import * as taskSlice from "src/store/taskSlice";
import { JestStoreProvider } from "../utils/JestStoreProvider";

const items: Task[] = [
  {
    id: String(1),
    header: "купить хлеб",
    done: false,
  },
  {
    id: String(2),
    header: "купить молоко",
    done: false,
  },
  {
    id: String(3),
    header: "выгулять собаку",
    done: true,
  },
];
const tooMuchItems = [...items, ...items, ...items, ...items, ...items, ...items, ...items];

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

  render(<List items={tooMuchItems} onDelete={() => { }} onToggle={() => { }} />)
  const li = screen.getAllByRole("listitem");
  expect(li).toHaveLength(10);

});
