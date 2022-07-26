import { LoginButton } from "./LoginButton";
import Link from "next/link";

function Nav() {
  return (
    <div lassName="nav shadow-md shadow-gray-400 ">
      <div className="nav-item">
        <Link href="/">
          <button className="button__box !mt-20">Main</button>
        </Link>
      </div>
      <LoginButton />
    </div>
  );
}

export default Nav;
