import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

import UserForm from "./UserForm";

function RegisterPage({ handleRegister, error, setError }) {
  return (
    <Box>
      {/* <h1>Register</h1> */}
      <UserForm handleSubmit={handleRegister} error={error} setError={setError}/>
    </Box>
  );
}
export default RegisterPage;
