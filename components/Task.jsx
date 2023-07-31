import { BsTrash } from 'react-icons/bs';
import { useStore } from '../pages/store';

export default function Task({ title }) {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const deleteTask = useStore((store) => store.deleteTask);

  return (
    <div className='bg-white rounded min-h-[5rem] text-black p-[0.5rem] flex flex-col justify-between'
      draggable
      onDragStart={() => setDraggedTask(task.title)}
    >
      <div>{task.title}</div>
      <div>
        <div>
          <BsTrash className='w-10 h-10 text-white'/>
        </div>
        <div >{task.state}</div>
      </div>
    </div>
  );
}