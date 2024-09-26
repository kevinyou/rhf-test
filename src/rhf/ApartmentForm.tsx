import { Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { getIn, useFormik } from 'formik';
import { ApartmentApplication } from '../apartmentForm';
// import './App.css'

export const ApartmentForm = () => {
  const onSubmit = (data: any) => console.log(data);

  const formik = useFormik<ApartmentApplication>({
    initialValues: {
      firstName: '',
      lastName: '',
      medicalProfile: {
        smoking: null,
      },
      pets: [],
    },
    onSubmit: onSubmit,
  })

  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <TextField label='First Name' {...formik.getFieldProps('firstName')}/>
          <TextField label='Last Name' {...formik.getFieldProps('lastName')} />

          <FormControl>
            <FormLabel>Do you Smoke?</FormLabel>
            <RadioGroup {...formik.getFieldProps('medicalProfile.smoking')}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
            { getIn(formik.errors, 'medicalProfile.smoking') && <FormHelperText>{getIn(formik.errors, 'medicalProfile.smoking')}</FormHelperText>}
          </FormControl>

          <Button type='submit'>Submit</Button>
        </form>
      </div>
    </>
  )
}
