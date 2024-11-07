import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'
import { useState } from 'react'

export default function CartIcon() {
  const cart = useSelector((state: any) => state.cart)

  // Calculate total items
  const totalItems = cart.items.reduce(
    (sum: number, item: { quantity: number }) => sum + item.quantity,
    0
  )

  // Calculate total price
  const totalPrice = cart.items.reduce(
    (sum: number, item: { price: number; quantity: number }) =>
      sum + item.price * item.quantity,
    0
  ).toFixed(2)

  const [isHovered, setIsHovered] = useState(false)

  return (
    <Button
      variant="outline"
      className="relative"
      asChild
      aria-label={`View cart with ${totalItems} items`}
      onMouseEnter={() => setIsHovered(true)}  // Hover start
      onMouseLeave={() => setIsHovered(false)}  // Hover end
    >
      <Link to="/cart">
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {totalItems}
          </span>
        )}

        {/* Popover showing total price when hovering */}
        {isHovered && totalItems > 0 && (
          <div className="absolute top-10 right-0 bg-white text-black rounded-lg shadow-md p-2 w-40 text-center">
            <p>Total Price</p>
            <p className="font-bold">${totalPrice}</p>
          </div>
        )}
      </Link>
    </Button>
  )
}
