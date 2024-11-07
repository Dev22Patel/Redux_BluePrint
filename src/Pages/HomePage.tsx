import { useState, useEffect } from 'react'
import { AlertCircle, Search, ChevronDown } from 'lucide-react'
import { ToastProvider, ToastViewport } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ProductList from '@/components/ProductList'
import { fetchProducts } from '@/redux/slices/ProductSlice'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RootState } from '@/redux/store'

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-background">
    <div className="relative">
      <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-8 h-8 rounded-full bg-primary/30 animate-pulse" />
      </div>
    </div>
    <p className="mt-4 text-muted-foreground animate-pulse">Loading products...</p>
  </div>
)

const ErrorDisplay = () => {
  const { toast } = useToast()

  useEffect(() => {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to load products. Please try again later.",
    })
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-destructive animate-bounce mb-4">
        <AlertCircle size={48} />
      </div>
      <h2 className="text-xl font-semibold mb-2">Oops! Something went wrong</h2>
      <p className="text-muted-foreground text-center max-w-md">
        We're having trouble loading the products.
        Please refresh the page or try again later.
      </p>
    </div>
  )
}

export default function HomePage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [value, setValue] = useState<string>('')
  const [found, setFound] = useState<boolean>(true)
  const dispatch = useDispatch()

  useEffect(() => {
    // @ts-ignore - Remove if you've properly typed your dispatch
    dispatch(fetchProducts())
  }, [dispatch])

  const { data: products, isLoading, isError } = useSelector((state: RootState) => state.product)

  const finalProducts = (products || []).filter(product =>
    (selectedType ? product.category === selectedType : true) &&
    (value ? product.title.toLowerCase().includes(value.toLowerCase()) : true)
  )

  useEffect(() => {
    setFound(finalProducts.length > 0)
  }, [finalProducts])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return (
      <ToastProvider>
        <ErrorDisplay />
        <ToastViewport />
      </ToastProvider>
    )
  }

  const categories = [
    { label: 'All', value: null },
    { label: 'Electronic', value: 'electronics' },
    { label: 'Jewelery', value: 'jewelery' },
    { label: 'Mens Clothing', value: "men's clothing" },
    { label: 'Womens Clothing', value: "women's clothing" },
  ]

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <div className="flex w-full sm:w-auto items-center gap-2">
          <Search className="h-5 w-5 shrink-0" />
          <Input
            type="text"
            placeholder="Search Here ..."
            className="w-full sm:w-[300px]"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        {/* Desktop view */}
        <div className="hidden sm:flex gap-2">
          {categories.map((category) => (
            <Button
              key={category.label}
              variant={selectedType === category.value ? "default" : "outline"}
              onClick={() => setSelectedType(category.value)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Mobile view */}
        <div className="sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {selectedType ? categories.find(c => c.value === selectedType)?.label : 'All Categories'}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category.label}
                  onSelect={() => setSelectedType(category.value)}
                >
                  {category.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {!found && (
        <h1 className="flex justify-center items-center animate-pulse">
          No Products Found With Matching Name!
        </h1>
      )}

      <ProductList products={finalProducts} />
    </div>
  )
}
