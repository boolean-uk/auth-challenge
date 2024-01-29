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
import { useState } from "react";

export default function MovieForm({ handleSubmit, error }) {
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    runtimeMins: 0,
  });

  const handleSubmitDecorator = (e) => {
    e.preventDefault();
    handleSubmit(movie);
    setMovie({
      title: "",
      description: "",
      runtimeMins: 0,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMovie({
      ...movie,
      [name]: name === "runtimeMins" ? parseInt(value) : value,
    });
  };

  return (
    <Box>
      <VStack as="form" onSubmit={handleSubmitDecorator} spacing={4}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
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
