import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
// import './App.css'

type Foo = {
  firstName: string;
  lastName: string;
  smoking: 'yes' | 'no';
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Foo>({
    defaultValues: {
      firstName: 'test',
      smoking: 'yes',
    }
  });

  const onSubmit: SubmitHandler<Foo> = (data) => console.log(data);

   // Callback version of watch.  It's your responsibility to unsubscribe when done.
   useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    )
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <>
      <div>
        <form>
          <TextField label='First Name' {...register('firstName')}/>
          <TextField label='Last Name' {...register('lastName', { required: true })} helperText={errors.lastName && 'This field is required'} />

          <FormControl>
            <FormLabel>Do you Smoke?</FormLabel>
            <RadioGroup>
              <FormControlLabel control={<Radio />} value='yes' label='Yes' {...register('smoking')} />
              <FormControlLabel control={<Radio />} value='no' label='No' {...register('smoking')} />
              {errors.smoking && <span>{errors.smoking.message}</span>}
            </RadioGroup>
          </FormControl>

          <input type="submit" onClick={handleSubmit(onSubmit)}/>
        </form>
      </div>
    </>
  )
}

export default App
