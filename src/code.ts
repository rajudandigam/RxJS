import { Observable, Subject, merge } from "rxjs";

const addItem = (item: any) => {
  const rootElem = document.getElementById('root');
  const liElem = document.createElement('li');
  const itemText = document.createTextNode(item);

  liElem.appendChild(itemText);
  rootElem.appendChild(liElem);
};

// Observable

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

/*
const eventObservable = fromEvent(document, 'mousemove');

setTimeout(() => {
  eventObservable.subscribe((x: any) => addItem(x))
}, 2000);
*/

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

// Subjects

const subject = new Subject();

subject.subscribe(
  data => addItem('Observer 1: ' + data),
  err => addItem(err),
  () => addItem('Observer 1 completed')
);

subject.next('The first thing sent');

const subjectObserver2 = subject.subscribe(
  data => addItem('Observer 2: '+ data)
);

subject.next('The second thing has been sent');
subject.next('The second thing has been sent');

subjectObserver2.unsubscribe();

subject.next('The final thing has been sent');

// Operators - Merge

const mergeObervable1 = Observable.create((observer: any) => {
  observer.next('Merge Observer 1');
});

const mergeObervable2 = Observable.create((observer: any) => {
  observer.next('Merge Observer 2');
});

const mergedObservable = merge(mergeObervable1, mergeObervable2);

mergedObservable.subscribe((x: any) => addItem(x));

