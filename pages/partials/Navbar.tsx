// Navbar for the top of pages

import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

export default function Navbar() {
    const router = useRouter();
    const {user} = router.query;

    return (
        <div className="navbar">
            <Link href="/">
                <a>Home</a>
            </Link>
            <Link href="/conversation/[user]" as={`/conversation/${user}`}>
                <a>Conversation</a>
            </Link>
            <Link href="/about">
                <a>About</a>
            </Link>
        </div>
    );
}