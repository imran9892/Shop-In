import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { authActions } from "../store/auth-slice";
import { loginUser, signupUser } from "../util/authApi";

const LoginPage = () => {
  const [, setCookie] = useCookies();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const onLoginHandler = async (loginUserData) => {
    setIsLoading(true);
    const response = await loginUser(loginUserData);
    if (!response.status) {
      if (response.error === "INVALID_PASSWORD")
        setAuthError("Incorrect Password");
      else if (response.error === "EMAIL_NOT_FOUND")
        setAuthError("Invalid mail Id");
      else setAuthError("Failed to Login. Please try again");
      setIsLoading(false);
      return;
    }
    const loginData = response.data;
    dispatch(authActions.loginUser(loginData));
    setCookie("tokenData", loginData, {
      path: "/",
      expires: new Date(loginData.expiresIn),
    });
    setIsLoading(false);
    navigate("/");
  };

  const onSignupHandler = async (newUser) => {
    setIsLoading(true);
    const response = await signupUser(newUser);
    if (!response.status) {
      switch (response.error) {
        case "EMAIL_EXISTS":
          setAuthError("You are already a user. Try to Login");
          break;
        default:
          setAuthError("Failed to SignUp. Please try again");
      }
      setIsLoading(false);
      return;
    }
    dispatch(authActions.loginUser(response.data));
    setCookie("tokenData", response.data, {
      path: "/",
      expires: new Date(response.data.expiresIn),
    });
    setIsLoading(false);
    navigate("/");
  };

  return (
    <AuthForm
      onLogin={onLoginHandler}
      onSignup={onSignupHandler}
      authError={authError}
      isLoading={isLoading}
    />
  );
};

export default LoginPage;
