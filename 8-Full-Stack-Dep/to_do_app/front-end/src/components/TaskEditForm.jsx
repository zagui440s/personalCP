import Form from "react-bootstrap/Form";
import { useState } from "react";
import { updateATask } from "../utilities";
import Button from "react-bootstrap/esm/Button";

const TaskEditForm = ({ task }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);
  const [edit, setEdit] = useState(true);

  const updateThisTask = async (e) => {
    e.preventDefault();
    let success = await updateATask(task.id, title, description, completed);
    if (success) {
      setEdit(true);
    }
    alert(success ? "This task has been updated" : "Update Failed");
  };

  return (
    <>
      <h1>{task.title}</h1>
      <Form onSubmit={(e) => updateThisTask(e)}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          {edit ? (
            <h5>{title}</h5>
          ) : (
            <Form.Control
              type="text"
              placeholder="Enter title here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          {edit ? (
            <h5>{description}</h5>
          ) : (
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          )}
        </Form.Group>
        {edit ? (
          <h5>{completed ? "completed" : "pending"}</h5>
        ) : (
          <Form.Check
            type="checkbox"
            label="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        )}
        {edit ? (
          <Button variant="warning" onClick={() => setEdit(!edit)}>
            Edit Task
          </Button>
        ) : (
          <>
            <Button type="submit">Submit Changes</Button>
            <Button variant="warning" onClick={() => setEdit(!edit)}>
              Cancel
            </Button>
          </>
        )}
      </Form>
    </>
  );
};

export default TaskEditForm;
