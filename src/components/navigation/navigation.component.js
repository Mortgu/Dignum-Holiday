import styles from './navigation.module.scss';
import LinkComponent from "next/dist/client/app-dir/link";
import Link from "next/link";

export default function Navigation() {
    return (
        <nav className={styles.navigation}>
            <div className={styles.navigation_item_group}>
                <div className={styles.navigation_item_group_header}>
                    <p>Abwesenheiten</p>
                    <button><span className="material-symbols-outlined">keyboard_arrow_down</span></button>
                </div>
                <div className={styles.navigation_items}>
                    <Link href='/'>
                        <span className="material-symbols-outlined">dashboard</span>
                        Dashboard</Link>
                    <Link href='/dashboard'>
                        <span className="material-symbols-outlined">dashboard</span>
                        Übersicht</Link>
                    <Link href='/freigaben'>
                        <span className="material-symbols-outlined">dashboard</span>
                        Freigaben</Link>
                </div>
            </div>
        </nav>
    );
}