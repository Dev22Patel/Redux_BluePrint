import { useState } from 'react'
import CartIcon from './components/CartIcon'
import CartPage from './Pages/CartPage'
import ProductList from './components/ProductList'
import { CartItem, Product } from './components/Types'

const initialProducts: Product[] = [
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Smartphone', price: 499.99 },
  { id: 3, name: 'Headphones', price: 99.99 },
  { id: 4, name: 'Tablet', price: 299.99 },
]


export default function App() {
    const [products] = useState<Product[]>(initialProducts)
    const [cart, setCart] = useState<CartItem[]>([])
    const [currentView, setCurrentView] = useState<'products' | 'cart'>('products')

    const addToCart = (product: Product) => {
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === product.id)
        if (existingItem) {
          return prevCart.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        }
        return [...prevCart, { ...product, quantity: 1 }]
      })
    }

    const updateCartItem = (id: number, quantity: number) => {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
        ).filter(item => item.quantity > 0)
      )
    }

    const removeFromCart = (id: number) => {
      setCart(prevCart => prevCart.filter(item => item.id !== id))
    }

    return (
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Our Store</h1>
          <CartIcon
            cart={cart}
            onCartClick={() => setCurrentView('cart')}
          />
        </header>
        <main>
          {currentView === 'cart' ? (
            <CartPage
              cart={cart}
              updateCartItem={updateCartItem}
              removeFromCart={removeFromCart}
              onContinueShopping={() => setCurrentView('products')}
            />
          ) : (
            <ProductList products={products} addToCart={addToCart} />
          )}
        </main>
      </div>
    )
  }
