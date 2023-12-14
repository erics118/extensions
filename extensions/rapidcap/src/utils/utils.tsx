export function kebabCase(s: string) {
  return (
    s
      // insert a dash between lower & upper
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      // space and underscore
      .replace(/[\s_]+/g, "-")
      // convert the rest to lower case
      .toLowerCase()
  );
}
