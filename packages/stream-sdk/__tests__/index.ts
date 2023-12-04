import { StreamSdk } from "../src";

window.onload = function () {
    // @ts-ignore
    const token = document.querySelector('#token').value;
    // @ts-ignore
    const carId = document.querySelector('#carId').value;
    const streamSdk = new StreamSdk({
        token: token
    });
    document.querySelector('#bth').addEventListener('click', () => {
        streamSdk.getChannelListByCarId(carId).then((res) => {

        });
    });
    document.querySelector('#getLive').addEventListener('click', () => {
        streamSdk.getChannelListByCarId(carId).then((res: any) => {
            streamSdk.getLive(res[0] as any);
        });
    })
}
