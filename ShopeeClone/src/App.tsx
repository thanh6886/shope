import 'react-toastify/dist/ReactToastify.css'
import useRouterElement from './useRouterElement'
function App() {
  const router = useRouterElement()
  return <div>{router}</div>
}

export default App
