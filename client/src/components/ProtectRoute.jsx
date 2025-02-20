import Cookies from "js-cookie";
import { Navigate } from "react-router";

export function ProtectRoute({ children }) {
  const accessToken = Cookies.get("accessToken");

  if (!accessToken) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
}
