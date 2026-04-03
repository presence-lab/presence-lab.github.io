import createMDX from "@next/mdx";

const nextConfig = {
  output: "export" as const,
  basePath: "",
  images: {
    unoptimized: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [["rehype-pretty-code", { theme: "github-dark" }]],
  },
});

export default withMDX(nextConfig);
