import fs from 'fs';
import path from 'path';
import { Project, Tag } from '../types/project';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EVENT_DRIVEN_BACKTEST_PATH = path.join(
  __dirname,
  '../../from_old_portfolio/event_driven_backtest'
);

const PUBLIC_IMAGES_PATH = path.join(__dirname, '../../public/images/projects/event_driven_backtest');

/**
 * Extracts project data from the Event-Driven Backtesting Framework markdown file
 */
export function extractEventDrivenBacktest(): Project {
  const markdownPath = path.join(EVENT_DRIVEN_BACKTEST_PATH, 'readme_event_driven_backtest.md');
  const content = fs.readFileSync(markdownPath, 'utf-8');

  // Extract title (first line after #)
  const titleMatch = content.match(/# (.+)/);
  const title = titleMatch ? titleMatch[1].trim() : 'Event Driven Backtesting Framework';

  // Extract short description (first meaningful paragraph after "Motivations")
  const lines = content.split('\n');
  let shortDescription = '';
  let foundMotivations = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('### Motivations')) {
      foundMotivations = true;
      continue;
    }

    if (foundMotivations && line && !line.startsWith('#') && !line.startsWith('!') && !line.startsWith('<')) {
      shortDescription = line;
      break;
    }
  }

  // Fallback description
  if (!shortDescription) {
    shortDescription = 'Event-driven backtesting framework for quantitative research and trading strategy evaluation.';
  }

  // Extract detailed description (concatenate paragraphs until code block)
  let detailedDescription = '';
  let inDescription = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('```')) {
      break;
    }
    if (line && !line.startsWith('#') && !line.startsWith('!') && !line.startsWith('<')) {
      if (line.startsWith('###')) {
        detailedDescription += `**${line.replace(/^###\s*/, '')}**\n\n`;
      } else if (line.startsWith('##')) {
        detailedDescription += `## ${line.replace(/^##\s*/, '')}\n\n`;
      } else {
        detailedDescription += line + '\n\n';
      }
    }
  }

  // Extract image filenames from markdown (both ![]() and <img src=""> formats)
  const imageRegex = /(?:!\[.*?\]\((.*?)(?:\?raw=true)?\)|<img\s+[^>]*src="(.*?)(?:\?raw=true)?")/g;
  let match;
  const imageFilenames: string[] = [];
  while ((match = imageRegex.exec(content)) !== null) {
    const filename = match[1] || match[2];
    if (filename && !filename.includes('cdnjs')) {
      imageFilenames.push(filename);
    }
  }

  // Extract code snippets
  const codeBlockRegex = /```python\s*\n([\s\S]*?)\n```/g;
  const codeSnippets: string[] = [];
  while ((match = codeBlockRegex.exec(content)) !== null) {
    codeSnippets.push(match[1].trim());
  }

  // Tags as specified in PRD
  const tags: Tag[] = ['Quantitative Research', 'Data Engineering'];

  // Move images to public folder
  if (!fs.existsSync(PUBLIC_IMAGES_PATH)) {
    fs.mkdirSync(PUBLIC_IMAGES_PATH, { recursive: true });
  }

  const imagePaths: string[] = [];
  for (const filename of imageFilenames) {
    const sourcePath = path.join(EVENT_DRIVEN_BACKTEST_PATH, filename);
    if (fs.existsSync(sourcePath)) {
      const destPath = path.join(PUBLIC_IMAGES_PATH, filename);
      fs.copyFileSync(sourcePath, destPath);
      imagePaths.push(`/images/projects/event_driven_backtest/${filename}`);
    }
  }

  return {
    id: 'event-driven-backtesting-framework',
    title,
    shortDescription: shortDescription || 'Event-driven backtesting framework for quantitative research',
    detailedDescription: detailedDescription.trim(),
    tags,
    images: imagePaths,
    codeSnippets: codeSnippets.length > 0 ? codeSnippets : undefined,
    date: '2024-02-01',
  };
}

// Test the extraction (uncomment to run)
// const project = extractEventDrivenBacktest();
// console.log('Extracted project:', JSON.stringify(project, null, 2));
// console.log('Images moved to:', PUBLIC_IMAGES_PATH);