import {useLocation, useNavigate} from 'react-router';

const Single = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const item = state.item;

  return (
    <div style={{padding: '1rem'}}>
      <button onClick={() => navigate(-1)}>Go back</button>

      <h2>{item.title}</h2>
      <p>{item.description}</p>

      {item.media_type.startsWith('image/') ? (
        <img
          src={item.filename}
          alt={item.title}
          style={{maxWidth: '100%', marginTop: '1rem'}}
        />
      ) : (
        <video controls style={{maxWidth: '100%', marginTop: '1rem'}}>
          <source src={item.filename} type={item.media_type} />
        </video>
      )}
    </div>
  );
};

export default Single;
