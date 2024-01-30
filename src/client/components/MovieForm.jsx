import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const movieLocalStorage = () => {
  const storedMovie = localStorage.getItem("movie");

  try {
    return storedMovie
      ? JSON.parse(storedMovie)
      : { title: "", description: "", runtimeMins: 0 };
  } catch (error) {
    return { title: "", description: "", runtimeMins: 0 };
  }
};

export default function MovieForm({ handleSubmit, error }) {
  const [movie, setMovie] = useState(movieLocalStorage());

  const handleSubmitDecorator = (e) => {
    e.preventDefault();
    handleSubmit(movie);
    setMovie({
      title: "",
      description: "",
      runtimeMins: 0,
    });
    localStorage.removeItem("movie");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMovie({
      ...movie,
      [name]: name === "runtimeMins" ? parseInt(value) : value,
    });
    localStorage.setItem("movie", JSON.stringify(movie));
  };


  return (
    <Box>
      <VStack as="form" onSubmit={handleSubmitDecorator} spacing={4}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            minLength={3}
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            type="text"
            name="description"
            value={movie.description}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Runtime (minutes)</FormLabel>
          <Input
            type="number"
            name="runtimeMins"
            value={movie.runtimeMins}
            onChange={handleChange}
          />
        </FormControl>
        {error && (
          <Text color="red" mt="1">
            {error}
          </Text>
        )}
        <Button type="submit" colorScheme="telegram">
          Submit a movie
        </Button>
      </VStack>
    </Box>
  );
}
