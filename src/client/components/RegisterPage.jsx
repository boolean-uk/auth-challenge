import React from 'react'

function RegisterPage({ handleRegister, error }) {
    return (
      <Box>
        <h1>Register</h1>
        <UserForm handleSubmit={handleRegister} error={error} />
      </Box>
    );
  }
export default RegisterPage