import Ajv, { JSONSchemaType } from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

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
        smoking: { type: 'string', enum: ['yes', 'no']  }
      },
      required: ['smoking'],
    },
    pets: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          animal: { type: 'string', enum: ['cat', 'dog'] },
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
  keywords: ['uniforms'],
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