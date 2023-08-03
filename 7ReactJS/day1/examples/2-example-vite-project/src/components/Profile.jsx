export default function Profile(props) {
  const { name, imgUrl, hobbies } = props;

  console.log(props.name);

  const onClickHandler = (event) => {
    // we don't use the event, but we could
    console.log(event);

    alert("You clicked me!");
  };

  return (
    <div className="ProfileContainer">
      { (name.length > 0) && (
          <div className="Profile">
            <h2>{name}</h2>
            <img src={imgUrl}/>
            <h3>Hobbies</h3>
            <ul>
              <li>{hobbies[0]}</li>
              <li>{hobbies[1]}</li>
              <li>{hobbies[2]}</li>
            </ul>
            <button onClick={onClickHandler}>Click me!</button>
          </div>
        )
      }
    </div>
  );
}