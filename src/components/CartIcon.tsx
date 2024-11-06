import { ShoppingCart } from 'lucide-react'
import { CartItem } from './Types'
import { Button } from '@/components/ui/button'

interface CartIconProps {
  cart: CartItem[]
  onCartClick: () => void
}


export default function CartIcon({ cart, onCartClick }: CartIconProps) {
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0)

  return (
    <Button
      variant="outline"
      className="relative"
      onClick={onCartClick}
      aria-label={`View cart with ${totalItems} items`}
    >
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {totalItems}
        </span>
      )}
    </Button>
  )
}
