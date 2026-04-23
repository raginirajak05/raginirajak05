import { profile } from "@/data/resume";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-navy-950 py-10 mt-24">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <span>
          &copy; {year} {profile.name} — Built with Next.js & TailwindCSS
        </span>
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-teal transition-colors"
          >
            {profile.email}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal transition-colors"
          >
            LinkedIn
          </a>
          <span>{profile.phone}</span>
        </div>
      </div>
    </footer>
  );
}
