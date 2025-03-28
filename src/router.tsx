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
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { DashboardPets } from "./views/pets/DashboardPets";
import { RegisterPetView } from "./views/pets/RegisterPetView";
import { EditPetView } from "./views/pets/EditPetView";
import { HistoriaClinica } from "./views/HistoriaClinica";
import { Services } from "./views/Services";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} index />
        <Route element={<AppLayout />}>
          <Route path="/app/" element={<Dashboard />}>
            <Route
              path="security"
              element={
                <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                  <DashboardSecurity />
                </ProtectedRoute>
              }
            />
            <Route
              path="security/add-user/:role"
              element={
                <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                  <RegisterViewUserSystem />
                </ProtectedRoute>
              }
            />
            <Route path="security/user/view/:id" element={<UserDetailView />} />
            <Route
              path="security/user/edit/:id"
              element={<EditViewUserSystem />}
            />
            <Route
              element={<UploadImageProfile />}
              path="profile/:id/upload-image"
            />
            <Route element={<Veterinarian />} path="vets" />
            <Route element={<VeterinarianDetail />} path="vets/:id" />
            <Route element={<Turnos />} path="turnos" />
            <Route
              element={
                <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                  <Services />
                </ProtectedRoute>
              }
              path="services"
            />
            <Route
              element={
                <ProtectedRoute allowedRoles={["ROLE_VETERINARIO"]}>
                  <HistoriaClinica />
                </ProtectedRoute>
              }
              path="historias-clinicas"
            />
            <Route element={<ProfileView />} path="profile" />
            <Route
              element={
                <ProtectedRoute allowedRoles={["ROLE_CLIENTE"]}>
                  <DashboardPets />
                </ProtectedRoute>
              }
              path="pets"
            />
            <Route
              element={
                <ProtectedRoute allowedRoles={["ROLE_CLIENTE"]}>
                  <RegisterPetView />
                </ProtectedRoute>
              }
              path="pets/add"
            />
            <Route
              element={
                <ProtectedRoute allowedRoles={["ROLE_CLIENTE"]}>
                  <EditPetView />
                </ProtectedRoute>
              }
              path="pets/edit/:id"
            />
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
