import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useEffect } from 'react';
import { Controller, FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
// import './App.css'

type Foo = {
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

  const { fields: petFields, append: appendPets } = useFieldArray({
    control,
    name: 'pets',
  });

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
            <div>
              {
                petFields.map((petField, index) => (
                  <div>
                    Pet #{index + 1}
                    <input key={petField.id} type='text' {...register(`pets.${index}.name`)}/>
                  </div>
                ))
              }
              <button type='button' onClick={() => appendPets({ name: '', animal: 'dog' })}>Click to add a dog</button>
            </div>
          </FormControl>

          <input type="submit" onClick={handleSubmit(onSubmit)}/>
        </form>
      </div>
    </FormProvider>
  )
}

export default App
