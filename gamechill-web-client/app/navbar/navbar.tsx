import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
    return(
        <nav className={styles.nav}>
            <Link style={{textDecoration: 'none'}}href="/">
                <div className={styles.logoContainer}>
                    <Image 
                        width={70} 
                        height={70}
                        src="/gamechill-logo.png" 
                        quality={100} 
                        alt="GameChill Logo" 
                    />
                    <p className={styles.logoText}>GameChill</p>
                </div>
            </Link>
        </nav>
    )
}