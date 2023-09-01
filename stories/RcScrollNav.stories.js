import {RcScrollNav} from "../packages/rc-scroll-nav/src";
import {Markdown} from "@storybook/blocks";
import ReadMe from "../packages/rc-scroll-nav/README.md";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/RcScrollNav',
    component: RcScrollNav,
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
        data: {control: 'array'},
    },
};


export const props = {
    args: {
        items: [{
            label: 'label1',
            value: 'value1'
        }, {
            label: 'label2',
            value: 'value2'
        }, {
            label: 'label3',
            value: 'value3'
        }, {
            label: 'label4',
            value: 'value4'
        }, {
            label: 'label5',
            value: 'value5'
        }],
        children: <>
            <div
                id={'value1'}
                style={{height: 300}}>
                label1
            </div>
            <div
                id={'value2'}
                style={{height: 300}}>
                label2
            </div>
            <div
                id={'value3'}
                style={{height: 300}}>
                label3
            </div>
            <div
                id={'value4'}
                style={{height: 300}}>
                label4
            </div>
            <div
                id={'value5'}
                style={{height: 300}}>
                label5
            </div>
        </>
    },
};
