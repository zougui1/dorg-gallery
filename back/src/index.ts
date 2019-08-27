import './config/init';
import './actionDispatcher';

const fun = (text: any, timeout: number) => new Promise(resolve => {
  setTimeout(() => {
    resolve(text);
  }, timeout);
});

const asyncFunction = async () => {
  const dataPromises = [
    fun('Z', 2000),
    fun('text', 0),
    fun('C', 0),
  ];

  const data = await Promise.all(dataPromises);

  console.log(data)
}
asyncFunction()
