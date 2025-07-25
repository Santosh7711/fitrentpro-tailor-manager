import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { PaymentForm } from "@/components/forms/PaymentForm";
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
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  CreditCard, 
  Plus, 
  Search, 
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown
} from "lucide-react";

const useState = React.useState;

const extendedPayments = [
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
  },
  {
    id: "PAY-007",
    invoiceId: "INV-008",
    customerName: "Kavya Nair",
    orderId: "ORD-008",
    amount: 5100,
    paymentMethod: "UPI",
    paymentDate: "2024-02-14",
    status: "Completed",
    transactionId: "UPI456789123",
    notes: "Payment via Paytm"
  },
  {
    id: "PAY-008",
    invoiceId: "INV-009",
    customerName: "Arjun Mehta",
    orderId: "ORD-009",
    amount: 2800,
    paymentMethod: "Credit Card",
    paymentDate: "2024-02-15",
    status: "Completed",
    transactionId: "CC789456123",
    notes: "Visa card payment"
  },
  {
    id: "PAY-009",
    invoiceId: "INV-010",
    customerName: "Deepika Rao",
    orderId: "ORD-010",
    amount: 1950,
    paymentMethod: "Bank Transfer",
    paymentDate: "2024-02-16",
    status: "Completed",
    transactionId: "NEFT123789456",
    notes: "HDFC Bank transfer"
  },
  {
    id: "PAY-010",
    invoiceId: "INV-011",
    customerName: "Rohit Sharma",
    orderId: "ORD-011",
    amount: 3600,
    paymentMethod: "UPI",
    paymentDate: null,
    status: "Pending",
    transactionId: null,
    notes: "Follow up required"
  },
  {
    id: "PAY-011",
    invoiceId: "INV-012",
    customerName: "Sneha Iyer",
    orderId: "ORD-012",
    amount: 2200,
    paymentMethod: "Cash",
    paymentDate: "2024-02-17",
    status: "Completed",
    transactionId: "CASH003",
    notes: "Cash payment with receipt"
  },
  {
    id: "PAY-012",
    invoiceId: "INV-013",
    customerName: "Karan Singh",
    orderId: "ORD-013",
    amount: 4200,
    paymentMethod: "Credit Card",
    paymentDate: "2024-02-18",
    status: "Failed",
    transactionId: "CC456123789",
    notes: "Card declined - insufficient funds"
  }
];

const paymentTrendData = [
  { month: 'Sep', amount: 45000, transactions: 18, avgAmount: 2500 },
  { month: 'Oct', amount: 52000, transactions: 22, avgAmount: 2364 },
  { month: 'Nov', amount: 58000, transactions: 25, avgAmount: 2320 },
  { month: 'Dec', amount: 65000, transactions: 28, avgAmount: 2321 },
  { month: 'Jan', amount: 72000, transactions: 32, avgAmount: 2250 },
  { month: 'Feb', amount: 78000, transactions: 35, avgAmount: 2229 }
];

const paymentMethodData = [
  { name: 'UPI', value: 45, amount: 156000, color: '#1F3A93' },
  { name: 'Cash', value: 25, amount: 87000, color: '#2ECC71' },
  { name: 'Credit Card', value: 20, amount: 69000, color: '#F39C12' },
  { name: 'Bank Transfer', value: 10, amount: 35000, color: '#9B59B6' }
];

const dailyPaymentData = [
  { day: 'Mon', amount: 8500, count: 4 },
  { day: 'Tue', amount: 12000, count: 6 },
  { day: 'Wed', amount: 9500, count: 5 },
  { day: 'Thu', amount: 15000, count: 8 },
  { day: 'Fri', amount: 18000, count: 9 },
  { day: 'Sat', amount: 22000, count: 12 },
  { day: 'Sun', amount: 14000, count: 7 }
];

const paymentStatusTrend = [
  { week: 'W1', completed: 85, pending: 10, failed: 5 },
  { week: 'W2', completed: 88, pending: 8, failed: 4 },
  { week: 'W3', completed: 92, pending: 6, failed: 2 },
  { week: 'W4', completed: 89, pending: 9, failed: 2 }
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
  const [payments, setPayments] = useState(extendedPayments);
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
    failed: payments.filter(p => p.status === "Failed").length,
    totalAmount: payments.filter(p => p.status === "Completed").reduce((sum, p) => sum + p.amount, 0),
    pendingAmount: payments.filter(p => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0),
    avgPayment: Math.round(payments.filter(p => p.status === "Completed").reduce((sum, p) => sum + p.amount, 0) / payments.filter(p => p.status === "Completed").length),
    successRate: Math.round((payments.filter(p => p.status === "Completed").length / payments.length) * 100)
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
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
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
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-accent">₹{paymentStats.avgPayment.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Avg Payment</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-success">{paymentStats.successRate}%</div>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Payment Trends (6 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={paymentTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'amount' ? `₹${value.toLocaleString()}` : value,
                  name === 'amount' ? 'Amount' : name === 'transactions' ? 'Transactions' : 'Avg Amount'
                ]} />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#1F3A93" 
                  fill="#1F3A93" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {paymentMethodData.map((item, index) => (
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

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Daily Payment Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyPaymentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'amount' ? `₹${value.toLocaleString()}` : value,
                  name === 'amount' ? 'Amount' : 'Count'
                ]} />
                <Bar dataKey="amount" fill="#1F3A93" name="Amount" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Payment Success Rate Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={paymentStatusTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, '']} />
                <Line type="monotone" dataKey="completed" stroke="#2ECC71" strokeWidth={2} name="Completed" />
                <Line type="monotone" dataKey="pending" stroke="#F39C12" strokeWidth={2} name="Pending" />
                <Line type="monotone" dataKey="failed" stroke="#E74C3C" strokeWidth={2} name="Failed" />
              </LineChart>
            </ResponsiveContainer>
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