'use client';
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../assets/logo1.png";
import classes from "./main-header.module.css";
import { usePathname } from "next/navigation";


export default function MainHeader() {

    const path = usePathname();
    
    return (
        <header className={classes.header}>
            <Link className={classes.logo} href="/">
            <Image src={logoImg} alt="Blog Logo" priority/>
            <span>BLOGIFY</span>
            </Link>

            <nav className={classes.nav}>
                <ul>
                    <li>
                        <Link className={path.startsWith("/posts") ? `${classes.active} ${classes.link}` 
        : classes.link} href="/posts">Posts</Link>
                    </li>
                    
                </ul>
            </nav>
        </header>
    );
}