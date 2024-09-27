import { AutoForm } from 'uniforms-mui';
import { getBridge } from './schema'
import { useMemo, useState } from 'react';
import { Button } from '@mui/material';

function App() {
  const [showPets, setShowPets] = useState(false);
  const bridge = useMemo(() => getBridge({ showPets }), [showPets]);
  return (
    <div>
      <Button onClick={() => setShowPets(!showPets)}>Toggle Pet Manager</Button>
      <AutoForm schema={bridge} onSubmit={console.log}>
      </AutoForm>
    </div>
  )
}

export default App
