export default function App() {
  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      <main className="relative">
        {/* Section placeholders — implemented in subsequent issues */}
        <section
          id="hero"
          aria-label="The Sky"
          className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-b from-sky-dawn via-sky-rose to-sky-haze"
        >
          <div className="px-6 text-center">
            <h1 className="font-display text-4xl text-white/90 md:text-6xl">
              Selva Viva Expeditions
            </h1>
            <p className="mt-4 font-sans text-lg text-white/70">
              Where the river remembers your name.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
