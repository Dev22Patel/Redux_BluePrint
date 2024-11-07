// ProductList.tsx
import { Product } from './Types'
import ProductItem from './ProductItem'
import { useState, useEffect } from 'react'
import { PaginationDemo } from './Pagination'

interface ProductListProps {
  products: Product[]
}

export default function ProductList({ products }: ProductListProps) {
  const productsPerPage = 6
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [products])

  const totalPages = Math.ceil(products.length / productsPerPage)
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-12 mb-5">
        <PaginationDemo
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
