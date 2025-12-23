export const toPascalCase = (value: string) =>
  value
    .split(/[-_]/)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');
