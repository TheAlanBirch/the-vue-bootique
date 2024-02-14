export interface ListGroupProps {
  flush?: boolean;
  horizontal?: boolean | string;
  numbered?: boolean;
}

export const listGroupClasses = ({ flush, horizontal, numbered }: ListGroupProps) => {
  return computed(() => {
    const classes = [];
    if (flush) classes.push('list-group-flush');
    if (horizontal)
      classes.push(typeof horizontal === 'boolean' ? 'list-group-horizontal' : `list-group-horizontal-${horizontal}`);
    if (numbered) classes.push('list-group-numbered');
    return classes.join(' ');
  });
};
