import type { Heading } from "./note-schema";
type Node = {
  type: string;
  value?: string;
  depth?: number;
  children?: Node[];
  data?: { hProperties?: Record<string, unknown> };
};
export function nodeText(node: Node): string {
  return node.type === "text" || node.type === "inlineCode"
    ? (node.value ?? "")
    : (node.children ?? []).map(nodeText).join("");
}
export function headingPlugin(output: Heading[] = []) {
  return () => (tree: Node) => {
    const used = new Set<string>();
    function walk(node: Node) {
      if (node.type === "heading") {
        const text = nodeText(node);
        const base =
          text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\p{L}\p{N}]+/gu, "-")
            .replace(/^-|-$/g, "") || "section";
        let id = `note-${base}`;
        let n = 2;
        while (used.has(id)) id = `note-${base}-${n++}`;
        used.add(id);
        node.data = {
          ...node.data,
          hProperties: { ...node.data?.hProperties, id },
        };
        if (node.depth === 2 || node.depth === 3)
          output.push({ id, text, depth: node.depth });
      }
      for (const child of node.children ?? []) walk(child);
    }
    walk(tree);
  };
}
export function readingMinutes(body: string) {
  return Math.max(
    1,
    Math.ceil(
      body
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/<[^>]*>/g, " ")
        .trim()
        .split(/\s+/)
        .filter(Boolean).length / 200,
    ),
  );
}
