// Capitalize first letter
function formatName(name) {
  if (!name) return '';
  return name[0].toUpperCase() + name.slice(1);
}

module.exports = { formatName };
