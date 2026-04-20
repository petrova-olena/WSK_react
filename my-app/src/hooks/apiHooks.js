import {useState, useEffect, useCallback} from 'react';
import {fetchData} from '../utils/fetchData';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const mediaUrl = import.meta.env.VITE_MEDIA_API + '/media';
        const media = await fetchData(mediaUrl);

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

        setMediaArray(mediaWithUsers);
      } catch (error) {
        console.error('Error loading media:', error);
      }
    };

    getMedia();
  }, []);

  const postMedia = async (file, inputs, token) => {
    const data = {
      ...inputs,
      ...file,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };

    return await fetchData(import.meta.env.VITE_MEDIA_API + '/media', options);
  };

  return {mediaArray, postMedia};
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

  const checkUser = async (username) => {
    return await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/username/' + username,
    );
  };

  const getUserByToken = useCallback(async (token) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/token',
      options,
    );
  }, []);

  return {postUser, checkUser, getUserByToken};
};

const postAuthentication = () => {
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

const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);

    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    return await fetchData(
      import.meta.env.VITE_UPLOAD_SERVER + '/upload',
      fetchOptions,
    );
  };

  return {postFile};
};

export {useMedia, useUser, postAuthentication, useFile};
