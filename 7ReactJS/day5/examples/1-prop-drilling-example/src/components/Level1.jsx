import Level2 from "./Level2"

export default function Level1(props) {
    const { count, setCount } = props

    return <Level2 count={count} setCount={setCount} />
}