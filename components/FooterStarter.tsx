/**
 * 🦶 FOOTER STARTER - Footer minimal pentru cursanți
 *
 * Footer simplu cu copyright.
 * Fără rețele sociale, fără linkuri complexe.
 */

export default function FooterStarter() {
  return (
    <footer id="footer" className="bg-gray-900 text-white py-8">
      <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
        <p className="text-gray-400">
          © 2026 Vibe Caffè. Construit cu Next.js + Tailwind CSS.
        </p>
        <a href="/admin" className="text-gray-700 hover:text-gray-500 text-xs transition-colors">
          admin
        </a>
      </div>
    </footer>
  );
}
