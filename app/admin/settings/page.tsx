import ProfileSettings from "@/components/settings/profile-settings";
import {
  getCurrentProfile,
  updateProfile,
  updatePassword,
  deleteAccount,
} from "@/service/profile.service";

export default async function AdminSettingsPage() {
  const res = await getCurrentProfile();

  const profile = res.status ? res.data?.profile : null;
  const auth = res.status ? res.data?.auth : null;

  return (
    <ProfileSettings
      initialName={profile?.name ?? auth?.user_metadata?.name ?? ""}
      initialEmail={auth?.email ?? profile?.email ?? ""}
      initialPhone={profile?.phone ?? ""}
      initialAvatar={profile?.avatar ?? ""}
      onUpdateProfile={updateProfile}
      onUpdatePassword={updatePassword}
      onDeleteAccount={deleteAccount}
    />
  );
}
