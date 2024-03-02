/**
 * Generates props for the container component.
 *
 * @return {Object} An object containing props for the container component
 */
export const useContainerProps = () => {
  return {
    /**
     * flag to force the container to span the entire width of the viewport.
     * @defaults false
     * @type {boolean}
     */
    fluid: {
      type: Boolean,
      default: false,
    },
    /**
     * Sets container to full width up until the specified breakpoint.
     * @defaults null
     * @type {string}
     * @enum {string} 'sm', 'md', 'lg', 'xl', 'xxl'
     */
    responsive: {
      type: String,
      default: null,
    },
    /**
     * The HTML element used for the container.
     * @defaults 'div'
     * @type {string}
     */
    tag: {
      type: String,
      default: 'div',
    },
  };
};
