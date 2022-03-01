// Usamos b primero, de esta manera devuelve los más recientes primero
export const sortByDate = (a, b) => {
  return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
};
