
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';

interface Tdata {
    userId: string;
    password:string
}

const Login = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: '2030020005',
      password: '123',
    },
  });


  const [login, {data, error }] = useLoginMutation();

  console.log(data,  error,"useLoginMutation")

  const onSubmit = async (data: Tdata) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    };


    const res = await login(userInfo).unwrap();

    // console.log(res,"result")
    const user = verifyToken(res.data.accessToken);


    dispatch(setUser({ user: user, token: res.data.accessToken }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID: </label>
        <input type="text" id="id" {...register('userId')} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="text" id="password" {...register('password')} />
      </div>
      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;
