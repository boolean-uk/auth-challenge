import PropTypes from "prop-types";

export default function SubmissionConfirmation({ submissionResponse }) {
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

SubmissionConfirmation.propTypes = {
  submissionResponse: PropTypes.object,
};
