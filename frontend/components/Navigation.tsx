import { Navbar, NavbarBrand } from "@heroui/navbar";
import Link from "next/link";

const Navigation = () => {
    return (
        <Navbar className="bg-black h-20">
            <NavbarBrand>
                <Link href="/">
                    <h1 className="font-bold text-white text-4xl text-inherit">Frihedsbrevet</h1>
                </Link>
            </NavbarBrand>
        </Navbar>)
}

export default Navigation;