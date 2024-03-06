/**
 * Returns an object with properties for configuring the alignment, number of columns, gutters, and HTML tag for a Bootstrap row.
 *
 * @return {object} An object with properties for configuring the alignment, number of columns, gutters, and HTML tag for a Bootstrap row.
 */
export const useBRowProps = () => {
  return {
    // alignH: {
    //   type: String,
    //   default: null,
    // },
    // alignV: {
    //   type: String,
    //   default: null,
    // },
    // cols: [Number, String],
    // colsSm: [Number, String],
    // colsMd: [Number, String],
    // colsLg: [Number, String],
    // colsXl: [Number, String],
    // noGutters: {
    //   type: Boolean,
    //   default: false,
    // },
    tag: {
      type: String,
      default: 'div',
    },
  };
};
