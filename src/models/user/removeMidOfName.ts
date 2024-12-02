export const removeMidOfName = (name?: string) => {
  if (name) {
    return name.slice(0, 1) + '...' + name.slice(-1);
  }
};
