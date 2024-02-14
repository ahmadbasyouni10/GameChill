'use client';
import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";
import SignIn from "./signin";
import { onAuthStateChangedHelper } from "../utilities/firebase";
import { useEffect, useState } from 'react';
import { unsubscribe } from "diagnostics_channel";
import { User } from "firebase/auth";

/*State determined within parent Navbar, so can be used for
sign button and Upload Button. 2 hooks used function hook
useState null init. so give type explicitly
*/
export default function Navbar() {
    //Defines state var. which will have current user using hook
    const [user, setUser] = useState< User | null >(null);
    
    //Another hook subscribed to onAuthStateChangedHelper
    //When authenticationState changes, updates state var with user
    useEffect(() => {
        const unsubscribe = onAuthStateChangedHelper((user)=>{ 
            setUser(user);
        });

        //Avoid memory leak
        return () => unsubscribe();


    });

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
            <SignIn user = {user} />
        </nav>
    )
}