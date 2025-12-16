function Calendar({ tasks }) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    const startDay = firstDayOfMonth.getDay();

    const calendarDays = [];

    for (let i = 0; i < startDay; i++) {
        calendarDays.push(null);
        
    }

    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(new Date(year, month, day));
        
    }

    function tasksForDate(date) {
        return tasks.filter(task => {
            if (!task.dueDate) return false;
            const taskDate = new Date(task.dueDate);
            taskDate.setHours(0, 0, 0, 0);
            date.setHours(0, 0, 0, 0);
            return taskDate.getTime() === date.getTime();
        });
    }

    return (
        <div className="calendar">
            <h2>
                {today.toLocaleString("default", { month: "long" })} {year}
            </h2>

            <div className="calendar-grid">
                {["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"].map(d => (
                    <div key={d} className="calendar-day header">{d}</div>
                ))}

            {calendarDays.map((date, index) => (
                <div key={index} className="calendar-day">
                    {date && (
                        <>
                            <span className="date-number">{date.getDate()}</span>

                            {tasksForDate(date).map(task =>
                                <div key={task.id} className={`calendar-task ${task.completed ? "done" : ""}`}>
                                    {task.title}
                                </div>
                            )}
                        </>
                    )}
                </div>
            ))}

            </div>

        </div>
    );
}

export default Calendar;