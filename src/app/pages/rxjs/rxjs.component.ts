import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable().pipe(retry(2)).subscribe(
      (res) => {
        console.log('Subs', res);
      },
      (error) => {
        console.log('Se produjo un error en el obs: ', error);
      },
      () => {
        console.log('El observador terminó');
      }
    );

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}

  regresaObservable(): Observable<any>{
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;

      const intervalo = setInterval(() => {
        contador++;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   // clearInterval(intervalo);
        //   observer.error('El contador llegó a 2');
        // }
      }, 1000);
    }).pipe(
      map( resp =>  resp.valor),
      filter( ( valor, index) => {
        // console.log('filter', valor, index);

        if ( (valor % 2) === 1) {
          // impar
          return true;
        } else {
          // Par
          return false;
        }
      })
    );
  }
}
