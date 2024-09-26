import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Box, Button, FormControl, FormLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { ApartmentApplication } from '../apartmentForm'

const defaultPet: ApartmentApplication['pets'][0] = {
  name: '',
  animal: 'cat',
};

export const PetManager = () => {
  const { control, register, formState: { errors } } = useFormContext<ApartmentApplication>();
  const { fields, append } = useFieldArray({
    control,
    name: 'pets',
  });

  return (
    <div>
      <h1>Pet Manager</h1>
      <Box display='flex' flexDirection='column' gap={2}>
      {
        fields.map((field, index) => (
          <Box key={field.id} display='flex' alignItems='center' gap={2}>
            <FormLabel>Pet #{index + 1}</FormLabel>
            <TextField
              label='Name'
              type='text'
              helperText={errors.pets?.[index] ? 'Give your pet a name!' : undefined}
              {...register(`pets.${index}.name`, { required: true })}
            />
            <Controller
              control={control}
              name={`pets.${index}.animal`}
              render={({ field }) => (
                <FormControl>
                  <InputLabel>Animal</InputLabel>
                  <Select label='Animal' {...field}>
                    <MenuItem value='dog'>Dog</MenuItem>
                    <MenuItem value='cat'>Cat</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Box>
        ))
      }
      </Box>
      <Button variant='contained' onClick={() => append(defaultPet)}>Click to add a pet</Button>
    </div>
  )
}
