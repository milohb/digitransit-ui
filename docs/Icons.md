# Update icons

## Steps to add/modify/delete icons:

1. to add new icons copy the content of an `svg` file and paste it to `svg-sprite.hb-source.svg` inside a `<symbol>` tag
2. from the root of the project run `./scripts/compile-hb-sprite`
3. the modifications should appear formatted in the `svg-sprite.hb.svg` file
4. run project with `yarn run dev` to test the icons
5. don't forget to re-run the application if any static file changes