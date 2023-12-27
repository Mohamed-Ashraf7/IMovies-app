import { ThemeProvider } from "./context/Theme";
import { AuthProvider } from "./context/AuthContext";
import Routing from "./Layouts/Routing";
import TOP from "./components/Top";

const App = () => {
  return (
      <AuthProvider>
      <ThemeProvider>
           <TOP />
          <Routing />
     </ThemeProvider>
     </AuthProvider>
  );
};
export default App;
