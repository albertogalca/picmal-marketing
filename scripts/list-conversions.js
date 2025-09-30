#!/usr/bin/env node

/**
 * Simple script to list all conversion pages without TypeScript dependencies
 */

// Define format combinations
const fromFormats = ['heic', 'webp', 'avif', 'png', 'dng', 'tiff', 'gif'];
const toFormats = ['jpg', 'png', 'webp', 'avif', 'gif', 'tiff'];

function getAllConversions() {
  const allConversions = [];

  for (const from of fromFormats) {
    for (const to of toFormats) {
      if (from !== to) {
        allConversions.push({ from, to });
      }
    }
  }

  return allConversions;
}

const args = process.argv.slice(2);

if (args.includes('--help')) {
  console.log(`
Conversion Page Lister

Commands:
  --list      List all generated conversions
  --stats     Show statistics
  --count     Show total count only

Examples:
  npm run list-conversions
  npm run list-conversions -- --stats
`);
  process.exit(0);
}

const conversions = getAllConversions();

if (args.includes('--count')) {
  console.log(conversions.length);
  process.exit(0);
}

if (args.includes('--stats')) {
  console.log('\n📊 Conversion Statistics:');
  console.log('==========================\n');

  // Count by target format
  const targetCounts = {};
  const sourceCounts = {};

  conversions.forEach(({ from, to }) => {
    targetCounts[to] = (targetCounts[to] || 0) + 1;
    sourceCounts[from] = (sourceCounts[from] || 0) + 1;
  });

  console.log('🎯 Popular Target Formats:');
  Object.entries(targetCounts)
    .sort(([,a], [,b]) => b - a)
    .forEach(([format, count]) => {
      console.log(`   ${format.toUpperCase()}: ${count} conversions`);
    });

  console.log('\n📤 Popular Source Formats:');
  Object.entries(sourceCounts)
    .sort(([,a], [,b]) => b - a)
    .forEach(([format, count]) => {
      console.log(`   ${format.toUpperCase()}: ${count} conversions`);
    });

  console.log(`\n📈 Total Conversions: ${conversions.length}`);
  console.log(`🎛️  Total Source Formats: ${fromFormats.length}`);
  console.log(`🎯 Total Target Formats: ${toFormats.length}`);

  process.exit(0);
}

if (args.includes('--list')) {
  console.log('\n🔄 All Generated Conversions:');
  console.log('==============================\n');

  const groupedByTo = {};
  conversions.forEach(({ from, to }) => {
    if (!groupedByTo[to]) groupedByTo[to] = [];
    groupedByTo[to].push(from);
  });

  Object.entries(groupedByTo).forEach(([to, fromFormats]) => {
    console.log(`📁 Converting TO ${to.toUpperCase()}:`);
    fromFormats.forEach(from => {
      console.log(`   • ${from} → ${to} (/convert/${from}-to-${to})`);
    });
    console.log('');
  });

  console.log(`📊 Total: ${conversions.length} conversion pages`);
  process.exit(0);
}

// Default behavior
console.log('\n🚀 Programmatic SEO Conversion Pages');
console.log('=====================================\n');

console.log(`📊 Generated ${conversions.length} conversion pages automatically`);
console.log(`🎛️  From ${fromFormats.length} source formats to ${toFormats.length} target formats`);
console.log('\nUse --help to see available commands');
console.log('Run `npm run build` to generate all pages\n');

// Show sample conversions
console.log('📝 Sample conversions:');
conversions.slice(0, 5).forEach(({ from, to }) => {
  console.log(`   • ${from} → ${to} (/convert/${from}-to-${to})`);
});
if (conversions.length > 5) {
  console.log(`   ... and ${conversions.length - 5} more`);
}