import { Box } from '@mui/material';
import {  filterDOMProps, HTMLFieldProps, useField } from 'uniforms';
import { AutoField } from 'uniforms-mui';

type PetFieldProps = HTMLFieldProps<string, HTMLDivElement>;

export const PetField = (props: PetFieldProps) => {
    const [fieldProps] = useField(props.name, props);
    return (
        <div {...filterDOMProps(fieldProps)}>
            <h1>
               Pet #{
                // array index being on .label is a bit weird. could getuse .name instead
                fieldProps.label
               }
            </h1>
            <Box>
                <AutoField name='name' />
                <AutoField name='animal' />
            </Box>
        </div>
    );
};
