import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Download, Send, Printer } from "lucide-react";

interface InvoiceGeneratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: any;
}

export function InvoiceGenerator({ open, onOpenChange, invoice }: InvoiceGeneratorProps) {
  const { toast } = useToast();

  if (!invoice) return null;

  const handleDownload = () => {
    toast({
      title: "Invoice Downloaded",
      description: `Invoice ${invoice.id} has been downloaded as PDF`,
    });
  };

  const handleSend = () => {
    toast({
      title: "Invoice Sent",
      description: `Invoice ${invoice.id} has been sent to ${invoice.customerEmail}`,
    });
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "Invoice Printed",
      description: `Invoice ${invoice.id} has been sent to printer`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Invoice Preview - {invoice.id}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 print:space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-primary">FitRentPro</h1>
              <p className="text-muted-foreground">Premium Suit Rental Service</p>
              <p className="text-sm text-muted-foreground mt-2">
                123 Fashion Street, Mumbai, Maharashtra 400001<br/>
                Phone: +91 98765 43210 | Email: info@fitrentpro.com<br/>
                GST: 27ABCDE1234F1Z5
              </p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold">INVOICE</h2>
              <p className="text-lg font-semibold text-primary">{invoice.id}</p>
              <p className="text-sm text-muted-foreground">Date: {invoice.invoiceDate}</p>
              <p className="text-sm text-muted-foreground">Due: {invoice.dueDate}</p>
            </div>
          </div>

          <Separator />

          {/* Customer Details */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Bill To:</h3>
              <p className="font-medium">{invoice.customerName}</p>
              <p className="text-sm text-muted-foreground">{invoice.customerEmail}</p>
              <p className="text-sm text-muted-foreground">Order: {invoice.orderId}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Payment Details:</h3>
              <p className="text-sm">Status: <span className={`font-medium ${
                invoice.status === 'Paid' ? 'text-success' : 
                invoice.status === 'Overdue' ? 'text-destructive' : 'text-warning'
              }`}>{invoice.status}</span></p>
              {invoice.paidDate && (
                <p className="text-sm text-success">Paid on: {invoice.paidDate}</p>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div>
            <h3 className="font-semibold mb-4">Items & Services</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-medium">Description</th>
                    <th className="text-right p-3 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item: any, index: number) => (
                    <tr key={index} className="border-t">
                      <td className="p-3">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Rental Service</p>
                        </div>
                      </td>
                      <td className="p-3 text-right">₹{item.price.toLocaleString()}</td>
                    </tr>
                  ))}
                  {invoice.items.some((item: any) => item.alterations > 0) && (
                    <tr className="border-t">
                      <td className="p-3">
                        <div>
                          <p className="font-medium">Alterations</p>
                          <p className="text-sm text-muted-foreground">Tailoring Services</p>
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        ₹{invoice.items.reduce((sum: number, item: any) => sum + item.alterations, 0).toLocaleString()}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{invoice.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%):</span>
                <span>₹{invoice.gst.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-primary">₹{invoice.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="text-sm text-muted-foreground">
            <h4 className="font-semibold mb-2">Terms & Conditions:</h4>
            <ul className="space-y-1 text-xs">
              <li>• Payment is due within 15 days of invoice date</li>
              <li>• Late payments may incur additional charges</li>
              <li>• Items must be returned in original condition</li>
              <li>• Damage charges will be applied for any alterations or damage</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 print:hidden">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button onClick={handleSend}>
              <Send className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}