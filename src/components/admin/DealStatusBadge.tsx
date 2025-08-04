import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, XCircle, Star } from 'lucide-react';

interface DealStatusBadgeProps {
  status: 'pending' | 'approved' | 'rejected' | 'sponsored';
}

export const DealStatusBadge = ({ status }: DealStatusBadgeProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'approved':
        return {
          label: 'Approved',
          variant: 'default' as const,
          className: 'bg-success text-success-foreground',
          icon: CheckCircle,
        };
      case 'pending':
        return {
          label: 'Pending',
          variant: 'secondary' as const,
          className: 'bg-warning text-warning-foreground',
          icon: Clock,
        };
      case 'rejected':
        return {
          label: 'Rejected',
          variant: 'destructive' as const,
          className: 'bg-destructive text-destructive-foreground',
          icon: XCircle,
        };
      case 'sponsored':
        return {
          label: 'Sponsored',
          variant: 'default' as const,
          className: 'bg-primary text-primary-foreground',
          icon: Star,
        };
      default:
        return {
          label: 'Unknown',
          variant: 'secondary' as const,
          className: '',
          icon: Clock,
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  return (
    <Badge variant={config.variant} className={`flex items-center gap-1 ${config.className}`}>
      <IconComponent className="w-3 h-3" />
      {config.label}
    </Badge>
  );
};