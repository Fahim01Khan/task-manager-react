import { useMemo, useState } from "react";

function Calendar({ tasks }) {
    const today = new Date();
    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0-11

    function prevMonth() {
        setViewMonth((m) => {
            if (m === 0) { setViewYear((y) => y - 1); return 11; }
            return m - 1;
        });
    }
    function nextMonth() {
        setViewMonth((m) => {
            if (m === 11) { setViewYear((y) => y + 1); return 0; }
            return m + 1;
        });
    }
    function goToday() {
        setViewYear(today.getFullYear());
        setViewMonth(today.getMonth());
    }

    const { calendarDays, headerLabel } = useMemo(() => {
        const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
        const lastDayOfMonth = new Date(viewYear, viewMonth + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();
        const startDay = firstDayOfMonth.getDay(); // 0=Sun

        const days = [];
        for (let i = 0; i < startDay; i++) days.push(null);
        for (let day = 1; day <= daysInMonth; day++) days.push(new Date(viewYear, viewMonth, day));

        // Optional: pad trailing blanks to complete weeks of 7
        while (days.length % 7 !== 0) days.push(null);

        const label = new Date(viewYear, viewMonth, 1).toLocaleString("default", { month: "long", year: "numeric" });
        return { calendarDays: days, headerLabel: label };
    }, [viewYear, viewMonth]);

    function parseLocalDateString(yyyyMmDd) {
        // Parse "YYYY-MM-DD" as a local date to avoid timezone shifts
        const m = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(yyyyMmDd);
        if (m) {
            const y = Number(m[1]);
            const mo = Number(m[2]) - 1;
            const d = Number(m[3]);
            return new Date(y, mo, d);
        }
        // Fallback for non-standard formats
        return new Date(yyyyMmDd);
    }

    function sameYMD(a, b) {
        return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    }

    function tasksForDate(date) {
        if (!date) return [];
        return tasks.filter((task) => {
            if (!task.dueDate) return false;
            const taskDate = typeof task.dueDate === "string" ? parseLocalDateString(task.dueDate) : new Date(task.dueDate);
            return sameYMD(taskDate, date);
        });
    }

    return (
        <div className="calendar">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <button onClick={prevMonth}>{"<"}</button>
                <h2 style={{ margin: 0 }}>{headerLabel}</h2>
                <button onClick={nextMonth}>{">"}</button>
            </div>
            <div style={{ marginBottom: 8 }}>
                <button onClick={goToday}>Today</button>
            </div>

            <div className="calendar-grid">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <div key={d} className="calendar-day header">{d}</div>
                ))}

                {calendarDays.map((date, index) => (
                    <div key={index} className="calendar-day">
                        {date && (
                            <>
                                <span className="date-number">{date.getDate()}</span>
                                {tasksForDate(date).map((task) => (
                                    <div key={task.id} className={`calendar-task ${task.completed ? "done" : ""}`}>
                                        {task.title}
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Calendar;