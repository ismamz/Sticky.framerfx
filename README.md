### Usage

After install this package you will get two componentes: `Sticky` and `StickyElement`.

* `Sticky` component works exactly as a Scroll interactive component.
* `StickyElement` must be connected to any frame that you want to be sticky.

The `StickyElement` is treated as relative positioned until the scroll vertical position
crosses the element top position, at which point it is treated as fixed positioned.

![Sticky Animation](https://media.giphy.com/media/2aSonQXwo4v0hPnEHh/giphy.gif)

`StickyElement` accepts two component instances:

* `Content`: the default element that will show when is pinned or not.
* `Pinned` (optional): a component to render when the element is fixed positioned.

In other complex scenarios, if you connect a `StickyElement` to a code component,
when its position is fixed, your code component will receive a `stucked` property.

The package includes a Header code component that works with stucked state:

```
export function Header(props) {
    return (
        <Frame>
            {props.stucked ? "Pinned" : "Unpinned"}
        </Frame>
    )
}
```

This is useful, for example, if you want to perform an animation between the two states.

#### ⚠️ Important

Frames in Framer X sometimes doesn't has a top value, this happen because the element has
"Pin bottom" alignment on canvas. In that case, the component will calculate the top
position based on his height and bottom position and also from parents layout values.
It's recomendable to change `StickyElement` and parents frames alignment to "Pin top",
it's more efficient and will work correctly.

**Notes:**

* You can set multiple `StickyElement` within scroll content frame.
* It works with `StickyElement` nested on other elements.
* It only works for vertical scroll.


### Customize

You can set a `offset` parameter to each sticky element.


### Changelog

##### v2.0.0 - 2018-05-??

- Complete refactoring with new Framer API
- Add pinned state to `StickyElement` using component instances
- Add support to work with code components based on pinned status

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
