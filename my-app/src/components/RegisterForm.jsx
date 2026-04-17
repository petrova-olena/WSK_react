import {useUser} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';

const RegisterForm = () => {
  const initValues = {
    username: '',
    password: '',
    email: '',
  };

  const {postUser, checkUser} = useUser();

  const {
    inputs,
    handleInputChange,
    handleSubmit,
    errors,
    handleError,
    clearErrors,
  } = useForm(doRegister, handleUserBlur, initValues);

  async function doRegister() {
    try {
      const userResult = await postUser(inputs);
      console.log(userResult);
    } catch (error) {
      console.error(error.message);
    }
  }

  console.log(inputs);

  const handleUserBlur = async () => {
    clearErrors();
    try {
      const checkResult = await checkUser(inputs.username);
      console.log(checkResult);
      if (!checkResult.available) {
        handleError('username', 'Username not available');
      }
    } catch (error) {
      console.error(error.message);
    }

    return (
      <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="registeruser">Username</label>
            <input
              name="username"
              type="text"
              id="registeruser"
              onChange={handleInputChange}
              onBlur={handleUserBlur}
              autoComplete="username"
            />
            {errors && errors.username && <p>{errors?.username}</p>}
          </div>
          <div>
            <label htmlFor="registerpassword">Password</label>
            <input
              name="password"
              type="password"
              id="registerpassword"
              onChange={handleInputChange}
              autoComplete="current-password"
            />
          </div>
          <div>
            <label htmlFor="registeremail">Email</label>
            <input
              name="email"
              type="email"
              id="registeremail"
              onChange={handleInputChange}
              autoComplete="current-email"
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </>
    );
  };
};
export default RegisterForm;
