/**
 * Returns an object with properties for configuring Bootstrap column layout options.
 *
 * @return {object} object with properties for configuring Bootstrap column layout options
 */
export const useBColProps = () => {
  return {
    // TODO: Add offset
    // alignSelf: {
    //   type: String,
    //   default: null,
    // },
    // // col can be number of columns or 'auto'
    // col: [Number, String, Boolean],
    // // stacked to horizontal options; boolean for stacked layout only,
    // // number and string for stacked layout and then number of columns in horizontal,
    // sm: [Number, String, Boolean],
    // md: [Number, String, Boolean],
    // lg: [Number, String, Boolean],
    // xl: [Number, String, Boolean],
    tag: {
      type: String,
      default: 'div',
    },
  };
};
