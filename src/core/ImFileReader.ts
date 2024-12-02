import isString from './typeguards/isString';

interface IFileReaderProgressEvent extends ProgressEvent {
    readonly target: FileReader | null;
}

export class ImFileReader {
    private _fileReader: FileReader;
    private _targetFile: File;
    private _fileContentText: string;
    private _currentProgress: number = 0;
    private _onLoadFinished: (text: string) => void;
    private _onProgressHandler?: (progress: number) => void;

    constructor(fileName: File) {
        this._targetFile = fileName;

        this._onLoad = this._onLoad.bind(this);
        this._onProgress = this._onProgress.bind(this);
        this._onLoadEnd = this._onLoadEnd.bind(this);
    }

    public readSingleFile(onLoadFinished: (text: string) => void | Promise<void>, onProgress?: (progress: number) => void) {
        this._onLoadFinished = onLoadFinished;
        this._onProgressHandler = onProgress;

        // create the FileReader
        this._fileReader = new FileReader();

        // register the load event handler
        this._fileReader.onload = this._onLoad;
        // register the onProgress eventHandler
        this._fileReader.onprogress = this._onProgress;
        // register the onLoadEnd eventhandler
        this._fileReader.onloadend = this._onLoadEnd;

        // reset the progress
        this._currentProgress = 0;

        // TODO: support more than just Text?
        this._fileReader.readAsDataURL(this._targetFile);
    }

    private _onLoad(file: IFileReaderProgressEvent) {
        const content = file.target;

        if (content?.result) {
            if (isString(content.result)) {
                this._fileContentText = content.result;
            }
        }
    }

    private _onProgress(progress: IFileReaderProgressEvent) {
        if (progress.total > 0) {
            // calculate the Progress
            const currentProgress = Math.round((progress.loaded / progress.total) * 100);

            this._currentProgress = currentProgress;
            if (this._onProgressHandler) {
                this._onProgressHandler(this._currentProgress);
            }
        }
    }

    private _onLoadEnd(progress: IFileReaderProgressEvent) {
        if (this._onLoadFinished) {
            this._onLoadFinished(this._fileContentText);
        }
    }
}

export default ImFileReader;
