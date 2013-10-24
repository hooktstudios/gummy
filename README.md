# Gummy.js - Sticky table headers

Gummy.js is a minimal sticky table headers solution. Unlike many other similar
plugins, it's not meant to be relative to the whole window, but to a wrapper
inside the page. This essentially mean you can use it for smaller tables inside
your layout as well as full window tables.

## Demo

[→ here](http://raw.github.com.everydayimmirror.in/hooktstudios/gummy/master/demo/index.html)

## Usage

1. If it's not there already, include jQuery.
2. Include `gummy.css` and `gummy.js`.
3. Wrap your table in a block element with a fixed height or max-height if you
   want to scroll inside your table vertically.
4. Make sure your table has a `thead` and a `tbody` tag. These will be used to
   select the different table parts later on.
5. Initialize the plugin by passing your wrapping element as an argument.

**HTML**

````html
<div class="wrapper">
  <table>
    <thead>[...]</thead>
    <tbody>[...]</tbody>
  </table>
</div>
````
**JavaScript**

````javascript
var gummyTable = new Gummy($('.wrapper'));
````

## To-do's and Notes

- Write decent README (options, public methods, etc.)
- What's the browser support?
- Minimal API
  - Allow update on gummy head/column when table content changes
- Test performance with huge tables and improve accordingly
- Tests?
- Get rid/minimize jQuery dependency (can we?)

## Credits

![hooktstudios](http://hooktstudios.com/logo.png)

Gummy.js is maintained and funded by [hooktstudios](http://github.com/hooktstudios).