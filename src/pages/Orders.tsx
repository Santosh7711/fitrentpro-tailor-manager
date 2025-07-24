import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { OrderForm } from "@/components/forms/OrderForm";
import { 
  Plus, 
  Package, 
  Clock, 
  CheckCircle, 
  Eye,
  Edit,
  Truck
} from "lucide-react";

const sampleOrders = [
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
    progress: "Stitching"
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
    progress: "Quality Check"
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
    progress: "Completed"
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
    progress: "Measurement"
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
    progress: "Cutting"
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
    progress: "Packaging"
  }
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
  const [orders, setOrders] = useState(sampleOrders);
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
    delivered: orders.filter(o => o.status === "Delivered").length
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
      </div>

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