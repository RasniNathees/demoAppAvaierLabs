import type { ReactNode } from "react"
import TopBar from "./global/topbar"

interface  LayoutProps {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="admin-layout">
            {/* <div className="lg:hidden">mobile topbar</div> */}
            <div className="w-screen block">
                <TopBar />
            </div>
            <div className="flex flex-col bg-[var(--light)] lg:w-screen">
                
                <aside className="children">
                    <div className="mx-4">
                        {children}
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Layout