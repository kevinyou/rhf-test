import { Box, Button, FormControl, FormLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { ApartmentApplication } from '../apartmentForm'
import { FieldArray, getIn, useFormikContext } from 'formik';

const defaultPet: ApartmentApplication['pets'][0] = {
  name: '',
  animal: 'cat',
};

export const PetManager = () => {
  const formik = useFormikContext<ApartmentApplication>();
  return (
    <FieldArray
      name='pets'
      render={(arrayHelpers) => (
        <>
          <h1>Pet Manager</h1>
          <Box display='flex' flexDirection='column' gap={2}>
          {
            formik.values.pets.map((_, index) => (
              <Box key={`pet-${index}`} display='flex' alignItems='center' gap={2}>
                <FormLabel>Pet #{index + 1}</FormLabel>
                <TextField
                  label='Name'
                  type='text'
                  helperText={getIn(formik.errors, `pets[${index}].name`) ? 'Give your pet a name!' : undefined}
                  {...formik.getFieldProps(`pets.${index}.name`)}
                />


                <FormControl>
                  <InputLabel>Animal</InputLabel>
                  <Select label='Animal' {...formik.getFieldProps(`pets.${index}.animal`)}>
                    <MenuItem value='dog'>Dog</MenuItem>
                    <MenuItem value='cat'>Cat</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            ))
          }
          </Box>
          <Button variant='contained' onClick={() => arrayHelpers.insert(formik.values.pets.length, defaultPet)}>
            Click to add a pet
          </Button>
        </>
      )}
    >
    </FieldArray>
  )
}
