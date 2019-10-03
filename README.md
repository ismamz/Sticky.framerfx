### Usage

After install this package you will get two components: `Sticky` and `StickyElement`.

* `Sticky` component works exactly as a Scroll interactive component.
* `StickyElement` must be connected to any frame that you want to be sticky.

![Sticky Animation](https://media.giphy.com/media/JPgeZBoBIEeCNYc7AV/giphy.gif)

Example based on [30 days of Framer X](https://github.com/hermy0211/framer30-code/tree/master/Day%2007%20Sticky%20Headers) by Anne Lee.

### Handle status

`StickyElement` accepts two component instances:

* `Default`: the default element that will show when is pinned or not.
* `Pinned` (optional): a component to render when the element is fixed positioned.

In other complex scenarios, if you connect a `StickyElement` to a code component,
when its position is fixed, your code component will receive a boolean `stuck` property.

You can create a `Header` code component that works with `stuck` state like this:

```jsx
export function Header(props) {
    return (
        <Frame>
            {props.stuck ? "Pinned" : "Unpinned"}
        </Frame>
    )
}
```

This is useful, for example, if you want to perform an animation between the two states.

![Sticky Animation with Code Components](https://media.giphy.com/media/ZXkqHJXApoqkIcE9AU/giphy.gif)


### Notes

* You can use code overrides to apply effects based on scroll position.
* You can set a `offset` parameter to each sticky element.
* You can set multiple `StickyElement` within scroll content frame.
* It works with `StickyElement` nested on other elements.
* It only works for vertical scroll.

#### ⚠️ Important

Frames in Framer X sometimes doesn't has a top value, this happen because the element has
**Pin bottom** alignment on canvas. In that case, the component will calculate the top
position based on his height and bottom position and also from parents layout values.
It's recomendable to change `StickyElement` and parents frames alignment to **Pin top**,
it's more efficient and will work correctly.

#### ⚡️ Performance

The following is a 1x speed animation showing how it works efficiently with multiple cases.

![Sticky Animation showing a full example](https://media.giphy.com/media/PipVUYeViwY8MAM8hg/giphy.gif)


### Changelog

##### v2.3.0

- Add Responsive mode to `StickyElement`

##### v2.2.0

- Add support for code overrides

##### v2.1.0

- Fix bug with X position of Sticky elements
- Fix bug when looking Sticky elements within frames

##### v2.0.0

- Complete refactoring using the new Framer API
- Add pinned state to `StickyElement` using component instances
- Add support to work with code components based on pinned status

##### v1.1.0

- Rebuild with two componentes and remove Overrides

##### v1.0.0

- First release


### Bugs & Help

* GitHub: [Sticky.framerfx](https://github.com/ismamz/Sticky.framerfx)
* Twitter: [@ismamz](https://twitter.com/ismamz)


### See also

* [Google Maps](https://store.framer.com/package/ismael/google-maps)
* [Photo Filters](https://store.framer.com/package/ismael/photo-filters)
* [Get Color from Images](https://store.framer.com/package/ismael/get-colors-from-images)
