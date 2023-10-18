import 'react-toastify/dist/ReactToastify.css'
import useRouterElement from './useRouterElement'
import { ToastContainer, toast } from 'react-toastify'
function App() {
  const router = useRouterElement()
  return (
    <div>
      {router}
      <ToastContainer />
    </div>
  )
}

export default App
