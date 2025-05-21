import { SectionCards } from "@components/section-cards";

export default function HomePage() {
  return (
    <main className="mt-4">
      <div className="container">
        <h1 className="text-3xl font-bold tracking-tight hidden lg:block">
          Welcome
        </h1>

        <div className="my-2 h-1 bg-muted" />
        <h2 className="text-2xl font-bold tracking-tight">Features</h2>

        <ul className="mt-4 grid grid-cols-2 gap-2">
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            User in Client Components
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            User in Server Components
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Credentials Provider
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Protect Pages
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Signout
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Google OAuth Provider
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Github OAuth Provider
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Auth.js Drizzle Adapter
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Extend Session Information
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Auth.js Extend Types
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Auth.js Session Events
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Update Session (Client)
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Auth.js Session Callbacks
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Custom errors
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Account Linking
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Middleware
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            User Roles
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Admin Dashboard
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Email Verification
          </li>
          <li className="line-clamp-1 break-all p-2 shadow hover:bg-muted">
            Password Reset
          </li>
        </ul>

        <div className="my-2 h-1 bg-muted" />
        <h2 className="text-2xl font-bold tracking-tight">Createdd With</h2>

        <ul className="mt-4 grid grid-cols-4 gap-2">
          <li className="p-2 shadow hover:bg-muted">Next.js</li>
          <li className="p-2 shadow hover:bg-muted">Tailwind</li>
          <li className="p-2 shadow hover:bg-muted">shadcn/ui</li>
          <li className="p-2 shadow hover:bg-muted">Auth.js</li>
          <li className="p-2 shadow hover:bg-muted">Drizzle ORM</li>
          <li className="p-2 shadow hover:bg-muted">NeonDB</li>
          <li className="p-2 shadow hover:bg-muted">PostgreSQL</li>
          <li className="p-2 shadow hover:bg-muted">Valibot</li>
          <li className="p-2 shadow hover:bg-muted">TypeScript</li>
        </ul>
      </div>

      <div className="mt-16">
        <div className="md:border-l md:border-zinc-100 md:pl-6">
          <div className="-mx-4 flex max-w-3xl flex-col space-y-4 md:mx-0">
            <article className="md:grid md:grid-cols-4 md:items-baseline">
              <div className="relative flex flex-col items-start rounded-2xl px-4 py-6 hover:bg-zinc-200/70">
                <h2 className="text-base font-semibold tracking-tight text-zinc-800">
                  <a href="#">
                    <span className="absolute inset-0 bg-pink-400/25 z-10">
                      Crafting a design system
                    </span>
                  </a>
                </h2>
                <time className="relative order-first mb-3 flex items-center pl-3.5 text-sm text-zinc-400 md:hidden">
                  <span className="absolute inset-y-0 left-0 flex items-center">
                    September 5, 2022
                  </span>
                </time>
                <p className="mt-2 text-sm text-zinc-600">
                  Most companies try to stay ahead of the curve
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}

// abolute class will make the element position closest to the ancestor with a relative position
// to make sure that information doesnt leak out and interfere with other z positioned elements on the page we can put isolate on the containing div which scopes the z index and makes it local 
// z is used for layering 