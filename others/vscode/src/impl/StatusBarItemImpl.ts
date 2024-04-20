import {
    AccessibilityInformation,
    Command,
    MarkdownString,
    StatusBarAlignment,
    StatusBarItem,
    ThemeColor,
} from 'vscode';
import { unimplementedWowo } from '../helpers';

export class StatusBarItemImpl implements StatusBarItem {
    id: string;
    priority: number | undefined;
    name: string | undefined;
    tooltip: string | MarkdownString | undefined;
    color: string | ThemeColor | undefined;
    backgroundColor: ThemeColor | undefined;
    command: string | Command | undefined;
    accessibilityInformation: AccessibilityInformation | undefined;
    constructor(
        public alignment: StatusBarAlignment = StatusBarAlignment.Left,
        public text: string = '',
    ) {
        // #hack
        this.id = '1';
    }
    show(): void {
        console.log(
            `🌟 Showing StatusBarItem: \nname=${this.name}\ntooltip=${this.tooltip}\npriority=${this.priority}`,
        );
    }
    hide(): void {
        unimplementedWowo('hiding StatusBarItemImpl');
    }
    dispose(): void {
        unimplementedWowo('disposing StatusBarItemImpl');
    }
}
