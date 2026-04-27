import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

export const metadata = {
  title: 'QR Attendance System',
  description: 'Multi-role attendance tracking',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Everything inside AuthProvider can now use useAuth() */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
