import { FieldErrors, useForm } from 'react-hook-form';

// Better errors(set, clear, display)
// Have control over inputs

interface LoginForm {
  username: string;
  password: string;
  email: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: 'onChange',
  });

  const onValid = (data: LoginForm) => {
    console.log('I am valid');
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        type="text"
        placeholder="Username"
        {...register('username', {
          required: 'Username is required',
          minLength: {
            value: 5,
            message: 'The username should be longer than 5 characters',
          },
        })}
      />
      <input
        type="email"
        placeholder="Email"
        {...register('email', {
          required: 'Email is required',
          validate: {
            notGmail: (value) =>
              !value.includes('@gmail.com') || 'Gmail is not allowed',
          },
        })}
        className={`${Boolean(errors.email) && 'border-red-500'}`}
      />
      {errors.email?.message}
      <input
        type="password"
        placeholder="Password"
        {...register('password', { required: 'Password is required' })}
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
