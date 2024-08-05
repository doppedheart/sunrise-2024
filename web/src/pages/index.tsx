import Task from "@/model/Task";
import {
  completeTask,
  getActiveTasks,
  getAllTasks,
  getCompletedTasks,
  getNonActiveTask,
} from "@/modules/taskManager";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { TitleHead } from "@/components/TitleHead";
import { Navbar } from "@/components/Navbar";
import axios from "axios";
export default function Home() {
  return (
    <>
      <Navbar />
      <Main />
    </>
  );
}

export function Main() {
  const { loading, tasks, handleCompleteTask, activeTasks, completedTasks } = useActiveTask();
  if (loading) {
    //can use loading skeleton
    return <div className="col-span-1">loading ...</div>;
  }
  return (
    <div className="mx-12 grid grid-cols-3 gap-6">
      <div className="col-span-1  flex flex-col gap-4 py-4">
        <TitleHead title="To-Do" totalTasks={tasks.length} className="bg-[#D9D9D9]" />
        <div className="grid grid-cols-2 gap-3">
          {tasks.map((task) => (
            <div>
              <Card
                task={task}
                disable={true}
                handleCompleteTask={handleCompleteTask}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-1  flex flex-col gap-4 py-4 ">
        <TitleHead
          title="In Progress"
          totalTasks={activeTasks.length}
          className="bg-[#E6F7FF] text-[#1890FF]"
        />
        <div className="grid grid-cols-2 gap-3">
          {activeTasks.map((task) => (
            <div>
              <Card
                task={task}
                disable={false}
                handleCompleteTask={handleCompleteTask}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-1 flex flex-col gap-4 py-4 ">
        <TitleHead
          title="Completed"
          totalTasks={completedTasks.length}
          className="bg-[#52C41A] text-white"
        />
        <div className="grid grid-cols-2 gap-3">
          {completedTasks.map((task) => (
            <div>
              <Card task={task} handleCompleteTask={handleCompleteTask} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function useActiveTask() {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  async function fetchTasks() {
    try {
      const response = await axios.get("/api/tasks/todo");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  }
  async function fetchActiveTasks() {
    try {
      const response = await axios.get("/api/tasks/active");
      setActiveTasks(response.data);
    } catch (error) {
      console.error("Error fetching active tasks", error);
    }
  }

  async function fetchCompletedTasks() {
    try {
      const response = await axios.get("/api/tasks/completed");
      setCompletedTasks(response.data);
    } catch (error) {
      console.error("Error fetching completed tasks", error);
    }
  }
  async function handleCompleteTask(taskTitle: string) {
    try {
      await axios.put("/api/tasks/completed", { taskTitle });
      await fetchTasks();
      await fetchActiveTasks();
      await fetchCompletedTasks();
    } catch (error) {
      console.error("Error completing task:", error);
    }
  }
  useEffect(() => {
    setLoading(true);
    fetchTasks();
    fetchActiveTasks();
    fetchCompletedTasks();
    setLoading(false);
  }, []);

  return { loading, tasks, activeTasks, completedTasks, handleCompleteTask };
}
