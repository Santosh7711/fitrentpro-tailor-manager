import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  },
  {
    title: "New Order",
    description: "Create rental order",
    icon: Package,
    color: "bg-accent",
  },
  {
    title: "Generate Invoice",
    description: "Create new invoice",
    icon: FileText,
    color: "bg-success",
  },
  {
    title: "Record Payment",
    description: "Log payment received",
    icon: Calculator,
    color: "bg-warning",
  },
  {
    title: "Schedule Delivery",
    description: "Set delivery date",
    icon: Truck,
    color: "bg-primary",
  },
];

export function QuickActions() {
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