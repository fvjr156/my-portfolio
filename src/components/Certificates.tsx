import { useState } from "react";
import { Accordion, AccordionHeader, AccordionBody } from "./Accordion";
import { motion } from "framer-motion";
import ImageLoading from "./ImageLoading";
import type { CertificatesProps, TypeCertificateItem } from "../types/Types";

export default function Certificates({ data, id }: CertificatesProps) {
  const [open, setOpen] = useState<number>(-1);
  const handleOpen = (value: number) => setOpen(open === value ? -1 : value);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6" id={id}>
      <h1 className="text-2xl font-bold font-hero sm:text-4xl mb-8 sm:mb-10 text-center z-10">
        Achievements
      </h1>

      <div
        // className={`${open > -1 ? "h-180" : "h-130"} relative overflow-visible accordion-transition`}
        className="flex flex-col space-y-4"
      >
        {data.map((x: TypeCertificateItem, index: number) => (
          <Accordion
            key={index}
            open={open === index}
            aosData={{
              animType: "fade-up",
              animdelay: index * 50,
              animDuration: 300,
              once: true,
            }}
            styles={{
              bottom: `${index * 50}px`,
            }}
          >
            <AccordionHeader onClick={() => handleOpen(index)} styles={{}}>
              {x.name}
            </AccordionHeader>
            <div className="w-full h-2"></div>
            <AccordionBody>
              <CertificateCard cert={x} />
            </AccordionBody>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

function CertificateCard({ cert }: { cert: any }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.a
      href={cert.certlink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      whileHover={{ y: -2 }}
      className="flex flex-col md:flex-row md:gap-10 w-full rounded-md overflow-hidden hover:bg-muted/20 transition-colors"
    >
      <div className="relative w-full h-full aspect-auto overflow-hidden rounded-md">
        {!loaded && <ImageLoading />}
        <img
          src={cert.certpreviewimg}
          alt={cert.name}
          draggable={false}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          onMouseDown={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          className={`text-xl text-center w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100 dark:opacity-80 dark:hover:opacity-100" : "opacity-0"}`}
        />
      </div>

      <div className="pt-3 space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          <img
            src={cert.logo}
            alt={cert.institution}
            draggable={false}
            className="w-4 h-4 object-contain"
          />
          <span>{cert.institution}</span>
          <span className="opacity-40">·</span>
          <span>{cert.date}</span>
        </div>

        {cert.tags && (
          <div className="flex flex-wrap gap-1.5">
            {cert.tags.map((tag: string, i: number) => (
              <span
                key={i}
                data-aos="flip-up"
                data-aos-delay={(i + 1) * 100 + 150}
                className="text-xs px-2 py-0.5 rounded bg-muted/50 border border-border/40
                "
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.a>
  );
}
