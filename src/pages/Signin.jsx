import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem(
        "googleAccessToken",
        tokenResponse.access_token || "",
      );
      navigate("/dashboard");
    },
    onError: () => {
      localStorage.setItem("isAuthenticated", "false");
    },
  });

  return (
    <div className="container-fluid bg-light">
      <div className="row min-vh-100 align-items-center justify-content-center">
        {/* Left Side (Desktop Only) */}
        <div className="col-lg-6 d-none d-lg-flex bg-primary text-white p-5">
          <div className="m-auto text-center">
            <h1 className="display-5 fw-bold mb-3">Welcome to Avanya</h1>

            <p className="lead">
              Securely manage your dashboard using your Google account.
            </p>

            <hr className="border-light opacity-75" />

            <div
              className="mt-4 text-start mx-auto"
              style={{ maxWidth: "350px" }}
            >
              <p>✅ Secure Google Authentication</p>
              <p>⚡ Fast & Simple Login</p>
              <p>📊 Access Dashboard Anywhere</p>
              <p>🔒 Safe & Reliable</p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4 p-md-5">
              <div className="text-center">
                <div
                  className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: 70, height: 70 }}
                >
                  <i className="bi bi-person-fill fs-2"></i>
                </div>

                <h2 className="fw-bold">Sign In</h2>

                <p className="text-muted mb-4">
                  Continue with Google to access your dashboard.
                </p>
              </div>

              <button
                className="btn btn-outline-dark w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                onClick={() => login()}
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  width="22"
                />
                Continue with Google
              </button>

              <div className="text-center mt-4">
                <small className="text-muted">
                  By continuing you agree to our Terms & Privacy Policy.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
