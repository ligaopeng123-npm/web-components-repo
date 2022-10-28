/**********************************************************************
 *
 * @模块名称: test
 *
 * @模块用途: test
 *
 * @date: 2022/10/28 11:56
 *
 * @版权所有: pgli
 *
 **********************************************************************/

$(function(){
    var sdk = null; // Global handler to do cleanup when replaying.
    var startPlay = function() {
        $('#rtc_media_player').show();

        // Close PC when user replay.
        if (sdk) {
            sdk.close();
        }
        sdk = new SrsRtcPlayerAsync();

        // https://webrtc.org/getting-started/remote-streams
        $('#rtc_media_player').prop('srcObject', sdk.stream);
        // Optional callback, SDK will add track to stream.
        // sdk.ontrack = function (event) { console.log('Got track', event); sdk.stream.addTrack(event.track); };

        // For example: webrtc://r.ossrs.net/live/livestream
        var url = $("#txt_url").val();
        sdk.play(url).then(function(session){
            $('#sessionid').html(session.sessionid);
            $('#simulator-drop').attr('href', session.simulator + '?drop=1&username=' + session.sessionid);
        }).catch(function (reason) {
            sdk.close();
            $('#rtc_media_player').hide();
            console.error(reason);
        });
    };

    $('#rtc_media_player').hide();
    var query = parse_query_string();
    srs_init_rtc("#txt_url", query);

    $("#btn_play").click(function() {
        $('#rtc_media_player').prop('muted', false);
        startPlay();
    });

    if (query.autostart === 'true') {
        $('#rtc_media_player').prop('muted', true);
        console.warn('For autostart, we should mute it, see https://www.jianshu.com/p/c3c6944eed5a ' +
            'or https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#audiovideo_elements');

        startPlay();
    }
});
