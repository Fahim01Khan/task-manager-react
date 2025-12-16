import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import Calendar from "./components/Calendar";

function App() {
    const [tasks, setTasks] = useState (() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [ theme, setTheme ] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ priority, setPriority ] = useState("");
    const [ dueDate, setDueDate] = useState("");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);
    useEffect(() => {
        localStorage.setItem("theme", theme);
    });

    function handleAddTask(e) {
        e.preventDefault();

        const taskPriority = priority || "normal";
        const newTask = {
            id: Date.now(),
            title,
            description,
            completed: false,
            dueDate,
            priority: taskPriority,
        };

        setTasks([...tasks, newTask]);
        setTitle("");
        setDescription("");
        setDueDate("");
        setPriority("");
    }

    function handleDeleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    function handleToggleComplete(id) {
        setTasks(
            tasks.map(task =>
                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    }

    const activeTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);
    const sortedActiveTasks = [...activeTasks].sort(
        (a,b) => (b.priority === "high") - (a.priority === "high")
    );

    return (
        <div
            className="app" 
            data-theme={theme}
        >
            <h1>Task Manager</h1>

            <div className="theme-switcher">
                <button onClick={() => setTheme("light")}>Light</button>
                <button onClick={() => setTheme("dark")}>Dark</button>
                <button onClick={() => setTheme("sand")}>Sandy</button>
            </div>

            <form onSubmit={handleAddTask}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <br />
                <input
                    type="text"
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <br />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
                <br />                
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="">Normal Priority</option>
                    <option value="high">High Priority</option>
                </select>
                <br />
                <br />
                <button type="submit">Add Task</button>
            </form>
            
            <h2>Active Tasks</h2>
            <TaskList 
                tasks={sortedActiveTasks} 
                onDelete={handleDeleteTask} 
                onToggle={handleToggleComplete}
            />

            <h2>Completed Tasks</h2>
            <TaskList 
                tasks={completedTasks} 
                onDelete={handleDeleteTask} 
                onToggle={handleToggleComplete}
            />

            <h2>Calendar</h2>
            <Calendar tasks={tasks} />

        </div>
    );
}

export default App;