import React from "react";
import { Box } from "@chakra-ui/react";

import UserForm from "./UserForm";

function LoginPage({ handleLogin, error }) {
  return (
    <Box>
      <UserForm handleSubmit={handleLogin} error={error} />
    </Box>
  );
}

export default LoginPage;
