'use client';

import { useState } from "react";

export default function PermissionCheckbox({ checked, onChange, displayName }) {
    const [checked2, setChecked] = useState(false);

    return (
        <div style={{ display: 'flex' }}>
            <input type='checkbox' checked={checked} onChange={onChange} readOnly={typeof onChange !== "function"} />
            <p>{displayName}</p>
        </div>
    )
}