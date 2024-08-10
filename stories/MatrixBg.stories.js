import { MatrixBg } from "../packages/matrix-bg/src";
import { Markdown } from '@storybook/blocks';
import ReadMe from '../packages/matrix-bg/README.md?raw';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/MatrixBg',
    component: MatrixBg,
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
        'text-color': {
            type: 'color', presetColors: ['#00ff00', '#b7eb8f']
        },
        'background-color': {
            type: 'color', presetColors: ['#000000', '#ffffff']
        }
    },
};


export const props = {
    args: {
        'text-color': "#00ff00",
        'background-color': "#000000",
    },
    render: (props) => {
        // props = args
        return <div style={{height: '100vh', width: '100vw', margin: 0}}>
            <matrix-bg {...props}></matrix-bg>
        </div>
    }
};
