import { Menu, Bell, UserCircle } from "lucide-react";

function Navbar({ onMenuClick }) {
  return (
    <header className="fixed top-0 right-0 left-0 z-40 h-16 border-b border-slate-200 bg-white">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <div>
            <h1 className="text-lg font-semibold text-slate-800">
              EHR Dashboard
            </h1>

            <p className="hidden text-xs text-slate-500 sm:block">
              Electronic Health Records
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 md:gap-4 cursor-pointer">
          {/* Notification */}
          <button
            className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell size={21} />

            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* User */}
          <div className="flex items-center gap-2">
            <UserCircle size={34} className="text-slate-500 cursor-pointer" />

            <div className="hidden md:block cursor-pointer">
              <p className="text-sm font-medium text-slate-700">Dr. Admin</p>

              <p className="text-xs text-slate-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
