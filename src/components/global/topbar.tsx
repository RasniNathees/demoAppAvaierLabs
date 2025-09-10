import { Search, HelpCircle, Bell } from "lucide-react";

const TopBar = () => {
    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">DemoApp</h1>
                <div className="flex items-center space-x-4">
                    <Search className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                    <HelpCircle className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                    <Bell className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                </div>
            </div>
        </header>
    )
}

export default TopBar
