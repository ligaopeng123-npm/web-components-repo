import { CardFlip } from "../packages/card-flip/src";
import { Markdown } from '@storybook/blocks';
import ReadMe from '../packages/card-flip/README.md?raw';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/CardFlip',
    component: CardFlip,
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
        type: {
            options: ['x', 'y'],
            control: { type: 'select' },
        },
        height: {
            control: 'number'
        },
        width: {
            control: 'number'
        }
    },
};


export const props = {
    args: {
        'height': 300,
        'width': 200,
        'type': 'x'
    },
    render: (props) => {
        // props = args
        return <card-flip {...props}>
            <div style={{ height: '100%', backgroundImage: `url(https://picsum.photos/${props.width}/${props.height}?k=1)` }} slot="front">我是正面</div>
            <div style={{ height: '100%', backgroundImage: `url(https://picsum.photos/${props.width}/${props.height}?k=2)` }} slot="back">我是反面</div>
        </card-flip>
    }
};
