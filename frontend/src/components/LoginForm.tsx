import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Button, FormControl, FormLabel, Input, Stack } from "@mui/joy";
import axios from "axios";

import { Credentials } from "../types/types";
import { useAuth } from "../hooks/useAuth";

type FormValues = Credentials;

type LoginFormProps = {
  from: string;
};

export const LoginForm = (props: LoginFormProps) => {
  const { logIn } = useAuth();

  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      let success = true;
      try {
        await logIn(values);
      } catch (error) {
        success = false;
        let message = "An error occurred";

        if (axios.isAxiosError(error)) {
          if (!error.response) {
            message = "Could not connect to the server";
          } else if (error.response.status === 400) {
            message = "Missing username or password";
          } else if (error.response.status === 401) {
            message = "Incorrect username or password";
          } else {
            message = "Login failed";
          }
          toast.error(message);
        }
      }

      if (success) {
        navigate(props.from, { replace: true });
      }
    },
    validate(values) {
      const errors: Partial<FormValues> = {};
      if (!values.username) {
        errors.username = "Required";
      }
      if (!values.password) {
        errors.password = "Required";
      }
      return errors;
    },
  });

  const usernameError = formik.touched.username && !!formik.errors.username;
  const passwordError = formik.touched.password && !!formik.errors.password;

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl required>
        <FormLabel>Username</FormLabel>
        <Input
          id="username"
          name="username"
          type="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          autoComplete="on"
          error={usernameError}
          fullWidth
        />
      </FormControl>
      <FormControl required>
        <FormLabel>Password</FormLabel>
        <Input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          autoComplete="on"
          error={passwordError}
          fullWidth
        />
      </FormControl>
      <Stack gap={4} sx={{ mt: 2 }}>
        <Button type="submit" fullWidth>
          Sign in
        </Button>
      </Stack>
    </form>
  );
};
