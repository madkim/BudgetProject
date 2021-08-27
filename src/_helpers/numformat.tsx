//https://stackoverflow.com/questions/9345136/1000000-to-1m-and-1000-to-1k-and-so-on-in-js

export default function m(n: number, d: number){
    let x=(''+n).length;
    let p=Math.pow;
    d=p(10,d);
    x-=x%3;
return Math.round(n*d/p(10,x))/d+" kMGTPE"[x/3]}