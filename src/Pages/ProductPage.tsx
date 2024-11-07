'use client'

import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById } from '../redux/slices/ProductSlice'
import { AppDispatch, RootState } from '../redux/store'
import { ReactNode, useEffect } from 'react'
import { Star, ShoppingCart, Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { addItem } from '@/redux/slices/CartSlice'
import { toast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()

  // Access the selected product from the Redux store
  const { selectedProduct, isLoading, isError } = useSelector((state: RootState) => state.product)

  // Fetch the product when the component mounts
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(parseInt(id)))
    }
  }, [dispatch, id])

  // Check if the product is still loading
  if (isLoading) {
    return <ProductSkeleton />
  }

  // Check if there was an error fetching the product
  if (isError) {
    return <ErrorState />
  }

  // Check if the selectedProduct is available
  if (!selectedProduct) {
    return <NoProductFound />
  }

  const handleAddToCart = () => {
        dispatch(addItem({
          id: selectedProduct.id,
          title: selectedProduct.title,
          price: selectedProduct.price,
          category: selectedProduct.category,
          quantity: 1,
        }));

        toast({
          title: "Item Added to Cart",
          description: `${selectedProduct.title} has been added to your cart.`,
          duration: 2000,
          action: (
            <div className="h-6 w-6 bg-green-500/20 rounded-full flex items-center justify-center">
              <Check className="h-4 w-4 text-green-500" />
            </div>
          ),
        });
      };
  // Display product details
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb category={selectedProduct.category} title={selectedProduct.title} />
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="flex justify-center items-center bg-white p-4 rounded-lg shadow-md">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
            className="object-contain max-h-[400px]"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{selectedProduct.title}</h1>
            <Badge variant="secondary" className="mb-4">
              {selectedProduct.category}
            </Badge>
            <p className="text-xl font-semibold mb-4">${selectedProduct.price.toFixed(2)}</p>
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(selectedProduct.rating.rate) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {selectedProduct.rating.rate} ({selectedProduct.rating.count} reviews)
              </span>
            </div>
            <p className="text-gray-500 mb-6">{selectedProduct.description}</p>
          </div>
          <Button className="w-full md:w-auto" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </div>
        <Toaster />
      </div>
    </div>
  )
}

function Breadcrumb({ category, title }: { category: ReactNode; title: string }) {
  return (
    <nav className="text-sm mb-4">
      <ol className="list-none p-0 inline-flex">
        <li className="flex items-center">
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
        </li>
        <li className="flex items-center">
          <Link to="\" className="text-blue-500 hover:text-blue-600">
            {category}
          </Link>
          <span className="mx-2">/</span>
        </li>
        <li className="text-gray-500">{title}</li>
      </ol>
    </nav>
  )
}

function ProductSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-4 w-1/4 bg-gray-200 rounded mb-4"></div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="h-[400px] bg-gray-200 rounded"></div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-5 w-5 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded w-full md:w-1/3"></div>
        </div>
      </div>
    </div>
  )
}

function ErrorState() {
  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardContent className="flex flex-col items-center p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-600 text-center mb-6">There was an error loading the product details. Please try again later.</p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function NoProductFound() {
  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardContent className="flex flex-col items-center p-6">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-gray-600 text-center mb-6">We couldn't find the product you're looking for. It may have been removed or doesn't exist.</p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
