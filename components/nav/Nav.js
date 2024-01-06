export default function Nav({ children }) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10 font-light tracking-tight uppercase mx-auto lg:mt-4">
        <header className="relative mb-4">
          <div className="bg-transparent w-full h-[10vh] md:h-0 -mb-[9.5vh] md:-mb-0"></div>
          <nav aria-label="Top" className="mx-auto flex">
            {children}
          </nav>
        </header>
      </div>
    </>
  );
}
