import Ajv, { JSONSchemaType } from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';
import { RadioField } from 'uniforms-mui';
import { PetField } from './PetField';

type ApartmentApplication = {
  firstName: string;
  lastName: string;
  medicalProfile: {
    smoking: 'yes' | 'no';
  };
  pets: {
    name: string,
    animal: 'dog' | 'cat';
  }[] | never; // for conditional fields, use never instead of optional so JSONSchemaType is happy
}


export const getBridge = ({ showPets }: { showPets: boolean; }) => {
  const schema = {
    title: 'Apartment Application',
    type: 'object',
    properties: {
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      medicalProfile: {
        type: 'object',
        properties: {
          smoking: {
            type: 'string',
            options: [
              {
                label: 'Yes',
                value: 'yes',
              },
              {
                label: 'No',
                value: 'no',
              },
            ],
            uniforms: {
              component: RadioField,
            }
          }
        },
        required: ['smoking'],
      },
      ...(
        showPets && {
          pets: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                animal: {
                  type: 'string',
                  options: [
                    {
                      label: 'Cat',
                      value: 'cat',
                    },
                    {
                      label: 'Dog',
                      value: 'dog',
                    },
                  ],
                },
              },
              required: ['name', 'animal'],
              uniforms: {
                component: PetField,
              }
            },
          }
        }
      ),
    },
    required: ['lastName'],
  } as JSONSchemaType<ApartmentApplication>;

  const ajc = new Ajv({
    allErrors: true,
    useDefaults: true,
    keywords: ['uniforms', 'options'],
  })

  function createValidator<T>(schema: JSONSchemaType<T>) {
    const validator = ajc.compile(schema);

    return (model: Record<string, unknown>) => {
      validator(model);
      return validator.errors?.length ? { details: validator.errors } : null;
    }
  };

  const schemaValidator = createValidator(schema);
  const bridge = new JSONSchemaBridge({ schema, validator: schemaValidator });

  return bridge;
}