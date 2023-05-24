import { createContext, useContext, useState } from 'react'

const filterContext = createContext()

export const useFilter = () => useContext(filterContext)

export const FilterProvider = ({ children }) => {
  const [generation, setGeneration] = useState()
  const [type, setType] = useState()

  return (
    <filterContext.Provider value={{ generation, setGeneration, type, setType }}>
      {children}
    </filterContext.Provider>
  )
}