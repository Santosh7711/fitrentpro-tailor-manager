import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  Users,
  Calendar,
  BarChart3,
  PieChart
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
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

const monthlyRevenue = [
  { month: 'Jan', revenue: 45000, orders: 28, profit: 18000 },
  { month: 'Feb', revenue: 52000, orders: 32, profit: 21000 },
  { month: 'Mar', revenue: 48000, orders: 30, profit: 19500 },
  { month: 'Apr', revenue: 61000, orders: 38, profit: 24500 },
  { month: 'May', revenue: 58000, orders: 36, profit: 23000 },
  { month: 'Jun', revenue: 67000, orders: 42, profit: 27000 },
  { month: 'Jul', revenue: 72000, orders: 45, profit: 29000 },
];

const expenseBreakdown = [
  { name: 'Fabric & Materials', value: 35, amount: 25000, color: '#1F3A93' },
  { name: 'Tailoring Costs', value: 25, amount: 18000, color: '#F39C12' },
  { name: 'Delivery & Logistics', value: 15, amount: 11000, color: '#2ECC71' },
  { name: 'Rent & Utilities', value: 15, amount: 11000, color: '#E74C3C' },
  { name: 'Marketing', value: 10, amount: 7000, color: '#9B59B6' },
];

const weeklyOrders = [
  { day: 'Mon', orders: 8, completed: 6 },
  { day: 'Tue', orders: 12, completed: 10 },
  { day: 'Wed', orders: 10, completed: 8 },
  { day: 'Thu', orders: 15, completed: 12 },
  { day: 'Fri', orders: 18, completed: 15 },
  { day: 'Sat', orders: 22, completed: 20 },
  { day: 'Sun', orders: 14, completed: 12 },
];

const Financials = () => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: action,
      description: `${action} initiated successfully`,
    });
  };

  const currentMonth = {
    revenue: 72000,
    expenses: 43000,
    profit: 29000,
    profitMargin: 40.3,
    revenueGrowth: 8.2,
    orderGrowth: 12.5
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financial Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Track revenue, expenses, and profitability
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button 
            variant="outline"
            onClick={() => handleAction("Export Financial Report")}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button 
            onClick={() => handleAction("Add New Transaction")}
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
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
                +{currentMonth.revenueGrowth}%
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Expenses</p>
                <p className="text-2xl font-bold text-destructive">₹{currentMonth.expenses.toLocaleString()}</p>
              </div>
              <div className="flex items-center text-warning text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                +5.2%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Net Profit</p>
                <p className="text-2xl font-bold text-success">₹{currentMonth.profit.toLocaleString()}</p>
              </div>
              <div className="flex items-center text-success text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                +{currentMonth.orderGrowth}%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Profit Margin</p>
                <p className="text-2xl font-bold text-accent">{currentMonth.profitMargin}%</p>
              </div>
              <Badge className="bg-success text-success-foreground">
                Healthy
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Revenue Trend (7 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `₹${value.toLocaleString()}`, 
                    name === 'revenue' ? 'Revenue' : 'Profit'
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#1F3A93" 
                  fill="#1F3A93" 
                  fillOpacity={0.3}
                />
                <Area 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#2ECC71" 
                  fill="#2ECC71" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Expense Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {expenseBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">₹{item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Orders Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly Orders Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyOrders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#1F3A93" name="Total Orders" />
              <Bar dataKey="completed" fill="#2ECC71" name="Completed Orders" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Financials;