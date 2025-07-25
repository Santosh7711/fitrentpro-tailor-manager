import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { OrderForm } from "@/components/forms/OrderForm";
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
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Plus, 
  Package, 
  Clock, 
  CheckCircle, 
  Eye,
  Edit,
  Truck,
  TrendingUp,
  Calendar
} from "lucide-react";

const useState = React.useState;

const extendedSampleOrders = [
  {
    id: "ORD-001",
    customerId: "CUST-001",
    customerName: "Rahul Sharma", 
    item: "Navy Blue 3-Piece Suit",
    size: "42L",
    rentPrice: "₹2,500",
    alterationCost: "₹300",
    totalAmount: "₹2,800",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-30",
    returnDate: "2024-02-05",
    status: "In Progress",
    progress: "Stitching",
    progressPercent: 65
  },
  {
    id: "ORD-002",
    customerId: "CUST-002",
    customerName: "Priya Patel",
    item: "Black Designer Blazer", 
    size: "M",
    rentPrice: "₹1,800",
    alterationCost: "₹150",
    totalAmount: "₹1,950",
    orderDate: "2024-01-20",
    deliveryDate: "2024-02-05",
    returnDate: "2024-02-10",
    status: "Ready",
    progress: "Quality Check",
    progressPercent: 95
  },
  {
    id: "ORD-003",
    customerId: "CUST-003", 
    customerName: "Amit Kumar",
    item: "Grey Wedding Suit Set",
    size: "44R",
    rentPrice: "₹3,200",
    alterationCost: "₹450",
    totalAmount: "₹3,650",
    orderDate: "2024-01-25",
    deliveryDate: "2024-02-08",
    returnDate: "2024-02-12",
    status: "Delivered",
    progress: "Completed",
    progressPercent: 100
  },
  {
    id: "ORD-004",
    customerId: "CUST-004",
    customerName: "Neha Singh",
    item: "Maroon Velvet Blazer",
    size: "S", 
    rentPrice: "₹2,100",
    alterationCost: "₹200",
    totalAmount: "₹2,300",
    orderDate: "2024-01-28",
    deliveryDate: "2024-02-12",
    returnDate: "2024-02-16",
    status: "Pending",
    progress: "Measurement",
    progressPercent: 15
  },
  {
    id: "ORD-005",
    customerId: "CUST-005",
    customerName: "Ravi Gupta", 
    item: "Charcoal Business Suit",
    size: "40R",
    rentPrice: "₹2,700",
    alterationCost: "₹350",
    totalAmount: "₹3,050",
    orderDate: "2024-02-01",
    deliveryDate: "2024-02-15",
    returnDate: "2024-02-20",
    status: "In Progress",
    progress: "Cutting",
    progressPercent: 35
  },
  {
    id: "ORD-006",
    customerId: "CUST-006",
    customerName: "Anita Reddy",
    item: "Royal Blue Cocktail Blazer",
    size: "L",
    rentPrice: "₹2,200", 
    alterationCost: "₹180",
    totalAmount: "₹2,380",
    orderDate: "2024-02-03",
    deliveryDate: "2024-02-18",
    returnDate: "2024-02-22",
    status: "Ready",
    progress: "Packaging",
    progressPercent: 90
  },
  {
    id: "ORD-007",
    customerId: "CUST-007",
    customerName: "Vikram Singh",
    item: "Cream Silk Kurta Set",
    size: "XL",
    rentPrice: "₹1,500",
    alterationCost: "₹100",
    totalAmount: "₹1,600",
    orderDate: "2024-02-05",
    deliveryDate: "2024-02-20",
    returnDate: "2024-02-25",
    status: "In Progress",
    progress: "Stitching",
    progressPercent: 55
  },
  {
    id: "ORD-008",
    customerId: "CUST-008",
    customerName: "Kavya Nair",
    item: "Emerald Green Lehenga",
    size: "M",
    rentPrice: "₹4,500",
    alterationCost: "₹600",
    totalAmount: "₹5,100",
    orderDate: "2024-02-07",
    deliveryDate: "2024-02-22",
    returnDate: "2024-02-26",
    status: "Pending",
    progress: "Design Approval",
    progressPercent: 10
  }
];

const orderTrendData = [
  { month: 'Sep', orders: 18, completed: 16, revenue: 45000 },
  { month: 'Oct', orders: 22, completed: 20, revenue: 52000 },
  { month: 'Nov', orders: 25, completed: 23, revenue: 58000 },
  { month: 'Dec', orders: 28, completed: 26, revenue: 65000 },
  { month: 'Jan', orders: 32, completed: 30, revenue: 72000 },
  { month: 'Feb', orders: 35, completed: 32, revenue: 78000 }
];

const orderStatusDistribution = [
  { name: 'Delivered', value: 35, count: 28, color: '#2ECC71' },
  { name: 'Ready', value: 25, count: 20, color: '#F39C12' },
  { name: 'In Progress', value: 30, count: 24, color: '#3498DB' },
  { name: 'Pending', value: 10, count: 8, color: '#95A5A6' }
];

const weeklyOrderData = [
  { day: 'Mon', orders: 4, completed: 3 },
  { day: 'Tue', orders: 6, completed: 5 },
  { day: 'Wed', orders: 5, completed: 4 },
  { day: 'Thu', orders: 8, completed: 7 },
  { day: 'Fri', orders: 9, completed: 8 },
  { day: 'Sat', orders: 12, completed: 10 },
  { day: 'Sun', orders: 7, completed: 6 }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Ready":
      return "bg-success text-success-foreground";
    case "In Progress":
      return "bg-warning text-warning-foreground";
    case "Delivered":
      return "bg-primary text-primary-foreground";
    case "Pending":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const Orders = () => {
  const [orders, setOrders] = useState(extendedSampleOrders);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const handleAction = (action: string, orderId: string) => {
    toast({
      title: action,
      description: `${action} for order ${orderId}`,
    });
  };

  const handleAddOrder = (newOrder: any) => {
    setOrders([newOrder, ...orders]);
  };

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "Pending").length,
    inProgress: orders.filter(o => o.status === "In Progress").length,
    ready: orders.filter(o => o.status === "Ready").length,
    delivered: orders.filter(o => o.status === "Delivered").length,
    totalRevenue: orders.reduce((sum, order) => sum + parseInt(order.totalAmount.replace('₹', '').replace(',', '')), 0),
    avgOrderValue: Math.round(orders.reduce((sum, order) => sum + parseInt(order.totalAmount.replace('₹', '').replace(',', '')), 0) / orders.length)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground mt-1">
            Manage rental orders and track progress
          </p>
        </div>
        <Button 
          className="mt-4 md:mt-0"
          onClick={() => setShowForm(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">{orderStats.total}</div>
            <p className="text-sm text-muted-foreground">Total Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-muted-foreground">{orderStats.pending}</div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-warning">{orderStats.inProgress}</div>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-success">{orderStats.ready}</div>
            <p className="text-sm text-muted-foreground">Ready</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">{orderStats.delivered}</div>
            <p className="text-sm text-muted-foreground">Delivered</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-accent">₹{orderStats.avgOrderValue.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Avg Order Value</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Order Trends (6 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={orderTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#1F3A93" 
                  fill="#1F3A93" 
                  fillOpacity={0.3}
                  name="Total Orders"
                />
                <Area 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#2ECC71" 
                  fill="#2ECC71" 
                  fillOpacity={0.3}
                  name="Completed Orders"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {orderStatusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {orderStatusDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.count} orders</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly Order Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyOrderData}>
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

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            All Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-primary">{order.id}</span>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">• {order.progress}</span>
                  </div>
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{order.progressPercent}%</span>
                    </div>
                    <Progress value={order.progressPercent} className="h-2" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-muted-foreground">{order.item} ({order.size})</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Delivery: {order.deliveryDate}</p>
                      <p className="text-muted-foreground">Return: {order.returnDate}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-primary">{order.totalAmount}</p>
                      <p className="text-xs text-muted-foreground">Rent: {order.rentPrice} + Alt: {order.alterationCost}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAction("View Details", order.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAction("Edit Order", order.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  {order.status === "Ready" && (
                    <Button 
                      variant="success" 
                      size="sm"
                      onClick={() => handleAction("Mark as Delivered", order.id)}
                    >
                      <Truck className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <OrderForm 
        open={showForm} 
        onOpenChange={setShowForm} 
        onSubmit={handleAddOrder} 
      />
    </div>
  );
};

export default Orders;