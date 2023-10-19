import React, { createContext, useState } from 'react'
import { getAccesTokentoLS } from 'src/types/auth.type'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}
interface Props {
  children: React.ReactNode
}
const initAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccesTokentoLS()),
  setIsAuthenticated: () => null
}

export const AppContext = createContext<AppContextInterface>(initAppContext)
export const AppProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initAppContext.isAuthenticated)
  return <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AppContext.Provider>
}
