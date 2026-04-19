import {useLocation, useNavigate} from 'react-router';

const Single = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const item = state.item;

  if (!item) {
    return null;
  }

  console.log('item', item);

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>{item.title}</h2>
      <p>Owner: {item.username}</p>
      <img src={item.filename} alt={item.title} />
      <p>{item.description}</p>
    </div>
  );
};

export default Single;
