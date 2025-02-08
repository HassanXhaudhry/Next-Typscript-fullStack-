'use client';

import NavBar from '@/components/ui/NavBar';
import ProductsDashboard from '../products/page';
import Footer from '@/components/ui/Footer';

export default function Dashboard() {


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <NavBar/>
      <ProductsDashboard/>
      <Footer/>
    </div>
  );
}