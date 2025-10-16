/**
 * Converts a string to kebab-case.
 * Handles sentences, camelCase, snake_case, and edge cases.
 * 
 * Step 1: Handles simple sentences with spaces.
 * Step 2: Handles camelCase and snake_case formats.
 * Step 3: Robust error handling and edge cases.
 * 
 * @param {string} input - The string to convert.
 * @returns {string} The kebab-case formatted string.
 */
function toKebabCase(input) {
  // Step 3: Error handling - Return empty string if input is not a string or is empty
  if (typeof input !== 'string' || !input.trim()) {
    return '';
  }

  // Step 3: Trim leading and trailing whitespace
  let str = input.trim();

  // Step 2: Handle camelCase transitions (insert space before capital letters)
  str = str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');

  // Step 2: Replace underscores with spaces
  str = str.replace(/_/g, ' ');

  // Step 3: Replace any non-alphanumeric (except spaces and hyphens) with nothing
  str = str.replace(/[^a-zA-Z0-9\s-]/g, '');

  // Step 3: Replace multiple spaces, underscores, or hyphens with a single space
  str = str.replace(/[\s_-]+/g, ' ');

  // Step 1,2,3: Split by spaces, filter out empty strings, join with hyphens
  let words = str.split(' ').filter(Boolean);

  // Step 3: Return empty string if no valid words remain
  if (words.length === 0) return '';

  // Step 1,2,3: Join with hyphens and lowercase the result
  return words.join('-').toLowerCase();
}

// Example usages:
console.log(toKebabCase("Hello World"));         // "hello-world"
console.log(toKebabCase("camelCaseExample"));    // "camel-case-example"
console.log(toKebabCase("snake_case_example"));  // "snake-case-example"
console.log(toKebabCase("  Multiple   spaces ")); // "multiple-spaces"
console.log(toKebabCase("Already--kebab--case")); // "already-kebab-case"
console.log(toKebabCase("Special!@# Chars$$$"));  // "special-chars"
console.log(toKebabCase(""));                    // ""
console.log(toKebabCase(null));                  // ""
console.log(toKebabCase("___---___"));           // ""
