export interface ListGroupItemProps {
  action?: boolean;
  active?: boolean;
  button?: boolean;
  disabled?: boolean;
  href?: string;
  tag?: string;
  target?: string;
  variant?: string;
}

export const listGroupItemComputeds = ({
  action,
  active,
  button,
  disabled,
  href,
  tag,
  target,
  variant,
}: ListGroupItemProps) => {
  const listGroupItemClasses = computed(() => {
    const classes = [];
    if (action || button || href) classes.push('list-group-item-action');
    if (variant) classes.push(`list-group-item-${variant}`);
    if (active) classes.push('active');
    else if (disabled && !button) classes.push('disabled');

    return classes.join(' ');
  });

  const listGroupItemTag = computed(() => {
    if (href) return 'a';
    if (button) return 'button';

    return tag;
  });

  const listGroupItemProps = computed(() => {
    if (href && !disabled) {
      return {
        href: href as string,
        target: target as string,
      };
    } else if (button) {
      return {
        type: 'button',
        disabled: disabled as boolean,
      };
    }
    return {};
  });

  return { listGroupItemClasses, listGroupItemTag, listGroupItemProps };
};
