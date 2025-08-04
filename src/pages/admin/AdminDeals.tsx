import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminDealsTable } from '@/components/admin/AdminDealsTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Deal } from '@/types/deal';
import { Search, Filter, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const AdminDeals = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Mock data - replace with Supabase queries
  useEffect(() => {
    const mockDeals: Deal[] = [
      {
        id: '1',
        title: 'AI Code Assistant Pro - 50% Off Launch Deal',
        description: 'Revolutionary AI-powered coding assistant with advanced autocomplete',
        url: 'https://example.com/ai-assistant',
        source_url: 'https://reddit.com/r/programming',
        upvotes: 234,
        comment_count: 45,
        views: 2300,
        status: 'pending',
        category: 'Development Tools',
        technology: 'AI',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        scraped_at: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Next.js 14 Complete Course Bundle',
        description: 'Master modern web development with Next.js 14',
        url: 'https://example.com/nextjs-course',
        source_url: 'https://twitter.com/nextjs',
        upvotes: 156,
        comment_count: 32,
        views: 1800,
        status: 'approved',
        category: 'Education',
        technology: 'Next.js',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString(),
        scraped_at: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: '3',
        title: 'Premium Tailwind UI Components',
        description: 'Beautiful, accessible components built with Tailwind CSS',
        url: 'https://example.com/tailwind-components',
        source_url: 'https://tailwindui.com',
        upvotes: 189,
        comment_count: 67,
        views: 3200,
        status: 'sponsored',
        category: 'UI/UX',
        technology: 'Tailwind CSS',
        created_at: new Date(Date.now() - 172800000).toISOString(),
        updated_at: new Date(Date.now() - 172800000).toISOString(),
        scraped_at: new Date(Date.now() - 172800000).toISOString(),
      },
      {
        id: '4',
        title: 'Outdated React Tutorial',
        description: 'This tutorial is using deprecated React patterns',
        url: 'https://example.com/old-react',
        source_url: 'https://example.com',
        upvotes: 12,
        comment_count: 8,
        views: 150,
        status: 'rejected',
        category: 'Education',
        technology: 'React',
        created_at: new Date(Date.now() - 259200000).toISOString(),
        updated_at: new Date(Date.now() - 259200000).toISOString(),
        scraped_at: new Date(Date.now() - 259200000).toISOString(),
      },
    ];

    setTimeout(() => {
      setDeals(mockDeals);
      setLoading(false);
    }, 1000);
  }, []);

  const handleUpdateStatus = async (dealId: string, status: 'approved' | 'rejected' | 'sponsored') => {
    try {
      // Replace with actual Supabase update
      setDeals(prevDeals =>
        prevDeals.map(deal =>
          deal.id === dealId
            ? { ...deal, status, updated_at: new Date().toISOString() }
            : deal
        )
      );
      
      toast({
        title: 'Deal Updated',
        description: `Deal has been ${status} successfully.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update deal status.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteDeal = async (dealId: string) => {
    try {
      // Replace with actual Supabase delete
      setDeals(prevDeals => prevDeals.filter(deal => deal.id !== dealId));
      
      toast({
        title: 'Deal Deleted',
        description: 'Deal has been permanently deleted.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete deal.',
        variant: 'destructive',
      });
    }
  };

  const filteredDeals = deals.filter(deal =>
    deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deal.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deal.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deal.technology?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: deals.length,
    pending: deals.filter(d => d.status === 'pending').length,
    approved: deals.filter(d => d.status === 'approved').length,
    sponsored: deals.filter(d => d.status === 'sponsored').length,
    rejected: deals.filter(d => d.status === 'rejected').length,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">All Deals</h1>
            <p className="text-muted-foreground">Manage and moderate all submitted deals</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Deals</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-warning">{stats.pending}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">{stats.approved}</div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{stats.sponsored}</div>
              <div className="text-sm text-muted-foreground">Sponsored</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-destructive">{stats.rejected}</div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search deals by title, description, category, or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Deals Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Deals ({filteredDeals.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">
                Loading deals...
              </div>
            ) : filteredDeals.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No deals found matching your search.
              </div>
            ) : (
              <AdminDealsTable
                deals={filteredDeals}
                onUpdateStatus={handleUpdateStatus}
                onDeleteDeal={handleDeleteDeal}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};