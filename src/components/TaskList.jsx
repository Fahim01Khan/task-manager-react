import TaskItem from "./TaskItem";
import Spinner from "./Spinner";
import { useToast } from "./ToastProvider";

function TaskList({ tasks, onDelete, onToggle }) {
    const { showToast } = useToast();
    return (
        <div>
            {tasks.map(task => (
                <TaskItem 
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    completed={task.completed}
                    priority={task.priority}
                    dueDate={task.dueDate}
                    onDelete={(id) => { onDelete(id); showToast("Deleted task", "success"); }}
                    onToggle={(id) => { onToggle(id); showToast("Updated task", "success"); }}
                />
            ))}
        </div>
    );
}

export default TaskList