import Ajv, { JSONSchemaType } from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';
import { RadioField } from 'uniforms-mui';

type ApartmentApplication = {
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

const schema: JSONSchemaType<ApartmentApplication> = {
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
      }
    }
  },
  required: ['lastName'],
};

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

export const bridge = new JSONSchemaBridge({ schema, validator: schemaValidator });