
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-6">
      <div className="text-center animate-fade-in">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-electric-blue to-mint-green flex items-center justify-center opacity-60">
            <span className="text-white font-bold text-2xl">404</span>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for.
        </p>
        
        <Link to="/">
          <Button className="bg-electric-blue hover:bg-electric-blue/90">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
