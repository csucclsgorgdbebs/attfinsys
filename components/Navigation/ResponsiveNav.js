'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, QrCode, Users, Calendar, Settings } from 'lucide-react';

const links = [
  { name: 'Scan', href: '/scan', icon: QrCode, role: 'officer' },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, role: 'admin' },
  { name: 'Students', href: '/students', icon: Users, role: 'admin' },
];

export default function ResponsiveNav({ role }) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar (Landscape/Tablet/Desktop) */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 p-4">
        <h1 className="text-xl font-bold mb-8 px-2">Attendance Pro</h1>
        <nav className="space-y-2">
          {links.filter(l => l.role === role).map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`flex items-center gap-3 p-3 rounded-lg transition ${pathname === link.href ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
            >
              <link.icon size={20} />
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Floating Bottom Bar (Portrait/Mobile) */}
      <nav className="lg:hidden fixed bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 h-16 rounded-2xl flex items-center justify-around px-6 text-white shadow-2xl z-50">
        {links.filter(l => l.role === role).map((link) => (
          <Link key={link.href} href={link.href} className="flex flex-col items-center gap-1">
            <link.icon size={24} className={pathname === link.href ? 'text-blue-400' : 'text-slate-400'} />
            <span className="text-[10px] uppercase font-bold tracking-tighter">{link.name}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
