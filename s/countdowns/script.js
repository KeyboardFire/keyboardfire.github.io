var data = [
    { id: 'school', name: 'school starts',            happens: 1503464400 },
    { id: 'czech',  name: 'Czech Duolingo',           happens: 1504242000 },
    { id: 'korean', name: 'Korean Duolingo',          happens: 1504760400 },
    { id: 'gci',    name: 'GCI',                      happens: 1511848800 },
    { id: 'usaco1', name: 'USACO 1',                  happens: 1513317600 },
    { id: 'wint',   name: 'winter break',             happens: 1513836000 },
    { id: 'usaco2', name: 'USACO 2',                  happens: 1516341600 },
    { id: 'open',   name: 'NACLO open round',         happens: 1516860000 },
    { id: 'amc',    name: 'AMC',                      happens: 1517983200 },
    { id: 'usaco3', name: 'USACO 3',                  happens: 1519365600 },
    { id: 'aime',   name: 'AIME',                     happens: 1520316000 },
    { id: 'inv',    name: 'NACLO invitational round', happens: 1520488800 },
    { id: 'usacoo', name: 'USACO open',               happens: 1521781200 },
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
    desc.appendChild(document.createTextNode(ev.name));
    wrapper.appendChild(remaining);
    wrapper.appendChild(desc);
    return wrapper;
}

function fmtSecs(n) {
    if (n < 0) return '✓ ';

    var secs = n % 60;
    n = Math.floor(n / 60);
    var mins = n % 60;
    n = Math.floor(n / 60);
    var hours = n % 24;
    n = Math.floor(n / 24);
    var days = n;

    return days + ' days ' + [hours, mins, secs.toFixed(2)].map(pad).join(':') + ' until ';
}

function pad(n) {
    var s = n.toString();
    if (s.length == 1 || s[1] == '.') s = '0' + s;
    return s;
}
