import { useState } from "react";
import api from "../api/axios";
import Spinner from "./Spinner";
import { useToast } from "./ToastProvider";

function Login({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("token/", { username, password });
      if (data?.access) {
        localStorage.setItem("accessToken", data.access);
      }
      if (data?.refresh) {
        localStorage.setItem("refreshToken", data.refresh);
      }
      onSuccess?.();
      showToast("Logged in successfully", "success");
    } catch (err) {
      setError("Login failed. Check credentials.");
      showToast("Login failed", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: 16, marginBottom: 16 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? <><Spinner /> Logging in…</> : "Login"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;
