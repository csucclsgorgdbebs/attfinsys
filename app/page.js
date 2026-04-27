import { redirect } from 'next/navigation';

export default function RootPage() {
  // Automatically send users to the login screen
  redirect('/login');
}
