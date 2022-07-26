import { LoginButton } from "./LoginButton";
import Link from "next/link";

function Nav() {
  return (
    <div className="nav shadow-md shadow-gray-400">
      <div className="nav-item">
        <Link href="/">
          <a>Main</a>
        </Link>
      </div>
      <LoginButton />
    </div>
  );
}

export default Nav;
