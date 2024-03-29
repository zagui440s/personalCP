import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { api } from "../utilities";

function Task({ task, setTasks, tasks }) {
  const deleteATask = async () => {
    let response = await api.delete(`tasks/${task.id}/`);
    if (response.status === 204) {
      setTasks(tasks.filter((partask) => partask.id !== task.id));
    }
  };

  return (
    <Row className="task">
      <Col xs={9}>
        <Link to={`/edit/${task.id}/`}>{task.title}</Link>
      </Col>
      <Col>{task.completed ? "completed" : "pending"}</Col>
      <Col onClick={() => deleteATask()}>delete</Col>
    </Row>
  );
}

export default Task;
