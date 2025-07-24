import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Users, 
  Package, 
  FileText, 
  Calculator,
  Truck
} from "lucide-react";

const actions = [
  {
    title: "New Customer",
    description: "Add a new customer profile",
    icon: Users,
    color: "bg-primary",
    action: "/customers",
  },
  {
    title: "New Order",
    description: "Create rental order",
    icon: Package,
    color: "bg-accent",
    action: "/orders",
  },
  {
    title: "Generate Invoice",
    description: "Create new invoice",
    icon: FileText,
    color: "bg-success",
    action: "/invoices",
  },
  {
    title: "Record Payment",
    description: "Log payment received",
    icon: Calculator,
    color: "bg-warning",
    action: "/payments",
  },
  {
    title: "Schedule Delivery",
    description: "Set delivery date",
    icon: Truck,
    color: "bg-primary",
    action: "/alerts",
  },
];

export function QuickActions() {
  const navigate = useNavigate();
  const { toast } = useToast();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <Button
            key={action.title}
            variant="outline"
            className="h-auto p-4 flex flex-col items-start gap-2 hover:shadow-sm transition-all"
            onClick={() => {
              navigate(action.action);
              toast({
                title: "Navigating to " + action.title,
                description: "Opening " + action.description.toLowerCase(),
              });
            }}
          >
            <div className={`p-2 rounded-md ${action.color} text-white`}>
              <action.icon className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="font-medium text-sm">{action.title}</p>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}