import { useEffect, useRef, useState } from "react";
import Toolbar from "../components/Toolbar";
import BtnBackToTop from "../components/BtnBackToTop";
import data from "../data/portfolio.json";
import Footer from "../components/Footer";
import XCenteredLayout from "../components/XCenteredLayout";
import Hero from "../components/Hero";
import Certificates from "../components/Certificates";
import { HR } from "../components/Lines";
import "../styles/App.css";
import Contact from "../components/Contact";
import { Projects, ProjectsIconBar } from "../components/Projects";
import { useInView } from "framer-motion";
import { Bounce, ToastContainer, type Theme } from "react-toastify";
import Education from "../components/Education";
import type { BtnThemeToggleProps, PortfolioSection } from "../types/Types";

export default function MainPage({theme, setTheme}: BtnThemeToggleProps) {
  const [floatingUIComponents, setFloatingUIComponents] =
    useState<boolean>(false);

  const projectIconBarShowTriggerRef = useRef<Element>(null);
  const projectIconBarShowTriggerRefInView = useInView(
    projectIconBarShowTriggerRef,
    { once: false },
  );
  const personalProjectIconBarShowTriggerRef = useRef<Element>(null);
  const personalProjectIconBarShowTriggerRefInView = useInView(
    personalProjectIconBarShowTriggerRef,
    { once: false },
  );

  const [projectsIndex, setProjectsIndex] = useState(0);
  const [personalProjectsIndex, setPersonalProjectsIndex] = useState(0);
  const activeSection = projectIconBarShowTriggerRefInView
    ? "projects"
    : personalProjectIconBarShowTriggerRefInView
      ? "personal"
      : null;

  useEffect(() => {
    document.title = "FVJ Portfolio";
  }, []);

  useEffect(() => {
    const onScroll: () => void = () =>
      setFloatingUIComponents(window.scrollY > 120);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const projectsData = [...data.projects, ...data.personalProjects].filter((item) => item.star);

  const portfolioSections: PortfolioSection[] = [
    {
      Component: Hero,
      props: { isScrolled: floatingUIComponents, data, theme, id: "home" },
      layoutProps: { herobg: true },
    },
    {
      Component: Projects,
      props: {
        data: projectsData,
        header: "Projects",
        id: "projects",
        projectIconBarShowTriggerRef,
        selectedIndex: projectsIndex,
      },
    },
    // {
    //   Component: Projects,
    //   props: {
    //     data: data.personalProjects,
    //     header: "Personal Projects",
    //     id: "personalprojects",
    //     projectIconBarShowTriggerRef: personalProjectIconBarShowTriggerRef,
    //     selectedIndex: personalProjectsIndex,
    //   },
    // },
    { Component: HR, type: "hr" },
    {
      Component: Education,
      props: {
        data: data.aboutInfo.education,
        id: "education",
      },
    },
    { Component: HR, type: "hr" },
    {
      Component: Certificates,
      props: { data: data.aboutInfo.certifications, id: "certificates" },
    },
    { Component: HR, type: "hr" },
    {
      Component: Contact,
      props: { id: "contact", data: data.contactinformation },
      layoutProps: { particles: theme === "dark" },
    },
  ];

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme as Theme}
        transition={Bounce}
      />
      <Toolbar
        visible={floatingUIComponents}
        theme={theme}
        setTheme={setTheme}
      />
      <main className="min-h-screen bg-background default-transition text-text font-display">
        {portfolioSections.map((s, i) => {
          if (s.type === "hr") return <HR key={i} className="bg-transparent" />;
          const { Component, props, layoutProps } = s;
          return (
            <XCenteredLayout {...layoutProps}>
              <Component {...props} />
            </XCenteredLayout>
          );
        })}
      </main>
      <BtnBackToTop visible={floatingUIComponents} />
      <Footer data={data.footerinfo} />
      <ProjectsIconBar
        data={projectsData}
        selectedIndex={
          activeSection === "projects" ? projectsIndex : personalProjectsIndex
        }
        onSelect={
          activeSection === "projects"
            ? setProjectsIndex
            : setPersonalProjectsIndex
        }
        visible={!!activeSection}
      />
    </>
  );
}