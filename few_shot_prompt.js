function toCamelCase(str) {
  if (typeof str !== 'string') return '';

  // Convert the string to lower case
  str = str.trim().toLowerCase();

  // Replace any group of spaces, underscores, or hyphens with a single space
  str = str.replace(/[\s_\-]+/g, ' ');

  // Split into words
  const words = str.split(' ');

  // Capitalize first letter of each word except the first one
  for (let i = 1; i < words.length; i++) {
    if (words[i].length > 0) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
  }

  // Join all words together
  return words.join('');
}

// Example usage:
console.log(toCamelCase("first name"));       // firstName
console.log(toCamelCase("user_id"));          // userId
console.log(toCamelCase("SCREEN_NAME"));      // screenName
console.log(toCamelCase("mobile-number"));    // mobileNumber
