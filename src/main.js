dom.style(test1, 'color', 'red');
dom.class.add(test2, 'green', 'border', 'font');
dom.class.add(test3, 'green');

const divList = dom.find('.green');

console.log('find ------------');
console.log(dom.find('.green', test)[0]);
console.log('each ------------');
dom.each(divList, (n)=> console.log(n));

