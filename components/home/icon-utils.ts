export const getIconColor = (name: string) => {
  const colorMap: Record<string, string> = {
    "Next.js": "currentColor",
    Prisma: "text-[#2D3748]",
    PostgreSQL: "text-[#336791]",
    "Shadcn UI": "text-foreground",
    "Better Auth": "text-yellow-500",
    MongoDB: "text-[#47A248]",
    "Express.js": "text-gray-400",
    "Express JS": "text-gray-400",
    React: "text-[#61DAFB]",
    TypeScript: "text-[#3178C6]",
    JavaScript: "text-[#F7DF1E]",
    "Tailwind CSS": "text-[#06B6D4]",
    HTML5: "text-[#E34F26]",
    Git: "text-[#E34F26]",
    NodeJs: "text-[#0DDB24]",
  };

  return colorMap[name] || "text-muted-foreground";
};
