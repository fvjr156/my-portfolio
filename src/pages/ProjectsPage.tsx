import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronRight, Folder } from "react-feather";
import type { ProjectsPageProps } from "../types/Types";
import BtnThemeToggle from "../components/BtnThemeToggle";

export default function ProjectsPage({
  projects,
  theme,
  setTheme,
}: ProjectsPageProps) {
  const [searchParams] = useSearchParams();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const itemToHighlight = searchParams.get("showcase");
    if (itemToHighlight) {
      const idx = projects.findIndex((item) => item._id === itemToHighlight);
      if (idx !== -1) setSelectedIndex(idx);
    }
  }, [searchParams, projects]);

  return (
    <main className="overflow-clip min-h-screen font-display flex items-center justify-center bg-background text-text p-6 lg:p-12 transition-colors duration-500">
      <div
        data-aos="fade-up"
        className="flex flex-col md:flex-row w-full max-w-6xl h-[90vh] md:h-[85vh] bg-secondary/5 backdrop-blur-sm border border-accent/80 rounded-2xl overflow-hidden shadow-2xl"
      >
        <aside className="w-full md:w-[35%] h-90 md:h-full flex flex-col border-b md:border-b-0 md:border-r border-accent/80 bg-background/50">
          <div className="flex flex-row justify-between border-b border-accent/80 p-5">
            <div className="font-hero">
              <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
              <p className="text-xs opacity-50 uppercase tracking-widest mt-1">
                Select to view details
              </p>
            </div>
            <div className="p-0 self-center align-middle justify-center h-full">
              <BtnThemeToggle theme={theme} setTheme={setTheme} />
            </div>
          </div>

          <div className="md:overflow-y-auto flex-1 overflow-y-scroll">
            {projects.map((item, key) => (
              <button
                key={key}
                onClick={() => setSelectedIndex(key)}
                className={`w-full text-left p-5 transition-all duration-300 flex items-center gap-4 group
                  ${
                    selectedIndex === key
                      ? "bg-accent/10 border-r-4 border-r-accent"
                      : "hover:bg-accent/5 border-r-4 border-r-transparent"
                  }`}
              >
                <div
                  className={`p-2 rounded-lg transition-colors ${selectedIndex === key ? "bg-accent text-background" : "bg-accent/30"}`}
                >
                  <Folder size={18} />
                </div>

                <div className="flex-1 overflow-hidden font-hero">
                  <h3
                    className={`text-lg font-semibold truncate ${selectedIndex === key ? "text-accent" : "text-text"}`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm opacity-60 truncate mt-0">
                    {item.description}
                  </p>
                </div>

                <ChevronRight
                  size={16}
                  className={`transition-transform duration-300 ${selectedIndex === key ? "translate-x-1 opacity-100" : "opacity-0 group-hover:opacity-40"}`}
                />
              </button>
            ))}
          </div>
        </aside>

        <section className="flex-1 bg-background/30 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 p-8 lg:p-12 h-full overflow-y-auto">
            <div
              key={selectedIndex}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-6 font-hero">
                {projects[selectedIndex].title}
              </h1>
              <div className="h-1 w-full bg-accent rounded-full mb-8" />

              <p className="text-md leading-relaxed max-w-2xl">
                <b>Description:</b> {projects[selectedIndex].description}
              </p>

              {projects[selectedIndex].projectDesc && (
                <ul className="list-disc list-inside mt-5">
                  {projects[selectedIndex].projectDesc.map((item, key) => (
                    <li key={key} className="mb-1">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-80 italic">
                <div className="border-2 border-dashed border-accent/70 rounded-xl h-40 flex items-center justify-center overflow-hidden">
                  <img
                    src="/my-portfolio/demos/underconst.png"
                    alt="Under construction."
                  />
                </div>
                <div className="border-2 border-dashed border-accent/70 rounded-xl h-40 flex items-center justify-center overflow-hidden">
                  Under construction.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="fixed bottom-0 right-0 m-5"></div>
    </main>
  );
}
