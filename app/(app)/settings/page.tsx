export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { connect } from "@/lib/db";
import User from "@/models/User";

import AccountSettingsForm from "@/components/AccountSettingsForm";
import "@/components/ChangePasswordForm";
import DeleteAccount from "@/components/DeleteAccount";
import "@/components/LogoutAllDevices";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  await connect();

  const user = await User.findById(session.user.id)
    .select("username email")
    .lean();

  if (!user) redirect("/login");

  return (
    <>
     
      <style>{`
        .settings-scope,
        .settings-scope * {
          color: #381D03 !important;
        }

        .settings-scope input,
        .settings-scope textarea,
        .settings-scope select {
          background: #FEFAE0 !important;
          color: #381D03 !important;
          border: 1px solid #A19379 !important;
        }

        .settings-scope ::placeholder {
          color: #736046 !important;
        }

        .settings-scope button {
          background: #676F53 !important;
          color: #ffffff !important;
        }
      `}</style>

      <div className="settings-scope min-h-screen bg-[#FEFAE0] p-6">
       
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold">
            Account Settings
          </h1>
          <p className="text-sm">
            Manage your account and security
          </p>
        </div>

        <div className="space-y-6 max-w-3xl">
          
          <div className="rounded-2xl border border-[#A19379] bg-white p-6">
            <AccountSettingsForm
              initialUsername={user.username}
              initialEmail={user.email}
            />
          </div>

         
          <div className="rounded-2xl border border-red-300 bg-white p-6">
            <DeleteAccount />
          </div>
        </div>
      </div>
    </>
  );
}
