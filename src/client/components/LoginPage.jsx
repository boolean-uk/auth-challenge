import React from "react";
import { Box } from "@chakra-ui/react";

import UserForm from "./UserForm";

function LoginPage({ handleLogin, error }) {
  return (
    <Box>
      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} error={error} />
    </Box>
  );
}

export default LoginPage;
