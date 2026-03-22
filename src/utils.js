// Capitalize first letter — but has a bug: crashes on empty string
function formatName(name) {
  return name[0].toUpperCase() + name.slice(1);
}

module.exports = { formatName };
