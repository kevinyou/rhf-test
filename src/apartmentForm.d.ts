export type ApartmentApplication = {
  firstName: string;
  lastName: string;
  medicalProfile: {
    smoking: 'yes' | 'no';
  };
  pets: {
    name: string,
    animal: 'dog' | 'cat';
  }[];
}