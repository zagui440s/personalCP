import { useEffect } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import axios from "axios";

export async function userImageLoader({ params }) {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${params.userId}`
  );
  return response.data.sprites.front_default;
}

export default function UserPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const userImageUrl = useLoaderData();

  useEffect(() => {
    if (parseInt(userId, 10) > 99) {
      console.error("There are no users with id > 99!");
      navigate(`/`);
    }
  }, [userId]);

  return (
    <>
      <h2>User Page for user with id: {userId}</h2>
      <img src={userImageUrl} />
    </>
  );
}
