import React from 'react'
import CartHeader from 'src/Component/CartHeader'
import Footer from 'src/Component/Footer'
import NavHeader from 'src/Component/NavHeader'

interface Props {
  children?: React.ReactNode
}

export default function CartLayout({ children }: Props) {
  return (
    <div>
      <CartHeader />
      {children}
      <Footer />
    </div>
  )
}
