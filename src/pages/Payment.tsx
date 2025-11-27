import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { CreditCard, Loader2 } from "lucide-react";

const paymentSchema = z.object({
  cardName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  cardNumber: z.string().refine((value) => /^(\d{4}[\s-]?){3}\d{4}$/.test(value.replace(/\s/g, "")), { message: "Invalid card number." }),
  expiryDate: z.string().refine((value) => /^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/.test(value), { message: "Invalid format. Use MM/YY." }),
  cvc: z.string().refine((value) => /^\d{3,4}$/.test(value), { message: "Invalid CVC." }),
});

const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, session, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);

  const packageName = searchParams.get("package");
  const price = searchParams.get("price");

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    },
  });

  useEffect(() => {
    if (!authLoading && !session) {
      navigate("/login");
    }
    if (!packageName || !price) {
      toast({
        title: "Error",
        description: "No package selected. Redirecting to home.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [authLoading, session, navigate, packageName, price, toast]);

  const onSubmit = async (_values: z.infer<typeof paymentSchema>) => {
    if (!user || !packageName) return;
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const { error } = await supabase
        .from("user_packages")
        .insert({ user_id: user.id, package_name: packageName });

      if (error) throw error;

      toast({
        title: "Payment Successful!",
        description: `You have successfully booked the ${packageName} package.`,
      });

      queryClient.invalidateQueries({ queryKey: ["userPackages", user.id] });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (authLoading || !packageName || !price) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-card/50">
        <CardHeader>
          <CardTitle className="text-2xl">Complete Your Purchase</CardTitle>
          <CardDescription>Enter your payment details for the {packageName} package.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 border border-border rounded-lg bg-background/50">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">{packageName}</span>
              <span className="font-bold text-xl">${price}</span>
            </div>
            <p className="text-sm text-muted-foreground">Billed once.</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="cardName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name on Card</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input placeholder="•••• •••• •••• ••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input placeholder="MM/YY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cvc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVC</FormLabel>
                      <FormControl>
                        <Input placeholder="123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground py-6 text-lg" disabled={isProcessing}>
                {isProcessing ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <CreditCard className="mr-2 h-5 w-5" />
                )}
                {isProcessing ? "Processing..." : `Pay $${price}`}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground text-center w-full">
            Your payment is secure. By clicking "Pay", you agree to our Terms of Service.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Payment;