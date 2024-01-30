import React, { useEffect, useState } from "react";
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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import axios from "axios";

import MovieForm from "./MovieForm";

function DashboardPage({ movies, handleCreateMovie, error }) {
  const [updatedMovies, setUpdatedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const username = localStorage.getItem("username");

  const isMobile = useBreakpointValue({ base: true, lg: false });

  useEffect(() => {
    setUpdatedMovies([...movies].sort((a, b) => b.id - a.id));
  }, [movies]);

  const handleDelete = (movieToDelete) => {
    setSelectedMovie(movieToDelete);
    setIsDeleteAlertOpen(true);
  };

  const onDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:4000/movie/${selectedMovie.id}`);
      setUpdatedMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.id !== selectedMovie.id)
      );
    } catch (error) {
      console.error("Error deleting movie:", error);
    } finally {
      setIsDeleteAlertOpen(false);
      setSelectedMovie(null);
    }
  };

  const onDeleteCancel = () => {
    setIsDeleteAlertOpen(false);
    setSelectedMovie(null);
  };

  // const handleDelete = async (movieToDelete) => {
  //   const confirmation = window.confirm("Are yous ure to delete this movie?");
  //   if (confirmation) {
  //     try {
  //       await axios.delete(`http://localhost:4000/movie/${movieToDelete.id}`);
  //       setUpdatedMovies((prevMovies) =>
  //         prevMovies.filter((movie) => movie.id !== movieToDelete.id)
  //       );
  //     } catch (error) {
  //       console.error("Error deleting movie:", error);
  //     }
  //   } else {
  //     console.log("Cancelled");
  //   }
  // };

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
          {updatedMovies && (
            <Center mb={5}>
              <Heading as="h2" size="sm">
                Movie List
              </Heading>
            </Center>
          )}
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
              {updatedMovies.map((movie) => (
                <Tr key={movie.id}>
                  <Td>{movie.title}</Td>
                  <Td>{movie.description}</Td>
                  <Td>{movie.runtimeMins}</Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDelete(movie)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Container>
      </GridItem>
      <AlertDialog isOpen={isDeleteAlertOpen} onClose={onDeleteCancel}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Delete
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure you want to delete the movie?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onDeleteCancel}>Cancel</Button>
              <Button colorScheme="red" onClick={onDeleteConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Grid>
  );
}
export default DashboardPage;
