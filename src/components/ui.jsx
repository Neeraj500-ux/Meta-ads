import { useInView } from "../hooks/useInView.js";

export function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const [ref, seen] = useInView();
  return (
    <Tag
      ref={ref}
      style={{ "--d": `${delay}ms` }}
      className={`js-reveal ${seen ? "is-in" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function Arrow({ className = "" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${className}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  );
}

export function Button({ href, external, variant = "primary", className = "", children, arrow = true, ...rest }) {
  const v = { primary: "btn-primary", sun: "btn-sun", soft: "btn-soft" }[variant];
  const ext = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a href={href} className={`btn group ${v} ${className}`} {...ext} {...rest}>
      {children}
      {arrow && <Arrow />}
    </a>
  );
}

export function SectionHead({ title, children, className = "" }) {
  return (
    <Reveal className={`mx-auto mb-12 max-w-3xl text-center sm:mb-16 ${className}`}>
      <h2 className="h2">{title}</h2>
      {children && <div className="lede mt-5 space-y-4">{children}</div>}
    </Reveal>
  );
}

export function SectionCta({ href = "#enquire", children, ...rest }) {
  return (
    <Reveal className="mt-12 flex justify-center sm:mt-16">
      <Button href={href} {...rest}>{children}</Button>
    </Reveal>
  );
}

export function Check({ className = "" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="m4.5 10.5 3.6 3.6 7.4-8" />
    </svg>
  );
}
