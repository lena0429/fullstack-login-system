import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = await dispatch(registerUser({ email, password }));

    if (registerUser.fulfilled.match(result)) {
      navigate("/login");
    }
  }


  return (
    <main>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      {error && <p>{error}</p>}
    </main>
  );
}