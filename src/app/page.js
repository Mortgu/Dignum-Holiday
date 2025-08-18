import { logout } from "./actions/auth";
import LoginPage from "./login/page";
import SignupForm from "./ui/signup-form";
import { verifySession } from '@/app/lib/dal'

export default async function Home() {
  return (
    <LoginPage />
  )
}
