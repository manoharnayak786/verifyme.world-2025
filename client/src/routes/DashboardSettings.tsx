import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserRole } from "@/context/UserRoleContext";
import { RotateCcw, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DashboardSettings() {
  const { userRole } = useUserRole();
  const { toast } = useToast();

  const handleReset = () => {
    toast({
      title: "Demo Data Reset",
      description: "All local changes have been reverted to default.",
    });
  };

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-main">Settings</h1>
          <p className="text-text-muted">Manage your profile and preferences.</p>
        </div>

        <div className="p-6 rounded-xl bg-surface border border-border space-y-6">
          <h3 className="text-xl font-bold border-b border-border pb-4">Profile Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Display Name</label>
              <Input defaultValue="Demo User" className="bg-background border-border" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Role</label>
              <Input value={userRole?.toUpperCase()} disabled className="bg-background/50 border-border text-text-muted" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Email</label>
              <Input defaultValue="demo@verifyme.world" className="bg-background border-border" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Timezone</label>
              <select className="w-full h-10 rounded-md bg-background border border-border px-3 text-sm">
                <option>UTC (GMT+0)</option>
                <option>EST (GMT-5)</option>
                <option>IST (GMT+5:30)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-surface border border-border space-y-6">
          <h3 className="text-xl font-bold border-b border-border pb-4">Preferences</h3>
          
          <div className="flex items-center justify-between">
             <div>
               <p className="font-medium">Email Notifications</p>
               <p className="text-sm text-text-muted">Receive updates about new credentials.</p>
             </div>
             <div className="w-12 h-6 rounded-full bg-primary p-1 cursor-pointer">
               <div className="w-4 h-4 rounded-full bg-white translate-x-6 transition-transform"></div>
             </div>
          </div>

          <div className="flex items-center justify-between">
             <div>
               <p className="font-medium">Public Profile</p>
               <p className="text-sm text-text-muted">Allow recruiters to find your verified profile.</p>
             </div>
             <div className="w-12 h-6 rounded-full bg-primary p-1 cursor-pointer">
               <div className="w-4 h-4 rounded-full bg-white translate-x-6 transition-transform"></div>
             </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
           <Button onClick={handleSave} className="bg-primary hover:bg-primary-hover text-white">
             <Save className="mr-2 h-4 w-4" /> Save Changes
           </Button>
           <Button variant="outline" onClick={handleReset} className="text-destructive border-destructive/50 hover:bg-destructive/10">
             <RotateCcw className="mr-2 h-4 w-4" /> Reset Demo Data
           </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
