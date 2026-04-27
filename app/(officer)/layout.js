import ResponsiveNav from '@/components/Navigation/ResponsiveNav';

export default function OfficerLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950">
      <main className="pb-24 lg:pl-64"> 
        {children}
      </main>
      <ResponsiveNav role="officer" />
    </div>
  );
}
