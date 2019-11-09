import { Observable, fromEvent } from "rxjs";

const addItem = (item: any) => {
  const rootElem = document.getElementById('root');
  const liElem = document.createElement('li');
  const itemText = document.createTextNode(item);

  liElem.appendChild(itemText);
  rootElem.appendChild(liElem);
};

const observable = Observable.create((observer: any) => {
  try {
    let count = 1;
    observer.next('Mission started');
    
    const intervalId = setInterval(() => {
      observer.next(`Mission Running ${count++}`);
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
    }, 8000);
  } catch(err) {
    observer.error(err);
  }
});

const eventObservable = fromEvent(document, 'mousemove');

setTimeout(() => {
  eventObservable.subscribe((x: any) => addItem(x))
}, 2000);

const observer = observable.subscribe(
  (item: any) => addItem(item),
  (error: any) => addItem(error),
  () => addItem('Mission accomplished')
);

const observer2 = observable.subscribe(
  (item: any) => addItem('Subscriber 2 ' + item)
);

observer.add(observer2);

setTimeout(() => {
  observer.unsubscribe();
}, 4000);
