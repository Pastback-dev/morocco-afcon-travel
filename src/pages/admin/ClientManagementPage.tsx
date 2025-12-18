import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader2, User as UserIcon, Mail, ShieldCheck } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  role: string | null;
  email: string;
}

const ClientManagementPage = () => {
  const navigate = useNavigate();

  const fetchClients = async () => {
    // Join profiles with auth.users to get email
    const { data, error } = await supabase
      .from("profiles")
      .select(`
        id,
        first_name,
        last_name,
        role,
        auth_users:auth.users(email)
      `)
      .order("updated_at", { ascending: false });

    if (error) throw error;

    return data.map((profile: any) => ({
      id: profile.id,
      first_name: profile.first_name,
      last_name: profile.last_name,
      role: profile.role,
      email: profile.auth_users?.email || "N/A",
    }));
  };

  const { data: clients, isLoading, isError, error } = useQuery<Profile[], Error>({
    queryKey: ["adminClients"],
    queryFn: fetchClients,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background text-foreground p-8">
        <Button onClick={() => navigate("/admin")} variant="outline" className="mb-8">
          &larr; Back to Admin Dashboard
        </Button>
        <p className="text-destructive text-center">Error loading clients: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="container mx-auto">
        <Button onClick={() => navigate("/admin")} variant="outline" className="mb-8">
          &larr; Back to Admin Dashboard
        </Button>
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Client Management</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            View and manage all registered client accounts.
          </p>
        </div>

        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>All Clients</CardTitle>
          </CardHeader>
          <CardContent>
            {clients && clients.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <UserIcon className="h-4 w-4 text-muted-foreground" />
                            {client.first_name || client.last_name ? `${client.first_name || ''} ${client.last_name || ''}`.trim() : "N/A"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            {client.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                            {client.role || "user"}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" disabled>Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center">No clients registered yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientManagementPage;