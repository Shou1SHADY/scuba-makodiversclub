"use client";

import { usePathname } from "next/navigation";
import { VisualEditsMessenger } from "orchids-visual-edits";

export const VisualEditsWrapper = () => {
    const pathname = usePathname();

    // Hide visual editor on admin pages to keep the management UI clean
    if (pathname?.startsWith('/admin')) {
        return null;
    }

    return <VisualEditsMessenger />;
};
