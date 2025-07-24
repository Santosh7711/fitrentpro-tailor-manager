import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { InvoiceForm } from "@/components/forms/InvoiceForm";
import { InvoiceGenerator } from "@/components/invoice/InvoiceGenerator";
import { 
  FileText, 
  Plus, 
  Download, 
  Send, 
  Eye,
  Edit,
  Printer
} from "lucide-react";

const initialInvoices = [
  {
    id: "INV-001",
    orderId: "ORD-001",
    customerName: "Rahul Sharma",
    customerEmail: "rahul.sharma@email.com",
    items: [
      { name: "Navy Blue 3-Piece Suit", price: 2500, alterations: 300 }
    ],
    subtotal: 2800,
    gst: 504,
    total: 3304,
    status: "Paid",
    invoiceDate: "2024-01-15",
    dueDate: "2024-01-30",
    paidDate: "2024-01-28"
  },
  {
    id: "INV-002", 
    orderId: "ORD-002",
    customerName: "Priya Patel",
    customerEmail: "priya.patel@email.com",
    items: [
      { name: "Black Designer Blazer", price: 1800, alterations: 150 }
    ],
    subtotal: 1950,
    gst: 351,
    total: 2301,
    status: "Pending",
    invoiceDate: "2024-01-20",
    dueDate: "2024-02-05",
    paidDate: null
  },
  {
    id: "INV-003",
    orderId: "ORD-003", 
    customerName: "Amit Kumar",
    customerEmail: "amit.kumar@email.com",
    items: [
      { name: "Grey Wedding Suit Set", price: 3200, alterations: 450 }
    ],
    subtotal: 3650,
    gst: 657,
    total: 4307,
    status: "Paid",
    invoiceDate: "2024-01-25",
    dueDate: "2024-02-08",
    paidDate: "2024-02-06"
  },
  {
    id: "INV-004",
    orderId: "ORD-004",
    customerName: "Neha Singh", 
    customerEmail: "neha.singh@email.com",
    items: [
      { name: "Maroon Velvet Blazer", price: 2100, alterations: 200 }
    ],
    subtotal: 2300,
    gst: 414,
    total: 2714,
    status: "Overdue",
    invoiceDate: "2024-01-28",
    dueDate: "2024-02-12",
    paidDate: null
  },
  {
    id: "INV-005",
    orderId: "ORD-005",
    customerName: "Ravi Gupta",
    customerEmail: "ravi.gupta@email.com",
    items: [
      { name: "Charcoal Business Suit", price: 2700, alterations: 350 }
    ],
    subtotal: 3050,
    gst: 549,
    total: 3599,
    status: "Draft",
    invoiceDate: "2024-02-01",
    dueDate: "2024-02-15",
    paidDate: null
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Paid":
      return "bg-success text-success-foreground";
    case "Pending":
      return "bg-warning text-warning-foreground";
    case "Overdue":
      return "bg-destructive text-destructive-foreground";
    case "Draft":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const Invoices = () => {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [showForm, setShowForm] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const { toast } = useToast();

  const handleAction = (action: string, invoiceId: string, invoice?: any) => {
    if (action === "View Invoice" && invoice) {
      setSelectedInvoice(invoice);
      setShowInvoice(true);
      return;
    }
    
    toast({
      title: action,
      description: `${action} for invoice ${invoiceId}`,
    });
  };

  const handleAddInvoice = (newInvoice: any) => {
    setInvoices([newInvoice, ...invoices]);
  };

  const invoiceStats = {
    total: invoices.length,
    paid: invoices.filter(i => i.status === "Paid").length,
    pending: invoices.filter(i => i.status === "Pending").length,
    overdue: invoices.filter(i => i.status === "Overdue").length,
    totalAmount: invoices.reduce((sum, inv) => sum + inv.total, 0),
    paidAmount: invoices.filter(i => i.status === "Paid").reduce((sum, inv) => sum + inv.total, 0)
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Invoices</h1>
          <p className="text-muted-foreground mt-1">
            Generate and manage customer invoices
          </p>
        </div>
        <Button 
          className="mt-4 md:mt-0"
          onClick={() => setShowForm(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Invoice
        </Button>
      </div>

      {/* Invoice Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">{invoiceStats.total}</div>
            <p className="text-sm text-muted-foreground">Total Invoices</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-success">{invoiceStats.paid}</div>
            <p className="text-sm text-muted-foreground">Paid</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-warning">{invoiceStats.pending}</div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">₹{invoiceStats.totalAmount.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total Value</p>
          </CardContent>
        </Card>
      </div>

      {/* Invoices List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            All Invoices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-primary">{invoice.id}</span>
                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium">{invoice.customerName}</p>
                      <p className="text-muted-foreground">{invoice.customerEmail}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Invoice: {invoice.invoiceDate}</p>
                      <p className="text-muted-foreground">Due: {invoice.dueDate}</p>
                      {invoice.paidDate && (
                        <p className="text-success text-xs">Paid: {invoice.paidDate}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-primary">₹{invoice.total.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">
                        Subtotal: ₹{invoice.subtotal} + GST: ₹{invoice.gst}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAction("View Invoice", invoice.id, invoice)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAction("Edit Invoice", invoice.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAction("Download PDF", invoice.id)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAction("Send Invoice", invoice.id)}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <InvoiceForm 
        open={showForm} 
        onOpenChange={setShowForm} 
        onSubmit={handleAddInvoice} 
      />

      <InvoiceGenerator 
        open={showInvoice} 
        onOpenChange={setShowInvoice} 
        invoice={selectedInvoice} 
      />
    </div>
  );
};

export default Invoices;