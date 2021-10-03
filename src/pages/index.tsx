import { useAuth } from "contexts/auth";

const Home = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <h1>Hello Next.js Firebase v9 Auth</h1>
      <div>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
      <div>
        <button onClick={login}>login</button>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  );
};

export default Home;
