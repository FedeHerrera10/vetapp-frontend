import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { Dashboard } from "./views/Dashboard";
import { AuthLayout } from "./layouts/AuthLayout";
import { LoginView } from "./views/auth/LoginView";
import { Index } from "./pages/Index";
import { RegisterView } from "./views/auth/RegisterView";
import { ResetPasswordView } from "./views/auth/ResetPasswordView";
import { ConfirmAccountView } from "./views/auth/ConfirmAccountView";
import { NewCodeView } from "./views/auth/NewCodeView";
import { Veterinarian } from "./views/Veterinarian";
import { Turnos } from "./views/Turnos";
import { VeterinarianDetail } from "./views/VeterinarianDetails";
import { DashboardSecurity } from "./views/security/DashboardSecurity";
import { UserDetailView } from "./views/auth/UserDetailView";
import { RegisterViewUserSystem } from "./views/auth/RegisterViewUserSystem";
import { EditViewUserSystem } from "./views/auth/EditViewUserSystem";
import { ProfileView } from "./views/profile/ProfileView";
import { UploadImageProfile } from "./components/ui/profile/UploadImageProfile";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} index />
        <Route element={<AppLayout />}>
          <Route path="/app/" element={<Dashboard />}>
            <Route path="security" element={<DashboardSecurity />} />
            <Route
              path="security/add-user/:role"
              element={<RegisterViewUserSystem />}
            />
            <Route path="security/user/view/:id" element={<UserDetailView />} />
            <Route
              path="security/user/edit/:id"
              element={<EditViewUserSystem />}
            />
            <Route element={<UploadImageProfile />} path="profile/:id/upload-image" />
            <Route element={<Veterinarian />} path="vets" />
            <Route element={<VeterinarianDetail />} path="vets/:id" />
            <Route element={<Turnos />} path="turnos" />
            <Route element={<ProfileView />} path="profile" />

          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route path="/auth/reset-password" element={<ResetPasswordView />} />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccountView />}
          />
          <Route path="/auth/new-code" element={<NewCodeView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
