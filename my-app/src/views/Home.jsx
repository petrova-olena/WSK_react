import {useState} from 'react';
import MediaItem from '../components/MediaItem';
import SingleView from '../components/SingleView';
import {useMedia} from '../hooks/apiHooks';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const {mediaArray} = useMedia();

  return (
    <>
      <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaItem
              key={item.filename}
              setSelectedItem={setSelectedItem}
              item={item}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
