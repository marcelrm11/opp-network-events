const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const camelToHuman = (camelCaseString) => {
  const result = camelCaseString.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export { capitalize, camelToHuman };
