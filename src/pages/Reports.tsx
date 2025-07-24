import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  BarChart3, 
  Download, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  DollarSign,
  Clock,
  CheckCircle
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
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const monthlyData = [
  { month: 'Jan', revenue: 45000, customers: 28, orders: 35, profit: 18000, expenses: 27000 },
  { month: 'Feb', revenue: 52000, customers: 32, orders: 42, profit: 21000, expenses: 31000 },
  { month: 'Mar', revenue: 48000, customers: 30, orders: 38, profit: 19500, expenses: 28500 },
  { month: 'Apr', revenue: 61000, customers: 38, orders: 45, profit: 24500, expenses: 36500 },
  { month: 'May', revenue: 58000, customers: 36, orders: 41, profit: 23000, expenses: 35000 },
  { month: 'Jun', revenue: 67000, customers: 42, orders: 48, profit: 27000, expenses: 40000 },
  { month: 'Jul', revenue: 72000, customers: 45, orders: 52, profit: 29000, expenses: 43000 }
];

const customerSegmentData = [
  { name: 'VIP', value: 25, count: 312, color: '#F39C12' },
  { name: 'Regular', value: 45, count: 562, color: '#1F3A93' },
  { name: 'New', value: 30, count: 375, color: '#2ECC71' }
];

const orderStatusData = [
  { status: 'Completed', count: 145, percentage: 58 },
  { status: 'In Progress', count: 67, percentage: 27 },
  { status: 'Pending', count: 23, percentage: 9 },
  { status: 'Cancelled', count: 15, percentage: 6 }
];

const weeklyPerformance = [
  { day: 'Mon', orders: 8, revenue: 12000, customers: 6 },
  { day: 'Tue', orders: 12, revenue: 18000, customers: 9 },
  { day: 'Wed', orders: 10, revenue: 15000, customers: 8 },
  { day: 'Thu', orders: 15, revenue: 22000, customers: 12 },
  { day: 'Fri', orders: 18, revenue: 28000, customers: 15 },
  { day: 'Sat', orders: 22, revenue: 35000, customers: 18 },
  { day: 'Sun', orders: 14, revenue: 21000, customers: 11 }
];

const Reports = () => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: action,
      description: `${action} generated successfully`,
    });
  };

  // Calculate key metrics
  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];
  const revenueGrowth = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue * 100).toFixed(1);
  const customerGrowth = ((currentMonth.customers - previousMonth.customers) / previousMonth.customers * 100).toFixed(1);
  const orderGrowth = ((currentMonth.orders - previousMonth.orders) / previousMonth.orders * 100).toFixed(1);
  const profitMargin = ((currentMonth.profit / currentMonth.revenue) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Business insights and performance analytics
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={() => handleAction("Export PDF Report")}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button onClick={() => handleAction("Generate Custom Report")}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Custom Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold text-primary">₹{currentMonth.revenue.toLocaleString()}</p>
              </div>
              <div className="flex items-center text-success text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                +{revenueGrowth}%
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Customers</p>
                <p className="text-2xl font-bold text-accent">{currentMonth.customers}</p>
              </div>
              <div className="flex items-center text-success text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                +{customerGrowth}%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-warning">{currentMonth.orders}</p>
              </div>
              <div className="flex items-center text-success text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                +{orderGrowth}%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Profit Margin</p>
                <p className="text-2xl font-bold text-success">{profitMargin}%</p>
              </div>
              <Badge className="bg-success text-success-foreground">
                Healthy
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Report Actions */}
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

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Revenue & Profit Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  `₹${value.toLocaleString()}`, 
                  name === 'revenue' ? 'Revenue' : 'Profit'
                ]} />
                <Area type="monotone" dataKey="revenue" stroke="#1F3A93" fill="#1F3A93" fillOpacity={0.3} />
                <Area type="monotone" dataKey="profit" stroke="#2ECC71" fill="#2ECC71" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Customer Segments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerSegmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {customerSegmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {customerSegmentData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.count} customers</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orderStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-md ${
                      item.status === 'Completed' ? 'bg-success text-success-foreground' :
                      item.status === 'In Progress' ? 'bg-warning text-warning-foreground' :
                      item.status === 'Pending' ? 'bg-muted text-muted-foreground' :
                      'bg-destructive text-destructive-foreground'
                    }`}>
                      {item.status === 'Completed' ? <CheckCircle className="h-4 w-4" /> :
                       item.status === 'In Progress' ? <Clock className="h-4 w-4" /> :
                       <Package className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium">{item.status}</p>
                      <p className="text-sm text-muted-foreground">{item.count} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Weekly Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'revenue' ? `₹${value.toLocaleString()}` : value,
                  name === 'revenue' ? 'Revenue' : name === 'orders' ? 'Orders' : 'Customers'
                ]} />
                <Line type="monotone" dataKey="orders" stroke="#1F3A93" strokeWidth={2} />
                <Line type="monotone" dataKey="customers" stroke="#2ECC71" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Monthly Revenue vs Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
              <Bar dataKey="revenue" fill="#1F3A93" name="Revenue" />
              <Bar dataKey="expenses" fill="#E74C3C" name="Expenses" />
              <Bar dataKey="profit" fill="#2ECC71" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;