window.addEventListener('load', function() {
    var form = document.getElementById('main'),
        input = document.getElementById('input'),
        submitFunc;
    form.addEventListener('submit', submitFunc = function(e) {
        if (e) e.preventDefault();
        MathJax.Hub.Queue(['Text', MathJax.Hub.getAllJax('output')[0],
            process(input.value)]);
    });
    form.style.display = 'block';

    var examples = document.getElementsByClassName('ex');
    for (var i = 0; i < examples.length; ++i) {
        (function(i) {
            examples[i].addEventListener('click', function(e) {
                e.preventDefault();
                input.value = examples[i].textContent;
                submitFunc();
            });
        })(i);
    }
});

function process(text) {
    return text
        .replace(/\(/g, '\\left(')
        .replace(/\)/g, '\\right)')
        .replace(/father/g, '{\\frac{man woman boy girl}{woman boy girl}}')
        .replace(/mother/g, '{\\frac{woman man boy girl}{man boy girl}}')
        .replace(/parents/g, '{\\frac{man woman boy girl}{boy girl}}')
        .replace(/brother/g, '{\\frac{boy girl}{girl}}')
        .replace(/orphans/g, '{\\frac{boy girl (-man woman)}{(-man woman)}}')
        .replace(/woman/g, '{\\dot\\Delta}')
        .replace(/man/g, '{\\dot\\Lambda}')
        .replace(/boy/g, '{i}')
        .replace(/girl/g, '{\\scriptsize\\dot\\Delta}')
        .replace(/giant/g, '{>person}')
        .replace(/person/g, '{\\dot{\\text I}}')
        .replace(/talk/g, '{\\Large<\\kern-1em-}')
        .replace(/like/g, '{\\vcenter{\\Large\\heartsuit}}')
        .replace(/(write|letter|work)/g, '{\\vcenter{\\img[width=1em,height=1em]{$1.svg}}}');
}
