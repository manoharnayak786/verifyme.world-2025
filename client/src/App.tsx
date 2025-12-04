import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { UserRoleProvider } from "@/context/UserRoleContext";
import NotFound from "@/pages/not-found";

// New Routes
import Landing from "@/routes/Landing";
import AuthPage from "@/routes/AuthPage";
import VerifyPage from "@/routes/VerifyPage";
import DashboardOverview from "@/routes/DashboardOverview";
import DashboardCredentials from "@/routes/DashboardCredentials";
import DashboardAnalytics from "@/routes/DashboardAnalytics";
import DashboardSettings from "@/routes/DashboardSettings";
import DashboardVerify from "@/routes/DashboardVerify";

// Router Component
function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Landing} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/verify" component={VerifyPage} />
      <Route path="/verify/:id" component={VerifyPage} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" component={DashboardOverview} />
      <Route path="/dashboard/credentials" component={DashboardCredentials} />
      <Route path="/dashboard/verify" component={DashboardVerify} />
      <Route path="/dashboard/analytics" component={DashboardAnalytics} />
      <Route path="/dashboard/settings" component={DashboardSettings} />

      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserRoleProvider>
        <Toaster />
        <Router />
      </UserRoleProvider>
    </QueryClientProvider>
  );
}

export default App;
