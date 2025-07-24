import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { PaymentForm } from "@/components/forms/PaymentForm";
import { 
  CreditCard, 
  Plus, 
  Search, 
  DollarSign,
  Calendar,
  CheckCircle,
  Clock
} from "lucide-react";

const initialPayments = [
  {
    id: "PAY-001",
    invoiceId: "INV-001",
    customerName: "Rahul Sharma",
    orderId: "ORD-001",
    amount: 3304,
    paymentMethod: "UPI",
    paymentDate: "2024-01-28",
    status: "Completed",
    transactionId: "UPI123456789",
    notes: "Payment received via PhonePe"
  },
  {
    id: "PAY-002",
    invoiceId: "INV-003", 
    customerName: "Amit Kumar",
    orderId: "ORD-003",
    amount: 4307,
    paymentMethod: "Cash",
    paymentDate: "2024-02-06",
    status: "Completed",
    transactionId: "CASH001",
    notes: "Cash payment at store"
  },
  {
    id: "PAY-003",
    invoiceId: "INV-002",
    customerName: "Priya Patel", 
    orderId: "ORD-002",
    amount: 1500,
    paymentMethod: "Bank Transfer",
    paymentDate: "2024-02-01",
    status: "Partial",
    transactionId: "NEFT789012345",
    notes: "Partial payment - balance pending"
  },
  {
    id: "PAY-004",
    invoiceId: "INV-004",
    customerName: "Neha Singh",
    orderId: "ORD-004", 
    amount: 2714,
    paymentMethod: "Credit Card",
    paymentDate: null,
    status: "Pending",
    transactionId: null,
    notes: "Payment reminder sent"
  },
  {
    id: "PAY-005",
    invoiceId: "INV-006",
    customerName: "Anita Reddy",
    orderId: "ORD-006",
    amount: 2380,
    paymentMethod: "UPI",
    paymentDate: "2024-02-10",
    status: "Completed", 
    transactionId: "UPI987654321",
    notes: "Payment via Google Pay"
  },
  {
    id: "PAY-006",
    invoiceId: "INV-007",
    customerName: "Vikram Singh",
    orderId: "ORD-007",
    amount: 3150,
    paymentMethod: "Cash",
    paymentDate: "2024-02-12",
    status: "Completed",
    transactionId: "CASH002", 
    notes: "Full payment in cash"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-success text-success-foreground";
    case "Partial":
      return "bg-warning text-warning-foreground";
    case "Pending":
      return "bg-muted text-muted-foreground";
    case "Failed":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getMethodColor = (method: string) => {
  switch (method) {
    case "UPI":
      return "bg-primary text-primary-foreground";
    case "Cash":
      return "bg-success text-success-foreground";
    case "Bank Transfer":
      return "bg-accent text-accent-foreground";
    case "Credit Card":
      return "bg-warning text-warning-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const Payments = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const handleAction = (action: string, paymentId: string) => {
    toast({
      title: action,
      description: `${action} for payment ${paymentId}`,
    });
  };

  const handleAddPayment = (newPayment: any) => {
    setPayments([newPayment, ...payments]);
  };

  const paymentStats = {
    total: payments.length,
    completed: payments.filter(p => p.status === "Completed").length,
    pending: payments.filter(p => p.status === "Pending").length,
    partial: payments.filter(p => p.status === "Partial").length,
    totalAmount: payments.filter(p => p.status === "Completed").reduce((sum, p) => sum + p.amount, 0),
    pendingAmount: payments.filter(p => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0)
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage payment transactions
          </p>
        </div>
        <Button 
          className="mt-4 md:mt-0"
          onClick={() => setShowForm(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Record Payment
        </Button>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-success">₹{paymentStats.totalAmount.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total Received</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-warning">₹{paymentStats.pendingAmount.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Pending Amount</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">{paymentStats.completed}</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-muted-foreground">{paymentStats.pending}</div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button 
          variant="outline" 
          className="h-16"
          onClick={() => handleAction("View UPI Payments", "")}
        >
          <div className="text-center">
            <DollarSign className="h-6 w-6 mx-auto mb-1" />
            <p className="text-sm">UPI Payments</p>
          </div>
        </Button>
        <Button 
          variant="outline" 
          className="h-16"
          onClick={() => handleAction("View Cash Payments", "")}
        >
          <div className="text-center">
            <CreditCard className="h-6 w-6 mx-auto mb-1" />
            <p className="text-sm">Cash Payments</p>
          </div>
        </Button>
        <Button 
          variant="outline" 
          className="h-16"
          onClick={() => handleAction("View Pending Payments", "")}
        >
          <div className="text-center">
            <Clock className="h-6 w-6 mx-auto mb-1" />
            <p className="text-sm">Pending</p>
          </div>
        </Button>
        <Button 
          variant="outline" 
          className="h-16"
          onClick={() => handleAction("Payment Reports", "")}
        >
          <div className="text-center">
            <Calendar className="h-6 w-6 mx-auto mb-1" />
            <p className="text-sm">Reports</p>
          </div>
        </Button>
      </div>

      {/* Payments List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-primary">{payment.id}</span>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                    <Badge variant="outline" className={getMethodColor(payment.paymentMethod)}>
                      {payment.paymentMethod}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium">{payment.customerName}</p>
                      <p className="text-muted-foreground">Invoice: {payment.invoiceId}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">
                        {payment.paymentDate ? `Date: ${payment.paymentDate}` : "Date: Pending"}
                      </p>
                      <p className="text-muted-foreground">
                        {payment.transactionId ? `TXN: ${payment.transactionId}` : "No Transaction ID"}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-primary">₹{payment.amount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{payment.notes}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAction("View Payment Details", payment.id)}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                  {payment.status === "Pending" && (
                    <Button 
                      variant="success" 
                      size="sm"
                      onClick={() => handleAction("Mark as Paid", payment.id)}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <PaymentForm 
        open={showForm} 
        onOpenChange={setShowForm} 
        onSubmit={handleAddPayment} 
      />
    </div>
  );
};

export default Payments;