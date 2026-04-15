import {useState, useEffect} from 'react';
import {fetchData} from '../utils/fetchData';

const useMedia = () => {
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

  return {mediaArray};
};

const useUser = () => {
  const postUser = async (inputs) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    return await fetchData(import.meta.env.VITE_AUTH_API + '/users/', options);
  };

  return {postUser};
};

const postAuthentication = async () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions,
    );
  };
  return {postLogin};
};

export {useMedia, useUser, postAuthentication};
