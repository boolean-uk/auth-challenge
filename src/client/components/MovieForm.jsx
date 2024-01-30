import { useState } from "react";

import localRequest from "../utils/localRequest.js";
import SubmissionConfirmation from "./SubmissionConfirmation.jsx";
import MovieList from "./MovieList.jsx";

const DEFAULT_MOVIE_DETAILS = {
  title: "",
  description: "",
  runtimeMins: 90,
};

export default function MovieForm() {
  const [movieDetails, setMovieDetails] = useState(DEFAULT_MOVIE_DETAILS);
  const [submissionResponse, setSubmissionResponse] = useState({});
  const [loadMovieList, setLoadMovieList] = useState(true);
  const { title, description, runtimeMins } = movieDetails;

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await localRequest.postUrl("movie", movieDetails);
    setSubmissionResponse(response);
    setLoadMovieList(true);
  }

  return (
    <div>
      <h2>Submit Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            onChange={(e) =>
              setMovieDetails({ ...movieDetails, title: e.target.value })
            }
            type="text"
            value={title}
          />
        </label>
        <label>
          Description
          <input
            onChange={(e) =>
              setMovieDetails({ ...movieDetails, description: e.target.value })
            }
            type="text"
            value={description}
          />
        </label>
        <label>
          runtimeMins
          <input
            onChange={(e) =>
              setMovieDetails({
                ...movieDetails,
                runtimeMins: Number(e.target.value),
              })
            }
            type="number"
            value={runtimeMins}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <SubmissionConfirmation submissionResponse={submissionResponse} />
      <MovieList
        loadMovieList={loadMovieList}
        setLoadMovieList={setLoadMovieList}
      />
    </div>
  );
}
