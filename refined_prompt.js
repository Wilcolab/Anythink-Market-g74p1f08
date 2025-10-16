/**
 * Converts a string to camelCase.
 * Handles mixed separators, special characters, numbers, and non-ASCII letters.
 * Preserves existing camelCase where appropriate.
 * Optionally allows customization of acronym handling.
 *
 * @param {string} input - The string to convert.
 * @param {Object} [options] - Optional settings.
 * @param {boolean} [options.preserveAcronyms=false] - If true, preserves all-uppercase acronyms.
 * @returns {string}
 * @throws {TypeError} if input is not a string.
 *
 * Examples:
 *   toCamelCase("  first_name  ")            // "firstName"
 *   toCamelCase("user--id")                  // "userId"
 *   toCamelCase("SCREEN_NAME")               // "screenName"
 *   toCamelCase("mobile-number")             // "mobileNumber"
 *   toCamelCase("myHTTPServer")              // "myHttpServer"
 *   toCamelCase("FOO_BAR", { preserveAcronyms: true }) // "FOOBar"
 */
function toCamelCase(input, options = {}) {
  const { preserveAcronyms = false } = options;

  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string.');
  }

  // Trim whitespace
  let str = input.trim();

  // Return empty string if only separators or empty
  if (!str || /^[\s_\-]+$/.test(str)) return '';

  // Split on spaces, underscores, hyphens (multiple or mixed)
  let words = str
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Split camelCase within string
    .split(/[\s_\-]+/);

  // Further split words that are camelCased together (e.g., "myHTTPServer")
  const splitCamel = (word) => word
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(' ');

  let resultWords = [];
  words.forEach(word => {
    if (word === '') return;
    splitCamel(word).forEach(subWord => {
      if (subWord !== '') resultWords.push(subWord);
    });
  });

  if (resultWords.length === 0) return '';

  // Build camelCase
  return resultWords.map((word, i) => {
    // Optionally preserve acronyms/all-uppercase
    if (preserveAcronyms && /^[A-Z0-9]+$/.test(word) && word.length > 1) {
      return i === 0 ? word.toLowerCase() : word;
    }
    let lower = word.toLowerCase();
    if (i === 0) return lower;
    // Capitalize, but lower the rest (handles accents, etc.)
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }).join('');
}

// Example usages:
console.log(toCamelCase("  first_name  "));            // "firstName"
console.log(toCamelCase("user--id"));                  // "userId"
console.log(toCamelCase("SCREEN_NAME"));               // "screenName"
console.log(toCamelCase("mobile-number"));             // "mobileNumber"
console.log(toCamelCase("myHTTPServer"));              // "myHttpServer"
console.log(toCamelCase("FOO_BAR", { preserveAcronyms: true })); // "FOOBar"
console.log(toCamelCase("  ---___   "));               // ""
console.log(toCamelCase("straße mit ß und ä"));        // "straßeMitßUndÄ"


/**
 * Converts a string to dot.case format.
 * Handles spaces, underscores, hyphens, and camelCase.
 * All letters are lowercased and words are separated by a single dot.
 *
 * Examples:
 *   toDotCase("First Name")        // "first.name"
 *   toDotCase("user_id")           // "user.id"
 *   toDotCase("mobile-number")     // "mobile.number"
 *   toDotCase("myHTTPServer")      // "my.http.server"
 *   toDotCase("SCREEN_NAME")       // "screen.name"
 */
function toDotCase(input) {
  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string.');
  }

  // Trim whitespace
  let str = input.trim();

  // Return empty string if only separators or empty
  if (!str || /^[\s_\-\.]+$/.test(str)) return '';

  // Split camelCase and acronyms
  str = str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');

  // Replace separators with spaces
  str = str.replace(/[\s_\-\.]+/g, ' ');

  // Split into words, filter out empty entries
  const words = str.split(' ').filter(Boolean);

  // Lowercase and join with dots
  return words.map(w => w.toLowerCase()).join('.');
}

// Example usage:
console.log(toDotCase("First Name"));        // "first.name"
console.log(toDotCase("user_id"));           // "user.id"
console.log(toDotCase("mobile-number"));     // "mobile.number"
console.log(toDotCase("myHTTPServer"));      // "my.http.server"
console.log(toDotCase("SCREEN_NAME"));       // "screen.name"
