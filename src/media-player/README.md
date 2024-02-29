# media-player

## Development

```sh
npm install
```

```sh
npm run dev
```

## Production 

```sh
docker build -t media-player .
```

```sh
docker run -it -p 8080:80 -d --name media-player media-player
```