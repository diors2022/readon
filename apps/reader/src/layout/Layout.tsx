import { Link } from '@literal-ui/next'

export const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1">{children}</main>
      <Footer />
    </div>
  )
}

const Header: React.FC = () => {
  return (
    <header className="typescale-body-large text-on-surface flex justify-center gap-8 py-2">
      <Link href="/">Home</Link>
      <Link href="/pricing">Pricing</Link>
    </header>
  )
}

const Footer: React.FC = () => {
  return (
    <footer className="typescale-body-medium text-outline mt-10 flex items-center justify-center gap-8 p-2 text-center">
      <a href="mailto:pacexy@gmail.com">Contact</a>
      <Link href="/terms">Terms of Use</Link>
      <Link href="/privacy">Privacy Policy</Link>
      <Link href="/refund">Refund Policy</Link>
    </footer>
  )
}