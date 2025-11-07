import { Briefcase } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-gray-700" strokeWidth={1.5} />
            <h1 className="text-lg font-semibold text-gray-900">Interno</h1>
          </div>
          <div className="text-sm text-gray-500">
            Internship Tracker
          </div>
        </div>
      </div>
    </header>
  );
}
