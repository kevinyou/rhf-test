import { AutoForm } from 'uniforms-mui';
import { bridge as schema } from './schema'

function App() {
  return (
    <AutoForm schema={schema} onSubmit={console.log}>
    </AutoForm>
  )
}

export default App
