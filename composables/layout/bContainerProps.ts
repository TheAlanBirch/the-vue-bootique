/**
 * Generates props for the BContainer component.
 *
 * @return {object} An object containing props for the BContainer component
 */
export const useBContainerProps = () => {
  return {
    /**
     * Flag to force the container to span the entire width of the viewport.
     * @defaults false
     * 
     */
    fluid: {
      type: Boolean(),
      default: false,
    },
    /**
     * Sets container to full width up until the specified breakpoint.
     * @type {string}
     * @enum {string} 'sm', 'md', 'lg', 'xl', 'xxl'
     * @default null
     */
    responsive: {
      type: String() || null,
      default: null,
    },
    /**
     * The HTML element used for the container.
     * @default 'div'
     * @type {string}
     */
    tag: {
      type: String,
      default: 'div',
    },
  };
};
