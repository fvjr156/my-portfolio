import type React from "react";

export type ImageLink = string;
export type ResourceLink = string;
export type TagsType = string[];

export type AosData = {
  animType: string;
  animdelay: number;
  animDuration: number;
  once: boolean;
};

export type GradientStyleProps = {
  backgroundImage?: string;
  backgroundSize?: string;
  WebkitBackgroundClip?: string;
  backgroundClip?: string;
  WebkitTextFillColor?: string;
};

export type TypeCertificateItem = {
  name: string;
  certpreviewimg: ImageLink;
  logo: ImageLink;
  institution: string;
  date: string;
  certlink: ImageLink;
  tags: TagsType;
  contain?: boolean;
};

export type TypeContactInfo = {
  logo: ImageLink;
  name: string;
  link: ResourceLink;
};

export type TypeEducationItem = {
  school: string;
  image: ImageLink;
  location: string;
  course: string;
  from: string;
  to: string;
};

export type TypeFooter = {
  copyr: string;
};

export type TypeProjects = {
  title: string;
  description: string;
  image: ImageLink;
  logo: ImageLink;
  github: ResourceLink;
};

export type TypeProjectsPageData = {
  _id: string;
  title: string;
  description: string;
  image: ImageLink;
  logo: ImageLink;
  github: ResourceLink;
  projectSlideshow: string[];
  projectDesc: string[];
  linkables: {
    app: string;
    link: string;
  }[];
};

export type TypePortfolio = {
  name: string;
  heroavatar: ImageLink;
  herodesc: string;
  intro: string;
  projects: TypeProjects[];
  personalProjects: TypeProjects[];
  aboutInfo: {
    residence: string;
    education: TypeEducationItem[];
  };
  certifications: TypeCertificateItem[];
  contactinformation: TypeContactInfo[];
  footerInfo: TypeFooter;
};

export type AccordionProps = {
  open: boolean;
  children: React.ReactNode;
  styles: React.CSSProperties;
  aosData: AosData;
};

export type BtnThemeToggleProps = {
  theme: string | null;
  setTheme: React.Dispatch<React.SetStateAction<string | null>>;
};

export type ProjectsPageProps = {
  projects: TypeProjectsPageData[];
  theme: string | null;
  setTheme: React.Dispatch<React.SetStateAction<string | null>>;
};

export type CertificatesProps = {
  data: TypeCertificateItem[];
  id: string;
};

export type ContactProps = {
  data: TypeContactInfo[];
  id: string;
};

export type EducationItemProps = {
  data: TypeEducationItem;
  index: number;
};

export type HeroProps = {
  data: TypePortfolio;
  isScrolled: boolean;
  theme: string;
  id?: string;
};

export type ParticlesProps = {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleColors?: string[];
  moveParticlesOnHover?: boolean;
  particleHoverFactor?: number;
  alphaParticles?: boolean;
  particleBaseSize?: number;
  sizeRandomness?: number;
  cameraDistance?: number;
  disableRotation?: boolean;
  pixelRatio?: number;
  className?: string;
};

export type PortfolioSection = {
  type?: "hr";
  Component: React.ComponentType<any>;
  props?: Record<string, any>;
  layoutProps?: Record<string, any>;
};

export type ProjectsProps = {
  data: Record<string, any>;
  header: string;
  id?: string;
  projectIconBarShowTriggerRef: any;
  selectedIndex: number;
};

export type ShinyTextProps = {
  children: React.ReactNode;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  yoyo?: boolean;
  pauseOnHover?: boolean;
  direction?: string;
  delay?: number;
};

export type ToolbarProps = {
  visible: boolean;
  theme: string | null;
  setTheme: React.Dispatch<React.SetStateAction<any>>;
};

export type XCenteredLayoutProps = {
  children: React.ReactNode;
  herobg?: boolean;
  particles?: boolean;
};
