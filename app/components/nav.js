import { LoginButton } from "./LoginButton";
import Link from "next/link";

function Nav() {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Link href="/">
        <button className="button__box !mt-20">Login</button>
      </Link>
      <LoginButton />
    </div>
  );
}

export default Nav;