// apps/frontend/src/lib/badgeHelpers.tsx
import { SwapEventType, SwapStatus } from '@repo/shared-types';
import { AlertTriangle, ArrowRightLeft, Calendar, CheckCircle2, Clock } from 'lucide-react';
import React from 'react';

export const getStatusBadge = (status: SwapStatus) => {
  const statusConfig = {
    [SwapStatus.SOLICITADO]: {
      color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      icon: Clock,
      label: 'Solicitado',
    },
    [SwapStatus.AGENDADO]: {
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      icon: Calendar,
      label: 'Agendado',
    },
    [SwapStatus.REALIZADO]: {
      color: 'bg-green-500/20 text-green-400 border-green-500/30',
      icon: CheckCircle2,
      label: 'Realizado',
    },
    [SwapStatus.NAO_REALIZADA]: {
      color: 'bg-red-500/20 text-red-400 border-red-500/30',
      icon: AlertTriangle,
      label: 'Não Realizada',
    },
  };

  const config = statusConfig[status];
  const IconComponent = config.icon;

  return (
    <span
      className={`px-3 py-1 text-sm font-medium rounded-lg border ${config.color} flex items-center space-x-1`}
    >
      <IconComponent className="h-3 w-3" />
      <span>{config.label}</span>
    </span>
  );
};

export const getTypeBadge = (type: SwapEventType) => {
  return (
    <span
      className={`px-3 py-1 text-sm font-medium rounded-lg border ${
        type === SwapEventType.TROCA
          ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
          : 'bg-teal-500/20 text-teal-400 border-teal-500/30'
      } flex items-center space-x-1`}
    >
      <ArrowRightLeft className="h-3 w-3" />
      <span>{type}</span>
    </span>
  );
};
