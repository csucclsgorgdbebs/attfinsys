'use client';
import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useAuth } from '@/context/AuthContext';

export default function ScanPage() {
  const { profile } = useAuth();
  const [status, setStatus] = useState('Ready to Scan');

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    scanner.render(onScanSuccess, onScanFailure);

    async function onScanSuccess(decodedText) {
      // decodedText = Student External ID
      setStatus('Processing...');
      // Logic: Post to /api/attendance with student_id + profile.org_id
      const res = await fetch('/api/attendance', {
        method: 'POST',
        body: JSON.stringify({ studentId: decodedText, orgId: profile.org_id })
      });
      
      if (res.ok) setStatus('Success! Checked in.');
      else setStatus('Error: Student not found.');
    }

    function onScanFailure(error) { /* Ignore constant scanning noise */ }

    return () => scanner.clear();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-6">Event Check-in</h1>
      <div id="reader" className="w-full max-w-md overflow-hidden rounded-xl border-2 border-cyan-500"></div>
      <p className="mt-8 text-lg font-mono">{status}</p>
    </div>
  );
}
