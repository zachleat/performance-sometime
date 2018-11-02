/* Relevant web browser support comparisons:
 * CSS Font Loading: https://caniuse.com/#feat=font-loading

 * Safe to use, superset of CSS Font Loading support:
 * Promises: https://caniuse.com/#feat=promises
 * Array forEach: https://caniuse.com/#feat=es5
 
 * Careful using these, mismatches CSS Font Loading support:
 * `async`/`await`: https://caniuse.com/#feat=async-functions
 * `let` (safe in async/await): https://caniuse.com/#feat=let
 * Arrow functions (safe in async/await): https://caniuse.com/#feat=arrow-functions
 */


/************************************************
 * 
 * Asynchronously load one web font (no invisible text/FOIT)
 *
 ************************************************/

// Promises (better compatibility)
if ("fonts" in document) {
  // Make it
  var font = new FontFace(
    "Noto Serif",
    "url(notoserif.woff2) format('woff2')"
  );

  // Load it
  font.load().then(function(loadedFont) {

    // Render it
    document.fonts.add(loadedFont);

  });
}

// Async/Await
(async () => {
  if( !("fonts" in document) ) {
    return;
  }

  // Make it
  let font = new FontFace(
    "Noto Serif",
    "url(notoserif.woff2) format('woff2')"
  );

  // Load it
  let loadedFont = await font.load();

  // Render it
  document.fonts.add(loadedFont);
})();



/************************************************
 * 
 * Asynchronously load two web fonts (no invisible text/FOIT), Render only once
 *
 ************************************************/

// Promises (better compatibility)
if ("fonts" in document) {

  // Make two
  var font = new FontFace("Noto Serif", /* … */);
  var fontBold = new FontFace("Noto Serif", /* … */);

  // Load two
  Promise.all([ font.load(), fontBold.load() ]).then(loadedFonts => {

    // Render them at the same time
    loadedFonts.forEach(function(font) {
      document.fonts.add(font);
    });

  });
}

// Async/Await
(async () => {
  if( !("fonts" in document) ) {
    return;
  }

  // Make it
  let font = new FontFace(
    "Noto Serif",
    "url(notoserif.woff2) format('woff2')"
  );
  let fontBold = new FontFace(
    "Noto Serif",
    "url(notoserif-bold.woff2) format('woff2')",
     { weight: "700" }
  );

  // Load it
  let loadedFonts = await Promise.all([
    font.load(),
    fontBold.load()
  ]);

  // Render it
  loadedFonts.forEach(font => document.fonts.add(font));
})();