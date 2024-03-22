import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Task from "../components/Task";
import Container from "react-bootstrap/Container";
import CreateTaskForm from "../components/CreateTaskFrom";
// import
const AllTasksPage = () => {
  const [tasks, setTasks] = useState(useLoaderData());

  return (
    <>
      <h1>AllTasksPage</h1>
      <CreateTaskForm tasks={tasks} setTasks={setTasks} />
      <Container>
        {tasks.map((task, idx) => (
          <Task key={idx} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
      </Container>
    </>
  );
};

export default AllTasksPage;
