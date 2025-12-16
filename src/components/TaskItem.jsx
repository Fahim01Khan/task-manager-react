function TaskItem({ id, title, description, completed, priority, dueDate, onDelete, onToggle }) {

    const formattedDate = dueDate
        ? new Date(dueDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
        : "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = dueDate ? new Date(dueDate) : null;
    if (due) due.setHours(0, 0, 0, 0);

    const isOverdue = 
        dueDate && 
        !completed &&
        due < today;

    const isDueToday =
        dueDate && 
        !completed &&
        due.getTime() === today.getTime();

    return (
        <div className={`task-card 
                            ${priority === "high" ? "high" : ""}
                            ${isOverdue ? "overdue" : ""} 
                            ${isDueToday ? "due-today" : ""}`
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