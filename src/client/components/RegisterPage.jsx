import React from "react";
import { Box } from "@chakra-ui/react";

import UserForm from "./UserForm";

function RegisterPage({ handleRegister, error }) {
  return (
    <Box>
      <UserForm handleSubmit={handleRegister} error={error} />
    </Box>
  );
}
export default RegisterPage;
