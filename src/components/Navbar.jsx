function Navbar() {
    return (
        <nav className="bg-zinc-800 p-4 shadow-md">
            <ul className="flex justify-center space-x-6">
                <li>
                    <a
                        href="/"
                        className="text-white hover:text-gray-300 active:text-red-500 transition duration-300 transform hover:scale-110 active:scale-95"
                    >
                        Hlasování
                    </a>
                </li>
                <li>
                    <a
                        href="/admin"
                        className="text-white hover:text-gray-300 active:text-red-500 transition duration-300 transform hover:scale-110 active:scale-95"
                    >
                        Admin
                    </a>
                </li>
                <li>
                    <a
                        href="/admin-summary"
                        className="text-white hover:text-gray-300 active:text-red-500 transition duration-300 transform hover:scale-110 active:scale-95"
                    >
                        Admin Summary
                    </a>
                </li>
            </ul>
        </nav>
    );
}
export default Navbar;