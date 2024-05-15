import type { alignSelfTypes, breakpointTypes, colsTypes } from "~/types/layout";

/**
 * Returns an object with properties for configuring Bootstrap column layout options.
 *
 * @return {object} object with properties for configuring Bootstrap column layout options
 */
export const useBColProps = (): object => {
  return {
    // TODO: Add offset
    /**
     * Sets the alignment of the column. The alternative to using vAlign on Rows.
     * @enum {string | null} 'start', 'center', 'end', 'baseline', 'stretch', null
     * @default null
     */
    alignSelf: {
      type: String as () => alignSelfTypes,
      default: null,
    },
    /**
     * When true makes the column width responsive. The width wil resize based on the width of the center column.
     * If all columns are set to true, their widths will be equal.
     * @default null
     */
    col: {
      type: Boolean() || null,
      default: null
    },
    /**
     * Sets how much space the column should take up from xs and up breakpoints. 
     * Set to 'auto' for variable-width columns.
     * @enum {number | string | null} null, 1-12, 'auto'
     * @default null
     */
    cols: {
      type: Object as () => colsTypes,
      default: false
    },
    /**
     * Sets how much space the column should take up on small screens.
     * Set to true or false equal-width columns. When set to true, the grid system
     * start out stacked and become horizontal at the breakpoint.
     * @enum {number | string | boolean | null} null, true, false, 1-12, 'auto'
     * @default null
     */
    sm: {
      type: Object as () => breakpointTypes,
      default: null
    },
    /**
     * Sets how much space the column should take up on small screens.
     * Set to true or false equal-width columns. When set to true, the grid system
     * start out stacked and become horizontal at the breakpoint.
     * @enum {number | string | boolean | null} null, true, false, 1-12, 'auto'
     * @default null
     */
    md: {
      type: Object as () => breakpointTypes,
      default: null
    },
    /**
     * Sets how much space the column should take up on small screens.
     * Set to true or false equal-width columns. When set to true, the grid system
     * start out stacked and become horizontal at the breakpoint.
     * @enum {number | string | boolean | null} null, true, false, 1-12, 'auto'
     * @default null
     */
    lg: {
      type: Object as () => breakpointTypes,
      default: null
    },
    /**
     * Sets how much space the column should take up on small screens.
     * Set to true or false equal-width columns. When set to true, the grid system
     * start out stacked and become horizontal at the breakpoint.
     * @enum {number | string | boolean | null} null, true, false, 1-12, 'auto'
     * @default null
     */
    xl: {
      type: Object as () => breakpointTypes,
      default: null
    },
    /**
     * The HTML element used for the container.
     * @default 'div'
     */
    tag: {
      type: String,
      default: 'div',
    },
  };
};
