import { HlsPlayer } from "../src";
import "../src";

console.log('HlsPlayer')

window.onload = () => {
    const hlsPlayer = document.querySelector('hls-player');
    hlsPlayer.setAttribute('media-data-source', JSON.stringify({
        url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
    }));
}