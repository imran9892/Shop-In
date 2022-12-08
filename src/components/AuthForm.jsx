import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Link,
  TextField,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useRef, useState } from "react";

const AuthForm = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const [error, setError] = useState({
    email: null,
    password: null,
    name: null,
  });

  const toggleLoginSignup = () => {
    setIsLogin((prevValue) => !prevValue);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();
    const name = nameRef.current?.value.trim();

    if (
      email?.length === 0 ||
      !email.includes("@") ||
      !email.includes(".com")
    ) {
      setError((prev) => ({ ...prev, email: "Enter a valid Email id" }));
    } else {
      setError((prev) => ({ ...prev, email: null }));
    }
    if (password?.length < 6) {
      setError((prev) => ({
        ...prev,
        password: "Enter a valid password",
      }));
    } else {
      setError((prev) => ({ ...prev, password: null }));
    }
    if (!isLogin) {
      if (name?.length < 3) {
        setError((prev) => ({ ...prev, name: "Enter a valid Name" }));
      } else {
        setError((prev) => ({ ...prev, name: null }));
      }
      props.onSignup({ name, email, password });
    } else {
      props.onLogin({ email, password });
    }
  };

  return (
    <Box
      height="80vh"
      justifyContent="center"
      alignItems="center"
      display="flex"
    >
      <Card component="section" sx={{ padding: 3 }}>
        <CardHeader
          title={isLogin ? "Login" : "Sign-Up"}
          titleTypographyProps={{ textAlign: "center", fontWeight: "medium" }}
        />
        <form onSubmit={onSubmitHandler}>
          <CardContent>
            <Stack
              justifyContent="center"
              alignItems="center"
              direction="column"
              gap={2}
            >
              {!isLogin && (
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  size="small"
                  inputRef={nameRef}
                  error={!!error.name}
                  helperText={error.name}
                />
              )}

              <TextField
                id="email"
                label="Email Id"
                variant="outlined"
                size="small"
                inputRef={emailRef}
                error={!!error.email}
                helperText={error.email}
              />

              <TextField
                id="password"
                type="password"
                label="Password"
                variant="outlined"
                size="small"
                inputRef={passwordRef}
                error={!!error.password}
                helperText={error.password}
              />
            </Stack>
          </CardContent>
          <CardActions
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            <Box sx={{ position: "relative", width: "95%" }}>
              <Button
                variant="contained"
                type="submit"
                fullWidth={true}
                disabled={props.isLoading}
              >
                {isLogin ? "Login" : "Sign-Up"}
              </Button>
              {props.isLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>
            <Link
              variant="body2"
              underline="hover"
              onClick={toggleLoginSignup}
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              {isLogin
                ? "New user? Click here to SignUp"
                : "Already a user? Click here to Login"}
            </Link>
            <Typography variant="p" color="red" fontSize="small">
              {props.authError}
            </Typography>
          </CardActions>
        </form>
      </Card>
    </Box>
  );
};

export default AuthForm;
