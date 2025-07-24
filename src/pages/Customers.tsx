import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CustomerForm } from "@/components/forms/CustomerForm";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin,
  User
} from "lucide-react";

const sampleCustomers = [
  {
    id: "CUST-001",
    name: "Rahul Sharma",
    phone: "+91 9876543210",
    email: "rahul.sharma@email.com",
    address: "123 MG Road, Mumbai",
    totalOrders: 8,
    totalSpent: "₹18,500",
    status: "VIP",
    joinedDate: "2023-03-15"
  },
  {
    id: "CUST-002", 
    name: "Priya Patel",
    phone: "+91 9876543211",
    email: "priya.patel@email.com",
    address: "456 FC Road, Pune",
    totalOrders: 5,
    totalSpent: "₹12,300",
    status: "Regular",
    joinedDate: "2023-06-20"
  },
  {
    id: "CUST-003",
    name: "Amit Kumar",
    phone: "+91 9876543212", 
    email: "amit.kumar@email.com",
    address: "789 Brigade Road, Bangalore",
    totalOrders: 12,
    totalSpent: "₹28,700",
    status: "VIP",
    joinedDate: "2023-01-10"
  },
  {
    id: "CUST-004",
    name: "Neha Singh",
    phone: "+91 9876543213",
    email: "neha.singh@email.com", 
    address: "321 CP, Delhi",
    totalOrders: 3,
    totalSpent: "₹7,200",
    status: "New",
    joinedDate: "2023-11-05"
  },
  {
    id: "CUST-005",
    name: "Ravi Gupta",
    phone: "+91 9876543214",
    email: "ravi.gupta@email.com",
    address: "654 Park Street, Kolkata", 
    totalOrders: 15,
    totalSpent: "₹35,400",
    status: "VIP",
    joinedDate: "2022-12-18"
  },
  {
    id: "CUST-006",
    name: "Anita Reddy",
    phone: "+91 9876543215",
    email: "anita.reddy@email.com",
    address: "987 Banjara Hills, Hyderabad",
    totalOrders: 6,
    totalSpent: "₹14,800",
    status: "Regular",
    joinedDate: "2023-04-22"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "VIP":
      return "bg-accent text-accent-foreground";
    case "Regular":
      return "bg-primary text-primary-foreground";
    case "New":
      return "bg-success text-success-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState(sampleCustomers);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (action: string, customerName: string) => {
    toast({
      title: action,
      description: `${action} for ${customerName}`,
    });
  };

  const handleAddCustomer = (newCustomer: any) => {
    setCustomers([newCustomer, ...customers]);
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground mt-1">
            Manage your customer database
          </p>
        </div>
        <Button 
          className="mt-4 md:mt-0"
          onClick={() => setShowForm(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Customers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">{customers.length}</div>
            <p className="text-sm text-muted-foreground">Total Customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-accent">{customers.filter(c => c.status === "VIP").length}</div>
            <p className="text-sm text-muted-foreground">VIP Customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-success">{customers.filter(c => c.status === "New").length}</div>
            <p className="text-sm text-muted-foreground">New This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-warning">92%</div>
            <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Customer List */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{customer.name}</span>
                      <Badge className={getStatusColor(customer.status)}>
                        {customer.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {customer.address}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{customer.totalSpent}</p>
                  <p className="text-sm text-muted-foreground">{customer.totalOrders} orders</p>
                  <div className="flex gap-2 mt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction("Edit Customer", customer.name)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction("Delete Customer", customer.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <CustomerForm 
        open={showForm} 
        onOpenChange={setShowForm} 
        onSubmit={handleAddCustomer} 
      />
    </div>
  );
};

export default Customers;