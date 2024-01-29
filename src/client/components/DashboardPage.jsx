import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  GridItem,
  Heading,
  Stack,
  HStack,
  Text,
  useBreakpointValue,
  Center,
  Container,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
} from "@chakra-ui/react";

import MovieForm from "./MovieForm";

function DashboardPage({ movies, handleCreateMovie, error }) {
  const username = localStorage.getItem("username");

  const isMobile = useBreakpointValue({ base: true, lg: false });

  const reversedMovies = movies.sort((a, b) => b.id - a.id);

  return (
    <Grid
      height="95dvh"
      templateAreas={{
        base: `"aside"
               "main"`,
        lg: `"aside main"`,
      }}
      templateColumns={{ base: "1fr", lg: "200px 1fr" }}
      templateRows={{ base: "200px 1fr", lg: "1fr" }}
      gap={1}
      padding={2}
    >
      <GridItem area={"aside"} flexDirection={isMobile ? "column" : "raw"}>
        {isMobile ? (
          <HStack display="flex" justifyContent="space-between" height="100%">
            <HStack>
              <Text fontSize="20px">Hello,</Text>
              <Heading as="h1" size="md">
                {username}
              </Heading>
            </HStack>

            <Link to="/login">
              <Text fontSize="18px" color="#0088CC">
                Log out
              </Text>
            </Link>
          </HStack>
        ) : (
          <Stack height="100%">
            <HStack>
              <Text fontSize="20px">Hello,</Text>
              <Heading as="h1" size="md">
                {username}
              </Heading>
            </HStack>
            <Link to="/login">
              <Text fontSize="18px" color="#0088CC">
                Log out
              </Text>
            </Link>
          </Stack>
        )}
      </GridItem>

      <GridItem area={"main"}>
        <Center>
          <Heading as="h1" size="md">
            Create a movie
          </Heading>
        </Center>
        <Container maxW="800px" mt={10}>
          <MovieForm handleSubmit={handleCreateMovie} error={error} />
        </Container>
        <Container mt={10} maxW="1100px">
          <Center mb={5}>
            <Heading as="h2" size="sm">
              Movie List
            </Heading>
          </Center>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>Run Time (mins)</Th>
                <Th>Delete Movie</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reversedMovies.map((movie) => (
                <Tr key={movie.id}>
                  <Td>{movie.title}</Td>
                  <Td>{movie.description}</Td>
                  <Td>{movie.runtimeMins}</Td>
                  <Td>
                    <Button colorScheme="red" size="sm">
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Container>
      </GridItem>
    </Grid>
  );
}
export default DashboardPage;
