import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Player, Country, Sport } from '../interfaces/options.interface';
import { saveAs } from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  public country: Country;
  public sport: Sport;
  public player$: Subject<any>;
  public searching$: BehaviorSubject<boolean>;
  public regexUrl: RegExp = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  /**
   * 
   * @param {HttpClient} http
   */

  constructor(
    private http: HttpClient
  ) { 
  
    this.player$ = new Subject();
    this.searching$ = new BehaviorSubject(false);
  }

  optionsSelected({...options}) {
    switch (options.id) {
      case 1:
        this.country = options.opt;
        break;
      case 2:
        this.sport = options.opt;
        break;
      case 3:
        this.searching$.next(true);
        const country = this.country.name;
        const sport = this.sport.name;
        this.player$.next({
          ...this.country,
          ...this.sport,
          ...options.opt,
          country,
          sport
        });
        break;
    }
  }

  download(url: string, name: string) {
    if (this.regexUrl.test(url)) {
      return this.convertImageToBase64(url, name);
    }
    saveAs(url, `${name}.jpg`);
  }

  convertImageToBase64(image: string, name: string) {
    this.http.get(image, {
      responseType: 'blob',
    }).subscribe((res) => {
      let reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onload = () => {
          let base64: any = reader.result;
          this.download(base64, name)
      }
    })
  }

}
