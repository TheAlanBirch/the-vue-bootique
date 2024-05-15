/**
 * Returns an object with properties for configuring the alignment, number of columns, gutters, and HTML tag for a Bootstrap row.
 *
 * @return {object} An object with properties for configuring the alignment, number of columns, gutters, and HTML tag for a Bootstrap row.
 */
export const useBRowProps = () => {
  return {
    /**
     * Sets the vertical alignment of the children in the row. 
     * @type {string}
     * @enum {string} 'start', 'center', 'end'
     */
    alignV: {
      type: String,
      default: null,
    },
    /**
     * 
     */
    alignH: {
      type: String,
      default: null,
    },
    rowCols: [Number, String],
    rowColsSm: [Number, String],
    rowColsMd: [Number, String],
    rowColsLg: [Number, String],
    rowColsXl: [Number, String],
    noGutters: { // TODO: set .g-0 for noGutters
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'div',
    },
  };
};
