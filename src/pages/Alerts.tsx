import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Bell, 
  Calendar, 
  Truck, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Phone,
  Mail
} from "lucide-react";

const sampleAlerts = [
  {
    id: "ALERT-001",
    type: "delivery",
    priority: "high",
    title: "Upcoming Delivery",
    message: "Navy Blue Suit delivery scheduled for Rahul Sharma tomorrow",
    orderId: "ORD-001",
    customerId: "CUST-001",
    customerName: "Rahul Sharma",
    customerPhone: "+91 9876543210",
    deliveryDate: "2024-01-30",
    status: "pending",
    createdAt: "2024-01-29"
  },
  {
    id: "ALERT-002", 
    type: "overdue",
    priority: "high",
    title: "Overdue Payment",
    message: "Invoice INV-004 is overdue by 3 days",
    orderId: "ORD-004",
    customerId: "CUST-004",
    customerName: "Neha Singh",
    customerPhone: "+91 9876543213",
    amount: "₹2,714",
    status: "pending",
    createdAt: "2024-02-15"
  },
  {
    id: "ALERT-003",
    type: "delivery",
    priority: "medium", 
    title: "Delivery Reminder",
    message: "Black Designer Blazer delivery in 3 days for Priya Patel",
    orderId: "ORD-002",
    customerId: "CUST-002",
    customerName: "Priya Patel",
    customerPhone: "+91 9876543211",
    deliveryDate: "2024-02-05",
    status: "pending",
    createdAt: "2024-02-02"
  },
  {
    id: "ALERT-004",
    type: "alteration",
    priority: "medium",
    title: "Alteration Complete",
    message: "Grey Wedding Suit alterations completed - ready for delivery",
    orderId: "ORD-003", 
    customerId: "CUST-003",
    customerName: "Amit Kumar",
    customerPhone: "+91 9876543212",
    status: "resolved",
    createdAt: "2024-02-06"
  },
  {
    id: "ALERT-005",
    type: "return",
    priority: "low",
    title: "Return Reminder", 
    message: "Charcoal Business Suit return due in 2 days",
    orderId: "ORD-005",
    customerId: "CUST-005",
    customerName: "Ravi Gupta",
    customerPhone: "+91 9876543214",
    returnDate: "2024-02-20",
    status: "pending",
    createdAt: "2024-02-18"
  },
  {
    id: "ALERT-006",
    type: "measurement",
    priority: "medium",
    title: "Measurement Pending",
    message: "Customer measurement required for Maroon Velvet Blazer", 
    orderId: "ORD-004",
    customerId: "CUST-004",
    customerName: "Neha Singh",
    customerPhone: "+91 9876543213",
    status: "pending",
    createdAt: "2024-01-30"
  }
];

const getAlertTypeIcon = (type: string) => {
  switch (type) {
    case "delivery":
      return Truck;
    case "overdue":
      return AlertTriangle;
    case "alteration":
      return CheckCircle;
    case "return":
      return Calendar;
    case "measurement":
      return Clock;
    default:
      return Bell;
  }
};

const getAlertTypeColor = (type: string) => {
  switch (type) {
    case "delivery":
      return "bg-primary text-primary-foreground";
    case "overdue":
      return "bg-destructive text-destructive-foreground";
    case "alteration":
      return "bg-success text-success-foreground";
    case "return":
      return "bg-warning text-warning-foreground";
    case "measurement":
      return "bg-accent text-accent-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-destructive text-destructive-foreground";
    case "medium":
      return "bg-warning text-warning-foreground";
    case "low":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-warning text-warning-foreground";
    case "resolved":
      return "bg-success text-success-foreground";
    case "dismissed":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const Alerts = () => {
  const { toast } = useToast();

  const handleAction = (action: string, alertId: string, customerName?: string) => {
    toast({
      title: action,
      description: customerName ? `${action} for ${customerName}` : `${action} for alert ${alertId}`,
    });
  };

  const alertStats = {
    total: sampleAlerts.length,
    pending: sampleAlerts.filter(a => a.status === "pending").length,
    high: sampleAlerts.filter(a => a.priority === "high").length,
    delivery: sampleAlerts.filter(a => a.type === "delivery").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alerts & Notifications</h1>
          <p className="text-muted-foreground mt-1">
            Stay on top of deliveries, payments, and important reminders
          </p>
        </div>
        <Button 
          className="mt-4 md:mt-0"
          onClick={() => handleAction("Create Custom Alert", "")}
        >
          <Bell className="h-4 w-4 mr-2" />
          Create Alert
        </Button>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">{alertStats.total}</div>
            <p className="text-sm text-muted-foreground">Total Alerts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-warning">{alertStats.pending}</div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-destructive">{alertStats.high}</div>
            <p className="text-sm text-muted-foreground">High Priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">{alertStats.delivery}</div>
            <p className="text-sm text-muted-foreground">Deliveries</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button 
          variant="outline" 
          className="h-16"
          onClick={() => handleAction("Schedule Delivery", "")}
        >
          <div className="text-center">
            <Truck className="h-6 w-6 mx-auto mb-1" />
            <p className="text-sm">Schedule Delivery</p>
          </div>
        </Button>
        <Button 
          variant="outline" 
          className="h-16"
          onClick={() => handleAction("Send Payment Reminder", "")}
        >
          <div className="text-center">
            <AlertTriangle className="h-6 w-6 mx-auto mb-1" />
            <p className="text-sm">Payment Reminder</p>
          </div>
        </Button>
        <Button 
          variant="outline" 
          className="h-16"
          onClick={() => handleAction("Check Alterations", "")}
        >
          <div className="text-center">
            <CheckCircle className="h-6 w-6 mx-auto mb-1" />
            <p className="text-sm">Alteration Status</p>
          </div>
        </Button>
        <Button 
          variant="outline" 
          className="h-16"
          onClick={() => handleAction("View Calendar", "")}
        >
          <div className="text-center">
            <Calendar className="h-6 w-6 mx-auto mb-1" />
            <p className="text-sm">View Calendar</p>
          </div>
        </Button>
      </div>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Active Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sampleAlerts.map((alert) => {
              const IconComponent = getAlertTypeIcon(alert.type);
              return (
                <div key={alert.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-2 rounded-md ${getAlertTypeColor(alert.type)}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{alert.title}</span>
                        <Badge className={getPriorityColor(alert.priority)}>
                          {alert.priority}
                        </Badge>
                        <Badge className={getStatusColor(alert.status)}>
                          {alert.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Customer: {alert.customerName}</span>
                        <span>Order: {alert.orderId}</span>
                        <span>Created: {alert.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction("Call Customer", alert.id, alert.customerName)}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction("Send SMS", alert.id, alert.customerName)}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    {alert.status === "pending" && (
                      <Button 
                        variant="success" 
                        size="sm"
                        onClick={() => handleAction("Mark as Resolved", alert.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Alerts;