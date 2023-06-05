import Level3 from "./Level3"

export default function Level2(props) {
    const { count, setCount } = props

    return <Level3 count={count} setCount={setCount} />
}