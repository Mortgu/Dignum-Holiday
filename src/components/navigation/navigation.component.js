'use client';

import './navigation.component.scss';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation({ payload }) {
    const pathname = usePathname();

    const isActive = (href) => pathname.includes(href);

    return (
        <nav className='navigation'>
            <div className='navigation-head'>
                <div className='navigation-user-profile'></div>
                <div className='navigation-user'>
                    <p className='navigation-username'>{payload.firstName} {payload.lastName}</p>
                    <p className='navigation-role'>{payload.role.name}</p>
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
                    <Link href='/home' className={isActive('/home') ? 'navigation-item active' : 'navigation-item'}>
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

            <div className='navigation-section'>
                <div className='navigation-section-head'>
                    <p className='navigation-section-name'>Administration</p>
                    <button className='navigation-section-action'>
                        <span className="material-symbols-outlined">keyboard_arrow_down</span>
                    </button>
                </div>
                <div className='navigation-section-items'>
                    <Link href='/settings' className={isActive('/settings') ? 'navigation-item active' : 'navigation-item'}>
                        <span className="material-symbols-outlined">settings</span>
                        Settings
                    </Link>
                </div>
            </div>

        </nav>
    );
}