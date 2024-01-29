import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Heading,
  VStack,
  Card,
  HStack,
  Stack,
  CardBody,
  Text,
  Center,
  useBreakpointValue,
} from "@chakra-ui/react";
import { IoLogoOctocat } from "react-icons/io";

const userLocalStorage = () => {
  const storedUser = localStorage.getItem("user");
  try {
    return storedUser ? JSON.parse(storedUser) : { username: "", password: "" };
  } catch (error) {
    console.error("Error parsing stored user:", error);
    return { username: "", password: "" };
  }
};

export default function UserForm({ handleSubmit, error }) {
  const [user, setUser] = useState(() => userLocalStorage());

  const location = useLocation();

  const handleSubmitDecorator = async (e) => {
    e.preventDefault();
    await handleSubmit(user);
    setUser({ username: "", password: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const isRegisterPage = location.pathname === "/register";

  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Box>
      <Center>
        <Stack>
          <VStack as="header" spacing="6" mt="8">
            <IoLogoOctocat className="logo" />
            <Heading
              as="h1"
              fontWeight="300"
              fontSize="24px"
              letterSpacing="-0.5"
            >
              {isRegisterPage ? "Register" : "Log In"}
            </Heading>
          </VStack>
          <Card
            bgColor="#f6f9fa"
            variant="outline"
            borderColor="#d8dee4"
            maxWidth="308px"
            minWidth={isMobile ? "" : "308px"}
          >
            <CardBody>
              <form onSubmit={handleSubmitDecorator}>
                <Stack spacing={4}>
                  <FormControl id="user-form" isRequired>
                    <FormLabel htmlFor="username" size="sm">
                      Username
                    </FormLabel>
                    <Input
                      type="text"
                      name="username"
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                      value={user.username}
                      onChange={handleChange}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <HStack justifyContent="space-between">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Button
                        as="a"
                        href="http://localhost/user/register"
                        variant="link"
                        size="xs"
                        color="#0969da"
                        fontWeight="500"
                      >
                        Forgot password?
                      </Button>
                    </HStack>
                    <Input
                      type="password"
                      name="password"
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                      value={user.password}
                      onChange={handleChange}
                    />
                    {error && (
                      <Text color="red" mt="1">
                        {error}
                      </Text>
                    )}
                    <Button
                      type="submit"
                      bg="#2da44e"
                      color="white"
                      size="sm"
                      _hover={{ bg: "#2c974b" }}
                      width="100%"
                      mt="4"
                    >
                      {isRegisterPage ? "Create an account" : "Sign in"}
                    </Button>
                  </FormControl>
                </Stack>
              </form>
            </CardBody>
          </Card>
          <Card variant="outline" bgColor="#d0d7d">
            <CardBody>
              <Center>
                <HStack fontSize="sm" spacing={1}>
                  <Text>
                    {isRegisterPage
                      ? `Already have an account? `
                      : `Don't have an account? `}
                  </Text>
                  <Link to={isRegisterPage ? "/login" : "/register"}>
                    <p className="sign-in">
                      {isRegisterPage ? "Log In" : "Register"}
                    </p>
                  </Link>
                </HStack>
              </Center>
            </CardBody>
          </Card>
        </Stack>
      </Center>
    </Box>
  );
}
