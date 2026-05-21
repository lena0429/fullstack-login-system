import { logout } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export function ProfilePage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <main>
      <h1>Profile</h1>

      <p>Email: {user?.email}</p>
      <p>User ID: {user?.id}</p>

      <button onClick={() => dispatch(logout())}>Logout</button>
    </main>
  );
}