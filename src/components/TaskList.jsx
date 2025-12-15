import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onToggle }) {
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
                    onDelete={onDelete}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
}

export default TaskList