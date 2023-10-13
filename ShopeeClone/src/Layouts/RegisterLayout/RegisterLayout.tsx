import Footer from 'src/Component/Footer'
import Navbar from 'src/Component/NavBar'

interface Props {
  children?: React.ReactNode
}

export default function RegisterLayout({ children }: Props) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
