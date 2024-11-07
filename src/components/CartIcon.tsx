import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'

export default function CartIcon() {
  const cart = useSelector((state: any) => state.cart);
  const totalItems = cart.items.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);

  return (
    <Button
      variant="outline"
      className="relative"
      asChild
      aria-label={`View cart with ${totalItems} items`}
    >
      <Link to="/cart">
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {totalItems}
          </span>
        )}
      </Link>
    </Button>
  )
}
