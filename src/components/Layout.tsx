import { Link, Outlet } from 'react-router-dom'
import CartIcon from './CartIcon'
import { ThemeToggle } from './ThemeToogle'
import { Toaster } from '@/components/ui/toaster'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/3 -translate-y-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl dark:bg-blue-900/20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <header className="flex justify-between items-center py-4 mb-8 backdrop-blur-sm bg-background/80 sticky top-0 z-10">
          <Link to="/" className="text-2xl sm:text-3xl font-bold text-pink-500">
            Fashion Store
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <CartIcon />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-4">
                  <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                  <Link to="/cart" onClick={() => setIsOpen(false)}>Cart</Link>
                  <ThemeToggle />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <main className="pb-16">
          <Outlet />
        </main>

        {/* Mobile bottom navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t py-2 px-4">
          <div className="flex justify-around items-center">
            <Link to="/" className="text-center">
              <span className="sr-only">Home</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
            <CartIcon />
          </div>
        </nav>
      </div>
      <Toaster />
    </div>
  )
}
