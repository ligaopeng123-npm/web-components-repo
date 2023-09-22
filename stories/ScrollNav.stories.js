import {ScrollNav} from "../packages/scroll-nav/src";
import {Markdown} from "@storybook/blocks";
import ReadMe from "../packages/scroll-nav/README.md";
import "./scrollNal.css";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/ScrollNav',
    component: ScrollNav,
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
};


export const props = {
    args: {},
    render: () => {
        setTimeout(() => {
            const nav = document.querySelector('scroll-nav');
            nav.setAttribute('items', JSON.stringify([{label: 'Web1', value: 1},
                {label: 'Web2', value: 'b'}, {label: 'Web3', value: 'c'}]));
        }, 50)
        return <scroll-nav text-color="#000000">
            <div className="nav-content-container" slot="content">
                <div id="nav-1" className="content content1">Web1</div>
                <div id="b" className="content content2">Web2</div>
                <div id="c" className="content content3">Web3</div>
            </div>
        </scroll-nav>
    }
};
