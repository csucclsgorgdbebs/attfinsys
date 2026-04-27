import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { studentId, orgId, eventId } = await req.json();
  const supabase = createRouteHandlerClient({ cookies });

  // 1. Find internal student ID from the scanned External ID
  const { data: student } = await supabase
    .from('students')
    .select('id')
    .eq('student_external_id', studentId)
    .eq('org_id', orgId)
    .single();

  if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });

  // 2. Insert attendance record
  const { error } = await supabase
    .from('attendance')
    .insert({
      student_id: student.id,
      event_id: eventId,
      org_id: orgId,
    });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ success: true });
}
