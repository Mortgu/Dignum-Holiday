import { logout } from "./actions/auth";
import SignupForm from "./ui/signup-form";
import { verifySession } from '@/app/lib/dal'

export default async function Home() {
  const session = verifySession();
  const user = session?.user;

  console.log(user);

  if (user) {
    return (
      <div>
        Dashboard
        <button onClick={logout}>Logout</button>
      </div>
    )
  }

  return (
    <SignupForm />
  )
}
