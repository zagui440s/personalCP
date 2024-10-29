import { useState } from "react";

const ListItem = ({task}) => {
  const [isCompleted, setIsCompleted] = useState(task.completed);

  return (
    <li>
      {task.task}
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={(e) => setIsCompleted(e.target.checked)}
      />
    </li>
  );
};

export default ListItem;


// Franciscos code below to remove the tasks from todo list and show in console.log
// in file app.jsc missing handleCheck = {handleCheck} in line 60
// import { useState } from "react";

// const ListItem = ({ task, handleCheck }) => {
//   const [isCompleted, setIsCompleted] = useState(task.completed);

//   // if check is true
//   return (
//     <li>
//       {task.task}
//       <input
//         type="checkbox"
//         checked={isCompleted}
//         onChange={(e) =>
//           e.target.checked
//             ? handleCheck(task)
//             : setIsCompleted(e.target.checked)
//         }
//       />
//     </li>
//   );
// };

// export default ListItem;