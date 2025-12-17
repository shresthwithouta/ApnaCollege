import PageHeader from "@/components/PageHeader";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import LogoutAllDevices from "@/components/LogoutAllDevices";

export default function SecuritySettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Security"
        description="Manage your password and active sessions"
      />

      <ChangePasswordForm />
      <LogoutAllDevices />
    </div>
  );
}
