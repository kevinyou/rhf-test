import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useEffect } from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { PetManager } from './PetManager';
// import './App.css'

export type Foo = {
  firstName: string;
  lastName: string;
  medicalProfile: {
    smoking: 'yes' | 'no';
  };
  pets: {
    name: string,
    animal: 'dog';
  }[];
}

function App() {
  const methods = useForm<Foo>({
    defaultValues: {
      firstName: 'Bob',
      medicalProfile: {},
      pets: [],
    }
  });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

  const onSubmit: SubmitHandler<Foo> = (data) => console.log(data);

   useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    )
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <FormProvider {...methods}>
      <div>
        <form>
          <TextField label='First Name' {...register('firstName')}/>
          <TextField label='Last Name' {...register('lastName', { required: true })} helperText={errors.lastName && 'This field is required'} />

          <FormControl>
            <FormLabel>Do you Smoke?</FormLabel>
            <Controller
              name="medicalProfile.smoking"
              control={control}
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              )}
            />
            {errors.medicalProfile?.smoking && <FormHelperText>{errors.medicalProfile.smoking.message}</FormHelperText>}
            <PetManager/>
          </FormControl>

          <input type="submit" onClick={handleSubmit(onSubmit)}/>
        </form>
      </div>
    </FormProvider>
  )
}

export default App
