import { useForm } from 'react-hook-form';

//  Less code
// Better validation
// Better errors(set, clear, display)
// Have control over inputs
// Don't deal with events
// Easier inputs

export default function Forms() {
  const { register } = useForm();

  return (
    <form>
      <input
        type="text"
        placeholder="Username"
        {...register('username')}
        required={true}
      />
      <input
        type="email"
        placeholder="Email"
        {...register('email')}
        required={true}
      />
      <input
        type="password"
        placeholder="Password"
        {...register('password')}
        required={true}
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
