import { Box, formLabelClasses, Link, Typography, Stack } from "@mui/joy";

import { RegisterForm } from "../components/RegisterForm";

const Register = () =>
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      minHeight: "80dvh",
      width:
        "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
      maxWidth: "100%",
      px: 2,
    }}
  >
    <Box
      component="main"
      sx={{
        my: "auto",
        py: 2,
        pb: 5,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 400,
        maxWidth: "100%",
        mx: "auto",
        borderRadius: "sm",
        "& form": {
          display: "flex",
          flexDirection: "column",
          gap: 2,
        },
        [`& .${formLabelClasses.asterisk}`]: {
          visibility: "hidden",
        },
      }}
    >
      <Stack gap={4} sx={{ mb: 2 }}>
        <Stack gap={1}>
          <Typography level="h3">Sign up</Typography>
          <Typography level="body-sm">
            Already have an account?{" "}
            <Link href="/login" level="title-sm">
              Sign in!
            </Link>
          </Typography>
        </Stack>
      </Stack>
      <Stack gap={4} sx={{ mt: 2 }}>
        <RegisterForm />
      </Stack>
    </Box>
  </Box>;

export default Register;