import { Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { Form, Formik, getIn, useFormikContext } from 'formik';
import { ApartmentApplication } from '../apartmentForm';
import { PetManager } from './PetManager';
// import './App.css'

const NameFields = () => {
  const formik = useFormikContext<ApartmentApplication>();
  return (
    <>
      <TextField label='First Name' {...formik.getFieldProps('firstName')}/>
      <TextField label='Last Name' {...formik.getFieldProps('lastName')} />
    </>
  )
}

const MedicalProfileField = () => {
  const formik = useFormikContext<ApartmentApplication>();

  return (
    <FormControl>
      <FormLabel>Do you Smoke?</FormLabel>
      <RadioGroup {...formik.getFieldProps('medicalProfile.smoking')}>
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>
      { getIn(formik.errors, 'medicalProfile.smoking') && <FormHelperText>{getIn(formik.errors, 'medicalProfile.smoking')}</FormHelperText>}
    </FormControl>
  )
}

export const ApartmentForm = () => {
  const onSubmit = (data: any) => console.log(data);

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        medicalProfile: {
          smoking: null,
        },
        pets: [],
      }}
      onSubmit={onSubmit}
    >
      <div>
        <Form>
          <NameFields />

          <MedicalProfileField/>
          <PetManager />

          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    </Formik>
  )
}
