import useCartStore from '../store/useCartStore'

const useCartTotal = () => {
  const products = useCartStore(state => state.products)
  const productsByAmount = useCartStore(state => state.productsByAmount)

  return productsByAmount.reduce((state, pr) => {
    const productPrice = products.find(p => p.ProdCode == pr.id)?.Fasi1 || 0
    const productCal = Number(products.find(p => p.ProdCode == pr.id)?.Description2) || 0

    return {
      products: state.products + pr.amount,
      calories: state.calories + productCal * pr.amount,
      price: state.price + productPrice * pr.amount
    }
  }, {
    price: 0,
    calories: 0,
    products: 0,
  })
}

export default useCartTotal