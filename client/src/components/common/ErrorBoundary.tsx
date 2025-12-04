import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] w-full flex flex-col items-center justify-center p-6 text-center space-y-4 bg-surface/30 rounded-xl border border-destructive/20">
          <div className="p-4 rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-xl font-bold text-text-main">Something went wrong</h2>
          <p className="text-text-muted max-w-md">
            {this.state.error?.message || "An unexpected error occurred in this component."}
          </p>
          <Button 
            onClick={() => this.setState({ hasError: false })}
            variant="outline"
            className="border-border hover:bg-white/5"
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
