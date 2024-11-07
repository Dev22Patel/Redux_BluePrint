import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider'
import Layout from './components/Layout'
import HomePage from './Pages/HomePage'
import CartPage from './Pages/CartPage'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import ProductPage from './Pages/ProductPage'
export default function App() {
  return (
    <Provider store={store}>
    <ThemeProvider defaultTheme="light" attribute="class">
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="products/:id" element={<ProductPage />} />
              <Route path="category/:name" element={<HomePage />} />
            </Route>
          </Routes>
        </Router>
    </ThemeProvider>
    </Provider>
  )
}
