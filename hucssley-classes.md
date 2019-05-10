# Hucssley classes

Hucssley provides ~80 classes out-of-the-box, which have been sensibly pre-configured for everyday use. Some are placeholders for more complex things, like `shadow` and `transform` that don't map 1:1 to a property and value.

## Understanding class configuration

### Modules

Each class will have an appropriately named `$hu-[class-name]-modules` variable, which determines what modules types (if any), it is generated for.

Modules accepts a list of the following values: `(base, focus, hover, hocus, state, group-hover, group-state, reduced-motion, print)` or empty `()`. The order of the modules is not important, as Hucssley will intelligently order them for you to produce the desired output.

### Simple Types

Each class will have an appropriately name `$hu-[class-name]-types` variable, which determines what class name suffixes, values that will be used.

`$hu-[class-name]-modules` can either accept a list or a map.

#### Lists

If using a list, the suffix and value will be identical, for example:

```scss
$hu-justify-items-types: (
  auto,
  baseline,
  center,
);
```

Will generate:

```css
.justify-items-auto {
  justify-items: auto;
}

.justify-items-baseline {
  justify-items: baseline;
}

.justify-items-center {
  justify-items: center;
}
```

#### Maps

If using a map, the majority of class names will use the map keys as the class name suffix, and the map values as the CSS value. This allows you to customize the class names to suit your workflow, or fix [mistakes in CSS](https://wiki.csswg.org/ideas/mistakes).

The following variable:

```scss
$hu-flex-wrap-types: (
  no-wrap: nowrap,
  wrap: wrap,
  wrap-reverse: wrap-reverse,
);
```

Will generate:

```css
.flex-wrap-no-wrap {
  flex-wrap: nowrap;
}

.flex-wrap {
  flex-wrap: wrap;
}

.flex-wrap-wrap-reverse {
  flex-wrap: wrap-reverse;
}
```

If a key/value pair is identical, the key will be automatically be omitted from the class name suffix, which is why `.flex-wrap` is created, instead of `flex-wrap-wrap`.

All classes can be customized to suit your project. The classes and their default configurations are:

### Complex types

Some classes, also have a `$hu-[class-name]-scale` variable, in which case, they use both `$hu-[class-name]-types` and `$hu-[class-name]-scale` to determine the class name suffix, values **and CSS properties** generated.

As with the simple types, both variables could be either a list or a map, but would generally both be maps.

A good example is `border-radius`:

```scss
$hu-border-radius-scale: (
  0: 0,
  100: 1px,
  200: 2px,
  300: 3px,
  1000: 1000px,
);

$hu-border-radius-types: (
  border-radius: border-radius,
  border-radius-b: (border-bottom-left-radius, border-bottom-right-radius),
  border-radius-l: (border-bottom-left-radius, border-top-left-radius),
  border-radius-r: (border-bottom-right-radius, border-top-right-radius),
  border-radius-t: (border-top-left-radius, border-top-right-radius),
);
```

which would generate the following classes:

```css
.border-radius-100 {
  border-radius: 1px;
}

.border-radius-b-100 {
  border-bottom-left-radius: 1px;
  border-bottom-right-radius: 1px;
}

.border-radius-l-100 {
  border-bottom-left-radius: 1px;
  border-top-left-radius: 1px;
}

.border-radius-r-100 {
  border-bottom-right-radius: 1px;
  border-top-right-radius: 1px;
}

.border-radius-t-100 {
  border-top-left-radius: 1px;
  border-top-right-radius: 1px;
}

.border-radius-200 {
  border-radius: 2px;
}

.border-radius-b-200 {
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
}

.border-radius-l-200 {
  border-bottom-left-radius: 2px;
  border-top-left-radius: 2px;
}

.border-radius-r-200 {
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;
}

.border-radius-t-200 {
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
}
```

Hopefully you can see how the maps controlled the resultant class name format, properties and values.

## Configuring classes

To customize the modules, types and scales used, you simply need to re-assign the relevant variable in a custom Sass stylesheet.

When importing and using Hucssley, we recommend taking this approach to customize and override existing classes and variables.

```scss
@import "hucssley/helpers";

@import "hucssley/variables/global/index";
@import "custom/variables/global/index";

@import "hucssley/variables/classes/index";
@import "custom/variables/classes/index";
set class overrides before if you don't need access to the defaults & want changes to flow through referenced vars

@import "hucssley/variables/reset/index";
@import "custom/variables/reset/index";

@import "hucssley/styles";
@import "custom/classes/index";
```

## What's in the box?

Below is a complete list of all the classes in Hucssley by default and their individual configurations. You'll see that some classes reference the same variables, to make customizing them to your specific project easier.

*Classes map 1:1 to with CSS properties unless otherwise specified.*

### hu-align-content

```scss
$hu-align-content-modules: (base, responsive);

$hu-align-content-types: (
  baseline,
  center,
  end,
  flex-end,
  flex-start,
  normal,
  space-around,
  space-between,
  space-evenly,
  start,
  stretch,
);
```

### hu-align-items

```scss
$hu-align-items-modules: (base, responsive);

$hu-align-items-types: (
  auto,
  center,
  end,
  flex-end,
  flex-start,
  normal,
  self-end,
  self-start,
  start,
);
```

### hu-align-self

```scss
$hu-align-self-modules: (base, responsive);

$hu-align-self-types: $hu-align-items-types;
```

### hu-appearance

```scss
$hu-appearance-modules: (base);

$hu-appearance-types: (
  none,
  textfield,
  );
```

### hu-backface

```
backface -> backface-visibility
```

```scss
$hu-backface-modules: (base);

$hu-backface-types: (
  hidden,
  visible,
);
```

### hu-bg-color

```
bg-color -> background-color
```

```scss
$hu-bg-color-modules: (base, hocus, group-hover, group-state, state);

$hu-bg-color-types: $hu-colors;
```

### hu-bg-image

```
bg-image -> background-image
```

```scss
$hu-bg-image-modules: ();

$hu-bg-image-types: ();
```

### hu-bg-position-x

```
bg-position-x -> background-position-x
```

```scss
$hu-bg-position-x-modules: (base);

$hu-bg-position-x-types: (
  left,
  center,
  right,
);
```

### hu-bg-position-y

```
bg-position-y -> background-position-y
```

```scss
$hu-bg-position-y-modules: (base);

$hu-bg-position-y-types: (
  bottom,
  center,
  top,
);
```

### hu-bg-repeat

```
bg-repeat -> background-repeat
```

```scss
$hu-bg-repeat-modules: (base);

$hu-bg-repeat-types: (
  repeat: repeat,
  repeat-no: no-repeat,
  repeat-space: space,
  repeat-round: round,
  repeat-x: repeat-x,
  repeat-y: repeat-y,
);
```

### hu-bg-size

```scss
$hu-bg-size-modules: (base);

$hu-bg-size-types: (
  auto,
  contain,
  cover,
);
```

### hu-blend-mode

```scss
$hu-blend-mode-modules: (base);

$hu-blend-mode-types: (
  color,
  color-burn,
  color-dodge,
  darken,
  difference,
  exclusion,
  hard-light,
  hue,
  lighten,
  luminosity,
  multiply,
  normal,
  overlay,
  saturation,
  screen,
  soft-light,
);
```

### hu-border-color

```scss
$hu-border-color-modules: $hu-border-modules;

$hu-border-color-sides: $hu-border-sides;

$hu-border-color-types: $hu-colors;
```

### hu-border-radius

```scss
$hu-border-radius-modules: (base, responsive);

$hu-border-radius-scale: (
  0: 0,
  100: 1px,
  200: 2px,
  300: 3px,
  400: 4px,
  500: 5px,
  1000: 1000px,
);

$hu-border-radius-types: (
  border-radius: border-radius,
  border-radius-b: (border-bottom-left-radius, border-bottom-right-radius),
  border-radius-bl: border-bottom-left-radius,
  border-radius-br: border-bottom-right-radius,
  border-radius-l: (border-bottom-left-radius, border-top-left-radius),
  border-radius-r: (border-bottom-right-radius, border-top-right-radius),
  border-radius-t: (border-top-left-radius, border-top-right-radius),
  border-radius-tl: border-top-left-radius,
  border-radius-tr: border-top-right-radius,
);
```

### hu-border-style

```scss
$hu-border-style-modules: $hu-border-modules;

$hu-border-style-sides: $hu-border-sides;

$hu-border-style-types: (
  none,
  dashed,
  double,
  dotted,
  solid,
);
```

### hu-border-width

```scss
$hu-border-width-modules: $hu-border-modules;

$hu-border-width-sides: $hu-border-sides;

$hu-border-width-types: (
  0: 0,
  100: 1px,
  200: 2px,
);
```

### hu-box-sizing

```scss
$hu-box-sizing-modules: (base);

$hu-box-sizing-types: (
  border-box,
  content-box,
);
```

### hu-color

```scss
$hu-color-modules: $hu-bg-color-modules;

$hu-color-types: $hu-colors;
```

### hu-columns

```scss
$hu-columns-modules: ();

$hu-columns-types: ();
```

### hu-cursor

```scss
$hu-cursor-modules: (base, state);

$hu-cursor-types: (
  auto,
  default,
  not-allowed,
  pointer,
  progress,
  text,
  wait,
);
```

### hu-display

```scss
$hu-display-modules: (base, focus, hover, hocus, group-hover, group-state, print, responsive, state);

$hu-display-types: (
  block,
  flex,
  grid,
  inline,
  inline-block,
  inline-flex,
  inline-grid,
  none,
  table,
  table-cell,
  table-row,
);
```

### hu-flex-direction

```scss
$hu-flex-direction-modules: (base, responsive);

$hu-flex-direction-types: (
  column,
  column-reverse,
  row,
  row-reverse,
);
```

### hu-flex-grow

```scss
$hu-flex-grow-modules: (base, responsive);

$hu-flex-grow-types: (
  0,
  1,
  2,
  3,
  4,
  5,
  auto,
);
```

### hu-flex-shrink

```scss
$hu-flex-shrink-modules: (base, responsive);

$hu-flex-shrink-types: $hu-flex-grow-types;
```

### hu-flex-wrap

```scss
$hu-flex-wrap-modules: (base, responsive);

$hu-flex-wrap-types: (
  no-wrap: nowrap,
  wrap: wrap,
  wrap-reverse: wrap-reverse,
);
```

### hu-float

```scss
$hu-float-modules: ();

$hu-float-types: ();
```

### hu-font-family

```scss
$hu-font-family-modules: (base);

$hu-font-family-types: (
  mono: (Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace),
  sans: (system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif),
  serif: (Constantia, "Lucida Bright", Lucidabright, "Lucida Serif", Lucida, "DejaVu Serif", "Bitstream Vera Serif", "Liberation Serif", Georgia, serif),
);
```

### hu-font-size

```scss
$hu-font-size-modules: (base, responsive);

$hu-font-size-types: (
  100: hu-rem(10),
  200: hu-rem(12),
  300: hu-rem(14),
  400: hu-rem(16),
  500: hu-rem(18),
  600: hu-rem(20),
  700: hu-rem(22),
  800: hu-rem(24),
  900: hu-rem(26),
  1000: hu-rem(28),
);
```

### hu-font-smoothing

```scss
$hu-font-smoothing-modules: (base);
```

### hu-font-weight

```scss
$hu-font-weight-modules: (base);

$hu-font-weight-types: (
  400,
  700,
);
```

### hu-height

```scss
$hu-height-modules: (base, print);

$hu-height-types: (
  0: 0,
  100: 100%,
  100vh: 100vh,
  auto: auto,
);
```

### hu-justify-content

```scss
$hu-justify-content-modules: (base, responsive);

$hu-justify-content-types: (
  center,
  end,
  flex-end,
  flex-start,
  left,
  normal,
  right,
  space-around,
  space-between,
  space-evenly,
  start,
  stretch,
);
```

### hu-justify-items

```scss
$hu-justify-items-modules: (base, responsive);

$hu-justify-items-types: (
  auto,
  baseline,
  center,
  end,
  flex-end,
  flex-start,
  left,
  normal,
  right,
  self-end,
  self-start,
  start,
  stretch,
);
```

### hu-letter-spacing

```scss
$hu-letter-spacing-modules: (base);

$hu-letter-spacing-types: (
  n200: -0.2em,
  n100: -0.1em,
  0: 0,
  100: 0.1em,
  200: 0.2em,
  normal: normal,
);
```

### hu-line-height

```scss
$hu-line-height-modules: (base, responsive);

$hu-line-height-types: (
  0: 0,
  100: 1,
  200: 1.2,
  300: 1.4,
  400: 1.6,
  500: 1.8,
  600: 2,
  700: 2.2,
  800: 2.4,
  900: 2.6,
  1000: 2.8,
);
```

### hu-list-style

```scss
$hu-list-style-modules: (base);

$hu-list-style-types: (
  circle,
  decimal,
  decimal-leading-zero,
  disc,
  lower-alpha,
  lower-roman,
  none,
  square,
  upper-alpha,
  upper-roman,
);
```

### hu-margin

```scss
$hu-margin-modules: $hu-spacing-modules;

$hu-margin-scale: $hu-spacing-scale;

$hu-margin-types: (
  margin: margin,
  margin-b: margin-bottom,
  margin-l: margin-left,
  margin-r: margin-right,
  margin-t: margin-top,
  margin-h: (margin-left, margin-right),
  margin-v: (margin-bottom, margin-top),
);
```

### hu-max-height

```scss
$hu-max-height-modules: (base, print);

$hu-max-height-types: $hu-height-types;
```

### hu-max-width

```scss
$hu-max-width-modules: (base);

$hu-max-width-types: (
  100: 100%,
);
```

### hu-min-width

```scss
$hu-min-width-modules: (base);

$hu-min-width-types: (
  0: 0,
  100: 100%,
  100vw: 100vw,
  none: none,
);
```

### hu-momentum-scrolling

```
momentum-scrolling -> webkit-overflow-scrolling
```

```scss
$hu-momentum-scrolling-modules: (base);
```

### hu-opacity

```scss
$hu-opacity-modules: (base);

$hu-opacity-types: (
  0: 0,
  10: 0.1,
  20: 0.2,
  25: 0.25,
  30: 0.3,
  40: 0.4,
  50: 0.5,
  60: 0.6,
  70: 0.7,
  75: 0.75,
  80: 0.8,
  90: 0.9,
  100: 1,
);
```

### hu-order

```scss
$hu-order-modules: (base, responsive);

$hu-order-types: (
  0,
  1,
  2,
  3,
  4,
  5,
);
```

### hu-overflow

```scss
$hu-overflow-modules: (base, print, responsive);

$hu-overflow-types: (
  auto,
  hidden,
  visible,
  );
  ```

### hu-overflow-x

```scss
$hu-overflow-x-modules: $hu-overflow-modules;

$hu-overflow-x-types: $hu-overflow-types;
```

### hu-overflow-y

```scss
$hu-overflow-y-modules: $hu-overflow-modules;

$hu-overflow-y-types: $hu-overflow-types;
```

### hu-overscroll

```
overscroll -> overscroll-behavior
```

```scss
$hu-overscroll-modules: (base);

$hu-overscroll-types: (
  auto,
  contain,
  none,
);
```

### hu-padding

```scss
$hu-padding-modules: $hu-spacing-modules;

$hu-padding-scale: $hu-spacing-scale;

$hu-padding-types: (
  padding: padding,
  padding-b: padding-bottom,
  padding-l: padding-left,
  padding-r: padding-right,
  padding-t: padding-top,
  padding-h: (padding-left, padding-right),
  padding-v: (padding-bottom, padding-top),
);
```

### hu-pointer-events

```scss
$hu-pointer-events-modules: (base, group-state, state);

$hu-pointer-events-types: (
  auto,
  none,
);
```

### hu-pos

```
pos -> bottom, left, right, top
```

```scss
$hu-pos-modules: (base, group-state, responsive, state);

$hu-pos-scale: (
  0: 0,
  50: 50%,
  100: 100%,
  auto: auto,
);

$hu-pos-types: (
  pos-b: bottom,
  pos-bl: (bottom, left),
  pos-br: (bottom, right),
  pos-l: left,
  pos-r: right,
  pos-t: top,
  pos-tl: (left, top),
  pos-tlbr: (bottom, left, right, top),
  pos-tr: (right, top),
);
```

### hu-position

```scss
$hu-position-modules: (base, hocus, group-hover, group-state, responsive, state);

$hu-position-types: (
  absolute,
  fixed,
  relative,
  static,
  sticky,
);
```

### hu-rotate

```scss
$hu-rotate-modules: ();

$hu-rotate-types: (
  n360: rotate(-360deg),
  n270: rotate(-270deg),
  n180: rotate(-180deg),
  n90: rotate(-90deg),
  n45: rotate(-45deg),
  0: rotate(0),
  45: rotate(45deg),
  90: rotate(90deg),
  180: rotate(180deg),
  270: rotate(270deg),
  360: rotate(360deg),
);
```

### hu-scale

```scss
$hu-scale-modules: (hocus);

$hu-scale-types: (
  0: scale(0),
  50: scale(0.5),
  80: scale(0.8),
  85: scale(0.85),
  90: scale(0.9),
  95: scale(0.95),
  100: scale(1),
  105: scale(1.05),
  110: scale(1.1),
  115: scale(1.15),
  120: scale(1.2),
  150: scale(1.5),
);
```

### hu-scroll-behavior

```scss
$hu-scroll-behavior-modules: (base);

$hu-scroll-behavior-types: (
  auto,
  smooth,
);
```

### hu-shadow

```scss
$hu-shadow-modules: ();

$hu-shadow-types: ();
```

### hu-svg-fill-color

```
svg-fill-color -> fill
```

```scss
$hu-svg-fill-color-modules: $hu-bg-color-modules;

$hu-svg-fill-color-types: map-merge((current: (current: currentColor)), $hu-colors);
```

### hu-svg-fill-rule

```
svg-fill-rule -> fill-rule
```

```scss
$hu-svg-fill-rule-modules: (base);

$hu-svg-fill-rule-types: (
  even-odd: evenodd,
);
```

### hu-svg-stroke-color

```
svg-stroke-color -> stroke
```

```scss
$hu-svg-stroke-color-modules: $hu-bg-color-modules;

$hu-svg-stroke-color-types: $hu-svg-fill-color-types;
```

### hu-table-border

```
table-border -> border-collapse
```

```scss
$hu-table-border-modules: (base);

$hu-table-border-types: (
  collapse,
  separate,
);
```

### hu-table-layout

```scss
$hu-table-layout-modules: (base);

$hu-table-layout-types: (
  auto,
  fixed,
);
```

### hu-text-align

```scss
$hu-text-align-modules: (base, responsive);

$hu-text-align-types: (
  center,
  justify,
  left,
  right,
);
```

### hu-text-case

```
text-case -> text-transform
```

```scss
$hu-text-case-modules: (base);

$hu-text-case-types: (
  lower: lowercase,
  normal: none,
  title: capitalize,
  upper: uppercase,
);
```

### hu-text-decoration

```scss
$hu-text-decoration-modules: (base);

$hu-text-decoration-types: (
  line-through,
  none,
  underline,
);
```

### hu-theme-bg-color

```
theme__bg-color -> background-color
```

```scss
$hu-theme-bg-color-modules: $hu-bg-color-modules;

$hu-theme-bg-color-types: $hu-themes;
```

### hu-theme-border-color

```
theme__border-color -> border-color
```

```scss
$hu-theme-border-color-modules: $hu-border-modules;

$hu-theme-border-color-sides: $hu-border-sides;

$hu-theme-border-color-types: $hu-themes;
```

### hu-theme-color

```
theme__color -> color
```

```scss
$hu-theme-color-modules: $hu-theme-bg-color-modules;

$hu-theme-color-types: $hu-themes;
```

### hu-transform

```scss
$hu-transform-modules: ();

$hu-transform-types: ();
```

### hu-transition-delay

```scss
$hu-transition-delay-modules: (base, group-hover, group-state, reduced-motion, state);

$hu-transition-delay-types: (
  0: 0s,
  100: 0.1s,
  200: 0.2s,
  300: 0.3s,
  400: 0.4s,
  500: 0.5s,
  1000: 1s,
);
```

### hu-transition-duration

```scss
$hu-transition-duration-modules: (base, group-hover, group-state, reduced-motion, state);

$hu-transition-duration-types: (
  0: 0s,
  100: 0.1s,
  200: 0.2s,
  300: 0.3s,
  400: 0.4s,
  500: 0.5s,
  1000: 1s,
);
```

### hu-transition-easing

```
transition-easing -> transition-timing-function
```

```scss
$hu-transition-easing-modules: (base, group-hover, group-state, reduced-motion, state);

$hu-transition-easing-types: (
  ease: ease,
  ease-in: ease-in,
  ease-in-out: ease-in-out,
  ease-in-back: cubic-bezier(0.600, -0.280, 0.735, 0.045),
  ease-in-circ: cubic-bezier(0.600, 0.040, 0.980, 0.335),
  ease-in-cubic: cubic-bezier(0.550, 0.055, 0.675, 0.190),
  ease-in-expo: cubic-bezier(0.950, 0.050, 0.795, 0.035),
  ease-in-quad: cubic-bezier(0.550, 0.085, 0.680, 0.530),
  ease-in-quart: cubic-bezier(0.895, 0.030, 0.685, 0.220),
  ease-in-quint: cubic-bezier(0.755, 0.050, 0.855, 0.060),
  ease-in-sine: cubic-bezier(0.470, 0.000, 0.745, 0.715),
  ease-in-out-back: cubic-bezier(0.680, -0.550, 0.265, 1.550),
  ease-in-out-circ: cubic-bezier(0.785, 0.135, 0.150, 0.860),
  ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1.000),
  ease-in-out-expo: cubic-bezier(1.000, 0.000, 0.000, 1.000),
  ease-in-out-quad: cubic-bezier(0.455, 0.030, 0.515, 0.955),
  ease-in-out-quart: cubic-bezier(0.770, 0.000, 0.175, 1.000),
  ease-in-out-quint: cubic-bezier(0.860, 0.000, 0.070, 1.000),
  ease-in-out-sine: cubic-bezier(0.445, 0.050, 0.550, 0.950),
  ease-out: ease-out,
  ease-out-back: cubic-bezier(0.175,  0.885, 0.320, 1.275),
  ease-out-circ: cubic-bezier(0.075, 0.820, 0.165, 1.000),
  ease-out-cubic: cubic-bezier(0.215, 0.610, 0.355, 1.000),
  ease-out-expo: cubic-bezier(0.190, 1.000, 0.220, 1.000),
  ease-out-quad: cubic-bezier(0.250, 0.460, 0.450, 0.940),
  ease-out-quart: cubic-bezier(0.165, 0.840, 0.440, 1.000),
  ease-out-quint: cubic-bezier(0.230, 1.000, 0.320, 1.000),
  ease-out-sine: cubic-bezier(0.390, 0.575, 0.565, 1.000),
  linear: linear,
  step-start: step-start,
  step-end: step-end,
);
```

### hu-transition-property

```scss
$hu-transition-property-modules: (base, group-hover, group-state, reduced-motion, state);

$hu-transition-property-types: (
  all: all,
  bg-color: background-color,
  color: color,
  height: height,
  opacity: opacity,
  transform: transform,
  visibility: visibility,
  width: width,
  none: none,
);
```

### hu-translate-x

```scss
$hu-translate-x-modules: (base);

$hu-translate-x-types: (
  n100: translateX(-100%),
  n50: translateX(-50%),
  0: translateX(0),
  50: translateX(50%),
  100: translateX(100%),
);
```

### hu-translate-y

```scss
$hu-translate-y-modules: $hu-translate-x-modules;

$hu-translate-y-types: (
  n100: translateY(-100%),
  n50: translateY(-50%),
  0: translateY(0),
  50: translateY(50%),
  100: translateY(100%),
);
```

### hu-truncate-text

```scss
$hu-truncate-text-modules: (base, group-state, state);

$hu-truncate-text-types: (
  truncate-text-off: (
    overflow: visible,
    text-overflow: initial,
    white-space: wrap
  ),
  truncate-text-on: (
    overflow: hidden,
    text-overflow: ellipsis,
    white-space: nowrap
  ),
);
```

```css
.truncate-text-off {
  overflow: visible;
  text-overflow: initial;
  white-space: wrap;
}

.truncate-text-on {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

### hu-vertical-align

```scss
$hu-vertical-align-modules: (base);

$hu-vertical-align-types: (
  baseline,
  bottom,
  middle,
  text-bottom,
  text-top,
  top,
);
```

### hu-visibility

```scss
$hu-visibility-modules: (base, hocus, group-hover, group-state, print, responsive, state);

$hu-visibility-types: (
  hidden,
  visible,
);
```

### hu-visually-hidden

```scss
$hu-visually-hidden-modules: (base);
```

```css
.visually-hidden {
  border: none;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```

### hu-white-space

```scss
$hu-white-space-modules: (base);

$hu-white-space-types: (
  no-wrap: nowrap,
  normal: normal,
  pre: pre,
  pre-line: pre-line,
  pre-wrap: pre-wrap,
);
```

### hu-width

```scss
$hu-width-modules: (base, print, responsive);

$hu-width-types: (
  0: 0,
  5: 5%,
  10: 10%,
  16: 16.66667%,
  20: 20%,
  25: 25%,
  30: 30%,
  33: 33.33333%,
  40: 40%,
  50: 50%,
  60: 60%,
  70: 70%,
  75: 75%,
  80: 80%,
  83: 83.33333%,
  90: 90%,
  100: 100%,
  100vw: 100vw,
  auto: auto,
);
```

### hu-z-index

```scss
$hu-z-index-modules: (base, hocus, group-hover, group-state, state);

$hu-z-index-types: (
  auto: auto,
  inherit: inherit,
  n1: -1,
  0: 0,
  100: 100,
  200: 200,
  300: 300,
  400: 400,
  500: 500,
  600: 600,
  700: 700,
  800: 800,
  900: 900,
  1000: 1000,
  9999: 9999,
);
```