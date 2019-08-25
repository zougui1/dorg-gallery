# installation

create the file `./back/src/config/api.ts`
with content:
```ts
export const api = {
  monngoURI: 'mongodb://admin:admin-password91@ds153705.mlab.com:53705/gallery-dorg',
  cloudinary: {
    cloud_name: 'dorg-gallery',
    api_key: '675795252527822',
    api_secret: 'lzIqkKLrhTL5wRyp1QHkn4MmHlI',
  },
};
```

then

```
cd ./back
npm run i
```

to compile the code (to execute only once)
```
npm run compile
```

to run the code (to execute after each compilation)
```
npm run debug:dorg
```

the file to edit for querying the images: `./back/src/mongoose/controllers/Image/index.ts`
the object in the `Image.find` function at line 84

# ideas

## user

* tags blacklist
* tags whitelist
* edit password
* edit username

## login

* forgotten password

## gallery
### search options

* get images if they have or no a drawing overlay
* get images if they have or no a text overlay
* order by date (ASC, DESC)
* order by relevancy (ASC, DESC)

### displaying

* display or no the drawing overlay
* display or no the text overlay
