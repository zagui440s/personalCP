import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { createATask } from "../utilities";
import { useState } from "react";

function CreateTaskForm({ setTasks, tasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(true);

  const addATask = async (e) => {
    e.preventDefault();
    let newTask = await createATask(title, description);
    if (newTask) {
      setTasks([...tasks, newTask]);
    }
    setShow(true)
  };

  return (
    <>
      {show ? (
        <Button onClick={()=>setShow(!show)}>Create a Task</Button>
      ) : (
        <Form onSubmit={(e) => addATask(e)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </Form.Group>
          <Button variant="success" type="submit">Create</Button>
          <Button variant='warning' onClick={()=>setShow(!show)}>Cancel</Button>
        </Form>
      )}
    </>
  );
}

export default CreateTaskForm;
