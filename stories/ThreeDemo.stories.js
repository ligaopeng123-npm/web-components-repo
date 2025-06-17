import { CardFlip } from "../packages/three-demo/src";
import { Markdown } from '@storybook/blocks';
import ReadMe from '../packages/three-demo/README.md?raw';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/ThreeDemo',
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

export const CanvasWord = {
    args: {

    },
    render: () => {
        return <word-canvas></word-canvas>
    }
};

export const Ring = {
    args: {

    },
    render: () => {
        return <ring-demo></ring-demo>
    }
};

export const ThreeRing = {
    args: {

    },
    render: () => {
        return <three-demo></three-demo>
    }
};


export const props = {
    args: {
        'height': 300,
        'width': 200,
    },
    render: (props) => {
        // props = args
        return <word-canvas></word-canvas>
    }
};
