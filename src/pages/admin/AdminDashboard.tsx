import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminLayout } from '@/components/admin/AdminLayout';
import {
  BarChart3,
  FileText,
  Clock,
  TrendingUp,
  Users,
  Eye,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

export const AdminDashboard = () => {
  // Mock statistics - replace with real data from Supabase
  const stats = [
    {
      title: 'Total Deals',
      value: '2,847',
      change: '+12%',
      changeType: 'positive' as const,
      icon: FileText,
    },
    {
      title: 'Pending Approval',
      value: '23',
      change: '+5',
      changeType: 'neutral' as const,
      icon: Clock,
    },
    {
      title: 'Sponsored Deals',
      value: '15',
      change: '+2',
      changeType: 'positive' as const,
      icon: TrendingUp,
    },
    {
      title: 'Total Users',
      value: '12,543',
      change: '+8%',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      title: 'Monthly Views',
      value: '487K',
      change: '+15%',
      changeType: 'positive' as const,
      icon: Eye,
    },
    {
      title: 'Avg. Engagement',
      value: '76%',
      change: '-3%',
      changeType: 'negative' as const,
      icon: BarChart3,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'New deal submitted',
      title: 'AI Code Assistant Pro',
      user: 'john@example.com',
      time: '5 minutes ago',
    },
    {
      id: 2,
      action: 'Deal approved',
      title: 'React Hooks Course Bundle',
      user: 'admin',
      time: '12 minutes ago',
    },
    {
      id: 3,
      action: 'Deal rejected',
      title: 'Outdated Vue.js Tutorial',
      user: 'moderator',
      time: '1 hour ago',
    },
    {
      id: 4,
      action: 'Deal promoted to sponsored',
      title: 'Next.js 14 Masterclass',
      user: 'admin',
      time: '2 hours ago',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.changeType === 'positive' && (
                    <ArrowUp className="mr-1 h-3 w-3 text-success" />
                  )}
                  {stat.changeType === 'negative' && (
                    <ArrowDown className="mr-1 h-3 w-3 text-destructive" />
                  )}
                  <span
                    className={
                      stat.changeType === 'positive'
                        ? 'text-success'
                        : stat.changeType === 'negative'
                        ? 'text-destructive'
                        : 'text-muted-foreground'
                    }
                  >
                    {stat.change}
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-foreground">
                      {activity.action}
                    </div>
                    <div className="text-sm text-primary font-medium">
                      {activity.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      by {activity.user}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left">
                <Clock className="h-6 w-6 text-warning mb-2" />
                <div className="font-medium">Review Pending</div>
                <div className="text-sm text-muted-foreground">23 deals waiting</div>
              </button>
              <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left">
                <TrendingUp className="h-6 w-6 text-primary mb-2" />
                <div className="font-medium">Promote Deal</div>
                <div className="text-sm text-muted-foreground">Feature as sponsored</div>
              </button>
              <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left">
                <BarChart3 className="h-6 w-6 text-success mb-2" />
                <div className="font-medium">View Analytics</div>
                <div className="text-sm text-muted-foreground">Detailed insights</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};