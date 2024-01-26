import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

export default function MovieForm({ handleSubmit, error }) {
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    runtimeMins: 60,
  });

  const handleSubmitDecorator = (e) => {
    e.preventDefault();
    handleSubmit(movie);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMovie({
      ...movie,
      [name]: name === "runtimeMins" ? parseInt(value) : value,
    });
  };

  return (
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
        <Input
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
      <Button type="submit">Submit</Button>
      {error && <p>{error}</p>}
    </VStack>
  );
}
