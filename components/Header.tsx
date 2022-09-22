import Link from "next/link";
import React from "react";

function Header() {
    return (
        <header className="flex justify-between p-5 max-w-7xl mx-auto">
            <div className="flex space-x-4 items-center">
                <Link href="/">
                    <img
                        className="w-44 object-contain cursor-pointer"
                        src="https://links.papareact.com/yvf"
                        alt=""
                    />
                </Link>

                <div className="flex items-center space-x-4 hidden md:inline-flex">
                    <h3>About</h3>
                    <h3>Contact</h3>
                    <h3 className="text-white bg-green-600 px-4 py-1 rounded-full">
                        Follow
                    </h3>
                </div>
            </div>
            <div className="flex space-x-5 text-green-600 items-center">
                <h3>Sign In</h3>
                <h3 className="border px-4 py-1 border-green-600 rounded-full">
                    Get Started
                </h3>
            </div>
        </header>
    );
}

export default Header;
