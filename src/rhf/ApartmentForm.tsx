import { Button, FormControl } from '@mui/material';
import { SubmitHandler } from 'react-hook-form'
import { PetManager } from './PetManager';
import { ApartmentApplication } from '../apartmentForm';
import { FormContainer, RadioButtonGroup, TextFieldElement } from 'react-hook-form-mui';
// import './App.css'

export const ApartmentForm = () => {
  const onSubmit: SubmitHandler<ApartmentApplication> = (data) => console.log(data);

  return (
    <FormContainer onSuccess={onSubmit}>
      <div>
        <TextFieldElement label='First Name' name='firstName' />
        <TextFieldElement label='Last Name' name='lastName' required />

        <FormControl>
          <RadioButtonGroup
            label='Do you smoke?'
            name='medicalProfile.smoking'
            required
            options={[
              {
                id: 'yes',
                label: 'Yes',
              },
              {
                id: 'no',
                label: 'No',
              },
            ]}
          />
          <PetManager/>
        </FormControl>

        <Button type='submit'>Submit</Button>
      </div>
    </FormContainer>
  )
}
