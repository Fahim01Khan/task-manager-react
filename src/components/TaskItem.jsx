function TaskItem({ id, title, description, completed, priority, dueDate, onDelete, onToggle }) {

    const formattedDate = dueDate
        ? new Date(dueDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
        : "";

    const isOverdue = 
        dueDate && 
        !completed &&
        new Date(dueDate) < new Date().setHours(0, 0, 0, 0);

    return (
        <div className={`task-card 
                            ${priority === "high" ? "high" : ""}
                            ${isOverdue ? "overdue" : ""}` 
                        } 
            style={{ opacity: completed ? 0.6 : 1, }}>
            
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
            <p className="due-date">Due: {formattedDate}</p>
            <p>{description}</p>


            <button onClick={() => onDelete(id)}>Delete</button>

        </div>
    );
}

export default TaskItem;