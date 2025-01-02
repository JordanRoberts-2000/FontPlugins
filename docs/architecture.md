- fontData is generated from googleUrl
- fontPluginConfigType is generated from that font data

## Config hook

- modify the inputted config
- depending on configureation modify into data used be the rest of the plugin
- modification includes: filling in defaults, getting defaults from generated fontData

## TransformIndexHtml hook

# dev

- inject preconnect to google fonts into the head
- inject links to google fonts into the head
- inject css variables, classes, fallbacks into the head

# prod

- if (googleLinks selected) do everything in dev
- if (css-inline selected)

## Output

font family: "SelectedFont", "fallbackFont-modified", "categoryFallback-modified", "categoryFallbacks unmodified",

## Defaults

- fallbacks for sans-serif : "Arial", "Helvetica"
- fallbacks for serif: "Times New Roman", "Georgia"
