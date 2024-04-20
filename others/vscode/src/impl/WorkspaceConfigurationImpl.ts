import { ConfigurationTarget, WorkspaceConfiguration } from 'vscode';
import { unimplementedWowo } from '../helpers';

export class WorkspaceConfigurationImpl implements WorkspaceConfiguration {
    readonly [key: string]: any;
    get<T>(section: string, defaultValue?: T): T | undefined {
        switch (section) {
            case 'general.retainWebviewContext':
                return true as T;
            default:
                return unimplementedWowo(section, defaultValue);
        }
    }
    has(section: string): boolean {
        return unimplementedWowo(section);
    }
    inspect<T>(section: string):
        | {
              key: string;
              defaultValue?: T | undefined;
              globalValue?: T | undefined;
              workspaceValue?: T | undefined;
              workspaceFolderValue?: T | undefined;
              defaultLanguageValue?: T | undefined;
              globalLanguageValue?: T | undefined;
              workspaceLanguageValue?: T | undefined;
              workspaceFolderLanguageValue?: T | undefined;
              languageIds?: string[] | undefined;
          }
        | undefined {
        return unimplementedWowo(section);
    }
    update(
        section: string,
        value: any,
        configurationTarget?: boolean | ConfigurationTarget | null | undefined,
        overrideInLanguage?: boolean | undefined,
    ): Thenable<void> {
        return unimplementedWowo(
            section,
            value,
            configurationTarget,
            overrideInLanguage,
        );
    }
}
