import { FormRegisterSystem } from "../../components/auth/FormRegisterSystem";
import FullScreenModal from "../../components/ui/modal";

export const RegisterViewUserSystem = () => {
  return (
    <FullScreenModal isOpen={true} title={"Registración de usuario"}>
      <FormRegisterSystem />
    </FullScreenModal>
  );
};
