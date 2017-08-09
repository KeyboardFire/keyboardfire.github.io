var data = [
    { id: 'czech', name: 'Czech Duolingo', happens: 1503291600 },
    { id: 'school', name: 'school starts', happens: 1503464400 },
    { id: 'korean', name: 'Korean Duolingo', happens: 1504760400 }
];

window.addEventListener('load', function() {
    data.forEach(function(ev) {
        var timer = makeTimer(ev);
        document.body.appendChild(timer);
    });
    setInterval(function() {
        data.forEach(function(ev) {
            document.getElementById(ev.id).innerText = fmtSecs(ev.happens - (new Date / 1000));
        });
    }, 20);
});

function makeTimer(ev) {
    var wrapper = document.createElement('div');
    var remaining = document.createElement('span');
    remaining.id = ev.id;
    var desc = document.createElement('span');
    desc.appendChild(document.createTextNode(' until ' + ev.name));
    wrapper.appendChild(remaining);
    wrapper.appendChild(desc);
    return wrapper;
}

function fmtSecs(n) {
    var secs = n % 60;
    n = Math.floor(n / 60);
    var mins = n % 60;
    n = Math.floor(n / 60);
    var hours = n % 24;
    n = Math.floor(n / 24);
    var days = n;

    return days + ' days ' + [hours, mins, secs.toFixed(2)].map(pad).join(':');
}

function pad(n) {
    var s = n.toString();
    if (s.length == 1 || s[1] == '.') s = '0' + s;
    return s;
}
