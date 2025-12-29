import { createClient } from 'v0-sdk';
import { writeFileSync, mkdirSync } from 'fs';

const v0 = createClient({
  apiKey: process.env.V0_API_KEY,
});

const baseContext = `
You're styling a blog post layout for gaming industry sentiment reports.
The content is markdown-rendered HTML with:
- H2 section headers (game names like "Hearts of Iron IV", "Victoria 3")
- H3 subheaders (topics like "Naval AI Crisis", "DLC Quality Concerns")
- Bullet point lists
- Blockquotes (community quotes)
- Horizontal rules between sections

The component receives: title, date, contentHtml (rendered markdown string).
Use Tailwind CSS. Make it visually engaging and clear, not flat.
`;

const variations = [
  {
    name: 'cards',
    prompt: `${baseContext}

Design direction: CARD-BASED
- Each major section (H2) should feel like its own contained card with subtle background/border
- Use shadows and rounded corners for depth
- Section headers should be bold and distinctive
- Pull quotes should stand out with accent styling
- Clean, modern, slightly corporate feel (think Stripe blog)
`
  },
  {
    name: 'editorial',
    prompt: `${baseContext}

Design direction: EDITORIAL/MAGAZINE
- Think The Verge or Polygon article layout
- Bold typography choices - large section headers
- Accent color highlights (pick a tasteful blue or teal)
- Pull quotes with dramatic styling (large, italic, colored border)
- Generous whitespace, feels premium and readable
- Maybe subtle background gradients or section dividers
`
  },
  {
    name: 'minimal-bold',
    prompt: `${baseContext}

Design direction: MINIMAL BUT BOLD
- Clean white background, lots of breathing room
- Section headers are LARGE and bold (not small uppercase)
- Use a single accent color sparingly but effectively
- Bullet points with custom styled markers
- Blockquotes with thick left border accent
- Think iA Writer meets a design blog
`
  },
  {
    name: 'dark-accent',
    prompt: `${baseContext}

Design direction: DARK ACCENTS
- Light background but with dark/bold accent elements
- Section headers could have dark background pills or underlines
- Strong visual hierarchy through weight and color contrast
- Refined, slightly serious/professional tone
- Think Bloomberg or Financial Times style
`
  }
];

async function generateVariation(variation) {
  console.log(`\n🎨 Generating "${variation.name}" variation...`);

  try {
    const chat = await v0.chats.create({
      message: variation.prompt,
    });

    // Extract the code from the response
    const response = chat;

    // Save full response for inspection
    const outputPath = `scripts/v0-output/${variation.name}.json`;
    writeFileSync(outputPath, JSON.stringify(response, null, 2));
    console.log(`   ✓ Saved to ${outputPath}`);

    return { name: variation.name, success: true, response };
  } catch (error) {
    console.error(`   ✗ Error: ${error.message}`);
    return { name: variation.name, success: false, error: error.message };
  }
}

async function main() {
  console.log('🚀 Generating v0 design variations...\n');

  // Create output directory
  mkdirSync('scripts/v0-output', { recursive: true });

  const results = [];

  for (const variation of variations) {
    const result = await generateVariation(variation);
    results.push(result);

    // Small delay between requests to be nice to the API
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log('\n📊 Summary:');
  results.forEach(r => {
    console.log(`   ${r.success ? '✓' : '✗'} ${r.name}`);
  });

  console.log('\n✨ Done! Check scripts/v0-output/ for results');
}

main();
