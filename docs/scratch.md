# MARKDOWN

*Italic*
_Italic_
`Backticks`
**BOLD**
__DOUBLE__
[BRACKETS]

---

__SASS__

prefix parent selector
    .class & { }

variable expansion
    $box-width: 50%;
    .box-class { width: #{$box-width} }

variable defaults
    $message-color: blue !default;

control directives
    $debug: false; // TODO: move to _settings.scss

    article {
        color: black;

        @if ($debug) { // visualizing layout internals
            border: 1px dotted red;
        }
    }

100% heights
webpack needs html-loader for inline img

---

__STRUCTURE__

Main / Wrapper
    Header
        Menu / burger / slide-from-left
        centered app name (TODD)
        User / avatar / dropdown options
    Workspace
        R1 - WORKSPACE header
            Dropdown workspace selection
            Starred / Unstarred
            Lock workspace
            workspace menu icon
        R2 - CARDS / dragabble
            R2.1
                title
                pin
                ellipsis menu
                    label (colors)
                    copy
                    archive
                    sort
            R2.2
                todo items (draggable)
                    check box (circle)
                    todo text
                    on-hover todo menu icon (right most)
                        duplicate
                        delete
            R2.3
                new todo textarea
                    add button
                    cancel (x) button
        R3 - horizontal SCROLLBAR

---

__BEM__

block__element--modifier

double underscore   __ element
singe underscore    _ value
double hyphen       -- modifier
hypen               - type
key_value           size_large

BLOCK
    block
    is-block
    blk

ELEMENT
    block__elem
    block__elem-type
    btn__price
    btn__text

MODIFIER
    block__elem--mod
    block--mod
    block--key_value
    block__elem--key_value
    btn--big
    btn--orange 

---

__CSS ARCHITECTURE__

Base styles
    resets
    html, body, links, lists, headers
    typography
    box-sizing
    width, margin, padding
Objects
    structure
    layouts
    grid system
Components
    self-contained
    modular / plug n' play
State
    open / collapsed
    links active / inactive
    visible / hidden / blur / disabled
Themes
    alter globally
Utilities
    minor changes
    single purpose helpers
    tweak spaces
    increase font-size
    center text
    clear fixes
    hide elements
Javascript hooks
    solely for js hooks
    slide-item-right
    place-order
    js-buy-now

Namespacing

    Objects: .o-
    Components: .c-
    State: .is- OR .has-
    Theme: .t-
    Utilities: .u-
    Javascript hooks: .js-

---

__SMACSS__

Base
    resets
    html, body, links, lists, headers
    typography
    box-sizing
    width, margin, padding
Layout
    global design / structure
    header, content, wrapper, section, footer, nav
Module
    child elements
State
    media queries
    hover
    open / collapsed
    links active / inactive
    visible / hidden / blur / disabled
    animation keyframes
Theme
    alter globally

---

__SASS DIRECTORY STRUCTURE__

scss
.
├─ modules
│  ├─ _color.scss
│  └─ _typography.scss
├─ partials
│  ├─ _base.scss
│  └─ _navigation.scss
├─ vendor
│  ├─ bulma.css
│  └─ fontawesome.css
└─ main.scss

---

__INITIAL SASS DIR__

modules
    _all.scss
    _colors.scss
    _variables.scss
partials
    _reset.scss
    _base.scss
    _buttons.scss
    _textbox.scss
    _image.scss
    _grid.scss
    _typography.scss
vendor
    _colorpicker.scss
    _bulma.scss


~ main.scss

// Modules and Variables
@import "partials/base";

// Partials
@import "partials/reset";
@import "partials/typography";
@import "partials/buttons";
@import "partials/figures";
@import "partials/grids";
// ...

// Third-party
@import "vendor/colorpicker";
@import "vendor/jquery.ui.core";


~ partials/_base.scss

// Use Compass ('cause it rocks!)
@import "compass";

// Font weights
$light: 100;
$regular: 400;
$bold: 600;

// Base Font
$base-font-family: sans-serif;
$base-font-weight: $regular;
$base-font-size: 13px;
$base-line-height: 1.4;

// Fixed Font
$fixed-font-family: monospace;
$fixed-font-size: 85%;
$fixed-line-height: $base-line-height;

// Headings
$header-font-weight: $bold;

@import "modules/all";

---

__BEM NAMESPACES__

Object                  o-
Layout                  l-
Component               c-
Utilities / Helpers     u-
                        h-
Theme                   t-
Scope                   s-
States                  is-
                        has-
Hacks                   _
JS Hooks                js-
QA Hooks                qa-

o-
    incredibly risky to ever modify one
    layout
    wrappers
    containers
    Media Object
    o-section
    o-fields
l-
    l-grid
    l-container
c-
    c-button
    c-datepicker
    c-modal
    Components are implementation-specific bits of UI
u-
h-
    u-clearfix
    u-text-center
    !important
    last resort classes
t-
    t-light
    t-dark
    t-red
    c-btn
        t-light & {}
s-
    s-cms-content
    s-cms-content a
    s-cms-content c-btn /* a is pre-styled inside this scope */
is-, has-
    is-open
    has-dropdown
    is-collapsed
    is-expanded
    is-updating
    TEMPORARY
_
    _c-footer-mobile-hack
    _clearfix-this
    not reusable / temporary / should be removed later on
js-
    js-modal
    js-drag
    js-place-order
    use separate hooks for CSS and JS
qa-
    qa-error-login
    qa-place-cookie
    qa-ajax-fetch
    Bind tests onto dedicated test classes

---

__Jalyna's SCSS & BEM Styleguide__
[https://github.com/jalyna/bem-scss-styleguide]


~ Element Nesting

.menu {
  &__item { ... }
  &__link { ... }
}

<ul class="menu">
  <li class="menu__item"><a href="#" class="menu__link">My Link</a></li>
  <li class="menu__item"><a href="#" class="menu__link">My Second Link</a></li>
</ul>

~ Modifier Usage

.menu {
  &__link {
    color: $my-blue;
    text-decoration: none;

    &--first {
      border-left: 1px solid $my-blue;
    }
  }
}

<ul class="menu">
  <li class="menu__item">
    <a href="#" class="menu__link menu__link--first">My Link</a>
  </li>
</ul>

---

__AIRBNB STYLEGUIDE__
[https://github.com/airbnb/css]

~ FORMATTING
    do not use ID selectors
    comment code that isn't self-documented
        z-index
        browser hacks

~ JS HOOKS
    **AVOID** binding to the same class in both CSS & JS

~ BORDER
    use 0 instead of none
    border: 0

_SASS_

~ ORDERING PROPERTY DECLARATIONS
    1. Property declarations
        .btn-green {
            background: green;
            font-weight: bold;
            // ...
        }
    2. @include declarations
        .btn-green {
            background: green;
            font-weight: bold;
            @include transition(background 0.5s ease); **include at the end**
            // ...
        }
    3. Nested Selectors
        .btn-green {
            background: green;
            font-weight: bold;
            @include transition(background 0.5s ease); **include at the end**
            
            .icon {
                margin-right: 10px;
            }
        }

~ Nested Selectors
    **DO NOT** nest selectors moren **THREE** levels deep!
    .page-container {
        .content {
            .profile {
                // **STOP!**
            }
        }
    }

---

__BATTLING BEM ISSUES__

~ WRAPPERS

    l-grid
        l-grid__item
            c-card
                c-card__header
                c-card__body
        l-grid__item
            c-card
                c-card__header
                c-card__body
        l-grid__item
            c-card
                c-card__header
                c-card__body

    l-cards-container
    l-cards-list

---

__CSS ARCHITECTURE - NAMESPACES__
[https://zellwk.com/blog/css-architecture-2/]

Here’s a list of namespaces I use:

    .l-:        layouts
    .o-:        objects
    .c-:        components
    .js:        JavaScript hooks
    .is-|.has-: state classes
    .t1|.s1:    typography sizes
    .u-:        utility classes

~ Layouts with .l-

<!-- GLOBAL LAYOUTS -->

_layouts.scss

.l-wrap {
    padding-left: 1em;
    padding-right: 1em;

    @media (min-width: 1000px) {
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
    }
}