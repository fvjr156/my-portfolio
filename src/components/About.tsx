import { GalleryImage, type GalleryImagesProps } from "./ImagesComponents";
import { HR } from "./Lines";
import { getAge } from "./utils";

type AboutMeData = {
  portrait1: string;
  portrait2: string;
  portrait3: string;
  intro: string[];
  facts: {
    label: string;
    value: string;
  }[];
};

type WorkExperienceItem = {
  role: string;
  company: string;
  location: string;
  from: string;
  to: string;
  description: string;
};

type SkillCategory = {
  category: string;
  items: string[];
};

type AboutData = {
  aboutMe: AboutMeData;
  workExperience: WorkExperienceItem[];
  skills: SkillCategory[];
};

type AboutProps = {
  data: AboutData;
  id?: string;
};

export default function About({ data, id = "about" }: AboutProps) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 mb-10" id={id}>
      <AboutMeSection data={data.aboutMe} />
      <HR />
      <WorkExperienceSection data={data.workExperience} />
      <HR />
      <SkillsSection data={data.skills} />
      <HR />
    </div>
  );
}

function AboutMeSection({ data }: { data: AboutMeData }) {
  return (
    <section>
      <h1 className="text-2xl font-bold font-hero sm:text-4xl mb-8 sm:mb-10 text-center">
        About Me
      </h1>

      <div
        data-aos="fade-up"
        data-aos-duration="300"
        data-aos-once="true"
        className="
          flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start
          rounded-2xl border border-accent/80
          bg-card/60 backdrop-blur-sm
          shadow-sm
          p-5 sm:p-6
        "
      >
        <div className="flex flex-col gap-2 md:gap-3 max-w-50 sm:max-w-60 md:max-w-70">
            {[
            {src: data.portrait1, alt: "Gallery Image 1"},
            {src: data.portrait2, alt: "Gallery Image 2"},
            {src: data.portrait3, alt: "Gallery Image 3"}
         ].map((img: GalleryImagesProps, key) => (
          <GalleryImage key={img.alt} src={img.src} alt={img.alt} index={key} />
        ))}
        </div>

        <div className="flex-1 flex flex-col gap-4">
          {data.intro.map((para, i) => (
            <p
              key={i}
              className="text-sm sm:text-base leading-relaxed text-text/80"
            >
              {para
                .replaceAll("$year$", getAge("1-5-2006").toString())
                .replaceAll("$indent$", "\u00A0".repeat(8))}
            </p>
          ))}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {data.facts.map((fact, i) => (
              <div
                key={i}
                data-aos="flip-up"
                data-aos-delay={(i + 1) * 100}
                data-aos-once="true"
                className="
                  rounded-lg border border-accent/40
                  bg-background/40
                  px-4 py-3
                "
              >
                <p className="text-xs uppercase tracking-widest text-accent">
                  {fact.label}
                </p>
                <p className="text-sm font-medium mt-1">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkExperienceSection({ data }: { data: WorkExperienceItem[] }) {
  return (
    <section>
      <h1 className="text-2xl font-bold font-hero sm:text-4xl mb-8 sm:mb-10 text-center">
        Work Experience
      </h1>

      <div
        className="
          relative bg-background default-transition
          after:content-['']
          after:absolute
          after:top-0
          after:bottom-0
          after:left-8
          after:w-1
          after:bg-accent
          md:after:left-1/2
          md:after:-translate-x-1/2
        "
      >
        {data.map((item, index) => (
          <ExperienceItem key={index} data={item} index={index} />
        ))}
      </div>
    </section>
  );
}

function ExperienceItem({
  data,
  index,
}: {
  data: WorkExperienceItem;
  index: number;
}) {
  const left = index % 2 === 0;

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="300"
      data-aos-once="true"
      data-aos-delay={(index + 1) * 250}
      className={`
        relative mb-12 flex flex-col
        md:w-1/2
        ${left ? "md:pr-14 md:mr-auto" : "md:pl-14 md:ml-auto"}
        pl-20 md:pl-0
      `}
    >
      <div
        className={`
          absolute top-6 left-6
          w-5 h-5 rounded-full
          bg-accent border-4 border-background
          z-10
          ${left ? "md:-right-2.5 md:left-auto" : "md:-left-2.5"}
        `}
      />

      <div
        className="
          rounded-2xl border border-accent/80 hover:-translate-y-1 hover:drop-shadow-accent/50 hover:drop-shadow-lg transition-all duration-300 ease-in-circ
          bg-card/60 backdrop-blur-sm
          shadow-sm
          p-5 sm:p-6
        "
      >
        <h2 className="text-lg sm:text-xl font-semibold font-hero">
          {data.role}
        </h2>

        <p className="text-sm opacity-80 mt-0.5">
          {data.company} · {data.location}
        </p>

        <p className="text-sm mt-1 text-accent font-medium">
          {data.from} — {data.to}
        </p>

        <p className="text-sm mt-3 leading-relaxed text-text/80">
          {data.description}
        </p>
      </div>
    </div>
  );
}

function SkillsSection({ data }: { data: SkillCategory[] }) {
  return (
    <section>
      <h1 className="text-2xl font-bold font-hero sm:text-4xl mb-8 sm:mb-10 text-center">
        Skills
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.map((category, index) => (
          <div
            key={category.category}
            data-aos="fade-up"
            data-aos-duration="300"
            data-aos-once="true"
            data-aos-delay={index * 100}
            className="
              rounded-2xl border border-accent/60
              bg-card/60 backdrop-blur-sm
              shadow-sm
              p-5 sm:p-6
              hover:-translate-y-1 hover:drop-shadow-accent/50 hover:drop-shadow-lg
              transition-all duration-300 ease-in-circ
            "
          >
            <h2 className="text-lg font-semibold font-hero mb-3">
              {category.category}
            </h2>

            <div className="flex flex-wrap gap-1.5">
              {category.items.map((item, i) => (
                <span
                  key={i}
                  data-aos="flip-up"
                  data-aos-delay={(i + 1) * 100 + 150}
                  data-aos-once="true"
                  className="
                    text-xs px-2.5 py-1 rounded
                    bg-muted/50 border border-border/40
                  "
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
