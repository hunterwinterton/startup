# Notes

## GitHub Commands:

    - git clone: copy a repository to your local environment
    - git pull: pulls changes from repository
    - git fetch: gets changes from GitHub without changing local
    - git status: shows differences
    - git add: adds a file to the remote repository
    - git commit: commits changes made
    - git push: pushes changes to the remote repository

## AWS

Instance IP: http://54.85.227.177

SSH Command: ssh -i ~/.ssh/production.pem ubuntu@54.85.227.177

## Basic Web

It's important for a website to be https so the data is secure. It uses a certificate to verify the website.

## HTML

Basic HTML Example: https://codepen.io/hunterwinter11/pen/QWXPLaO

`<a href="https://google.com">Google</a>` How to create a hyperlink

`<img src = "https://google.com/image.png">Image</img>` How to create an image

How to create a (unordered) list:

```html
<ul>
  <li>List</li>
  <li>List</li>
  <li>List</li>
</ul>
```

How to create a table - each `<tr>` is a row, each `<th>` is a header, and each `<td>` is a data box. There should be an equal amount of `<th>` and `<td>`

```html
<table>
  <tr>
    <th>Table</th>
    <th>Table</th>
    <th>Table</th>
  </tr>
  <tr>
    <td>table</td>
    <td>table</td>
    <td>table</td>
  </tr>
</table>
```

A block element takes up a full line and is separated (`<div>` or `<p>`)
An inline element stays within the same line (`<b>` or `<span>`)

### Forms

| Element    | Meaning                          | Example                                        |
| ---------- | -------------------------------- | ---------------------------------------------- |
| `form`     | Input container and submission   | `<form action="form.html" method="post">`      |
| `fieldset` | Labeled input grouping           | `<fieldset> ... </fieldset>`                   |
| `input`    | Multiple types of user input     | `<input type="" />`                            |
| `select`   | Selection dropdown               | `<select><option>1</option></select>`          |
| `optgroup` | Grouped selection dropdown       | `<optgroup><option>1</option></optgroup>`      |
| `option`   | Selection option                 | `<option selected>option2</option>`            |
| `textarea` | Multiline text input             | `<textarea></textarea>`                        |
| `label`    | Individual input label           | `<label for="range">Range: </label>`           |
| `output`   | Output of input                  | `<output for="range">0</output>`               |
| `meter`    | Display value with a known range | `<meter min="0" max="100" value="50"></meter>` |

#### Input Elements

| Type           | Meaning                           |
| -------------- | --------------------------------- |
| text           | Single line textual value         |
| password       | Obscured password                 |
| email          | Email address                     |
| tel            | Telephone number                  |
| url            | URL address                       |
| number         | Numerical value                   |
| checkbox       | Inclusive selection               |
| radio          | Exclusive selection               |
| range          | Range limited number              |
| date           | Year, month, day                  |
| datetime-local | Date and time                     |
| month          | Year, month                       |
| week           | Week of year                      |
| color          | Color                             |
| file           | Local file                        |
| submit         | button to trigger form submission |

#### Input Values

| Attribute | Meaning                                                                             |
| --------- | ----------------------------------------------------------------------------------- |
| name      | The name of the input. This is submitted as the name of the input if used in a form |
| disabled  | Disables the ability for the user to interact with the input                        |
| value     | The initial value of the input                                                      |
| required  | Signifies that a value is required in order to be valid                             |

#### Sample Checkbox Element

```html
<li>
  <fieldset>
    <legend>checkbox</legend>
    <label for="checkbox1">checkbox1</label>
    <input
      type="checkbox"
      id="checkbox1"
      name="varCheckbox"
      value="checkbox1"
      checked
    />
    <label for="checkbox2">checkbox2</label>
    <input
      type="checkbox"
      id="checkbox2"
      name="varCheckbox"
      value="checkbox2"
    />
    <label for="checkbox3">checkbox3</label>
    <input
      type="checkbox"
      id="checkbox3"
      name="varCheckbox"
      value="checkbox3"
    />
    <label for="checkbox4">checkbox4</label>
    <input
      type="checkbox"
      id="checkbox4"
      name="varCheckbox"
      value="checkbox4"
    />
  </fieldset>
</li>
```

### Media

#### SVG

```html
<svg
  viewBox="0 0 300 200"
  xmlns="http://www.w3.org/2000/svg"
  stroke="red"
  fill="red"
  style="border: 1px solid #000000"
>
  <circle cx="150" cy="100" r="50" />
</svg>
```

#### Canvas

```html
<canvas
  id="canvasDemo"
  width="300"
  height="200"
  style="border: 1px solid #000000"
></canvas>
<script>
  const ctx = document.getElementById("canvasDemo").getContext("2d");
  ctx.beginPath();
  ctx.arc(150, 100, 50, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.strokeStyle = "red";
  ctx.fill();
  ctx.stroke();
</script>
```

## CSS

### Flexbox

Creates responsive boxes for all of the children of the element with `display: flex;`. `flex-direction` can be row or column.
```css
body {
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100vh;
}

header {
  flex: 0 80px;
  background: hsl(223, 57%, 38%);
}

footer {
  flex: 0 30px;
  background: hsl(180, 10%, 10%);
}

main {
  flex: 1;
  display: flex;
  flex-direction: row;
}
```

`flex: 1;` can give units to change what amount of space the flexbox takes up, as a ratio
`flex: 0 30px;` gives the box a base height of 30px and is a fixed size box

#### Media Query

```css
@media (orientation: portrait) {
  main {
    flex-direction: column;
  }
}

@media (max-height: 700px) {
  header {
    display: none;
  }
  footer {
    display: none;
  }
}
```
