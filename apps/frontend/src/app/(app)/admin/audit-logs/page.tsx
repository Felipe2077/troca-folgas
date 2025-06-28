// apps/frontend/src/app/(app)/admin/audit-logs/page.tsx
'use client';

import { AuditLogsTable } from '@/components/admin/AuditLogsTable';
import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@repo/shared-types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminAuditLogsPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== Role.ADMINISTRADOR)) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading || !isAuthenticated || user?.role !== Role.ADMINISTRADOR) {
    return <div>Carregando logs de auditoria...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Logs de Auditoria</h1>
      <AuditLogsTable />
    </div>
  );
}
