import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ResourceModel} from "./resource.model";
import {environment} from "../../../environments/environment";

export abstract class ResourceService<T extends ResourceModel<T>> {

    protected backendBaseUrl = `${environment.apiUrl}`;
    protected apiURL: string = "";

    protected constructor(
        private httpClient: HttpClient,
        private tConstructor: { new(m: Partial<T>, ...args: unknown[]): T },
    ) {
    }

    protected post(resource: Partial<T> & { toJson?: () => T }): Observable<T> {
        return this.httpClient
            .post<T>(`${this.backendBaseUrl}${this.apiURL}`, resource?.toJson ? resource.toJson() : resource)
            .pipe(map((result) => new this.tConstructor(result)));
    }

    protected get(config?: { params?: any }): Observable<T[]> {
        return this.httpClient
            .get<T[]>(`${this.backendBaseUrl}${this.apiURL}`, config)
            .pipe(map((result) => result.map((i) => new this.tConstructor(i))));
    }


    protected getById(id: string): Observable<T> {
        return this.httpClient
            .get<T>(`${this.backendBaseUrl}${this.apiURL}/${id}`,)
            .pipe(map((result) => new this.tConstructor(result)));
    }


    protected put(resource: Partial<T> & { toJson: () => T }): Observable<T> {
        return this.httpClient
            .put<T>(`${this.backendBaseUrl}${this.apiURL}`, resource)
            .pipe(map((result) => new this.tConstructor(result)));
    }

    protected delete(id: any): Observable<void> {
        return this.httpClient.delete<void>(`${this.backendBaseUrl}${this.apiURL}/${id}`);
    }
}
