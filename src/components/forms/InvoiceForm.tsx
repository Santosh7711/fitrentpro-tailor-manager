import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface InvoiceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (invoice: any) => void;
}

export function InvoiceForm({ open, onOpenChange, onSubmit }: InvoiceFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    orderId: "",
    itemName: "",
    itemPrice: "",
    alterations: "0",
    dueDate: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const itemPrice = parseFloat(formData.itemPrice) || 0;
    const alterations = parseFloat(formData.alterations) || 0;
    const subtotal = itemPrice + alterations;
    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst;
    
    const newInvoice = {
      id: `INV-${String(Date.now()).slice(-3)}`,
      orderId: formData.orderId || `ORD-${String(Date.now()).slice(-3)}`,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      items: [
        { name: formData.itemName, price: itemPrice, alterations: alterations }
      ],
      subtotal,
      gst,
      total,
      status: "Draft",
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: formData.dueDate,
      paidDate: null
    };
    
    onSubmit(newInvoice);
    toast({
      title: "Invoice Created",
      description: `Invoice for ${formData.customerName} has been created successfully`,
    });
    
    setFormData({
      customerName: "",
      customerEmail: "",
      orderId: "",
      itemName: "",
      itemPrice: "",
      alterations: "0",
      dueDate: ""
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="customerEmail">Customer Email</Label>
            <Input
              id="customerEmail"
              type="email"
              value={formData.customerEmail}
              onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="orderId">Order ID (Optional)</Label>
            <Input
              id="orderId"
              value={formData.orderId}
              onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
              placeholder="Leave empty to auto-generate"
            />
          </div>
          <div>
            <Label htmlFor="itemName">Item Name</Label>
            <Input
              id="itemName"
              value={formData.itemName}
              onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
              placeholder="e.g., Navy Blue Suit"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="itemPrice">Item Price (₹)</Label>
              <Input
                id="itemPrice"
                type="number"
                value={formData.itemPrice}
                onChange={(e) => setFormData({ ...formData, itemPrice: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="alterations">Alterations (₹)</Label>
              <Input
                id="alterations"
                type="number"
                value={formData.alterations}
                onChange={(e) => setFormData({ ...formData, alterations: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Invoice</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}