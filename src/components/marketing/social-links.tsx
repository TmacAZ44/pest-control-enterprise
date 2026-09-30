import { company } from "@/lib/company";

const profiles = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    path: "M14.5 8.5h2.2V6h-2.2C12.3 6 11 7.4 11 9.5V11H9v2.5h2V20h2.6v-6.5h2.1l.3-2.5h-2.4V9.6c0-.4.3-.6.7-.6z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    path: "M6.7 9.2H4.2V19h2.5V9.2zM5.4 4.8A1.5 1.5 0 1 0 5.4 7.8 1.5 1.5 0 0 0 5.4 4.8zM19.8 19h-2.5v-4.8c0-1.2-.4-2-1.5-2-1.1 0-1.7.8-1.7 2V19h-2.5V9.2h2.4v1.3c.4-.7 1.3-1.6 2.8-1.6 2 0 3.5 1.3 3.5 4.1V19z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    path: "M12 8.2A3.8 3.8 0 1 0 12 15.8 3.8 3.8 0 0 0 12 8.2zm0 6.2a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8zM16.4 7.7a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0zM17.8 5H6.2A2.2 2.2 0 0 0 4 7.2v10.6A2.2 2.2 0 0 0 6.2 20h11.6a2.2 2.2 0 0 0 2.2-2.2V7.2A2.2 2.2 0 0 0 17.8 5zm.8 12.8a.8.8 0 0 1-.8.8H6.2a.8.8 0 0 1-.8-.8V7.2a.8.8 0 0 1 .8-.8h11.6a.8.8 0 0 1 .8.8v10.6z",
  },
];

export function SocialLinks() {
  return (
    <div>
      <p className="text-sm font-semibold tracking-[0.14em] text-brand uppercase">Follow Us</p>
      <ul className="mt-3 flex gap-3">
        {profiles.map((profile) => (
          <li key={profile.label}>
            <a
              href={profile.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${company.name} on ${profile.label}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-brand text-white transition-colors duration-200 hover:bg-brand-strong"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d={profile.path} />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
