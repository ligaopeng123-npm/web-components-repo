import {CardEllipsis} from "../packages/card-ellipsis/src";
import {Markdown} from '@storybook/blocks';
import ReadMe from '../packages/card-ellipsis/README.md?raw';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/CardEllipsis',
    component: CardEllipsis,
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
        'min-height': 120,
    },
    render: () => {
        return <card-ellipsis>
            <div style={{height: 200, width: '100%', background: 'red'}} slot="content">我是要展开的card</div>
        </card-ellipsis>
    }
};
