import ResponsiveNav from '@/components/Navigation/ResponsiveNav';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ResponsiveNav role="admin" />
      <main className="lg:ml-64 p-4 lg:p-8">
        {children}
      </main>
    </div>
  );
}
