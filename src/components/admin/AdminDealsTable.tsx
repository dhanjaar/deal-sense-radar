import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { DealStatusBadge } from './DealStatusBadge';
import { Deal } from '@/types/deal';
import {
  MoreHorizontal,
  ExternalLink,
  CheckCircle,
  XCircle,
  Star,
  Trash2,
  Eye,
} from 'lucide-react';

interface AdminDealsTableProps {
  deals: Deal[];
  onUpdateStatus: (dealId: string, status: 'approved' | 'rejected' | 'sponsored') => void;
  onDeleteDeal: (dealId: string) => void;
}

export const AdminDealsTable = ({ deals, onUpdateStatus, onDeleteDeal }: AdminDealsTableProps) => {
  const [loadingDealId, setLoadingDealId] = useState<string | null>(null);

  const handleStatusUpdate = async (dealId: string, status: 'approved' | 'rejected' | 'sponsored') => {
    setLoadingDealId(dealId);
    await onUpdateStatus(dealId, status);
    setLoadingDealId(null);
  };

  const handleDelete = async (dealId: string) => {
    if (confirm('Are you sure you want to delete this deal? This action cannot be undone.')) {
      setLoadingDealId(dealId);
      await onDeleteDeal(dealId);
      setLoadingDealId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="border border-border rounded-lg bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Stats</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deals.map((deal) => (
            <TableRow key={deal.id}>
              <TableCell>
                <div className="max-w-xs">
                  <div className="font-medium truncate">{deal.title}</div>
                  {deal.description && (
                    <div className="text-sm text-muted-foreground truncate">
                      {deal.description}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <DealStatusBadge status={deal.status as any} />
              </TableCell>
              <TableCell>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>↑ {deal.upvotes}</span>
                  <span>💬 {deal.comment_count}</span>
                  <span>👀 {deal.views}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {deal.category && (
                    <Badge variant="outline" className="text-xs w-fit">
                      {deal.category}
                    </Badge>
                  )}
                  {deal.technology && (
                    <Badge variant="secondary" className="text-xs w-fit">
                      {deal.technology}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-muted-foreground">
                  {formatDate(deal.created_at)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    asChild
                  >
                    <a href={deal.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        disabled={loadingDealId === deal.id}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate(deal.id, 'approved')}
                        className="text-success"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate(deal.id, 'sponsored')}
                        className="text-primary"
                      >
                        <Star className="mr-2 h-4 w-4" />
                        Make Sponsored
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate(deal.id, 'rejected')}
                        className="text-destructive"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(deal.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};