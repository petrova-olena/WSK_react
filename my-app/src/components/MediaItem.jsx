import {Link} from 'react-router';

// eslint-disable-next-line no-unused-vars
const MediaItem = ({item, setSelectedItem}) => {
  return (
    <tr key={item.filename}>
      <td>
        <Link to="/single" state={{item}}>
          Open
        </Link>
        <img src={item.thumbnail} />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{item.created_at}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>{item.username}</td>
    </tr>
  );
};

export default MediaItem;
