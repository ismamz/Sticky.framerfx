### Usage

After install this package you will get two componentes: `Sticky` and `StickyElement`.

* `Sticky` component works exaclty as a Scroll interactive component.
* `StickyElement` must be connected to any frame that you want to be sticky.

The `StickyElement` is treated as relative positioned until the scroll vertical position
crosses the element top position, at which point it is treated as fixed positioned.

**Notes:**

* You can set multiple `StickyElement` within scroll content frame.
* It works with `StickyElement` nested on other elements.
* It only works for vertical scroll.

![Sticky Animation](https://media.giphy.com/media/2aSonQXwo4v0hPnEHh/giphy.gif)


### Customize

You can set a `offset` parameter to each sticky element.


### Changelog

##### v2.0.0 - 2018-05-??

- Complete refactoring with new Framer API
- Add pinned state to `StickyElement` using component instances

##### v1.1.0 - 2018-09-22

- Rebuild with two componentes and remove Overrides

##### v1.0.0 - 2018-09-13

- First release


### Bugs & Help

Find me on Twitter: [@ismamz](https://twitter.com/ismamz)


### See also

* [Google Maps](https://store.framer.com/package/ismael/google-maps)
* [Photo Filters](https://store.framer.com/package/ismael/photo-filters)
* [Get Color from Images](https://store.framer.com/package/ismael/get-colors-from-images)
