## Caveats

As of now, table headers **must** be of equal or greater width than table cells for
the plugin to actually work. Same goes for the headers height when using a left aligned headers column. This may be fixed in the future. Or not.

## To-do's and Notes

- Refactor the whole thing
- Write decent README (Goal, usage, credits, license, etc.)
- Minimal API
  - Allow update on gummy head/column when table content changes
  - Have a way to remove the whole thing
- Find a sane way to deal with table where cells are larger than headers
- Test performance with huge tables and improve accordingly
- Tests?
- Get rid/minimize jQuery dependency (can we?)