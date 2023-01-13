import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const NavBar = () => {
    // const { user, logout } = useAuth();
    
    return (
        <nav className="w-screen h-12 bg-black" >
            <div className="flex items-center justify-between h-full px-4 mx-auto text-white">
                <Link href="/">
                    <a className="text-2xl font-bold">Slaldrich</a>
                </Link>
                {/* <div className="flex items-center space-x-4">
                    <input type="text" className=" px-2 py-1 bg-gray-800 rounded w-96" />
                    <Link href="/create-post">
                        <a className="text-lg font-medium"></a>
                    </Link>
                </div> */}
                <div className="flex items-center space-x-4">
                    <Link href="/login">
                        <a className="text-lg font-medium">Login</a>
                    </Link>
                    <Link href="/register">
                        <a className="text-lg font-medium">Register</a>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;