import { useState } from "react";
import PropTypes from "prop-types";

import localRequest from "../utils/localRequest.js";

const DEFAULT_USER_DETAILS = {
  username: "",
  password: "",
};

export default function UserForm({ endpoint, login, title }) {
  const [userDetails, setUserDetails] = useState(DEFAULT_USER_DETAILS);
  const [submissionResponse, setSubmissionResponse] = useState({});

  const { username, password } = userDetails;

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await localRequest.postUrl(endpoint, userDetails);
    setSubmissionResponse(response);
    if (login) {
      localStorage.setItem("token", response.token);
    }
  }

  return (
    <div>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          Username
          <input
            onChange={(e) =>
              setUserDetails({ ...userDetails, username: e.target.value })
            }
            type="text"
            value={username}
            minLength={1}
          />
          Password
          <input
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
            type="password"
            value={password}
            minLength={1}
          />
        </label>
        <button type="submit">Register</button>
      </form>
      {SubmissionConfirmation(submissionResponse)}
    </div>
  );
}

function SubmissionConfirmation(submissionResponse) {
  const ok = submissionResponse.ok;

  if (ok) {
    return <div>Success!</div>;
  }

  if (ok === false) {
    const { formErrors, fieldErrors } = submissionResponse.error;
    let fieldErrorArr = [];
    for (const issue in fieldErrors) {
      fieldErrorArr.push(`${issue}: ${fieldErrors[issue]}`);
    }

    return (
      <div>
        Failed! {formErrors} {fieldErrorArr}
      </div>
    );
  }

  return <></>;
}

UserForm.propTypes = {
  endpoint: PropTypes.string,
  login: PropTypes.bool,
  title: PropTypes.string,
};
