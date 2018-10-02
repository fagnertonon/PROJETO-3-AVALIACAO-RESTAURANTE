

navigator.serviceWorker.register('/sw.js').then(function (event) {

    if (!navigator.serviceWorker) return;
//
    console.log('Service work registrado com sucesso.');

}).catch(function (error) {
    console.log('Service work não registrado.');
    console.log(error);

});