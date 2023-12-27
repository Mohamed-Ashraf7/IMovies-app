import { Suspense, lazy } from "react";
import { Routes , Route} from "react-router-dom";
import Loading from "../components/Loading";
import AuthGuard from "../components/AuthGuard";
import Landing from "../pages/landing/Landing" ;
const  Main = lazy(()=>import("../pages/Home/Main"));
const Login = lazy(()=>import ("../components/Login"));
const SignUp = lazy(()=>import("../components/SignUp"));
const Routing = () => {
  

  return (
      <Suspense fallback={<Loading />}>
        <Routes>
        <Route path="/*" element={<AuthGuard
          authenticatedComponent={<Main />}
          unauthenticatedComponent={<Landing />} />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
       </Routes>
    </Suspense>
  );
};

export default Routing;
