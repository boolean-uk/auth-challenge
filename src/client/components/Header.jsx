export default function Header({ userInfo, setToken, setSuccessfulMessage }) {
  return (
    <>
      <header>
        <div>
          <div className="header-head">
            <h2>
              Welcome <span>{userInfo?.username.toUpperCase() + "!"}</span>
            </h2>
            <div>
              <button
                className="sign-out-btn"
                onClick={() => {
                  // To sign out
                  setToken("");
                  setSuccessfulMessage("");
                  localStorage.removeItem("jwt");
                }}
              >
                Sign out
              </button>
            </div>
          </div>
          <p className="last-visit">
            {/* To convert the datetime format from db to a readable and local format */}
            The last login was{" "}
            <span>{new Date(userInfo?.lastVisit).toLocaleString()}</span>
          </p>
        </div>
      </header>
    </>
  );
}
