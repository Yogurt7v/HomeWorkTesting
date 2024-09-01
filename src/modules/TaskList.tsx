import { useDispatch, useSelector } from "react-redux";
import { Empty } from "src/components/Empty";
import { List } from "src/components/List";
import { deleteTask, tasksSelector, toggleTask, filterTusks, unfilteredTusks } from "src/store/taskSlice";
import { FilterButton } from "src/components/FilterButton";
import { useRef, useState } from "react";

export const TaskList = () => {
  const items = useSelector(tasksSelector);
  const dispatch = useDispatch();
  const toogle = useRef(false);
  const [filtered, setFiltered] = useState("Только выполненные");

  const handleDelete = (id: Task["id"]) => {
    dispatch(deleteTask(id));
  };

  const handleToggle = (id: Task["id"]) => {
    dispatch(toggleTask(id));
  };

  const handleFilter = () => {
    if (!toogle.current) {
      dispatch(filterTusks());
      setFiltered("Вернуть все");
      toogle.current = true;
    } else {
      dispatch(unfilteredTusks());
      setFiltered("Только выполненные");
      toogle.current = false;
    }
  }

  return items.length > 0 ? (
    <>
      <FilterButton onClick={handleFilter} buttonName={filtered} />
      <List items={items} onDelete={handleDelete} onToggle={handleToggle} />
    </>

  ) : (
    <>
      <Empty />
    </>
  );
};
