import Link from "next/link";
import Image from "next/image";
import logoImg from "../../assests/logo1.png";
import classes from "./main-header.module.css";


export default function MainHeader() {

    
    return (
        <header className={classes.header}>
            <Link className={classes.logo} href="/">
            <Image src={logoImg} alt="Blog Logo" priority/>
            <span>BLOGIFY</span>
            </Link>

            <nav className={classes.nav}>
                <ul>
                    <li>
                        <Link className={classes.link} href="/posts">Posts</Link>
                    </li>
                    
                </ul>
            </nav>
        </header>
    );
}