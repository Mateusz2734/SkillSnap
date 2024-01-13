import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Button, FormControl, FormHelperText, FormLabel, IconButton, Input, Stack } from "@mui/joy";
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import axios from "axios";

import api from "../api/api";
import { PostUserPayload, PostUserResponse } from "../types/types";

type FormValues = PostUserPayload;

export const RegisterForm = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    const formik = useFormik<FormValues>({
        initialValues: {
            username: "",
            discordUsername: "",
            password: "",
        },
        onSubmit: async (values) => {
            let success = true;
            console.log("values: ", values);
            try {
                await api.post<PostUserResponse>(
                    "/users",
                    JSON.stringify(values)
                );
            } catch (error) {
                success = false;
                let message = "An error occurred";

                if (axios.isAxiosError(error)) {
                    console.log(error.response);
                    if (!error.response) {
                        message = "Could not connect to the server";
                    } else if (error.response.status === 400) {
                        message = "Missing usernames or password";
                    } else if (error.response.status === 422) {
                        message = "Username or discord username already exists";
                    } else {
                        message = "Register failed";
                    }
                    toast.error(message);
                }
            }

            if (success) {
                toast.success("Register successful. Please sign in.");
                navigate("/login", { replace: true });
            }
        },
        validate(values) {
            const errors: Partial<FormValues> = {};
            errors.username = validateUsername(values.username);
            errors.password = validatePassword(values.password);
            errors.discordUsername = validateDiscordUsername(values.discordUsername);

            if (!errors.username && !errors.password && !errors.discordUsername) {
                return undefined;
            }
            return errors;
        },
    });

    const usernameError = formik.touched.username && !!formik.errors.username;
    const passwordError = formik.touched.password && !!formik.errors.password;
    const discordUsernameError = formik.touched.discordUsername && !!formik.errors.discordUsername;

    const visibilityButton = <IconButton onClick={() => setVisible(!visible)}>{visible ? <VisibilityOffOutlined /> : <VisibilityOutlined />}</IconButton>;

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
                    autoComplete="new-username"
                    error={usernameError}
                    fullWidth
                />
                <FormHelperText>{formik.touched.username ? formik.errors.username : null}</FormHelperText>
            </FormControl>
            <FormControl required>
                <FormLabel>Discord Username</FormLabel>
                <Input
                    id="discordUsername"
                    name="discordUsername"
                    type="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.discordUsername}
                    autoComplete="new-username"
                    error={discordUsernameError}
                    fullWidth
                />
                <FormHelperText>{formik.touched.discordUsername ? formik.errors.discordUsername : null}</FormHelperText>
            </FormControl>
            <FormControl required>
                <FormLabel>Password</FormLabel>
                <Input
                    id="password"
                    name="password"
                    type={visible ? "text" : "password"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    autoComplete="new-password"
                    error={passwordError}
                    fullWidth
                    endDecorator={visibilityButton}
                />
                <FormHelperText>{formik.touched.password ? formik.errors.password : null}</FormHelperText>
            </FormControl>
            <Stack gap={4} sx={{ mt: 2 }}>
                <Button type="submit" fullWidth onClick={() => console.log(formik.errors)}>
                    Sign in
                </Button>
            </Stack>
        </form>
    );
};

function validateUsername(username: string): string | undefined {
    if (username === "") {
        return "Must not be empty";
    }
    if (username.length > 30) {
        return "Must be 30 characters or less";
    }
    return undefined;
}

function validatePassword(password: string): string | undefined {
    if (password === "") {
        return "Must not be empty";
    }
    if (password.length < 8) {
        return "Must be 8 characters or more";
    }
    if (password.length > 72) {
        return "Must be 72 characters or less";
    }
    return undefined;
}

function validateDiscordUsername(discordUsername: string): string | undefined {
    if (discordUsername === "") {
        return "Must not be empty";
    }
    if (discordUsername.length > 72) {
        return "Must be 72 characters or less";
    }
    return undefined;
}