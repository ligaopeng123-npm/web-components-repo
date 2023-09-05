import {RcTimePeriod} from "../packages/rc-time-period/src";
import { Markdown } from '@storybook/blocks';
import ReadMe from "../packages/rc-time-period/README.md?raw";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/RcTimePeriod',
    component: RcTimePeriod,
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
    args: {
        data: [{
            "week": 2,
            "periods": [{
                "period": 1,
                "startAt": "01:05:27",
                "endAt": "03:29:27"
            }, {
                "period": 2,
                "startAt": "08:30:33",
                "endAt": "12:06:33"
            }, {
                "period": 3,
                "startAt": "13:14:11",
                "endAt": "15:36:00"
            }]
        }, {
            "week": 5,
            "periods": [{
                "period": 1,
                "startAt": "14:58:55",
                "endAt": "15:01:05"
            }, {
                "period": 2,
                "startAt": "14:58:55",
                "endAt": "15:01:05"
            }]
        }],
        panelOptions: {
            top: 16,
            bottom: 16,
            left: 16,
            height: 300,
            disabled: false,
        },
        fieldNames: {
            startKey: 'startAt', // 开始时间
            endKey: 'endAt', // 结束时间
        },
    },
};
