'use client'

import './navigation.component.scss';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation({ payload }) {
    const pathname = usePathname();

    const isActive = (href) => pathname === href;

    return (
        <nav className='navigation'>
            <div className='navigation-head'>
                <div className='navigation-user-profile'></div>
                <div className='navigation-user'>
                    <p className='navigation-username'>{payload.name}</p>
                    <p className='navigation-role'>{payload.role}</p>
                </div>
            </div>

            <div className='navigation-section'>
                <div className='navigation-section-head'>
                    <p className='navigation-section-name'>Mein Bereich</p>
                    <button className='navigation-section-action'>
                        <span className="material-symbols-outlined">keyboard_arrow_down</span>
                    </button>
                </div>
                <div className='navigation-section-items'>
                    <Link href='/' className={isActive('/') ? 'navigation-item active' : 'navigation-item'}>
                        <span className="material-symbols-outlined">home</span>
                        Home
                    </Link>
                    <Link href='/dashboard' className={isActive('/dashboard') ? 'navigation-item active' : 'navigation-item'}>
                        <span className="material-symbols-outlined">dashboard</span>
                        Dashboard
                    </Link>
                    <Link href='/absences' className='navigation-item'>
                        <span className="material-symbols-outlined">home</span>
                        Abwesenheiten
                    </Link>
                </div>
            </div>

        </nav>
    );
}