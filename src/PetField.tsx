import { Box } from '@mui/material';
import { connectField, HTMLFieldProps, useField } from 'uniforms';
import { AutoField, NestField } from 'uniforms-mui';

type PetFieldProps = HTMLFieldProps<string, HTMLDivElement>;

const PetField = (props: PetFieldProps) => {
    return <Box>
        <h1>
            {props.name}
        </h1>
        <Box>
            <AutoField name='name' />
            <AutoField name='animal' />
        </Box>
    </Box>;
};

export default connectField<PetFieldProps>(PetField);
