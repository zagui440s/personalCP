import { useLoaderData } from "react-router-dom";
import TaskEditForm from "../components/TaskEditForm";
import SubTaskDisplay from "../components/SubTask";


const EditTaskPage = () => {
  const task = useLoaderData();
  

  return (
    <>
    <TaskEditForm task = {task}/>
    <SubTaskDisplay task_id = {task.id}/>
    </>
  )
};

export default EditTaskPage;
