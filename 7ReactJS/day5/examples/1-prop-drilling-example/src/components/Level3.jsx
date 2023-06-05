export default function Level3(props) {
    const { count, setCount } = props;

    return (
        <button onClick={() => setCount(count + 1)}>
            count is {count}
        </button>
    )
}