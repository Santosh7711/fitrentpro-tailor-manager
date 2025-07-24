import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Menu, 
  Home, 
  Users, 
  Package, 
  DollarSign, 
  FileText, 
  CreditCard,
  Bell,
  BarChart3,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Orders", href: "/orders", icon: Package },
  { name: "Financials", href: "/financials", icon: DollarSign },
  { name: "Invoices", href: "/invoices", icon: FileText },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Alerts", href: "/alerts", icon: Bell },
  { name: "Reports", href: "/reports", icon: BarChart3 },
];

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const NavItem = ({ item, onClick }: { item: any; onClick?: () => void }) => (
    <Button
      variant={activeItem === item.href ? "default" : "ghost"}
      className={cn(
        "w-full justify-start gap-3 h-12",
        activeItem === item.href 
          ? "bg-primary text-primary-foreground shadow-sm" 
          : "hover:bg-muted"
      )}
      onClick={() => {
        setActiveItem(item.href);
        navigate(item.href);
        onClick?.();
      }}
    >
      <item.icon className="h-5 w-5" />
      <span className="font-medium">{item.name}</span>
    </Button>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between p-4 border-b bg-card">
          <h1 className="text-xl font-bold text-primary">FitRentPro</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-primary">FitRentPro</h2>
              </div>
              <nav className="px-4 space-y-2">
                {navigation.map((item) => (
                  <NavItem key={item.name} item={item} />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="lg:flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-card border-r">
            <div className="px-6 py-8">
              <h1 className="text-2xl font-bold text-primary">FitRentPro</h1>
              <p className="text-sm text-muted-foreground mt-1">Tailor Manager</p>
            </div>
            
            <nav className="flex-1 px-4 space-y-2">
              {navigation.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </nav>

            <div className="p-4 border-t">
              <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:pl-64 flex-1">
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}