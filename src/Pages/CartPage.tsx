// CartPage.tsx
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useSelector, useDispatch } from 'react-redux'
import { updateItem, removeItem } from '@/redux/slices/CartSlice'
import { Key, ReactNode } from 'react'

export default function CartPage() {
  const dispatch = useDispatch()
  const cart = useSelector((state: any) => state.cart)

  const totalPrice = cart.items.reduce((sum: number, item: { price: number; quantity: number }) => {
    const itemQuantity = typeof item.quantity === 'string' ? parseInt(item.quantity) : item.quantity
    return sum + item.price * itemQuantity
  }, 0)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.items.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">Your cart is empty</p>
          <Button asChild>
            <Link to="/">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.items.map((item: { id: Key | null | undefined; name: ReactNode; price: number; quantity: number }) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => dispatch(updateItem({ id: item.id, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => dispatch(updateItem({ id: item.id, quantity: parseInt(e.target.value) || 1 }))}
                        className="w-16 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => dispatch(updateItem({ id: item.id, quantity: item.quantity + 1 }))}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="icon" onClick={() => dispatch(removeItem(item.id))}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 sm:mb-0">
              Total: ${totalPrice.toFixed(2)}
            </div>
            <div className="space-x-4">
              <Button variant="outline" asChild>
                <Link to="/">Continue Shopping</Link>
              </Button>
              <Button onClick={() => alert('Proceeding to checkout')}>Checkout</Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
