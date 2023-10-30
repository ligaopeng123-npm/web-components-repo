import MultiPlayer from "../packages/multi-player/src/MultiPlayer";
import "../packages/multi-player/src";
import {Markdown} from '@storybook/blocks';
import ReadMe from '../packages/multi-player/README.md?raw';
import "./MultiPlayer.css"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/MultiPlayer',
    component: MultiPlayer,
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
        "media-data-source": {
            url: "http://1011.hlsplay.aodianyun.com/demo/game.flv",
            type: 'flv',
        },
    },
    render: (props)=> {
        setTimeout(() => {
            const multi = document.querySelector('multi-player');
            for (let key in props) {
                multi.setAttribute(key, JSON.stringify(props[key]));
            }
        }, 50);
        return <multi-player class="multi-player"></multi-player>
    }
};
