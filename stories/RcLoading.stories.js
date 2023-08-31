import {RcSuperLoading} from "../packages/rc-loading/src";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/RcLoading',
    component: RcSuperLoading,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
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
        duration: 60000,
        loading: true,
        children: <>
            <div
                id={'value1'}
                style={{
                    height: 200,
                    width: 400,
                    background: 'red'
                }}>
                label1
            </div>
        </>
    },
};
