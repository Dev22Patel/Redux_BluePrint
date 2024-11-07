import { Product } from './Types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { useCart } from '../Context/CartContext'
import { useDispatch } from 'react-redux'
import { addItem } from '@/redux/slices/CartSlice'
interface ProductItemProps {
  product: Product
}

export default function ProductItem({ product }: ProductItemProps) {
  const dispatch = useDispatch();
  return (
    <Card className='hover:bg-gray-200 dark:hover:bg-gray-900'>
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${product.price}</p>
      </CardContent>
      <CardFooter>
        <Button variant="default" onClick={() => dispatch(addItem({
            id:product.id,
            name: product.title,
            price: product.price,
            category: product.category,
            quantity: 1,
        }))}>Add to Cart</Button>
      </CardFooter>
    </Card>
  )
}
