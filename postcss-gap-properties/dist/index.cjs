"use strict";const e=["column-gap","gap","row-gap"];function o(o){const r=!("preserve"in Object(o))||Boolean(o.preserve);return{postcssPlugin:"postcss-gap-properties",Declaration(o){if(!e.includes(o.prop.toLowerCase()))return;if(!o.parent.some((e=>"display"===e.prop.toLowerCase()&&"grid"===e.value.toLowerCase())))return;const s=`grid-${o.prop.toLowerCase()}`;o.parent.some((e=>e.prop.toLowerCase()===s))||(o.cloneBefore({prop:s}),r||o.remove())}}}o.postcss=!0,module.exports=o;