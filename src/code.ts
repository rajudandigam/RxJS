import { Observable } from "rxjs";

const addItem = (item: any) => {
  const rootElem = document.getElementById('root');
  const liElem = document.createElement('li');
  const itemText = document.createTextNode(item);

  liElem.appendChild(itemText);
  rootElem.appendChild(liElem);
};

const observable = Observable.create((observer: any) => {
  try {
    observer.next('Mission started');
    observer.next('Mission Running 1');
    observer.complete();
    observer.next('This after completion');
  } catch(err) {
    observer.error(err);
  }
});

observable.subscribe(
  (item: any) => addItem(item),
  (error: any) => addItem(error),
  () => addItem('Mission accomplished')
);
