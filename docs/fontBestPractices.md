// link to google article: https://web.dev/articles/font-best-practices

// open source = true, - if you want to distribute legally
// @fontFace doesnt get/load the font
// inline css for font styles (why is inline ccs good, does it cost anything) warn after 4kb
// if inline css then dont need to preload, if link to external style sheet then preload

// why is preconnect good
( To preconnect the connection that is used to download the font file, add a separate preconnect resource hint that uses the crossorigin attribute. Unlike stylesheets, font files must be sent over a CORS connection. )

<head>
  <link rel="preconnect" href="https://fonts.com">
  <link rel="preconnect" href="https://fonts.com" crossorigin>
</head>

// self host vs google font link - link might beat self-host without cdn, self-host may not optimize subsets ect

// why woff2

// font display properties, why swap is the default
