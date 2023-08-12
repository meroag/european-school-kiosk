import Cart from '../Cart'
import Header from '../Header'
import styles from "./layout.module.scss"

interface LayoutProps {
    children: JSX.Element
}

const Layout = ({children}: LayoutProps) => {
  return (
    <>
      <main className={styles.layoutWrapper}>
        <Header />
        {children}
      </main>
      <Cart />
    </>
  )
}

export default Layout
