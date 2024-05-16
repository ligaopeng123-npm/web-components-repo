# hls-player

`hls播放器`

## Usage

```typescript
type HlsPlayerConfig = {
  "object-fit": 'fill',
  width: '100%',
  height: '100%',
  'media-data-source': {
    url: '',
    type: ''
  },
};


const hlsPlayer = document.querySelector('hls-player');
hlsPlayer.setAttribute('media-data-source', JSON.stringify({
  url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
}));
```

