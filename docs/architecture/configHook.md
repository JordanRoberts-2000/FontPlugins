# Config hook

1.  ProcessConfig fn called on the config.

2.  Config itself is parsed through a schema

3.  Config field parsed against a schema.

- defaults provided if not set.
- if field invalid: replace with default, warning to console.

4. Fonts field parsed against a schema.

5. SuperRefine used to validate and mutate data against dataMap and config.

6. Final Output: worst case: const { config, fonts } = processConfig(config), config can be defualt, fonts can be empty array
