import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <h1>This url doesn't exist</h1>
      <Link to="/">Home</Link>
    </>
  );
};
export default NotFoundPage;
