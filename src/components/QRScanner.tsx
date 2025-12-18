import { useState, useRef } from "react";
import { QrReader } from "react-qr-reader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, QrCode, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QRScannerProps {
  onScanComplete?: () => void;
}

const QRScanner = ({ onScanComplete }: QRScannerProps) => {
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    
    try {
      // Create a new FileReader to read the image
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const imageDataUrl = e.target?.result as string;
        
        // Create an image element to get dimensions
        const img = new Image();
        img.src = imageDataUrl;
        
        img.onload = async () => {
          // Create a canvas to process the image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            throw new Error("Could not get canvas context");
          }
          
          // Set canvas dimensions to match image
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Draw image on canvas
          ctx.drawImage(img, 0, 0);
          
          // Use QrReader to scan from canvas
          try {
            const qrReader = new QrReader();
            const result = await qrReader.scan(canvas);
            handleScan(result?.getText() || null);
          } catch (error) {
            toast({
              title: "Scan Error",
              description: "Could not read QR code from image. Please try another image.",
              variant: "destructive",
            });
            setImageUploading(false);
          }
        };
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: "Upload Error",
        description: "Failed to process image. Please try again.",
        variant: "destructive",
      });
      setImageUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (loading || imageUploading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p>{imageUploading ? "Processing image..." : "Processing scan result..."}</p>
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
          <div className="space-y-4">
            <Button 
              onClick={() => setScanning(true)} 
              className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground"
            >
              <QrCode className="mr-2 h-5 w-5" />
              Start Camera Scanner
            </Button>
            
            <div className="relative">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <Button
                onClick={triggerFileInput}
                variant="outline"
                className="w-full"
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload QR Code Image
              </Button>
            </div>
          </div>
        )}
        <p className="text-sm text-muted-foreground text-center">
          Scan QR codes at stadiums to get information and nearby hotel recommendations
        </p>
      </CardContent>
    </Card>
  );
};

export default QRScanner;