import { StatsCard } from "@/components/dashboard/StatsCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { 
  Users, 
  Package, 
  DollarSign, 
  Clock,
  TrendingUp,
  Calendar
} from "lucide-react";

const Index = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's your business overview
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 md:mt-0">
          <Calendar className="h-4 w-4" />
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Customers"
          value="1,247"
          icon={Users}
          trend={{ value: "12%", isPositive: true }}
        />
        <StatsCard
          title="Active Orders"
          value="43"
          icon={Package}
          trend={{ value: "8%", isPositive: true }}
        />
        <StatsCard
          title="Monthly Revenue"
          value="₹1,24,500"
          icon={DollarSign}
          trend={{ value: "15%", isPositive: true }}
        />
        <StatsCard
          title="Pending Deliveries"
          value="12"
          icon={Clock}
          trend={{ value: "3%", isPositive: false }}
        />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  );
};

export default Index;
