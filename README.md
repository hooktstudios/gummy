# Gummy.js - Sticky table headers

Gummy.js is a minimal sticky table headers solution. Unlike many other similar
plugins, it's not meant to be relative to the whole window, but to a wrapper
inside the page. This essentially mean you can use it for smaller tables inside
your layout as well as full window tables.

## Caveats

As of now, table headers **must** be of equal or greater width than table cells
for the plugin to actually work. Same goes for the headers height when using a
left aligned headers column. This may be fixed in the future. Or not.

## To-do's and Notes

- Write decent README (usage, credits, license, etc.)
- What's the browser support?
- Minimal API
  - Allow update on gummy head/column when table content changes
  - Have a way to remove the whole thing
- Find a sane way to deal with table where cells are larger than headers
- Deal with original elements classes when cloning
- Test performance with huge tables and improve accordingly
- Tests?
- Get rid/minimize jQuery dependency (can we?)