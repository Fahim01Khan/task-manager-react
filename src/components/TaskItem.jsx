function TaskItem({ id, title, description, completed, priority, onDelete, onToggle }) {
    return (
        <div className={`task-card ${priority === "high" ? "high" : ""}`} style={{ opacity: completed ? 0.6 : 1, }}>
            
            <div className="task-header" >
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => onToggle(id)}
                />
                
                <h3 style={{ textDecoration: completed ? "line-through" : "none"}}>
                    {title}
                </h3>
            </div>

            <p>{description}</p>

            <button onClick={() => onDelete(id)}>Delete</button>

        </div>
    );
}

export default TaskItem;