

export default function HomeApp() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#071821] via-[#0a2332] to-[#071821] relative overflow-hidden">
      {/* floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>

        <div
          className="absolute top-1/2 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div
          className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* particle texture */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(6, 182, 212, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* navigation */}
        <nav className="w-full py-6 px-6 bg-black/20 backdrop-blur-md border-b border-cyan-500/20">
          <h2 className="text-center text-cyan-400 text-xl font-semibold">
            Navigation menu
          </h2>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl font-bold text-cyan-300 mb-4">
            Hero Section
          </h1>
          <p className="text-gray-300">
            This is where the main headline and welcome message go.
          </p>
        </section>

        {/* Map Preview */}
        <section className="container mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4">
            Map Preview
          </h2>
          <div className="w-full h-64 bg-black/30 rounded-xl border border-cyan-500/20"></div>
        </section>

        {/* My Stats */}
        <section className="container mx-auto px-6 py-12">
          <h2 className="text-2xl text-cyan-300 font-semibold mb-4">
            My Stats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-6 bg-black/30 rounded-xl border border-cyan-500/20">
              Stat 1
            </div>
            <div className="p-6 bg-black/30 rounded-xl border border-cyan-500/20">
              Stat 2
            </div>
            <div className="p-6 bg-black/30 rounded-xl border border-cyan-500/20">
              Stat 3
            </div>
            <div className="p-6 bg-black/30 rounded-xl border border-cyan-500/20">
              Stat 4
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="container mx-auto px-6 py-12">
          <h2 className="text-2xl text-cyan-300 font-semibold mb-4">
            Impact Metrics
          </h2>
          <div className="w-full h-40 bg-black/30 rounded-xl border border-cyan-500/20"></div>
        </section>

        {/* Saved Items */}
        <section className="container mx-auto px-6 py-12">
          <h2 className="text-2xl text-cyan-300 font-semibold mb-4">
            Saved Items
          </h2>
          <div className="w-full h-40 bg-black/30 rounded-xl border border-cyan-500/20"></div>
        </section>

        {/* Learning Modules */}
        <section className="container mx-auto px-6 py-12">
          <h2 className="text-2xl text-cyan-300 font-semibold mb-4">
            Saved Items
          </h2>
          <div className="w-full h-40 bg-black/30 rounded-xl border border-cyan-500/20"></div>
        </section>

        {/* Education Portal */}
        <section className="container mx-auto px-6 py-12">
          <h2 className="text-2xl text-cyan-300 font-semibold mb-4">
            Saved Items
          </h2>
          <div className="w-full h-40 bg-black/30 rounded-xl border border-cyan-500/20"></div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 mt-16 border-t border-cyan-500/20">
          <div className="text-center text-gray-500">
            <p className="mb-2">
              OceanIQ - Exploring the depths, preserving the future
            </p>
            <p className="text-sm">
              © 2025 OceanIQ. Marine conservation through education.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
