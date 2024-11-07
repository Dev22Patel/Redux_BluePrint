// Layout.tsx
import { Link, Outlet } from 'react-router-dom'
import CartIcon from './CartIcon'
import { ThemeToggle } from './ThemeToogle'

export default function Layout() {
  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 -translate-x-1/3 -translate-y-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl dark:bg-blue-900/20"
        />
      </div>

      <div className="container mx-auto p-4 relative">
        <header className="flex flex-wrap justify-between items-center mb-8 backdrop-blur-sm bg-transparent p-4 rounded-lg">
          <Link to="/" className="text-3xl font-bold text-pink-500 mb-2 md:mb-0">
            Fashion Store
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <CartIcon />
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
