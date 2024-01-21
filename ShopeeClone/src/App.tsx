import 'react-toastify/dist/ReactToastify.css'
import useRouterElement from './useRouterElement'
import { ToastContainer, toast } from 'react-toastify'
import { useContext, useEffect } from 'react'

import { AppContext } from './Contexts/app.Contexts'
import { LocalStorageEventTarget } from './Component/Ruler/utils'
function App() {
  const router = useRouterElement()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearAccesTokentoLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearAccesTokentoLS', reset)
    }
  }, [reset])
  return (
    <div>
      {router}
      <ToastContainer />
    </div>
  )
}

export default App
