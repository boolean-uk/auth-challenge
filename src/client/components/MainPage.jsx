// COMPONENTS
import Header from "./Header";
import Main from "./Main";

export default function MainPage({
  token,
  setToken,
  setSuccessfulMessage,
  userInfo,
  baseURL,
}) {
  return (
    <>
      <div className="main-page">
        <Header
          userInfo={userInfo}
          setToken={setToken}
          setSuccessfulMessage={setSuccessfulMessage}
        />

        <Main token={token} baseURL={baseURL} />
      </div>
    </>
  );
}
