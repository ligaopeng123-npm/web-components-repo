import {RcSuperLoading} from "../packages/rc-loading/src";
import {Markdown} from '@storybook/blocks';
import ReadMe from '../packages/rc-loading/README.md?raw';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/RcLoading',
    component: RcSuperLoading,
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
        // data: {control: 'array'},
    },
    decorators: [
        (Story) => (
            <div>
                <Story/>
            </div>
        ),
    ],
};

// export const Demo = {
//     render: () => <Markdown>{ReadMe}</Markdown>,
// };

export const props = {
    args: {
        loading: true,
        children: <div
            style={{
                height: 600,
                width: 600,
                background: 'red'
            }}>
            我是加载模块
        </div>
    },
};
