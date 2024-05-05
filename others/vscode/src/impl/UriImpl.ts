import path from 'path';
import type { Uri } from 'vscode';
import { unimplementedWowo } from '../helpers';

export class UriImpl implements Uri {
    constructor(private _path: string) {}
    get scheme(): string {
        return 'file'; // #hack should support other schemas as well
    }
    get authority(): string {
        return unimplementedWowo();
    }
    get path(): string {
        return this._path;
    }
    get query(): string {
        return unimplementedWowo();
    }
    get fragment(): string {
        return unimplementedWowo();
    }
    get fsPath(): string {
        return unimplementedWowo();
    }
    with(change: {
        scheme?: string | undefined;
        authority?: string | undefined;
        path?: string | undefined;
        query?: string | undefined;
        fragment?: string | undefined;
    }): Uri {
        if (change.path != null) {
            if (Object.keys(change).length > 1) {
                unimplementedWowo(
                    'implemented only for change.path, nothing else for now',
                );
            }
            return new UriImpl(change.path);
        }
        return unimplementedWowo(change);
    }
    toString(skipEncoding?: boolean | undefined): string {
        if (skipEncoding !== undefined) {
            unimplementedWowo('not sure what to do with this param', {
                skipEncoding,
            });
        }
        return this.path;
    }
    toJSON() {
        return unimplementedWowo();
    }
    static joinPath(base: Uri, ...pathSegments: string[]): Uri {
        return base.with({ path: path.join(base.path, ...pathSegments) });
    }
}
