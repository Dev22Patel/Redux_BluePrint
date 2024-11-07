import { Product } from './Types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useDispatch } from 'react-redux';
import { addItem } from '@/redux/slices/CartSlice';
import { useToast } from '@/hooks/use-toast';
import { Check } from 'lucide-react';
import { AppDispatch } from '@/redux/store';
import { Link } from 'react-router-dom';

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();

  const handleAddToCart = () => {
    dispatch(addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      category: product.category,
      quantity: 1,
    }));

    toast({
      title: "Item Added to Cart",
      description: `${product.title} has been added to your cart.`,
      duration: 2000,
      action: (
        <div className="h-6 w-6 bg-green-500/20 rounded-full flex items-center justify-center">
          <Check className="h-4 w-4 text-green-500" />
        </div>
      ),
    });
  };


  return (
    <Card className="hover:bg-gray-200 dark:hover:bg-gray-900"
    >
        <Link to={`/products/${product.id}`}>
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${product.price}</p>
      </CardContent>
      </Link>
      <CardFooter>
        <Button
          variant="default"
          onClick={handleAddToCart}
          className="w-full"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
