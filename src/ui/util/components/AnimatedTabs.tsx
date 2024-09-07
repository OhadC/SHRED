import _ from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState, type MutableRefObject, type PropsWithChildren } from "react";
import { createSafeContext } from "~/ui/util/context/create-safe-context";
import { cn } from "~/ui/util/tailwind/cn";
import type { PropsWithClassName } from "../models/props-with-class-name.model";

type TabInfo<TValue = any> = {
    value: TValue;
    tabRef: MutableRefObject<HTMLElement>;
};

type TabsContextData<TValue = any> = {
    selectedValue?: TValue;
    setSelectedValue: (value: TValue) => void;
    addTab: (value: TValue, tabRef: MutableRefObject<HTMLElement>) => void;
    removeTab: (value: TValue) => void;
};

const [useTabsContext, Provider] = createSafeContext<TabsContextData>("TabsContext");

export type AnimatedTabsProps<TValue = any> = PropsWithClassName &
    PropsWithChildren & {
        value: TValue;
        onChange?: (event: { value: TValue }) => void;
        indicatorProps: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    };

export function AnimatedTabs<TValue>({
    className,
    children,
    value,
    onChange,
    indicatorProps: { className: indicatorClassName, style: indicatorStyle, ...indicatorProps } = {},
}: AnimatedTabsProps<TValue>) {
    const [allTabs, setAllTabs] = useState<TabInfo[]>([]);
    const [selectedValue, setSelectedValue] = useState<TValue>(value);
    const ref = useRef<HTMLDivElement>();

    const indicatorStyles = useIndicatorStyles<TValue>(allTabs, selectedValue, ref);

    return (
        <TabContextProvider selectedValue={selectedValue} setAllTabs={setAllTabs} setSelectedValue={setSelectedValue} onChange={onChange}>
            <div className={cn("relative", className)} ref={ref}>
                {children}

                <div
                    style={{ ...indicatorStyles, ...(indicatorStyle || {}) }}
                    className={cn("absolute transition-all duration-300", indicatorClassName)}
                    {...indicatorProps}
                ></div>
            </div>
        </TabContextProvider>
    );
}

AnimatedTabs.Tab = ({ className, children, value }: PropsWithClassName & PropsWithChildren & { value: any }) => {
    const ref = useRef<HTMLButtonElement>();
    const { selectedValue, setSelectedValue, addTab, removeTab } = useTabsContext();

    useEffect(() => {
        addTab(value, ref);

        return () => removeTab(value);
    }, [value]);

    const isSelected = selectedValue === value;

    return (
        <button onClick={() => setSelectedValue(value)} className={cn(isSelected && "selected", "relative z-10", className)} ref={ref}>
            {children}
        </button>
    );
};

function useIndicatorStyles<TValue>(allTabs: TabInfo<any>[], selectedValue: TValue, ref: MutableRefObject<HTMLDivElement>) {
    const selectedTabInfo = useMemo<TabInfo | undefined>(() => allTabs.find(tab => tab.value === selectedValue), [selectedValue, allTabs]);

    const allElements = useMemo(() => allTabs.map(tab => tab.tabRef.current), [allTabs]);
    const entries = useElementsResizeObserver(allElements);

    const indicatorStyles = useMemo<{ left: string; width: string }>(() => {
        if (!selectedTabInfo) {
            return { left: "0", width: "0" };
        }

        const { x } = ref.current.getBoundingClientRect();
        const { x: selectedTabInfoX, width: selectedTabInfoWidth } = selectedTabInfo.tabRef.current.getBoundingClientRect();

        return { left: selectedTabInfoX - x + "px", width: selectedTabInfoWidth + "px" };
    }, [selectedTabInfo, entries]);

    return indicatorStyles;
}

function TabContextProvider<TValue>({
    selectedValue,
    children,
    setAllTabs,
    onChange,
    setSelectedValue,
}: PropsWithChildren & {
    selectedValue: TValue;
    setAllTabs: React.Dispatch<React.SetStateAction<TabInfo<any>[]>>;
    onChange?: AnimatedTabsProps<TValue>["onChange"];
    setSelectedValue: React.Dispatch<React.SetStateAction<TValue>>;
}) {
    const _setSelectedValue = useCallback<TabsContextData<TValue>["setSelectedValue"]>(
        value => {
            onChange?.({ value });
            setSelectedValue(value);
        },
        [onChange, setSelectedValue],
    );
    const addTab = useCallback<TabsContextData<TValue>["addTab"]>(
        (value, tabRef) => {
            setAllTabs(tabs => [...tabs, { value, tabRef }]);
        },
        [setAllTabs],
    );
    const removeTab = useCallback<TabsContextData<TValue>["removeTab"]>(
        value => setAllTabs(tabs => tabs.filter(tab => tab.value !== value)),
        [setAllTabs],
    );

    const contextValue = useMemo<TabsContextData<TValue>>(
        () => ({
            selectedValue,
            setSelectedValue: _setSelectedValue,
            addTab,
            removeTab,
        }),
        [selectedValue, setSelectedValue, addTab, removeTab],
    );

    return <Provider value={contextValue}>{children}</Provider>;
}

function useElementsResizeObserver(elements: HTMLElement[]): ResizeObserverEntry[] {
    const [observedElements, setObservedElements] = useState<HTMLElement[]>([]);
    const [entries, setEntries] = useState<ResizeObserverEntry[]>([]);

    const resizeObserver = useMemo(
        () =>
            new ResizeObserver(entries => {
                setEntries(entries);
            }),
        [],
    );

    useEffect(() => {
        const oldElements = _.difference(observedElements, elements);
        const newElements = _.difference(elements, observedElements);

        oldElements.forEach(element => !!element && resizeObserver.unobserve(element));
        newElements.forEach(element => !!element && resizeObserver.observe(element));

        setObservedElements(elements);
    }, [elements]);

    useEffect(() => {
        return () => resizeObserver.disconnect();
    }, []);

    return entries;
}
