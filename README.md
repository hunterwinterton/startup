# Photo Galleries

## Specification Deliverable

### Elevator Pitch

Have you ever wanted an easy way to upload photos and share them with your friends or clients? Photo Galleries allows you to upload your pictures to a simple interface and automatically formats them into a pretty gallery. A link is also generated to allow others to view the gallery and download all the images into a zip file. You are able to create multiple galleries and modify them later after creating an account.

### Design

![Mockup of Photo Galleries](PhotoGalleryUI.png)

### Key Features

- Secure login over HTTPS
- Ability to upload jpeg or png filetypes
- Edit existing galleries after logging in
- Images stored securely on the server
- Generate unique, shareable links for each gallery
- Ability to view the gallery in realtime
- Analytics provide information on views and downloads

### Key Technologies

I will use the required technology in the following ways.

- **HTML** - Five HTML pages. One for users to login or register, one for users to upload photos, one for users to view a single gallery, one for users to view all of their galleries, and one for visitors to view shared galleries.
- **CSS** - Clean and professional styling responsive on mobile and desktop. Hovering and clicking on photos will produce various effects.
- **React** - Provides login functionality, displays photos in a grid view, allows uploading multiple photos at once, and navigating through the galleries.
- **Web Services** - Backend services will handle:
    - Login
    - Uploading and storing photos
    - Managing galleries
    - Generating shareable links
    - Showing image location on a map
    - Retrieving general visitor location for analytics
- **Authentication** - Register and login users. Requires a user to be logged in to create a gallery.
- **Database** - Store users, galleries, photos, and links in the database.
- **WebSocket** - Provides real time updates for analytics, new galleries and upload status.

## HTML deliverable

For this deliverable I built out the structure of my application using HTML.

- [x] **HTML pages** - Five HTML pages that allow user to login/register, upload photos, view their gallery with analytics, view all of their galleries, and where visitors view a shared gallery
- [x] **Links** - The login page links to where the users can create a gallery. After creating a gallery, the user is redirected to a page with all of their galleries. Clicking on a gallery here will bring up an analytics page where the user can view their gallery and delete it.
- [x] **Text** - There is text for the titles and buttons of each page, but otherwise there isn't much text.
- [x] **Images** - I added a logo to all of the pages.
- [x] **DB/Login** - Input box and submit button for login.
- [ ] **WebSocket** - The analytics page has a table that will show live visitors with downloads and views. I have not implemented this feature yet.

## CSS deliverable

For this deliverable I styled my website using CSS.

- [x] **Header, footer, and main content body**
- [x] **Navigation elements** - I dropped the underlines and changed the color for anchor elements.
- [x] **Responsive to window resizing** - Most pages of my website are responsive, I have one that is mostly responsive but could still use some work.
- [x] **Application elements** - I made sure to align things properly and leave plenty of white space.
- [x] **Application text content** - I am using consistent fonts across all pages of my website.
- [x] **Application images** - I made the images in my app look good with rounded corners.

## React deliverable

For this deliverable I converted my website to use React for flexibility. I also added placeholders for future technology.

- [x] **Bundled and transpiled** - done!
- [x] **Components** - Login, creating a gallery, viewing all galleries, viewing a specific gallery, and a public view of a gallery have been added as components.
  - [x] **login** - When you press enter or the login button it takes you to the create a gallery page.
  - [x] **database** - Stores whether or not the user is currently logged in, currently in local storage.
- [x] **Router** - Routing between login and gallery components.

# [Notes](notes.md)
