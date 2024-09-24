import { TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form'
// import './App.css'

type Foo = {
  firstName: string;
  lastName: string;
  smoking: boolean;
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Foo>();

  const onSubmit: SubmitHandler<Foo> = (data) => console.log(data);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField label='First Name' {...register('firstName')}/>
          <TextField label='Last Name' {...register('lastName', { required: true })} helperText={errors.lastName && 'This field is required'} />

          <span>Do you Smoke?</span>
          <label>
            <input type='radio' id='field-smoking-yes' value='yes' {...register('smoking', { required: true })}/>
            Yes
          </label>
          <label>
            <input type='radio' id='field-smoking-no' value='no' {...register('smoking', { required: true } )}/>
            No
          </label>
          {errors.smoking && <span>This field is required</span>}

          <input type="submit" />
        </form>
      </div>
    </>
  )
}

export default App
