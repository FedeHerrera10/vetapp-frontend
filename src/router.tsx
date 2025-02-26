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

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} index />
        <Route element={<AppLayout />}>
          <Route path="/app/" element={<Dashboard />}>
            <Route element={<Veterinarian />} path="vet" />
            <Route element={<Turnos />} path="turnos" />
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
