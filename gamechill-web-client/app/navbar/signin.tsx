//interactivity handler, since next component's are server side
//but things like onclick are clientside
'use client';
import { Fragment } from "react";
import { signInWithGoogle, signOutWithGoogle } from "../utilities/firebase";
import { User } from "firebase/auth";
import styles from './signin.module.css';

interface SignInProps {
    user: User | null;
}

export default function SignIn({ user }: SignInProps) {
    return (
        <Fragment>
            { user?
            (
                <button className={styles.signButtons} onClick={signOutWithGoogle}>
                    Sign Out
                </button>
            ) :
            (
                <button className={styles.signButtons} onClick={signInWithGoogle}>
                    Sign In
                </button>
            )
            }
        </Fragment>
    )
}