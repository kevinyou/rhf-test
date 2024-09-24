import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
// import './App.css'

type Foo = {
  firstName: string;
  lastName: string;
  smoking: 'yes' | 'no';
  smokingx: 'yes' | 'no';
}

function App() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Foo>({
    defaultValues: {
      firstName: 'Bob',
    }
  });

  const onSubmit: SubmitHandler<Foo> = (data) => console.log(data);

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
            <Controller
              name="smoking"
              control={control}
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              )}
            />
            {errors.smoking && <FormHelperText>{errors.smoking.message}</FormHelperText>}
          </FormControl>

          <input type="submit" onClick={handleSubmit(onSubmit)}/>
        </form>
      </div>
    </>
  )
}

export default App
