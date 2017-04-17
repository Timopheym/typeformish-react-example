# React Redux Typeform clone

# Task

Implement a page with a multi-step form, where each step shows when you have completed the previous one. In other words, we're not looking for previous/next buttons, but the next step should appear automatically.

## Steps

1. Two checkboxes with labels `A1` and `A2`. Both are unchecked by default. Next step is available after at least one of them is checked.
2. Two toggle buttons with labels `B1` and `B2`. One button untoggles another (same as radio buttons behavior). Both are inactive by default. Next step is available when any option has been chosen.
3. Text field with button `Check`. When button is pressed a value of the field will be send. Next step is available if a response from API is fine.
4. Selectbox with `C1`, `C2`, `C3` options. It is empty by default. Next step is available when any option has been chosen.
5. Submit button. Should send data to the server.

If a form submit fails then a user must be informed by an error message. It doesn't matter how the message appears but the redux store should be able to manage it.

## Form payload specification

JSON with `a` (checked values), `b` (active button value), `text` (text field value), `c` (selectbox's value) fields.
Example:
```javascript
{
  a: ["A1"],
  b: "B1",
  text: "@abcdef",
  c: "C1"
}
```

## API

Use `api.js` from this gist.

## Requirements

1. Use webpack, react, redux, ES6. Use the Redux store to manage the state as much as possible.
2. Use any library you need.
3. Single page is enough. No need to use routers and create any other pages.
4. If you want to use inline styles do it in a nice way. :)
5. Use best practices.
6. Well structured and readable code matters. Code written for programmers rather than machines is better.
7. Tell us how much time took an implementation step by step.
8. Feel free to apply your UX skills, though we don’t evaluate the appearance.
9. Tests and documentation are welcome.
10. We love functional programming :)

## Run project

Next steps are expected to start your project

```
npm install
npm run build
npm start
```

_Tip_: as server tool you can use [http-server](https://www.npmjs.com/package/http-server)

## Codestyle

It would be nice if you will follow [Code Style Guides of Airbnb](https://github.com/airbnb/javascript)

You can use `.eslintrc` from this gist.


GOOD LUCK!
