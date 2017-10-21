import { ElementRef, EventEmitter, AfterContentInit, QueryList, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { SelectItem } from '../common/selectitem';
import { DomHandler } from '../dom/domhandler';
import { ObjectUtils } from '../utils/objectutils';
import { ControlValueAccessor } from '@angular/forms';
export declare const LISTBOX_VALUE_ACCESSOR: any;
export declare class Listbox implements AfterContentInit, ControlValueAccessor {
    el: ElementRef;
    domHandler: DomHandler;
    objectUtils: ObjectUtils;
    cd: ChangeDetectorRef;
    options: SelectItem[];
    multiple: boolean;
    style: any;
    styleClass: string;
    listStyle: any;
    readonly: boolean;
    disabled: boolean;
    checkbox: boolean;
    filter: boolean;
    filterMode: string;
    metaKeySelection: boolean;
    dataKey: string;
    showToggleAll: boolean;
    onChange: EventEmitter<any>;
    onDblClick: EventEmitter<any>;
    footerFacet: any;
    templates: QueryList<any>;
    itemTemplate: TemplateRef<any>;
    filterValue: string;
    filtered: boolean;
    value: any;
    onModelChange: Function;
    onModelTouched: Function;
    checkboxClick: boolean;
    optionTouched: boolean;
    focus: boolean;
    constructor(el: ElementRef, domHandler: DomHandler, objectUtils: ObjectUtils, cd: ChangeDetectorRef);
    ngAfterContentInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    onOptionClick(event: any, option: any): void;
    onOptionTouchEnd(event: any, option: any): void;
    onOptionClickSingle(event: any, option: any): void;
    onOptionClickMultiple(event: any, option: any): void;
    removeOption(option: any): void;
    isSelected(option: SelectItem): boolean;
    readonly allChecked: boolean;
    allFilteredSelected(): boolean;
    onFilter(event: any): void;
    toggleAll(event: any, checkbox: any): void;
    isItemVisible(option: SelectItem): boolean;
    onDoubleClick(event: Event, option: SelectItem): any;
    onCheckboxClick(event: Event, option: SelectItem): void;
    onInputFocus(event: any): void;
    onInputBlur(event: any): void;
}
export declare class ListboxModule {
}
