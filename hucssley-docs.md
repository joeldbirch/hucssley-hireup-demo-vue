# Hucssley

Hucssley is very different to traditional frameworks like Bootstrap or Semantic UI, as it contains zero pre-built UI components, instead providing you with the atomic building blocks necessary for **you** to create any UI component.

It honours the groundwork laid by earlier utility class libraries such as [Tachyons](https://tachyons.io) and [Tailwind](https://tailwindcss.com), while hoping to address some of their deficiencies,

Hucssley has a few goals:

1. To be incredibly easy to learn and use, by providing a system of atomic classes that mostly map 1:1 with existing CSS properties.
2. To allow anyone of any skill to rapidly build for the web without unknowingly causing CSS bloat or fighting against some of CSS's core, but sometimes difficult to understand principals.
3. To provide the tools required to build UI for any breakpoint, user interaction or UI state.
4. To be completely platform agnostic and portable between front-end stacks, with Sass being the only dependency.
5. To be highly flexible to your needs, with the ability to easily customize existing classes and create new ones.

To understand the reasoning behind its creation, please read [Rethinking CSS](/rethinking-css.md).

---

## What's in the box?

Currently, Hucssley provides utilities for ~100 CSS properties, of which multiple, sensible default values are generated. Each utility is also created for various "modules", whether that's at certain breakpoints, UI states, user interactions, for print or more.

Each utility is completely customisable; they can be partially renamed, have values changed, have their modules altered or be omitted entirely.

Hucssley does not come with classes that don't map explicitly to specific property types (such as `box-shadow`, background gradients and `transform`s), however, tailored, custom classes for these are simple to create. Hucssley does provide utility classes for truncating text and making elements "visually hidden" for accessibilty purposes.

Hucssley also comes with:

* A sensible CSS reset to make building UI easier.
* Functions for converting `px` values to `em` and `rem` for improved accessibilty.
* Functions to amend incrementally darken (`shade`) or lighten (`tint`) colours.
* The ability to theme components based off a parent selector.
* The ability to create classes scoped to custom parent selectors.
* The ability to create classes the map to pseudo-classes and pseudo-selectors.

---

## A working example

The following example demonstrates how you can use Hucssley out-of-the-box to create easily create a responsive, accessible, interactive component.

```html
<div class="
  bg-color-blue-100
  padding-500
">
  <div class="
    align-items-center
    bg-color-neutral-0
    border-color-neutral-200
    border-radius-500
    border-style-solid
    border-width-100
    display-flex
    flex-direction-column
    padding-500
    text-align-center
    bp-768--flex-direction-row
    bp-768--text-align-left
  ">
   <img
      alt=""
      class="
        bg-color-blue-600
        border-color-neutral-100
        border-radius-1000
        border-style-solid
        border-width-200
        margin-b-400
        width-50
        bp-600--width-30
        bp-768--margin-b-0
        bp-768--margin-r-500
        bp-768--width-20
      "
      src="https://hireup.cdn.prismic.io/hireup/89e15301c28e6396927d85e38e9c5d5833ebab09_kyle_357-bonnie.png"
    />
    <div>
      <p class="
        font-size-600
        font-weight-700
        line-height-200
        margin-b-400
        bp-768--font-size-800
      ">
        Disability support workers who love what you love
      </p>
      <a
        href="#"
        class="
          bg-color-blue-1000
          border-color-neutral-700
          color-neutral-0
          display-inline-block
          padding-h-400
          padding-v-300
          transition-property-all
          transition-duration-200
          transition-easing-ease
          bp-768--font-size-600
          bp-768--padding-h-500
          bp-768--padding-v-400
          hocus--bg-color-blue-600
          hocus--scale-105
      ">
        Find your connection
      </a>
    </div>
  </div>
</div>
```

---

## Installation

If you want to use Hucssley as it comes, then it's as simple as:

```scss
@import "hucssley/index";
```

However, if you want to customize Hucssley, we recommend taking this approach:

```scss
@import "hucssley/helpers";

@import "hucssley/variables/global/index";
// @import "custom/variables/global/index";

@import "hucssley/variables/classes/index";
// @import "custom/variables/classes/index";
// set class overrides before if you don't need access to the defaults & want changes to flow through referenced vars

@import "hucssley/variables/reset/index";
// @import "custom/variables/reset/index";

@import "hucssley/styles";
// @import "custom/classes/index";
```

---

## Syntax

### Modules

#### Base: `base`

Base classes in Hucssley roughly equate to a kebab-cased version of a CSS property and value:

This property:

```css
{
  align-items: flex-end;
}
```

would be available available as the following, base class:

```css
.align-items-center-flex-end
```

Some classes deviate by default though:

```css
backface -> backface-visibility
bg-color -> background-color
bg-image -> background-image
bg-position-x -> background-position-x
bg-position-y -> background-position-y
bg-repeat -> background-repeat
blend-mode -> mix-blend-mode
momentum-scrolling -> webkit-overflow-scrolling
overscroll -> overscroll-behavior
pos-[b,l,r,t] -> bottom, left, right, top
rotate -> transform: rotate
scale -> transform: scale
shadow -> box-shadow
svg-fill-color -> fill
svg-fill-rule -> fill-rule
svg-stroke-color -> stroke
table-border -> border-collapse
text-case -> text-transform
transition-easing -> transition-timing-function
translate-x -> transform: translateX
translate-y -> transform: translateY
```

If a value is a negative number, its class name output will use `-n[value]`, such as `margin-l-n100` instead of `margin-l--100`, to make it obvious that it's "negative" and to not be confused with the "modifying" syntax described below. 

If the last two words separated by a hyphen are identical, then the last word will automatically be omitted. For instance `.flex-wrap` is used instead of `flex-wrap-wrap`, but `flex-wrap-no-wrap` would be the equivalent `no-wrap` version.

*Note: If a global namespace has been configured, it will always precede the base-class name.*

#### Non-parent modules: `focus, hocus, hover, print, reduced-motion, responsive`

When you want to use class names scoped to "non-parent" modules, it follows a pattern of `[module-name][-module-variant])?--[base-class]`, for instance:

```css
.bp-768--align-items-center
.hocus--color-neutral-1000
.print--flex-direction-column
```

In the above example, `hocus` is shortcut module for `:hover, :focus`, and `bp-768` is for a `(min-width: 768px)` breakpoint.

#### State modules: `state`

State modules allow you to change the UI based on a particular state, and follows the pattern `[state-name]--[base-class]`:

```css
.is-expanded--visibility-visible
.is-disabled--opacity-30
```

For state classes to become active, you need to apply the raw state name as an class additional class on the element (often via JavaScript):

```html
<div class="
  display-none
  is-open--display-block
+ is-open
"></div>
```

#### Parent modules: `group-hover, group-state` and custom parent modules

Children of groups can respond to user and UI interaction via groups. Their syntax is `[parent-name]__[parent-type]--[base-class]`:

```
.group__hover--scale-110
.group__is-selected--bg-color-blue-300
.browser-mobile__font-size-700
```

For `group` classes to take effect, a parent has to be given the raw group class, and raw state class if applicable:

```html
<html class="browser-mobile">
  …
  <div class="
    group
+   is-selected
  ">
    <ul class="
      browser-mobile__font-size-700
      group__hover--scale-110
      group__is-selected--bg-color-blue-300
    "></ul>
  </div>
</html>
```

Be careful when using groups, because they will affect all `.group__` children. A child `.group` does not reset the actions of a parent `.group`, so you could end up with unexpected behavior.

*Note: `.browser-mobile` is an example of a custom parent selector, and not included in Hucssley by default.*

#### Combining modules: `responsive` and `group-state, state`

When a particular class is configured to use the `responsive` module, it will also output `state` and `group-state` classes should they have also been configured.

Here the syntax is `bp-[responsive-scale]-[state-name]--[base-class]` for states, and `group__bp-[responsive-scale]-[state-name]--[class-name]`:

```css
.bp-960-is-expanded--display-flex
.group__bp-1200-is-collapsed--height-0
```

## Scales

Compared with other libraries, where it makes sense, Hucssley favors a millennial scale (`0` - `1000`) to represent values instead of "names" like `xxl`, `mama-bear` etc. This can of course be completely customised.

By default, the following classes use a millennial scale:

* `bg-color`
* `border-color`
* `border-radius`
* `border-width`
* `color`
* `font-size`
* `letter-spacing`
* `line-height`
* `margin`
* `padding`
* `transition-delay`
* `transition-duration`

While others, like `opacity` and `scale` use values more relevant to your conceptual model.

## Configuration

To override the default configuration in Hucssley, you'll need to understand the basic syntax of Sass [variables](https://sass-lang.com/documentation/variables), [lists](https://sass-lang.com/documentation/values/lists) and [maps](https://sass-lang.com/documentation/values/maps).

Hucssley's configuration is split in to 3 sections: `reset`, `global` and `classes`.

* **Reset** configuration uses plain variables to customize "generic" styles like whether `box-sizing: border-box` should be used by default.
* **Global** configuration mostly uses maps to handle things like the default responsive breakpoints, colors, spacings, UI states and themes.
* **Classes** provides list and map variables to adjust the modules, and values for each class individually. Some classes (like those which deal with color) inherit from the same base variable by default, so only 1 change is required to affect all `border-color`, `background-color` and `color` classes. All classes can be generated at individual modules described above.

As detailed in the [Installation](#installation) section, there is a preferred way of organizing any configuration overrides.

### Configuration helpers

Hucssley provides several functions that can assist you with modifying the existing configuration or configuring custom classes:

#### `hu-append` and `hu-prepend`

```scss
@function hu-append($source, $target);

hu-append((a, b), (c));
// -> (a, b, c)
```

Will append the `$target` list or map to the `$source` list or map.

```scss
@function hu-prepend($source, $target);

hu-prepend((a, b), (c));
// -> (c, a, b)
```

Will prepend the `$target` list or map to the `$source` list or map.

With both of the above functions, they have to be of the same type. when used with maps, they actually perform a `map-merge`, so existing keys in `$source` will also be overwritten with `$target`'s, should they exist there.

#### `hu-get`

```scss
@function hu-get($map, $path);;

hu-get($hu-colors, neutral 1000);
// -> #1a1a1a
```

Grabs the value at a specific path within a map.

#### `hu-em` and `hu-rem`

```scss
@function hu-em($target, $context: 16);

hu-em(20px);
// -> 1.25em
```

Will convert a target to pixel value to its `em` equivalent.

```scss
@function hu-rem($target, $context: 16);

hu-rem(24px);
// -> 1.5rem
```

Will convert a target to pixel value to its `rem` equivalent.

#### `hu-tint` and `hu-shade`

```scss
@function hu-tint($color, $percentage);

hu-tint(#361110, 40);
// -> #867070;
```

Will mix the specified `$color` with a `$percentage` of white.

```scss
@function hu-shade($color, $percentage);

hu-shade(#361110, 40);
// -> #200a0a;
```

Will mix the specified `$color` with a `$percentage` of black.

### Reset

Here is a list of variables and default value that are available to customise in the CSS reset:

```scss
$hu-reset-box-sizing: border-box;
$hu-reset-html-background-color: #fff;
$hu-reset-html-color: null;
$hu-reset-html-font-family: null;
$hu-reset-html-font-size: $hu-f-rem-context;
$hu-reset-html-font-smoothing: true;
$hu-reset-html-overflow-y: null;
$hu-reset-img-responsive: true;
$hu-reset-input-focus-color: null;
$hu-reset-input-placeholder-color: #767676;
```

### Global

#### Colors: `$hu-colors`

To get you started, Hucssley provides a generous palette of colours in the spectrum at multiple scales, as well as for keywords like `inherit` and `transparent`:

```scss
$hu-colors: (
  neutral: (
    0: #ffffff,
    …
    500: #898989,
    …
    1000: #1a1a1a,
  ),
  red: (
    100: #f9ecea,
    …
    500: #d9524b,
    …
    1000: #361110,
  ),
  orange: (
    100: #faefea,
    …
    500: #dc7d51,
    …
    1000: #371d11,
  ),
  yellow: (
    100: #fcfcec,
    …
    500: #e9e262,
    …
    1000: #3b3a16,
  ),
  green: (
    100: #edfbf4,
    …
    500: #7ae69a,
    …
    1000: #1c3a25,
  ),
  blue: (
    100: #ebf6fb,
    …
    500: #67bbe5,
    …
    1000: #172e3a,
  ),
  indigo: (
    100: #ede9fa,
    …
    500: #5e4be1,
    …
    1000: #141039,
  ),
  violet: (
    100: #f8eafb,
    …
    500: #cb54e3,
    …
    1000: #321239,
  ),
);
```

You can see the rendered palette here: https://codepen.io/stowball/full/JqbGvK

To customise the palette, you can either `hu-append` or `hu-prepend` other maps to complement the existing, or start fresh by re-assigning `$hu-colors` to a new map of colours entirely.

We recommend also `hu-appending` `$hu-colors-keywords` to your brand new palette to ensure you can use classes like `bg-color-transparent` and `color-inherit`;

Here is an example of setting a completely new palette:

```scss
$hu-colors: hu-append((
  neutral: (
    0: #fff,
    100: #fafbfd,
    200: #f9fafc,
    300: #f1f4f8,
    400: #f1f1f1,
    500: #e0e1e2,
    600: #aeaeae,
    700: #888,
    800: #626262,
    900: #495b60,
    1000: #140a01,
  ),
  blue: (
    100: #f3f9ff,
    300: #cff5fa,
    400: #afeff7,
    600: #00c2da,
    1000: #003453,
  ),
  yellow: (
    200: #fdf8c2,
    300: #fbf5ac,
  ),
  green: (
    1000: #17653b,
  ),
  red: (
    100: #fffdfc,
    1000: #b40b00,
  ),
), $hu-colors-keywords);
```

#### Responsive breakpoints: `$hu-breakpoints`

Out-of-the-box, Hucssley provides the following 7 breakpoint values, with all being output for every `responsive` class name. It can be modified or replaced entirely to suit your project.

```scss
$hu-breakpoints: (
  360: hu-em(360),
  480: hu-em(480),
  600: hu-em(600),
  768: hu-em(768),
  960: hu-em(960),
  1024: hu-em(1024),
  1280: hu-em(1280),
);
```

If the value of an `$hu-breakpoints` key is a number, it will compile it to a `(min-width: [value])` media query.

If, however, you provide a map which has keys named `min` or `max`, you can choose to output `(min-width)`, `(max-width)` or a combined `(min-width) and (max-width)` media query.

To demonstrate, this variable:

```scss
$hu-breakpoints: (
  until-359: (max: hu-em(359)),
  360: (min: hu-em(360)),
  "600-767": (min: hu-em(600), max: hu-em(767)),
);
```

would generate the following `bp-` classes:

```css
@media (max-width: 22.4375em) {
  bp-until-359--… { … }
}

@media (min-width: 22.5em) {
  bp-360--… { … }
}

@media (min-width: 37.5em) and (max-width: 47.9375em) {
  bp-600-767--… { … }
}
```

Notice how, apart from the `bp-` prefix, Hucssley does not dictate the breakpoint class name format. so should you wish to use ranges like `small` or `medium`, or device types like `tablet`, or `desktop`, it's entirely up to you.

#### UI states: `$hu-states`

Out-of-the-box, Hucssley provides the following 10 UI state values, with all being output for every `state` and `group-state` class name. It can be modified or replaced entirely to suit your project.

```scss
$hu-states: (
  is-active,
  is-closed,
  is-collapsed,
  is-disabled,
  is-expanded,
  is-hidden,
  is-loading,
  is-open,
  is-selected,
  is-visible,
);
```

#### Spacings: `$hu-spacing-modules` and `$hu-spacing-scale`

By default, `margin` and `padding` classes are generated for the following modules: `base, responsive`:

```
$hu-spacing-modules: (base, responsive) !default;
```

And from the spacing scale defined in `$hu-spacing-scale`.

```scss
$hu-spacing-scale: (
  0: 0,
  100: hu-rem(2),
  200: hu-rem(4),
  300: hu-rem(8),
  400: hu-rem(16),
  500: hu-rem(24),
  600: hu-rem(32),
  700: hu-rem(48),
  800: hu-rem(64),
  auto: auto,
);
```

You can easily amend or override any of these values to suit your project.

#### Borders: `$hu-border-modules`, `$hu-border-sides` and `$hu-border-types`

By default, `.border-color-`, `.border-style-` and `.border-width-` classes use the 2 or 3 of the global border variables to control which modules, sides and colors they're output at.

```scss
$hu-border-modules: (base);

$hu-border-sides: (
  border: border,
  border-b: border-bottom,
  border-l: border-left,
  border-r: border-right,
  border-t: border-top,
  border-h: (border-left, border-right),
  border-v: (border-bottom, border-top),
);

$hu-border-types: $hu-colors;
```

In conjunction with variables specific to each class name, a lot of classes like are generated:

```css
.border-color-neutral-0
.border-v-color-blue-600
.border-b-style-none
.border-h-width-200
```

#### Controlling `:focus`: `$hu-hocus-focus-parent` and `$hu-hocus-focus-pseudo`

By default, the `focus` and `hocus` modules generate classes which use a `:focus` pseudo-class. This can be customized, should you wish to use `:focus-visible` or even in conjunction with a polyfill.

```scss
$hu-focus-pseudo: ":focus-visible";

/* ->
.focus--[class-name]:focus-visible,
.hocus--[class-name]:focus-visible {
  // declarations
}
*/
```

or

```scss
$hu-focus-parent: ".js-focus-visible";
$hu-focus-pseudo: ":focus:not(.focus-visible)";

/* ->
.js-focus-visible .focus--[class-name]:focus:not(.focus-visible),
.js-focus-visible .hocus--[class-name]:focus:not(.focus-visible) {
  // declarations
}
*/
```

#### Themes: `$hu-themes`

As well as the standard `$hu-colors`, "color" classes can also be generated for theming your application based on the key/vaue pairs in this map.

By default, no themes are provided, but making your own is easy:

```scss
$hu-themes: (
  broncos: (
    primary: #6c1d45,
    secondary: #9e2b64,
    highlight: #f8cc0d,
  ),
  knights: (
    primary: #003b73,
    secondary: #1d54a6,
    highlight: #e82c2a,
  ),
  sharks: (
    primary: #1f7eb2,
    secondary: #27a3e6,
    highlight: #95d1f2,
  ),
);
```

This would allow you to theme your entire application simply by changing a single, parent level `theme-[theme-name]` class by utilizing all the generated classes, like:

```css
.theme-broncos .theme__bg-color-primary {
  background-color: #6c1d45;
}

.theme-knights .theme__color-highlight {
  color: #e82c2a;
}

.theme-sharks .theme__border-color-secondary {
  border-color: #27a3e6;
}
```

#### Namespace: `$hu-namespace`

As mentioned earlier, Hucssley provides you the opportunity to namespace the class names generated, to help ensure there's no conflict or pollution with other possible frameworks.

```scss
$hu-namespace: `hu-`;

// -> .hu-align-content-center, .bp-480--hu-flex-direction-column, .group__is-open--hu--display-flex
```

#### Debug: `$hu-debug`

With Hucssley generating every class for you, you may encounter scenarios where you need to debug the output when using [webpack's style-loader](https://webpack.js.org/loaders/style-loader) which outputs the CSS within a `<style>` tag in the `<head>`.

By setting `$hu-debug: true;` before `@import "hucssley/styles";` all of the CSS will be printed to the screen, above your UI for you to review and debug.

### Classes

Every class in Hucssley can be completely customized to individually change the properties, values and modules used.

**For details of all the classes provided by default and their configuration, please read [Hucssley classes](/hucssley-classes.md).**

---

## Creating custom classes

While Hucssley provides an abundance of classes out-of-the-box, there will absolutely be times where you need to create your own to achieve your desired UI, which is hopefully straight-forward to achieve.

### Customizing "placeholder" classes

Some of the default classes in Hucssley are merely provided as empty placeholders, because their usage is too specific to be generically useful for all projects. These placeholders help to reduce some of the "ceremony" needed with creating completely custom classes.

A good example of this is for (box) shadows. By overriding the empty `$hu-shadow-modules` and `$hu-shadow-types` variables, developers can easily output `box-shadow`s appropriate for their project.

The following snippet also demonstrates how you can use [configuration helper](#configuration-helpers) methods within your definitions:

```scss
$hu-shadow-modules: (base);

$hu-shadow-types: (
  100: 0 hu-rem(2) hu-rem(10) rgba(hu-get($hu-colors, neutral 1000), 0.1),
  200: 0 hu-rem(4) hu-rem(12) rgba(hu-get($hu-colors, neutral 1000), 0.2),
);
```

will generate:

```css
.shadow-100 {
  box-shadow: 0 0.125rem 0.625rem rgba(26, 26, 26, 0.1);
}

.shadow-200 {
  box-shadow: 0 0.25rem 0.75rem rgba(26, 26, 26, 0.2);
}
```

### Helper Functions

Although there's a defined pattern for creating your own classes, before you do, it's worth having a basic understanding of the functions and mixins you'll use.

#### `hu-class-name`

This function formats a class name to append `$hu-namespace` (if applicable), convert duplicate final strings (e.g. `color-transparent-transparent` to `color-transparent`) and escape special characters like `:`, `<`, `>` and `@`.

```scss
@function hu-class-name($class-name);

hu-class-name("eqio-<520-flex-wrap-wrap");
// -> hu-eqio-\00003c520-flex-wrap
```

#### `hu-format-modules`

This function removes duplicates and re-orders the list of modules in to the correct specificity order so you needn't worry about this aspect of your CSS.

```scss
@function hu-format-modules($list-of-modules);

hu-format-modules((state, print, responsive, state, base));
// -> (base, state, print, responsive)
```

### Mixins

*Note: All of the following examples assume `$hu-namespace: "hu-"` has been set.*

#### `hu-generic`

Generates the `base`, `focus`, `hover`, `hocus`, `state`, `group-hover`, `group-state`, `reduced-motion` and `print` module styles for a class (in that order) while also adding the correct specificity.

```scss
@mixin hu-generic($class-name, $one-or-multiple-modules);

@include hu-generic(hu-class-name(display-block), (base, group-hover, print)) {
  display: block;
}

/* ->
.hu-display-block {
  display: block;
}

.group:hover .group__hover--hu-display-block {
  display: block;
}

@media print {
  .print--hu-display-block.print--hu-display-block.print--hu-display-block {
    display: block;
  }
}
*/
```

#### `hu-responsive`

Generates the responsive `base`, `state` and `group-state` module styles for a class (in that order).

*Note: it does not generate the required media queries, as they need to be created in a specific manner as described below.*

```scss
@mixin hu-responsive($class-name, $one-or-multiple-modules, $breakpoint-scale);

@include hu-responsive(hu-class-name(display-block), (base, responsive, state), medium) {
  display: block;
}

/* ->
.bp-medium--hu-display-block {
  display: block;
}

.is-active.bp-medium-is-active--hu-display-block {
  display: block;
}
*/
```

#### `hu-parent`

Generates the `base`, `focus`, `hover`, `hocus`, `state`, `reduced-motion` and `print` module styles for a parent selector class (in that order) while also adding the correct specificity.

```scss
@mixin hu-parent($class-name, $parent-selectors, $one-or-multiple-modules, $child-string-to-strip?) {

@include hu-parent(hu-class-name(display-block), (browser-edge, browser-ie), (base, hover)) {
  display: block;
}

/* ->
.browser-edge .browser-edge__hu-display-block {
  display: block;
}

.browser-ie .browser-ie__hu-display-block {
  display: block;
}

.browser-edge:hover .browser-edge__hover--hu-display-block {
  display: block;
}

.browser-ie:hover .browser-ie__hover--hu-display-block {
  display: block;
}
*/
```

The optional `$child-string-to-strip` argument is to remove characters before the `__`, and can be useful if you create a generic child class that can respond to any parent selector, such as is used in when generating themes.

#### `hu-parent-responsive`

Generates the responsive `base` and `state` module styles for a parent selector class (in that order).

*Note: it does not generate the required media queries, as they need to be created in a specific manner as described below.*

```scss
@mixin hu-parent-responsive($class-name, $parent-selectors, $one-or-multiple-modules, $breakpoint-scale, $child-string-to-strip?) {

@include hu-parent-responsive(hu-class-name(display-block), (browser-edge, browser-ie), (base, responsive), medium) {
  display: block;
}

/* ->
.browser-edge .browser-edge__bp-medium--hu-display-block {
  display: block;
}

.browser-ie .browser-ie__bp-medium--hu-display-block {
  display: block;
}
*/
```

#### `hu-pseudo`

Generates the `base`, `focus`, `hover`, `hocus`, `state`, `reduced-motion` and `print` module styles for a pseudo selector class (in that order) while also adding the correct specificity.

```scss
@mixin hu-pseudo($class-name, $pseudo-selectors, $one-or-multiple-modules) {

@include hu-pseudo(hu-class-name(display-block), ("::before", ":first-child"), (base, reduced-motion)) {
  display: block;
}

/* ->
pseudo-before--hu-display-block::before {
  display: block;
}

.pseudo-first-child--hu-display-block:first-child {
  display: block;
}

@media (prefers-reduced-motion: reduce) {
  .reduced-motion-pseudo-before--hu-display-block::before.reduced-motion-pseudo-before--hu-display-block::before.reduced-motion-pseudo-before--hu-display-block::before {
    display: block;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reduced-motion-pseudo-first-child--hu-display-block:first-child.reduced-motion-pseudo-first-child--hu-display-block:first-child.reduced-motion-pseudo-first-child--hu-display-block:first-child {
    display: block;
  }
}
*/
```

#### `hu-pseudo-responsive`

Generates the responsive `base` and `state` module styles for a pseudo selector class (in that order).

*Note: it does not generate the required media queries, as they need to be created in a specific manner as described below.*

```scss
@mixin hu-pseudo-responsive($class-name, $pseudo-selectors, $one-or-multiple-modules, $breakpoint-scale) {

@include hu-pseudo-responsive(hu-class-name(display-block), ("::before", ":first-child"), (base, responsive), medium) {
  display: block;
}

/* ->
.bp-medium-pseudo-before--display-block::before {
  display: block;
}

.bp-medium-pseudo-first-child--display-block:first-child {
  display: block;
}
*/
```

### Creating new classes

Now we have a basic understanding of the functions and mixins used to create classes, we can follow Hucssley's approach to create our own.

Let's write some classes to size icons…

#### Defining the variables

Regardless of how simple you think the class may be, we recommend setting it up in a way to cater for any complexity as your project grows, so let's first define the variables required.

Each class needs to know which modules it will be created for, and the types and values to use.

```scss
$icon-size-modules: (base, responsive);

$icon-size-types: (
  100: hu-rem(16),
  200: hu-rem(24),
);
```

*Note: Don't prefix custom variables with `hu-` to ensure you don't accidentally overwrite future updates to Hucssley.*

#### Writing the class logic

Although the mixins described above can take a list of modules, to ensure the correct class name order is produced for multiple types, it is recommended to manually loop over the modules externally by following this pattern:

```scss
// loop through the formatted modules in order
@each $module in hu-format-modules($icon-size-modules) {
  // loop through and extract $type & $value variables from each item in $types
  @each $type, $value in $icon-size-types {
    // define the class name you want, including the $type
    $class-name: hu-class-name(icon-size-#{$type});
    // ensure $value supports $types that are both lists and maps
    $value: if($value, $value, $type);

    // call hu-generic with the $class-name and $module
    @include hu-generic($class-name, $module) {
      // write your declarations, using $value as the CSS value
      height: $value; 
      width: $value;
    }
  }
}
```

The above loop doesn't generate the responsive classes. If we generated them within that `$types` loop, you'd quickly encounter that higher scale base classes would override lower scale responsive classes. By moving them in to a separate loop and block, we can improve build time performance and run-time performance by batching up the media queries to produce smaller output.

```scss
// only try this if responsive is a module
@if index($icon-size-modules, responsive) {
  // extract $bp-scale and $bp-value variables for each breakpoint
  @each $bp-scale, $bp-value in $hu-breakpoints {
    // call the media-query mixin with $bp-value, which supports breakpoint values as min/max maps
    @include hu-media-query($bp-value) {
      // loop through and extract $type & $value variables from each item in $types
      @each $type, $value in $icon-size-types {
        // define the class name you want, including the $type
        $class-name: hu-class-name(icon-size-#{$type});
        // ensure $value supports $types that are both lists and maps
        $value: if($value, $value, $type);

        // call hu-responsive with the $class-name, *all* modules and $bp-scale
        @include hu-responsive($class-name, $icon-size-modules, $bp-scale) {
          // write your declarations, using $value as the CSS value
          height: $value; 
          width: $value;
        }
      }
    }
  }
}
```

The output from these 2 blocks is:

```css
.icon-size-100 {
  height: 1rem;
  width: 1rem;
}

.icon-size-200 {
  height: 1.5rem;
  width: 1.5rem;
}

@media (min-width: 22.5em) {
  .bp-360--icon-size-100 {
    height: 1rem;
    width: 1rem;
  }
  
  .bp-360--icon-size-200 {
    height: 1.5rem;
    width: 1.5rem;
  }
}

@media (min-width: 30em) {
  .bp-480--icon-size-100 {
    height: 1rem;
    width: 1rem;
  }
  
  .bp-480--icon-size-200 {
    height: 1.5rem;
    width: 1.5rem;
  }
}

// and all other breakpoints defined…
```

#### Creating custom pseudo classes

One benefit Hucssley has over other, similar libraries is that there is a defined method for easily creating pseudo classes. As with "generic" classes, you'll need 2 code blocks, but instead of calling `hu-generic` and `hu-responsive`, you call `hu-pseudo` and `hu-pseudo-responsive` with the appropriate, documented arguments.

```scss
// loop through the formatted modules in order
@each $module in hu-format-modules($icon-size-modules) {
  // loop through and extract $type & $value variables from each item in $types
  @each $type, $value in $icon-size-types {
    // define the class name you want, including the $type
    $class-name: hu-class-name(icon-size-#{$type});
    // ensure $value supports $types that are both lists and maps
    $value: if($value, $value, $type);

    // call hu-pseudo with the $class-name, pseudo selectors and $module
    @include hu-pseudo($class-name, ("::before"), $module) {
      // write your declarations, using $value as the CSS value
      height: $value; 
      width: $value;
    }
  }
}

// only try this if responsive is a module
@if index($icon-size-modules, responsive) {
  // extract $bp-scale and $bp-value variables for each breakpoint
  @each $bp-scale, $bp-value in $hu-breakpoints {
    // call the media-query mixin with $bp-value, which supports breakpoint values as min/max maps
    @include hu-media-query($bp-value) {
      // loop through and extract $type & $value variables from each item in $types
      @each $type, $value in $icon-size-types {
        // define the class name you want, including the $type
        $class-name: hu-class-name(icon-size-#{$type});
        // ensure $value supports $types that are both lists and maps
        $value: if($value, $value, $type);

        // call hu-pseudo responsive with the $class-name, pseudo selectors, *all* modules and $bp-scale
        @include hu-pseudo-responsive($class-name, ("::before"), $icon-size-modules, $bp-scale) {
          // write your declarations, using $value as the CSS value
          height: $value; 
          width: $value;
        }
      }
    }
  }
}
```

Generates the following:

```css
.pseudo-before--icon-size-100::before {
  height: 1rem;
  width: 1rem;
}

.pseudo-before--icon-size-200::before {
  height: 1.5rem;
  width: 1.5rem;
}

@media (min-width: 22.5em) {
  .bp-360-pseudo-before--icon-size-100::before {
    height: 1rem;
    width: 1rem;
  }
  
  .bp-360-pseudo-before--icon-size-200::before {
    height: 1.5rem;
    width: 1.5rem;
  }
}

@media (min-width: 30em) {
  .bp-480-pseudo-before--icon-size-100::before {
    height: 1rem;
    width: 1rem;
  }
  
  .bp-480-pseudo-before--icon-size-200::before {
    height: 1.5rem;
    width: 1.5rem;
  }
}

// and all other breakpoints defined…
```

#### Creating custom parent classes

Similarly, custom parent classes can also easily be generated with the `hu-parent` and `hu-parent-responsive` mixins:

```scss
// loop through the formatted modules in order
@each $module in hu-format-modules($icon-size-modules) {
  // loop through and extract $type & $value variables from each item in $types
  @each $type, $value in $icon-size-types {
    // define the class name you want, including the $type
    $class-name: hu-class-name(icon-size-#{$type});
    // ensure $value supports $types that are both lists and maps
    $value: if($value, $value, $type);

    // call hu-parent with the $class-name, parent selectors and $module
    @include hu-parent($class-name, (browser-mobile), $module) {
      // write your declarations, using $value as the CSS value
      height: $value; 
      width: $value;
    }
  }
}

// only try this if responsive is a module
@if index($icon-size-modules, responsive) {
  // extract $bp-scale and $bp-value variables for each breakpoint
  @each $bp-scale, $bp-value in $hu-breakpoints {
    // call the media-query mixin with $bp-value, which supports breakpoint values as min/max maps
    @include hu-media-query($bp-value) {
      // loop through and extract $type & $value variables from each item in $types
      @each $type, $value in $icon-size-types {
        // define the class name you want, including the $type
        $class-name: hu-class-name(icon-size-#{$type});
        // ensure $value supports $types that are both lists and maps
        $value: if($value, $value, $type);

        // call hu-parent-responsive with the $class-name, parent selectors, *all* modules and $bp-scale
        @include hu-parent-responsive($class-name, (browser-mobile), $icon-size-modules, $bp-scale) {
          // write your declarations, using $value as the CSS value
          height: $value; 
          width: $value;
        }
      }
    }
  }
}
```

will generate the following:

```css
.browser-mobile .browser-mobile__icon-size-100 {
  height: 1rem;
  width: 1rem;
}

.browser-mobile .browser-mobile__icon-size-200 {
  height: 1.5rem;
  width: 1.5rem;
}

@media (min-width: 22.5em) {
  .browser-mobile .browser-mobile__bp-360--icon-size-100 {
    height: 1rem;
    width: 1rem;
  }
  .browser-mobile .browser-mobile__bp-360--icon-size-200 {
    height: 1.5rem;
    width: 1.5rem;
  }
}

@media (min-width: 30em) {
  .browser-mobile .browser-mobile__bp-480--icon-size-100 {
    height: 1rem;
    width: 1rem;
  }
  .browser-mobile .browser-mobile__bp-480--icon-size-200 {
    height: 1.5rem;
    width: 1.5rem;
  }
}

// and all other breakpoints defined…
```