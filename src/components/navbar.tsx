import Link from 'next/link';
import { Button } from './ui/button';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Ekosistem<span className="text-primary">Sekolah</span></span>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link href="#fitur" className="text-gray-600 hover:text-primary transition-colors">Fitur</Link>
            <Link href="#preview" className="text-gray-600 hover:text-primary transition-colors">Preview</Link>
            <Link href="#tentang" className="text-gray-600 hover:text-primary transition-colors">Tentang</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:inline-flex">Masuk</Button>
            </Link>
            <Link href="/login">
              <Button>Coba Sekarang</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
