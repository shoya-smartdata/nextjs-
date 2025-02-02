import { AuthProvider } from "./auth/Authcontext";
import AppRoutes from "./routes/appRoutes";

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
