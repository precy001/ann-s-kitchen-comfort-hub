import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const NotFound = () => {
  const location = useLocation();
  const contentAnimation = useScrollAnimation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div 
        ref={contentAnimation.ref}
        className={`text-center animate-scale-in ${contentAnimation.isVisible ? 'is-visible' : ''}`}
      >
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
