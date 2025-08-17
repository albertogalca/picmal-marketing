/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "picmal-blue": "#1B5BFF",
        "picmal-blue-light": "#2483FF",
        "picmal-blue-lighter": "#CBDEFF",
        "picmal-bg": "#F2F6FF",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: theme("colors.gray.700"),
            lineHeight: "1.75",
            fontSize: "1.125rem",
            "--tw-prose-headings": theme("colors.gray.900"),
            "--tw-prose-lead": theme("colors.gray.600"),
            "--tw-prose-links": theme("colors.blue.600"),
            "--tw-prose-bold": theme("colors.gray.900"),
            "--tw-prose-counters": theme("colors.gray.500"),
            "--tw-prose-bullets": theme("colors.gray.300"),
            "--tw-prose-hr": theme("colors.gray.200"),
            "--tw-prose-quotes": theme("colors.gray.900"),
            "--tw-prose-quote-borders": theme("colors.gray.200"),
            "--tw-prose-captions": theme("colors.gray.500"),
            "--tw-prose-code": theme("colors.gray.900"),
            "--tw-prose-pre-code": theme("colors.gray.200"),
            "--tw-prose-pre-bg": theme("colors.gray.800"),
            "--tw-prose-th-borders": theme("colors.gray.300"),
            "--tw-prose-td-borders": theme("colors.gray.200"),
            h1: {
              fontSize: "2.25rem",
              fontWeight: "800",
              lineHeight: "1.2",
              marginBottom: "1.5rem",
            },
            h2: {
              fontSize: "1.875rem",
              fontWeight: "700",
              lineHeight: "1.3",
              marginTop: "2rem",
              marginBottom: "1rem",
            },
            h3: {
              fontSize: "1.5rem",
              fontWeight: "600",
              lineHeight: "1.4",
              marginTop: "1.5rem",
              marginBottom: "0.75rem",
            },
            p: {
              marginTop: "1.25rem",
              marginBottom: "1.25rem",
            },
            ul: {
              marginTop: "1.25rem",
              marginBottom: "1.25rem",
            },
            ol: {
              marginTop: "1.25rem",
              marginBottom: "1.25rem",
            },
            "ul > li": {
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            },
            "ol > li": {
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            },
            blockquote: {
              borderLeftWidth: "4px",
              borderLeftColor: theme("colors.blue.200"),
              backgroundColor: theme("colors.blue.50"),
              padding: "1rem 1.5rem",
              borderRadius: "0.5rem",
              margin: "1.5rem 0",
            },
            code: {
              backgroundColor: theme("colors.gray.100"),
              padding: "0.125rem 0.375rem",
              borderRadius: "0.25rem",
              fontSize: "0.875rem",
              fontWeight: "500",
            },
            pre: {
              backgroundColor: theme("colors.gray.900"),
              color: theme("colors.gray.100"),
              padding: "1rem",
              borderRadius: "0.5rem",
              overflow: "auto",
              fontSize: "0.875rem",
              lineHeight: "1.7",
            },
            "pre code": {
              backgroundColor: "transparent",
              padding: "0",
              color: "inherit",
            },
          },
        },
        invert: {
          css: {
            "--tw-prose-body": theme("colors.gray.300"),
            "--tw-prose-headings": theme("colors.white"),
            "--tw-prose-lead": theme("colors.gray.400"),
            "--tw-prose-links": theme("colors.blue.400"),
            "--tw-prose-bold": theme("colors.white"),
            "--tw-prose-counters": theme("colors.gray.400"),
            "--tw-prose-bullets": theme("colors.gray.600"),
            "--tw-prose-hr": theme("colors.gray.700"),
            "--tw-prose-quotes": theme("colors.gray.100"),
            "--tw-prose-quote-borders": theme("colors.gray.700"),
            "--tw-prose-captions": theme("colors.gray.400"),
            "--tw-prose-code": theme("colors.white"),
            "--tw-prose-pre-code": theme("colors.gray.300"),
            "--tw-prose-pre-bg": theme("colors.gray.800"),
            "--tw-prose-th-borders": theme("colors.gray.600"),
            "--tw-prose-td-borders": theme("colors.gray.700"),
            blockquote: {
              borderLeftColor: theme("colors.blue.400"),
              backgroundColor: theme("colors.blue.900/20"),
            },
            code: {
              backgroundColor: theme("colors.gray.800"),
              color: theme("colors.gray.200"),
            },
          },
        },
        picmal: {
          css: {
            "--tw-prose-links": "#1B5BFF",
            "--tw-prose-links-hover": "#2483FF",
            h1: {
              background: "linear-gradient(to right, #1B5BFF, #2483FF)",
              backgroundClip: "text",
              color: "transparent",
            },
            h2: {
              color: "#1B5BFF",
            },
            "h3, h4, h5, h6": {
              color: "#1B5BFF",
            },
            a: {
              color: "#1B5BFF",
              textDecoration: "none",
              fontWeight: "500",
              "&:hover": {
                color: "#2483FF",
                textDecoration: "underline",
              },
            },
            blockquote: {
              borderLeftColor: "#1B5BFF",
              backgroundColor: "#F2F6FF",
              color: "#1B5BFF",
            },
            "blockquote p:first-of-type::before": {
              content: "none",
            },
            "blockquote p:last-of-type::after": {
              content: "none",
            },
          },
        },
      }),
    },
  },
};
