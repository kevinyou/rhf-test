import { useFieldArray, useFormContext } from 'react-hook-form'
import { Box, Button, FormLabel  } from '@mui/material';
import { ApartmentApplication } from '../apartmentForm'
import { SelectElement, TextFieldElement } from 'react-hook-form-mui';

const defaultPet: ApartmentApplication['pets'][0] = {
  name: '',
  animal: 'cat',
};

export const PetManager = () => {
  const { control } = useFormContext<ApartmentApplication>();
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
            <TextFieldElement
              label='Name'
              name={`pets.${index}.name`}
              required
            />
            <SelectElement
              label='Animal'
              name={`pets.${index}.animal`}
              options={[
                {
                  id: 'dog',
                  label: 'Dog',
                },
                {
                  id: 'cat',
                  label: 'Cat',
                },
              ]}
            />
          </Box>
        ))
      }
      </Box>
      <Button variant='contained' onClick={() => append(defaultPet)}>Click to add a pet</Button>
    </div>
  )
}
