import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const studentsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/students" }),
  schema: z.object({
    name: z.string(),
    degree: z.string(),
    status: z.enum(['active', 'graduated']),
    director: z.string(),
    codirector: z.string().optional(),
    thesis: z.string(),
    repository: z.string().url().optional(),
  }),
});

// Esto es lo que busca Astro y que debe exportarse correctamente como un objeto
export const collections = {
  students: studentsCollection,
};