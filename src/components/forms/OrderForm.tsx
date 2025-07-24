import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface OrderFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (order: any) => void;
}

export function OrderForm({ open, onOpenChange, onSubmit }: OrderFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    customerName: "",
    item: "",
    size: "",
    rentPrice: "",
    alterationCost: "0",
    deliveryDate: "",
    returnDate: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rentPrice = parseFloat(formData.rentPrice) || 0;
    const alterationCost = parseFloat(formData.alterationCost) || 0;
    const totalAmount = rentPrice + alterationCost;
    
    const newOrder = {
      id: `ORD-${String(Date.now()).slice(-3)}`,
      customerId: `CUST-${String(Date.now()).slice(-3)}`,
      ...formData,
      rentPrice: `₹${rentPrice}`,
      alterationCost: `₹${alterationCost}`,
      totalAmount: `₹${totalAmount}`,
      orderDate: new Date().toISOString().split('T')[0],
      status: "Pending",
      progress: "Measurement"
    };
    
    onSubmit(newOrder);
    toast({
      title: "Order Created",
      description: `Order for ${formData.customerName} has been created successfully`,
    });
    
    setFormData({
      customerName: "",
      item: "",
      size: "",
      rentPrice: "",
      alterationCost: "0",
      deliveryDate: "",
      returnDate: ""
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
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
            <Label htmlFor="item">Item</Label>
            <Input
              id="item"
              value={formData.item}
              onChange={(e) => setFormData({ ...formData, item: e.target.value })}
              placeholder="e.g., Navy Blue Suit"
              required
            />
          </div>
          <div>
            <Label htmlFor="size">Size</Label>
            <Select value={formData.size} onValueChange={(value) => setFormData({ ...formData, size: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="XS">XS</SelectItem>
                <SelectItem value="S">S</SelectItem>
                <SelectItem value="M">M</SelectItem>
                <SelectItem value="L">L</SelectItem>
                <SelectItem value="XL">XL</SelectItem>
                <SelectItem value="XXL">XXL</SelectItem>
                <SelectItem value="38R">38R</SelectItem>
                <SelectItem value="40R">40R</SelectItem>
                <SelectItem value="42R">42R</SelectItem>
                <SelectItem value="44R">44R</SelectItem>
                <SelectItem value="42L">42L</SelectItem>
                <SelectItem value="44L">44L</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rentPrice">Rent Price (₹)</Label>
              <Input
                id="rentPrice"
                type="number"
                value={formData.rentPrice}
                onChange={(e) => setFormData({ ...formData, rentPrice: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="alterationCost">Alteration Cost (₹)</Label>
              <Input
                id="alterationCost"
                type="number"
                value={formData.alterationCost}
                onChange={(e) => setFormData({ ...formData, alterationCost: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="deliveryDate">Delivery Date</Label>
              <Input
                id="deliveryDate"
                type="date"
                value={formData.deliveryDate}
                onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="returnDate">Return Date</Label>
              <Input
                id="returnDate"
                type="date"
                value={formData.returnDate}
                onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Order</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}