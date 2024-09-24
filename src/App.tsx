import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
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

          <FormControl>
            <FormLabel>Do you Smoke?</FormLabel>
            <RadioGroup>
              <FormControlLabel control={<Radio />} value='yes' label='Yes' {...register('smoking', { required: true })} />
              <FormControlLabel control={<Radio />} value='no' label='No' {...register('smoking', { required: true })} />
              {errors.smoking && <span>This field is required</span>}
            </RadioGroup>
          </FormControl>

          <input type="submit" />
        </form>
      </div>
    </>
  )
}

export default App
