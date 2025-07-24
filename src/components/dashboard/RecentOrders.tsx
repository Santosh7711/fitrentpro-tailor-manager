import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, User } from "lucide-react";

const orders = [
  {
    id: "ORD-001",
    customer: "Rahul Sharma",
    item: "Navy Blue Suit",
    deliveryDate: "2024-01-30",
    status: "In Progress",
    amount: "₹2,500",
  },
  {
    id: "ORD-002",
    customer: "Priya Patel",
    item: "Black Blazer",
    deliveryDate: "2024-02-05",
    status: "Ready",
    amount: "₹1,800",
  },
  {
    id: "ORD-003",
    customer: "Amit Kumar",
    item: "Grey Suit Set",
    deliveryDate: "2024-02-08",
    status: "Stitching",
    amount: "₹3,200",
  },
  {
    id: "ORD-004",
    customer: "Neha Singh",
    item: "Maroon Blazer",
    deliveryDate: "2024-02-12",
    status: "Pending",
    amount: "₹2,100",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Ready":
      return "bg-success text-success-foreground";
    case "In Progress":
      return "bg-warning text-warning-foreground";
    case "Stitching":
      return "bg-primary text-primary-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Recent Orders</span>
          <Button variant="outline" size="sm">View All</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{order.id}</span>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {order.customer}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {order.deliveryDate}
                  </div>
                </div>
                <p className="text-sm mt-1">{order.item}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary">{order.amount}</p>
                <Button variant="ghost" size="sm" className="mt-1">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}