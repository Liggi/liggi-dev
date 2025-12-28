import { createClient } from 'v0-sdk';

const v0 = createClient({
  apiKey: process.env.V0_API_KEY,
});

const prompt = `
Create a polished blog post layout component for a gaming industry sentiment report.

Requirements:
- Clean, editorial design with Inter font
- Section headers (like "Hearts of Iron IV", "Victoria 3") should be uppercase labels with small Lucide icons
- The design should feel premium and magazine-like, NOT flat or generic
- Include styled pull quotes with a distinctive visual treatment
- Bullet lists should look refined
- Add subtle visual hierarchy - maybe cards, borders, or background treatments for different sections
- Each game section should feel like its own contained unit
- Include a summary/overview section at the top with key highlights
- Use shadcn/ui components where appropriate
- The overall vibe: somewhere between The Verge, Polygon, and a high-end newsletter

The component receives:
- title: string
- date: string
- contentHtml: string (rendered markdown)

Make it visually interesting without being cluttered.
`;

console.log('Generating component with v0...\n');

try {
  const chat = await v0.chats.create({
    message: prompt,
  });

  console.log('Full response:');
  console.log(JSON.stringify(chat, null, 2));
} catch (error) {
  console.error('Error:', error);
}
