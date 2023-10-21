import React, { createContext, useState } from 'react'
import { getAccesTokentoLS, getUserls, saveUser } from 'src/types/auth.type'
import { User } from 'src/types/user.type'

interface Props {
  children: React.ReactNode
}

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}
const initAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccesTokentoLS()),
  setIsAuthenticated: () => null,
  profile: getUserls(),
  setProfile: () => null
}

export const AppContext = createContext<AppContextInterface>(initAppContext)
export const AppProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initAppContext.profile)
  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile }}>
      {children}
    </AppContext.Provider>
  )
}
