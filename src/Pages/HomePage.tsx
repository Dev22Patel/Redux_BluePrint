import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductList from '../components/ProductList';
import { fetchProducts } from "../redux/slices/ProductSlice";

// Define the RootState type
interface RootState {
  product: {
    isLoading: boolean;
    data: Array<{
      id: number;
      title: string;
      price: number;
      category: string; // Add if your products have this field
    }> | null;
    isError: boolean;
  };
}

export default function HomePage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [value, setValue] = useState<string>('');
  const [found, setFound] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore - Remove if you've properly typed your dispatch
    dispatch(fetchProducts());
  }, [dispatch]);

  // Correctly access the state matching your slice structure
  const { data: products, isLoading, isError } = useSelector((state: RootState) => state.product);


  // Safely handle null products array
  const finalProducts = (products || []).filter(product =>
    (selectedType ? product.category === selectedType : true) &&
    (value ? product.title.toLowerCase().includes(value.toLowerCase()) : true)
  );

  useEffect(() => {
    setFound(finalProducts.length > 0);
  }, [finalProducts]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen">Error loading products</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <div className="flex gap-1">
          <Search className="m-1.5" />
          <Input
            type="text"
            placeholder="Search Here ..."
            className="max-w-lg"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>

      <div className="p-2 flex gap-2 mb-6">
        <Button variant="outline" onClick={() => setSelectedType(null)}>
          All
        </Button>
        <Button variant="outline" onClick={() => setSelectedType('electronics')}>
          Electronic
        </Button>
        <Button variant="outline" onClick={() => setSelectedType('jewelery')}>
          Jewelery
        </Button>
        <Button variant="outline" onClick={() => setSelectedType("men's clothing")}>
          Mens Clothing
        </Button>
        <Button variant="outline" onClick={() => setSelectedType("women's clothing")}>
            Womens clothing
        </Button>
      </div>

      {!found && (
        <h1 className="flex justify-center items-center animate-pulse">
          No Products Found With Matching Name!
        </h1>
      )}

      <ProductList products={finalProducts} />

    </div>
  );
}
