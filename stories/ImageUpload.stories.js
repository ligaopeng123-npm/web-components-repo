import ImageUpload from "../packages/image-upload/src";
import {Markdown} from '@storybook/blocks';
import ReadMe from '../packages/image-upload/README.md?raw';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/ImageUpload',
    component: ImageUpload,
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

    },
    render: ()=> {
        return <image-upload
            id="upload"
            list-type="picture"
            picture-width="120"
            picture-height="120"
            max-count="4"
            width="400px">
        </image-upload>
    }
};
