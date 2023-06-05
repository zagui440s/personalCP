import { useContext } from "react"
import CountContext from "../contexts/CountContext"

export default function Level3() {
    const { count, setCount } = useContext(CountContext);

    return (
        <button onClick={() => setCount(count + 1)}>
            count is {count}
        </button>
    )
}