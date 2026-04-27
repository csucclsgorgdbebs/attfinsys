import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function StudentsPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: students } = await supabase.from('students').select('*');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Student Directory</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Add Student</button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">External ID</th>
              <th className="px-6 py-4 font-medium hidden md:table-cell">Joined At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students?.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                <td className="px-6 py-4 text-gray-600">{student.student_external_id}</td>
                <td className="px-6 py-4 text-gray-500 hidden md:table-cell">
                  {new Date(student.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
