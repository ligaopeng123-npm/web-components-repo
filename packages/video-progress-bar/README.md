## video-progress-bar

`视频播放滚动条`[在线demo](https://ligaopeng123-npm.github.io/web-components-repo/?path=/docs/example-videoprogressbar--props)

## Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>video-progress-bar</title>
    <style>
        #root {
            width: 100%;
            height: 60px;
        }
    </style>
</head>

<body>
<div id="root">
    <div style="height: 400px;">
       
    </div>
    <video-progress-bar id="bar"></video-progress-bar>
</div>
<script>
    window.onload = function () {
        setTimeout(()=> {
            document.querySelector('#bar').start();
        }, 3000);
        document.querySelector('#bar').addEventListener('timeChange', (e)=> {
            console.log(222, e)
        });
    }
</script>
</body>
</html>

```



