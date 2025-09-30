#!/usr/bin/env node

/**
 * Utility script for managing programmatic SEO conversions
 *
 * Usage:
 * npm run generate-conversions
 * npm run generate-conversions -- --list
 * npm run generate-conversions -- --preview heic jpg
 */

import { getAllConversions, generateConversionData, formats } from '../src/data/conversions.ts';

const args = process.argv.slice(2);

if (args.includes('--help')) {
  console.log(`
Programmatic SEO Conversion Generator

Commands:
  --list                  List all generated conversions
  --preview <from> <to>   Preview conversion data for specific formats
  --stats                 Show statistics about generated pages
  --formats               List all supported formats
  --validate              Validate all conversion data

Examples:
  node scripts/generate-conversions.js --list
  node scripts/generate-conversions.js --preview heic jpg
  node scripts/generate-conversions.js --stats
`);
  process.exit(0);
}

if (args.includes('--formats')) {
  console.log('\n📋 Supported Formats:');
  console.log('=====================\n');

  Object.entries(formats).forEach(([key, format]) => {
    console.log(`${format.name} (${key})`);
    console.log(`  Full Name: ${format.fullName}`);
    console.log(`  Quality: ${format.quality}`);
    console.log(`  Browser Support: ${format.browser_support}`);
    console.log(`  Transparency: ${format.supports_transparency ? 'Yes' : 'No'}`);
    console.log(`  Animation: ${format.supports_animation ? 'Yes' : 'No'}`);
    console.log(`  Typical Size: ${format.typical_size}`);
    console.log(`  Use Case: ${format.useCase}`);
    console.log('');
  });
  process.exit(0);
}

if (args.includes('--list')) {
  const conversions = getAllConversions();
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

if (args.includes('--preview')) {
  const fromFormat = args[args.indexOf('--preview') + 1];
  const toFormat = args[args.indexOf('--preview') + 2];

  if (!fromFormat || !toFormat) {
    console.error('❌ Please provide both from and to formats');
    console.log('   Example: --preview heic jpg');
    process.exit(1);
  }

  if (!formats[fromFormat] || !formats[toFormat]) {
    console.error(`❌ Unknown format: ${!formats[fromFormat] ? fromFormat : toFormat}`);
    console.log('   Use --formats to see all supported formats');
    process.exit(1);
  }

  console.log(`\n🔍 Preview: ${fromFormat.toUpperCase()} → ${toFormat.toUpperCase()}`);
  console.log('================================================\n');

  const conversionData = generateConversionData(fromFormat, toFormat);

  console.log(`📄 Title: ${conversionData.title}`);
  console.log(`📝 Description: ${conversionData.description}`);
  console.log(`🔗 URL: /convert/${fromFormat}-to-${toFormat}`);
  console.log(`💡 Why Convert: ${conversionData.why_convert}`);
  console.log(`📊 Size Impact: ${conversionData.size_reduction}`);
  console.log(`🎯 Quality Impact: ${conversionData.quality_impact}`);

  console.log('\n🎯 Use Cases:');
  conversionData.use_cases.forEach((useCase, i) => {
    console.log(`   ${i + 1}. ${useCase}`);
  });

  console.log('\n❓ FAQs:');
  conversionData.faqs.forEach((faq, i) => {
    console.log(`   ${i + 1}. ${faq.question}`);
    console.log(`      ${faq.answer.substring(0, 100)}...`);
  });

  process.exit(0);
}

if (args.includes('--stats')) {
  const conversions = getAllConversions();

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
  console.log(`🎛️  Total Formats: ${Object.keys(formats).length}`);
  console.log(`🔢 Possible Combinations: ${Object.keys(formats).length ** 2 - Object.keys(formats).length}`);

  process.exit(0);
}

if (args.includes('--validate')) {
  console.log('\n✅ Validating Conversion Data...');
  console.log('=================================\n');

  const conversions = getAllConversions();
  let errors = 0;

  conversions.forEach(({ from, to }) => {
    try {
      const data = generateConversionData(from, to);

      // Validate required fields
      if (!data.title || data.title.length < 10) {
        console.error(`❌ ${from}-to-${to}: Title too short or missing`);
        errors++;
      }

      if (!data.description || data.description.length < 50) {
        console.error(`❌ ${from}-to-${to}: Description too short or missing`);
        errors++;
      }

      if (!data.faqs || data.faqs.length < 3) {
        console.error(`❌ ${from}-to-${to}: Not enough FAQs (minimum 3)`);
        errors++;
      }

      if (!data.use_cases || data.use_cases.length < 3) {
        console.error(`❌ ${from}-to-${to}: Not enough use cases (minimum 3)`);
        errors++;
      }

    } catch (error) {
      console.error(`❌ ${from}-to-${to}: ${error.message}`);
      errors++;
    }
  });

  if (errors === 0) {
    console.log(`✅ All ${conversions.length} conversions validated successfully!`);
  } else {
    console.log(`❌ Found ${errors} validation errors`);
    process.exit(1);
  }

  process.exit(0);
}

// Default behavior - show help
console.log('\n🚀 Programmatic SEO Conversion Generator');
console.log('=========================================\n');
console.log('Use --help to see available commands\n');

const conversions = getAllConversions();
console.log(`📊 Ready to generate ${conversions.length} conversion pages`);
console.log(`🎛️  Supporting ${Object.keys(formats).length} image formats`);
console.log('\nRun `npm run build` to generate all pages');