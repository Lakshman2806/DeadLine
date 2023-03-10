import { useState } from "react";
import { useLogIn } from "../hooks/useLogIn";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading } = useLogIn();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(email, password);

    await login(email, password);
  };

  return (
    <div>
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>

      <label>Email</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <p>
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </p>
      <button disabled={loading}>Login</button>
      {error && <div className="error">{error}</div>}
    </form>
    
    </div>
  );
};

export default Login;
