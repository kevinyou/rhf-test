import { useFieldArray, useFormContext } from 'react-hook-form'
import { Foo } from './App';

export const PetManager = () => {
  const { control, register } = useFormContext<Foo>();
  const { fields, append } = useFieldArray({
    control,
    name: 'pets',
  });

  return (
    <div>
      <h1>Pet Manager</h1>
      {
        fields.map((field, index) => (
          <div>
            Pet #{index + 1}
            <input key={field.id} type='text' {...register(`pets.${index}.name`, { required: true })}/>
          </div>
        ))
      }
      <button type='button' onClick={() => append({ name: '', animal: 'dog' })}>Click to add a dog</button>
    </div>
  )
}
