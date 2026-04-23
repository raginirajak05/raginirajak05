import { profile } from "@/data/resume";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* Gradient top border */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-brand-purple to-brand-pink" />

      <div className="bg-navy-950 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* CTA block */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-16">
            <div>
              <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-white mb-4 leading-tight">
                Let&apos;s build something.
              </h2>
              <a
                href={`mailto:${profile.email}`}
                className="font-label text-lg md:text-xl text-[#00C9B1] hover:text-[#00C9B1]/80 transition-colors font-medium"
              >
                {profile.email} ↗
              </a>
              <p className="text-[#71717A] text-sm mt-2">{profile.phone}</p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-white font-label text-sm font-semibold hover:border-brand-purple/50 hover:bg-brand-purple/5 transition-all"
              >
                LinkedIn ↗
              </a>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00C9B1] animate-pulse" />
                <span className="font-label text-xs text-[#00C9B1] font-medium">
                  {profile.visaStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="font-label text-xs text-[#71717A]">
              &copy; {year} {profile.name} · Berlin, Germany
            </span>
            <span className="font-label text-xs text-[#71717A]">
              Built with Next.js &amp; Tailwind
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

