import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  BarChart3, 
  Download, 
  Calendar,
  TrendingUp,
  Users,
  Package,
  DollarSign
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const monthlyData = [
  { month: 'Jan', revenue: 45000, customers: 28, orders: 35 },
  { month: 'Feb', revenue: 52000, customers: 32, orders: 42 },
  { month: 'Mar', revenue: 48000, customers: 30, orders: 38 },
  { month: 'Apr', revenue: 61000, customers: 38, orders: 45 },
  { month: 'May', revenue: 58000, customers: 36, orders: 41 },
  { month: 'Jun', revenue: 67000, customers: 42, orders: 48 }
];

const Reports = () => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: action,
      description: `${action} generated successfully`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Business insights and performance analytics
          </p>
        </div>
        <Button onClick={() => handleAction("Export All Reports")}>
          <Download className="h-4 w-4 mr-2" />
          Export Reports
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-16" onClick={() => handleAction("Customer Report")}>
          <div className="text-center">
            <Users className="h-6 w-6 mx-auto mb-1" />
            <p className="text-sm">Customer Report</p>
          </div>
        </Button>
        <Button variant="outline" className="h-16" onClick={() => handleAction("Revenue Report")}>
          <div className="text-center">
            <DollarSign className="h-6 w-6 mx-auto mb-1" />
            <p className="text-sm">Revenue Report</p>
          </div>
        </Button>
        <Button variant="outline" className="h-16" onClick={() => handleAction("Orders Report")}>
          <div className="text-center">
            <Package className="h-6 w-6 mx-auto mb-1" />
            <p className="text-sm">Orders Report</p>
          </div>
        </Button>
        <Button variant="outline" className="h-16" onClick={() => handleAction("Performance Report")}>
          <div className="text-center">
            <BarChart3 className="h-6 w-6 mx-auto mb-1" />
            <p className="text-sm">Performance</p>
          </div>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#1F3A93" fill="#1F3A93" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;