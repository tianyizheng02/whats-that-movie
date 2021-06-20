<div align="center">
  <img src="public/favicon.png" alt="icon" width="150px">
  <h1>What's That Movie?</h1>
  <p><a href="https://tianyizheng02.github.io/whats-that-movie/">What's That Movie?</a> is a web app that retrieves movie info using the <a href="https://www.omdbapi.com/">OMDb API</a>.</p>
  <p>It even has dark mode (automatic based on system preferences)!</p>
</div>

| Light Mode 🤢 | Dark Mode 😎 |
| --- | --- |
| ![Light Mode Pic](https://user-images.githubusercontent.com/52298854/122680735-3e1e8880-d1e0-11eb-8656-632ed574b744.png) | ![Dark Mode Pic](https://user-images.githubusercontent.com/52298854/122680744-48408700-d1e0-11eb-86f6-5361855a9a5b.png) |

## Features

The web app provides the following info for each movie (if available):
- Title and Year
- Poster
- Release Date
- Runtime
- Genre(s)
- Director(s)
- Rating (Metascore)
- Short plot synopsis

## Installation

To run this web app on your local machine, first make sure that Node.js is properly installed.
Clone this repo and run the following commands from within the newly created directory:

```
npm install
npm start
```

The web app can now be viewed in-browser at `http://localhost:3000/`.

Note that the web app requires an API key in order to successfully query the OMDb database.
Register for an API key at https://www.omdbapi.com and store the key in a `.env` file with the following contents:

```
REACT_APP_API_KEY={YOUR API KEY HERE}
```

## Credits

This web app was built on Kristen Koyanagi's [starter code](https://github.com/kristenkoyanagi/react-with-omdb) for Capital One's Software Engineering Summit coding challenge.
