export type ApartmentApplication = {
  firstName: string;
  lastName: string;
  medicalProfile: {
    smoking: 'yes' | 'no' | null; // only null when filling out, not when submitting
  };
  pets: {
    name: string,
    animal: 'dog' | 'cat';
  }[];
}