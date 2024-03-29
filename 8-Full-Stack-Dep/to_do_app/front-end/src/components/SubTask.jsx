import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { getSubTasks } from "../utilities";

const SubTaskDisplay = ({task_id}) => {
  const [subTasks, setSubTasks] = useState([]);

  useEffect(() => {
    const getMyTasks = async () => {
      setSubTasks(await getSubTasks(task_id));
    };
    getMyTasks();
  }, []);

  return (
    <>
    <h3>SubTasks</h3>
    <Container>
      {subTasks.map((subTask, idx) => (
        <Row key={idx}>
          <Col>{subTask.title}</Col>
          <Col>{subTask.completed? "DONE":"PENDING"}</Col>
        </Row>
      ))}
    </Container>
    </>
  );
};

export default SubTaskDisplay