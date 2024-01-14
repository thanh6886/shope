import React, { createContext, useState } from 'react'
import { getAccesTokentoLS, getUserls, saveUser } from 'src/types/auth.type'
import { User } from 'src/types/user.type'
import { ExtendedPurchase, Purchase } from 'src/types/purchase.type'
interface Props {
  children: React.ReactNode
}
interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchases: ExtendedPurchase[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
  reset: () => void
}
const initAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccesTokentoLS()),
  setIsAuthenticated: () => null,
  profile: getUserls(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
  reset: () => null
}

export const AppContext = createContext<AppContextInterface>(initAppContext)
export const AppProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initAppContext.profile)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>([])
  const reset = () => {
    setIsAuthenticated(false), setProfile(null), setExtendedPurchases([])
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchases,
        setExtendedPurchases,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
