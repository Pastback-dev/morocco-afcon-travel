import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QRScannerProps {
  onScanComplete?: () => void;
}

const QRScanner = ({ onScanComplete }: QRScannerProps) => {
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleScan = async (result: string | null) => {
    if (result) {
      setScanning(false);
      setLoading(true);
      
      try {
        // Parse the QR code format: "123455-Stade Mohammed V"
        const parts = result.split("-");
        if (parts.length !== 2) {
          throw new Error("Invalid QR code format");
        }
        
        const stadiumName = parts[1];
        toast({
          title: "Scan Successful!",
          description: `Redirecting to ${stadiumName}`,
        });
        
        // Small delay to show the toast
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Navigate to stadium details page
        navigate(`/stadiums/details/${encodeURIComponent(stadiumName)}`);
        
        if (onScanComplete) onScanComplete();
      } catch (error) {
        toast({
          title: "Scan Error",
          description: "Invalid QR code format. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
      }
    }
  };

  const handleError = (error: Error) => {
    toast({
      title: "Scanner Error",
      description: error.message || "Failed to access camera",
      variant: "destructive",
    });
    setScanning(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p>Processing scan result...</p>
      </div>
    );
  }

  return (
    <Card className="bg-card/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          Scan Stadium QR Code
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {scanning ? (
          <div className="space-y-4">
            <QrReader
              onResult={(result, error) => {
                if (result) {
                  handleScan(result.getText());
                }
                if (error) {
                  handleError(error);
                }
              }}
              constraints={{ facingMode: "environment" }}
              className="w-full"
            />
            <Button 
              onClick={() => setScanning(false)} 
              variant="outline" 
              className="w-full"
            >
              Cancel Scan
            </Button>
          </div>
        ) : (
          <Button 
            onClick={() => setScanning(true)} 
            className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground"
          >
            <QrCode className="mr-2 h-5 w-5" />
            Start QR Scanner
          </Button>
        )}
        <p className="text-sm text-muted-foreground text-center">
          Scan QR codes at stadiums to get information and nearby hotel recommendations
        </p>
      </CardContent>
    </Card>
  );
};

export default QRScanner;