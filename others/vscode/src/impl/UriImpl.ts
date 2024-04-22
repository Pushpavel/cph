import path from 'path';

export class UriImpl {
    // #hack base was of type vscode.Uri
    static joinPath(base: string, ...pathSegments: string[]): UriImpl {
        return path.join(base, ...pathSegments);
    }
}
