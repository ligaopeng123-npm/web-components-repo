import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import "./CheckBox.less";

export interface CheckboxChangeEvent {
    target: CheckboxChangeEventTarget;
    stopPropagation: () => void;
    preventDefault: () => void;
    nativeEvent: React.ChangeEvent<HTMLInputElement>['nativeEvent'];
}

export interface CheckboxChangeEventTarget extends CheckboxProps {
    checked: boolean;
}

export interface CheckboxRef {
    focus: () => void;
    blur: () => void;
    input: HTMLInputElement | null;
}

export interface CheckboxProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    prefixCls?: string;
    onChange?: (e: CheckboxChangeEvent) => void;
    indeterminate?: boolean;
}

export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>((props, ref) => {
    const {
        prefixCls = 'rc-checkbox-time',
        className,
        style,
        checked,
        disabled,
        defaultChecked = false,
        type = 'checkbox',
        title,
        onChange,
        indeterminate,
        ...inputProps
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    const [rawValue, setRawValue] = useMergedState(defaultChecked, {
        value: checked,
    });

    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current?.focus();
        },
        blur: () => {
            inputRef.current?.blur();
        },
        input: inputRef.current,
    }));

    const classString = classNames(prefixCls, className, {
        [`${prefixCls}-checked`]: rawValue,
        [`${prefixCls}-indeterminate`]: indeterminate,
        [`${prefixCls}-disabled`]: disabled,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) {
            return;
        }

        if (!('checked' in props)) {
            setRawValue(e.target.checked);
        }

        onChange?.({
            target: {
                ...props,
                type,
                checked: e.target.checked,
            },
            stopPropagation() {
                e.stopPropagation();
            },
            preventDefault() {
                e.preventDefault();
            },
            nativeEvent: e.nativeEvent,
        });
    };

    return (
        <span className={classString} title={title} style={style}>
      <input
          {...inputProps}
          className={`${prefixCls}-input`}
          ref={inputRef}
          onChange={handleChange}
          disabled={disabled}
          checked={!!rawValue}
          type={type}
      />
      <span className={`${prefixCls}-inner`} />
    </span>
    );
});


export const CheckboxGroup = ({
    options,
    value,
    onChange,
    style
}: any) => {
    return (
        <div
            style={style}>
            {
                options.map((item: string, index: number) => {
                    return <label
                        className={'time-period-copy-label'}
                        key={item}>
                        <Checkbox
                            name={item}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    if (!value.includes(item)) {
                                        onChange([...value, item]);
                                    }
                                } else {
                                    if (value.includes(item)) {
                                        onChange(value.filter((_item: string) => _item !== item));
                                    }
                                }
                            }}
                            checked={value.includes(item)}/>
                        {item}
                    </label>
                })
            }
        </div>
    )
}

export default Checkbox;