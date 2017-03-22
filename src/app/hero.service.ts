import {Injectable} from "@angular/core";
import {Hero} from "./hero";
import {Headers, Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';

/**
 * Created by vincent on 19/03/2017.
 */

@Injectable()
export class HeroService {

    private heroesUrl = 'api/heroes';

    constructor(private http: Http) {}

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response =>  response.json().data as Hero[])
            .catch(this.handleError)
    }

    getHero(id: number): Promise<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url)
            .toPromise().then(response => response.json().data as Hero)
            .catch(this.handleError)
    }

    private headers = new Headers({'Content-Type': 'application/json'});
    update(hero: Hero): Promise<Hero> {
        const  url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    create(name: string): Promise<Hero> {
        return this.http
            .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('A error happened', error)
        return Promise.reject(error.message || error)
    }
}
