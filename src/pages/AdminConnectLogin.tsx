import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { LogIn } from "lucide-react";

const adminLoginSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const AdminConnectLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof adminLoginSchema>>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    // If already "admin_connected", redirect to admin dashboard
    if (localStorage.getItem("admin_connected") === "true") {
      navigate("/admin");
    }
  }, [navigate]);

  const onSubmit = (values: z.infer<typeof adminLoginSchema>) => {
    if (values.username === "afcon" && values.password === "12345678") {
      localStorage.setItem("admin_connected", "true");
      toast({
        title: "Admin Login Successful!",
        description: "Redirecting to admin dashboard.",
      });
      navigate("/admin");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-card/50">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl bg-gradient-primary bg-clip-text text-transparent">Admin Connect</CardTitle>
          <CardDescription>Login with hardcoded credentials to access the admin panel.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="afcon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground py-6 text-lg">
                <LogIn className="mr-2 h-5 w-5" />
                Login as Admin
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminConnectLogin;