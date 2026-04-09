import {useState, useEffect} from 'react';
import {fetchData} from '../utils/fetchData';
import MediaRow from '../components/MediaRow';

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const mediaUrl = import.meta.env.VITE_MEDIA_API + '/media';
        const media = await fetchData(mediaUrl);

        console.log('media from API:', media);

        const authBase = import.meta.env.VITE_AUTH_API + '/users/';

        const mediaWithUsers = await Promise.all(
          media.map(async (item) => {
            const user = await fetchData(authBase + item.user_id);
            return {
              ...item,
              username: user.username,
            };
          }),
        );

        console.log('media with users:', mediaWithUsers);

        setMediaArray(mediaWithUsers);
      } catch (error) {
        console.error('Error loading media:', error);
      }
    };

    getMedia();
  }, []);

  console.log(mediaArray);

  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow key={item.media_id} item={item} />
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Home;
