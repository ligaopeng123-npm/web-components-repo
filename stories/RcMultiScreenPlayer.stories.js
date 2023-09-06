import {RcMultiScreenPlayer} from "../packages/rc-multi-player/src";
import {Markdown} from '@storybook/blocks';
import ReadMe from '../packages/rc-multi-player/README.md?raw';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/RcMultiScreenPlayer',
    component: RcMultiScreenPlayer,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
        docs: {
            page: (Story) => (
                <>
                    <Markdown>{ReadMe}</Markdown>
                </>
            ),
        }
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        // data: { control: 'array' },
    },
};


export const props = {
    args: {
        style: {
            height: 400
        },
        currentConfig: {
            mediaDataSource: {
                url: "https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv",
                type: 'flv',
            },
            playerConfig: {
                protocol: "FLV",
                title: 'xgplayer-demo-360p',
                extraParams: {test: 1},
                layoutIndex: '0',
                robustness: {
                    maxResetTimes: 1,
                    retryDuration: 15000 // 15秒加载
                },
            }
        }
    }
};
