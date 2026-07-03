import Link from "next/link";

const pages = [
  {
    href: "/identity",
    title: "Identity",
    description: "Fetch real Entra ID admin role assignments from Microsoft Graph.",
  },
  {
    href: "/tenants",
    title: "Tenants",
    description: "Fetch real delegated customer tenants from Azure Lighthouse.",
  },
  {
    href: "/security",
    title: "Security",
    description: "Fetch real Defender alerts and secure score from Microsoft Graph.",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-10">
      <h1 className="text-3xl font-semibold">Partner Portal</h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        Configure TENANT_ID, CLIENT_ID, and CLIENT_SECRET in .env.local, then open a page below.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="rounded-lg border border-gray-300 p-4 transition hover:border-blue-500"
          >
            <h2 className="text-lg font-medium">{page.title}</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{page.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
