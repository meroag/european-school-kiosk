import SvgIcon from '../../vendor/svgr/SvgIcon'
import Cart from '../Cart'
import Header from '../Header'
import Modal from '../Modal'
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
      {/* <Modal>
        <div className={styles.modalContentWrapper}>
          <SvgIcon
            wrapperStyle={styles.modalIcon}
            iconName='oops'
          />
          <h2>Oops!</h2>
          <p>We run out of stock for this item and will have to remove it from your cart:</p>

          <img src="/images/product.png" alt="" />
          <h3>Dumplings (3 piece) x1</h3>
          <span>5.99₾</span>
          <button>OK</button>
        </div>
      </Modal> */}
    </>
  )
}

export default Layout
