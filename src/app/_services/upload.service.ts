import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UploadService {
    constructor() {
    }

    public makeFileRequest(url: string, params: string[], file: File): Observable<any> {
        return Observable.create(observer => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            formData.append("Image", file, file.name);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };

            xhr.upload.onprogress = (event) => {
                // this.progress = Math.round(event.loaded / event.total * 100);
                //this.progressObserver.next(this.progress);
            };
            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    }
}