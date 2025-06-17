import { VideoProgressBar } from "../packages/video-progress-bar/src";
import { Markdown } from '@storybook/blocks';
import ReadMe from '../packages/video-progress-bar/README.md?raw';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/VideoProgressBar',
    component: VideoProgressBar,
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
        'scale-level': { control: 'select', options: [0, 1, 2, 3, 4, 5, 6] }
    },
};

export const props = {
    args: {
        'scale-level': 0,
        'hide-time': false,
        'hide-speed': false,
        'hide-fast': false
    },
    render: (props) => {
        return <div style={{ height: '60px', width: '100%' }}>
            <video-progress-bar {...props} id="video-progress-bar"></video-progress-bar>
        </div>
    }
};
