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
