import { useEffect, useState } from "react";
import { shallow } from 'zustand/shallow';
import { useStore } from "../pages/store";
import Task from "./Task";
;


export default function Column({ state }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const tasks = useStore(
    (store) => store.tasks.filter((task) => task.state === state),
    shallow
  );
  const addTask = useStore((store) => store.addTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);

  return (
    <div className="bg-black min-h-[20rem] text-white w-[33%] max-w-[20rem] m-0 mr-[0.5rem] ml-[0.5rem] rounded p-[0.5rem]"
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setDrop(false);
        e.preventDefault();
      }}
      onDrop={(e) => {
        setDrop(false);
        moveTask(draggedTask, state);
        setDraggedTask(null);
      }}
    >
      <div className="">
        <p>{state}</p>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      {tasks?.map((task) => (
        <Task title={task.title} key={task.title} />
      ))}
      {open && (
        <div>
          <div className="flex items-center space-x-2">
            <input onChange={(e) => setText(e.target.value)} value={text} className="text-black rounded outline-none"/>
            <button
              onClick={() => {
                addTask(text, state);
                setText("");
                setOpen(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function RefTest() {
  const ref = useRef();

  useEffect(() => {
    useStore.subscribe(
      (store) => store.tasks,
      (tasks) => {
        ref.current = tasks;
      }
    );
  }, []);

  return ref.current;
}
