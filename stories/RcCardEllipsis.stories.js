import { RcCardEllipsis } from "../packages/rc-card-ellipsis/src";
import { Markdown } from '@storybook/blocks';
import ReadMe from '../packages/rc-card-ellipsis/README.md?raw';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/RcCardEllipsis',
    component: RcCardEllipsis,
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
        data: { control: 'array' },
    },
};


export const props = {
    args: {
        minHeight: 120,
        children: <div
            id={'value1'}
            style={{
                height: 200,
                width: 400,
                background: 'red'
            }}>
            label1
        </div>
    },
};
